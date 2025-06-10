"use client";
import React from "react";

export interface PhotoItem {
  image: string;
  title: string;
  resolution: string;
  avatar?: string; // 可以是首字母或图标
  avatarColor?: string; // 可选，头像背景色
}

export default function Photoshops({ items }: { items: PhotoItem[] }) {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <div className="flex-1 flex flex-col justify-between p-4">
            <div className="text-base font-medium text-gray-800 truncate mb-2">{item.title}</div>
            <div className="flex items-center justify-between mt-auto">
              {/* <span className="text-xs text-gray-500">{item.resolution}</span> */}
              <span
                className={`ml-2 w-7 h-7 flex items-center justify-center rounded-full text-white text-sm font-bold ${item.avatarColor || "bg-green-500"}`}
              >
                {item.avatar || "?"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
