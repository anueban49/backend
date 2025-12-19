"use client";

import Image from "next/image";

export function Logo() {
  return (
    <div className="w-full flex">
      <div className="scale-80"><Image width={46} height={37.29} src={"/logoPic.png"} alt="logo" /></div>

      <div className="flex flex-col ">
        <div className="flex font-semibold ">
          <p className="text-white">NOM</p>
          <p className="text-red-700">NOM</p>
        </div>
        <p className="text-white text-[14px]">Swift Delivery</p>
      </div>
    </div>
  );
}
