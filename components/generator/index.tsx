"use client";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Generator() {
  const [description, setDescription] = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    requestGenWallpaper();
  };

  const requestGenWallpaper = async () => {
    try {
      const resp = await fetch("/api/gen-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await resp.json();
      console.log("photo", data);
      // 这里可以根据 data 做后续处理，比如显示图片等
    } catch (e) {
      toast.error("生成失败，请重试");
    }
  };

  return (
    <form onSubmit={handleGenerate} className="flex items-center gap-2 w-full max-w-xl mx-auto mb-16 -mb-16">
      <input
        type="text"
        className="flex-1 rounded-full border border-orange-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-base"
        placeholder="Wallpaper description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-2 rounded-full transition-colors"
      >
        Generate
      </button>
    </form>
  );
}
