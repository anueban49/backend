"use client";

import { AddressType, useAuth } from "./AuthProvider";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EditUserAddress } from "./EditAddress";
import { AddDeliveryAddress } from "./AddDeliveryAddress";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

export default function DeliveryAddress() {
  const { user } = useAuth();
  const [address, setAddress] = useState<AddressType | null>(null);

  const [show, setShow] = useState(false);
  if (!user) {
    return;
  }
  const refinedAddress = Object.values(user?.address || {});
  const addressToDisplay = refinedAddress.splice(1, 4).join(", ");
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
            {user.address ? (
              <Dialog>
                <DialogTrigger asChild>
                  <span className="text-gray-500 hover:text-black">
                    {addressToDisplay}
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Edit Delivery Location</DialogTitle>
                  <EditUserAddress />
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <span className="text-gray-500 hover:underline cursor-pointer">
                    No Selected Location: Add Location
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Add Your Delivery Location</DialogTitle>
                  <AddDeliveryAddress />
                  <DialogDescription>
                    Your order will be delivered to the address you provided.
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            )}
          </Button>
        </>
      )}
    </div>
  );
}
