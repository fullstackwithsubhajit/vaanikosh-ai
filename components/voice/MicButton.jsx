"use client";

import { Mic } from "lucide-react";

export default function MicButton() {
  return (
    <div className="flex py-12 items-center justify-center ">
      <button
        className="relative h-44 w-44 rounded-full bg-[#0068e8] flex items-center justify-center shadow-[0_0_0_8px_rgba(65,184,246,0.08),0_0_40px_rgba(65,184,246,0.12)] transition-all duration-300 hover:scale-105 active:scale-95">
        <Mic
          size={58}
          strokeWidth={2.5}
          className="text-[#20263A]"
        />
      </button>
    </div>
  );
}