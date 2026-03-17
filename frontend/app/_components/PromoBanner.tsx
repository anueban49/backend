"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
export function PromoBanner() {
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);

  useEffect(() => {
    setW(window.innerWidth);
    setH(window.innerHeight);
  }, []);
  return (
    <div className="w-full bg-cover bg-center bg-no-repeat ">
      <Image
        alt="bannerImg"
        width={w}
        height={h / 2}
        src="/BG.png"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
