import { respData, respErr } from "@/lib/resp";

import { Photo } from "@/types/photo";
import { experimental_generateImage as generateImage } from "ai";
import { getUuid } from "@/lib/hash";
import { insertPhoto } from "@/models/photo";
import path from "path";
import { replicate } from "@ai-sdk/replicate";
import { writeFile } from "fs/promises";
import { getIsoTimestr } from "@/lib/time";


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
  
  const provider ="replicate";
  const photos = await Promise.all(
    images.map(async (image, index) => {
      const fileName = `${provider}_image_${batch}_${index}.png`;
      const filePath = path.join(process.cwd(), "public", fileName);
      const url = `${process.env.NEXT_PUBLIC_WEB_URL}/${fileName}`;
   
      const buffer = Buffer.from(image.base64, "base64");
      await writeFile(filePath, buffer);
   
      return {
        uuid:getUuid(),
        img_description: description,
        img_url: url,
        status:"created",
        created_at:getIsoTimestr(),
      }as Photo;
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
