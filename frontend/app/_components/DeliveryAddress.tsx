"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { MapPin } from "lucide-react";
// const value: string = useState("")
export function DeliveryAddress() {
  return (
    <div className="">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="rounded-4xl" variant="outline">Delivery Address<MapPin/></Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            Select address
        </PopoverContent>
          
      </Popover>
    </div>
  );
}
