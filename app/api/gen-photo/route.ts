import { respData, respErr } from "@/lib/resp";

import { Photo } from "@/types/photo";
import { experimental_generateImage as generateImage } from "ai";
import { getUuid } from "@/lib/hash";
import { insertPhoto } from "@/models/photo";
import { getIsoTimestr } from "@/lib/time";
import { newStorage } from "@/lib/storage";
import { replicate } from "@ai-sdk/replicate";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();
    const prompt = `generate a photo with the following description: ${description}`;
    const model = "black-forest-labs/flux-schnell";
 
const imageModel = replicate.image(model);
const providerOptions = {
  replicate: {
    output_quality: 90,
  },
};
 
const { images, warnings } = await generateImage({
  model: imageModel,
  prompt: prompt,
  n: 3,
  providerOptions,
  aspectRatio: "3:2",
});
if (warnings.length > 0) {
    throw new Error("gen photo failed");
  }
   
  const batch = getUuid();
  
  const provider = "replicate";
  const storage = newStorage();

  const photos = await Promise.all(
    images.map(async (image, index) => {
      const filename = `${provider}_image_${batch}_${index}.png`;
      const key = `shipany/${filename}`;
      const body = Buffer.from(image.base64, "base64");

      let url = "";
      try {
        const res = await storage.uploadFile({
          body,
          key,
          contentType: "image/png",
          disposition: "inline",
        });
        url = res.url || "";
        console.log("upload file success:", res);
      } catch (err) {
        console.log("upload file failed:", err);
        throw err;
      }

      const customUrl = `https://aiphotoshop.uk/aiphotoshopphotos/shipany/${filename}`;

      return {
        uuid: getUuid(),
        img_description: description,
        img_url: customUrl,
        status: "created",
        created_at: getIsoTimestr(),
      } as Photo;
    })
  );
    await insertPhoto(photos);

    return respData({
      prompt: prompt,
      photos: photos,
    });
  } catch (e) {
    console.log("generate photo failed:", e);
    return respErr("generate photo failed");
  }
}
