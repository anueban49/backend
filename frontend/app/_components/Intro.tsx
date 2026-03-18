"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
//for re-routing between client and staff.
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
import Image from "next/image";

export const Intro = () => {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("accessToken");
    if (user) {
      router.push("/home");
    } else {
      const staff = localStorage.getItem("staffAccessToken");
      if (staff) {
        router.push("/staff_nomnom");
      } else {
        localStorage.removeItem("staffAccessToken");
      }
    }
  }, []);

  const bgImgs = [
    "/bgImgs/4ff51a14c041fc57196ebf52f07e524b5e4cc98c.png",
    "/bgImgs/26eabce71cf327094760b819bce93ad28dd01157.png",
    "/bgImgs/34c3688e73a7fec1f66f9edc2b2a97c609da743f.png",
    "/bgImgs/82cf2d72ae8de008994526b031c3fb1879ecf751.png",
    "/bgImgs/766a53e9ff244d39a48c64472fe28e1f957bb086.png",
    "/bgImgs/452177b52de5025e4885c8710490c0c5538793ed.png",
    "/bgImgs/b2b046d0cdccd3ed0f0bc306f939bfb413e3841a.png",
    "/bgImgs/b598709d55bc133b8044d28cf937929f2e9f99ce.png",
    "/bgImgs/beetrootsalad.png",
    "/bgImgs/ce6cd6f59da9ff84c52e907b1955e23221b9a850.png",
    "/bgImgs/ddb94c55b6b523cb1d8c85b882363f4719c5aa79.png",
    "/bgImgs/mozarillatomatosalad.png",
  ];
  //
  function SlidingBG() {
    const plugin = React.useRef(
      AutoPlay({ delay: 1500, stopOnInteraction: false }),
    );
    return (
      <div className="w-full absolute top-1s">
        <Carousel
          opts={{ align: "start" }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          plugins={[plugin.current]}
        >
          <CarouselContent className="w-full ">
            {bgImgs.map((img, index) => (
              <CarouselItem
                key={index}
                className="w-full basis-1/3 rounded-2xl overflow-hidden"
              >
                <Image
                  alt="introImg"
                  width={500}
                  height={500}
                  src={img}
                  className="aspect-square object-cover object-center opacity-20 rounded-2xl "
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }
  return (
    <>
      <div className="w-screen h-screen bg-zinc-700 flex flex-col justify-center items-center">
        <SlidingBG />
        <Card className="z-99 w-3/5 bg-opacity-10 shadow-none border-transparent p-10 flex flex-col items-center">
          <CardTitle className="text-3xl text-gray-200">Welcome</CardTitle>
          <CardContent className="flex flex-col items-center">
            <Button
              className="rounded-full bg-red-500 border-transparent text-white"
              variant={"outline"}
              onClick={() => {
                router.push("/auth");
              }}
            >
              Sign in/ Register to continue
            </Button>
            <p className="text-white">or</p>
            <Button
              className="rounded-full text-gray-100 hover:text-red-500"
              variant={"link"}
              onClick={() => {
                router.push("/home");
              }}
            >
              Explore dishes
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
