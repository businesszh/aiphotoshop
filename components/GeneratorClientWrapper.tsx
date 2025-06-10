"use client";
import dynamic from "next/dynamic";
const GeneratorClient = dynamic(() => import("@/components/generator"), { ssr: false });

export default function GeneratorClientWrapper() {
  return <GeneratorClient />;
} 