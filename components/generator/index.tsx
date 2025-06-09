"use client";
import React, { useState } from "react";

export default function Generator() {
  const [description, setDescription] = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加生成逻辑
    alert(`Generate: ${description}`);
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
