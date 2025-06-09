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
import Generator from "@/components/generator";
import Photoshops, { PhotoItem } from "@/components/photoshops";

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
  const items: PhotoItem[] = [
    {
      image: "https://shop.biotechusa.com/cdn/shop/products/GHCapsules_120caps_250ml.png?v=1623353551",
      title: "ai照片",
      resolution: "1792×1024",
      avatar: "n",
      avatarColor: "bg-green-500"
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Latin_digraph_G_H.svg/375px-Latin_digraph_G_H.svg.png",
      title: "老虎",
      resolution: "1792×1024",
      avatar: "h",
      avatarColor: "bg-orange-500"
    },
    {
      image: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/unn/unn01432/y/39.jpg",
      title: "大象",
      resolution: "1792×1024",
      avatar: "h",
      avatarColor: "bg-orange-500"
    },
    // ...更多图片
  ];

  return (
    <>
      {page.hero && <Hero hero={page.hero} />}
      <Generator />
      <Photoshops items={items} />
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
