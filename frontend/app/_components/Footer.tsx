"use client";
import { FacebookIcon, InstagramIcon } from "lucide-react";
import Image from "next/image";
export function Footer() {
  return (
    <div className="bg-full w-full h-150 py-8 bg-primary">
      <div className="w-full  h-10 bg-[#EF4444] text-white p-4 flex items-center font-semibold">
        {" "}
        Fresh fast Delivered Fresh fast Delivered Fresh fast Delivered Fresh
        fast Delivered{" "}
      </div>
      <div className="grid grid-cols-5 h-full p-10 ">
        <div className="flex flex-col gap-1 items-center p-10">
          {" "}
          <div>
            <Image width={46} height={37.29} src={"/logoPic.png"} alt="logo" />
          </div>
          <div className="flex gap-0 font-semibold text-2xl">
            <p className="text-white">Nom</p>
            <p className="text-red-500">Nom</p>
          </div>
          <div className="text-white">Swift Delivery</div>
        </div>
        <div>
          <p className="text-gray-500 font-light">NOMNOM</p>
          {Array.from(["Home", "Contact Us", "Delivery Zone"]).map((a, i) => (
            <p key={i} className="text-white text-sm font-semibold">
              {a}
            </p>
          ))}
        </div>
        <div>
          <p className={`text-gray-500 font-light`}>MENU</p>
          {Array.from([
            "Appetizers",
            "Salads",
            "Pizzas",
            "Main Dishes",
            "Desserts",
          ]).map((a, i) => (
            <p key={i} className="text-white text-sm text-semibold">
              {a}
            </p>
          ))}
        </div>
        <div>
          {Array.from([
            "Side Dish",
            "Brunch",
            "Desserts",
            "Beverages",
            "Fish & Sea Foods",
          ]).map((a, i) => (
            <p key={i} className="text-white text-sm text-semibold">
              {a}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-500 font-light">FOLLOW US</p>
          <div className="flex gap-2">
            {" "}
            <Image
              src={"/icon/fbicon.png"}
              alt="fbicon"
              width={20}
              height={20}
            />
            <Image
              src={"/icon/insicon.png"}
              alt="insicon"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
