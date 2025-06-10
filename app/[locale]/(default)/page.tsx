import Branding from "@/components/blocks/branding";
import CTA from "@/components/blocks/cta";
import FAQ from "@/components/blocks/faq";
import Feature from "@/components/blocks/feature";
import Feature1 from "@/components/blocks/feature1";
import Feature2 from "@/components/blocks/feature2";
import Feature3 from "@/components/blocks/feature3";
import Hero from "@/components/blocks/hero";
import Pricing from "@/components/blocks/pricing";
import Showcase from "@/components/blocks/showcase";
import Stats from "@/components/blocks/stats";
import Testimonial from "@/components/blocks/testimonial";
import { getLandingPage } from "@/services/page";
import { getPhotos } from "@/models/photo";
import { auth } from "@/auth";
import GeneratorClientWrapper from "@/components/GeneratorClientWrapper";
import Photoshops from "@/components/photoshops";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}`;
  }

  return {
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getLandingPage(locale);
  const photos = await getPhotos(1, 20);

  // 获取当前登录用户
  const session = await auth();
  const user_uuid = session?.user?.uuid;

  // 过滤逻辑：所有用户看到 online，登录用户还能看到自己 created 的
  const filteredPhotos = (photos || []).filter(photo =>
    photo.status === "online" ||
    (user_uuid && photo.status === "created" && photo.user_uuid === user_uuid)
  );

  // 数据库 Photo[] 映射为 PhotoItem[]
  const photoItems = filteredPhotos.map(photo => ({
    image: photo.img_url || "",
    title: photo.img_description || photo.uuid,
    resolution: "1792x1024", // 可根据实际数据调整
    avatar: photo.user_uuid ? photo.user_uuid[0] : "?",
    avatarColor: "bg-green-500", // 可根据实际需求调整
  }));

  return (
    <>
      {page.hero && <Hero hero={page.hero} />}
      <GeneratorClientWrapper />
      <Photoshops items={photoItems} />
      {/*{page.branding && <Branding section={page.branding} />}
      {page.introduce && <Feature1 section={page.introduce} />}
      {page.benefit && <Feature2 section={page.benefit} />}
      {page.usage && <Feature3 section={page.usage} />}*/}
      {page.feature && <Feature section={page.feature} />}
      {page.showcase && <Showcase section={page.showcase} />}
      {page.stats && <Stats section={page.stats} />}
      {page.pricing && <Pricing pricing={page.pricing} />}
      {page.testimonial && <Testimonial section={page.testimonial} />}
      {page.faq && <FAQ section={page.faq} />}
      {page.cta && <CTA section={page.cta} />}
    </>
  );
}
