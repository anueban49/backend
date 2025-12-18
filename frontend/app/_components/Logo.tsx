"use client";

import Image from "next/image";

export function Logo() {
  return (
    <div className="w-full aspect-72/23 flex gap-4">
      <Image width={23} height={18} src={"/logoPic.png"} alt="logo" />
      <div className="flex flex-col gap-4">
        <div className="flex ">
          <p className="text-white">NOM</p>
          <p className="text-red-700">NOM</p>
        </div>
        <p className="text-white">Swift Delivery</p>
      </div>
    </div>
  );
}
