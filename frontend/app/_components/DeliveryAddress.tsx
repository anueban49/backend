"use client";

import { useAuth } from "./AuthProvider";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EditUserAddress } from "./EditAddress";
import { AddDeliveryAddress } from "./AddDeliveryAddress";

export default function DeliveryAddress() {
  const { user } = useAuth();
  console.log("userAddress: [deliveriaddresscomp],", user);
  const [show, setShow] = useState(false);
  if (!user) {
    return;
  }
  return (
    <div className="flex bg-white p-0 h-10 aspect-square items-center justify-center rounded-full transition-ease-in-out duration-300 hover:bg-gray-100 ">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="rounded-full aspect-square btnTransform"
        onMouseEnter={() => {
          setShow(true);
        }}
      >
        <MapPin />
      </Button>
      {show && (
        <>
          <Button
            variant={"ghost"}
            className="rounded-full aspect-square btnTransform"
            onMouseLeave={() => {
              setShow(false);
            }}
          >
            {user.address ? <EditUserAddress /> : <AddDeliveryAddress />}
          </Button>
        </>
      )}
    </div>
  );
}
