"use client";
import { Button } from "@/components/ui/button";
import { AddNewCategory } from "../../_components/AddNewCategory";
import { useState, useEffect } from "react";
import { useStaffAuth } from "@/context/StaffContext";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  CircleUserRound,
  EyeIcon,
  MenuIcon,
  Pen,
  User,
  XIcon,
} from "lucide-react";
import {
  AddressType,
  UserCompleteInfoType,
} from "@/app/_components/AuthProvider";
import { api } from "@/lib/axios";
import { useIMcrud } from "@/context/SSR-inventoryContext";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
type ClientType = Omit<UserCompleteInfoType, "password">;
export function Settings() {
  const { categories } = useIMcrud();
  const [display, setDisplay] = useState(1);
  const [clients, setClients] = useState<ClientType[] | null>(null);
  const { staff, logout } = useStaffAuth();
  const [loading, setloading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getClients = async () => {
      try {
        setloading(true);
        const { data } = await api.get<ClientType[]>("/user/all");
        setClients(data);
        setloading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    getClients();
  }, []);

  function StaffProfileDisplay() {
    const [show, setShow] = useState(false);
    const [btnApr, setBtnApr] = useState(false);
    const toggle = () => {
      setShow((prev) => (prev === false ? true : false));
    };
    return (
      <>
        <div className="flex flex-col gap-8">
          <div className="">
            <h1 className="text-2xl font-bold">Hello, {staff?.StaffID}</h1>

            <div
              className={`w-40  relative`}
              onMouseEnter={() => {
                setBtnApr(true);
              }}
              onMouseLeave={() => {
                setBtnApr(false);
              }}
            >
              <Button
                className={` ${btnApr ? "" : "hidden"} absolute rounded-full right-0`}
                size={"icon"}
                variant={"outline"}
              >
                <Pen />
              </Button>
              <img
                src={
                  staff?.profileImage
                    ? staff.profileImage
                    : "/systemdefault/User-Profile-PNG-Image.png"
                }
                className="object-cover object-center opacity-20"
              />
            </div>
            <span className="flex flex-col gap-1">
              <p className="flex gap-2">
                Employee ID:{" "}
                <EyeIcon width={15} color="gray" onClick={toggle} />
              </p>
              <Button
                variant={"outline"}
                className="w-fit rounded-2xl"
                onClick={() => {
                  logout();
                  router.push(`/`);
                }}
              >
                Log Out
              </Button>
              {show ? (
                <p className="text-sm text-gray-400 ">{staff?._id}</p>
              ) : (
                <></>
              )}
            </span>
          </div>
          <div className="">
            <h1 className="text-xl font-bold">Control Inventory</h1>
            <div className="w-full  aspect-7/3 flex flex-col py-10">
              <Card>
                <CardContent>
                  <AddNewCategory />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }
  function StaffStatisticsDisplay() {
    //contains data such as revenue, earnig etc
    return (
      <>
        <h1 className="text-xl font-bold">This Month</h1>
      </>
    );
  }
  const cleanAddress = (address: AddressType) => {
    const refinedAddress = Object.values(address || {});
    const addressToDisplay = refinedAddress.splice(1, 4).join(", ");
    return addressToDisplay;
  };

  function ClientManagementDisplay() {
    //contains data of clients
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-bold text-2xl">Clients</h1>
        {clients?.map((c) => (
          <Card className="flex gap-4">
            <CardContent className="grid grid-cols-3">
              <CardTitle className="flex gap-2">
                <div className="w-10 aspect-square">
                  {c.image ? (
                    <img src={c.image as string} />
                  ) : (
                    <User color="gray" />
                  )}
                </div>
                <div className="flex flex-col">
                  <p>{c.username}</p>
                  <p className="text-gray-400 font-normal">{c.email}</p>
                </div>
              </CardTitle>
              <div>
                <p>Current Delivery Address: </p>
                <p className="text-gray-500 text-sm">
                  {cleanAddress(c.address as AddressType)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  function TeamFeedDisplay() {
    //contains team, branch, franchise feed. -> {FUCK FUCK FUCK}
    return <>Community</>;
  }
  function StaffSidebar() {
    return (
      <>
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button
              variant={"ghost"}
              className="absolute top-4 right-4 rounded-full"
            >
              <MenuIcon className="sticky top-50 right-0" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col">
            <DrawerClose asChild>
              <Button
                variant="outline"
                size={"icon"}
                className="rounded-full absolute top-4 right-4"
              >
                <XIcon />
              </Button>
            </DrawerClose>
            <DrawerHeader>
              <DrawerTitle
                className="flex items-center gap-4 hover:bg-gray-200 transition-discrete rounded-2xl"
                onClick={() => {
                  setDisplay(1);
                }}
              >
                <Button
                  size={"icon"}
                  className="rounded-full scale-120 p-0"
                  variant={"ghost"}
                >
                  {staff?.profileImage ? (
                    <img src={staff?.profileImage} />
                  ) : (
                    <CircleUserRound />
                  )}
                </Button>

                {staff?.StaffID}
              </DrawerTitle>

              <DrawerDescription>{staff?.email}</DrawerDescription>
            </DrawerHeader>

            <DrawerFooter>
              <Button
                variant={"ghost"}
                className="rounded-2xl"
                onClick={() => {
                  setDisplay(2);
                }}
              >
                Statistics
              </Button>
              <Button
                variant={"ghost"}
                className="rounded-2xl"
                onClick={() => {
                  setDisplay(3);
                }}
              >
                Clients
              </Button>
              <Button
                variant={"ghost"}
                className="rounded-2xl"
                onClick={() => {
                  setDisplay(4);
                }}
              >
                Feed
              </Button>
              <Button
                variant={"ghost"}
                className="rounded-2xl"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                Sign Out
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      <div className="w-full max-w-full  h-fit p-4 flex flex-col">
        <StaffSidebar></StaffSidebar>
        {display === 1 && (
          <>
            <StaffProfileDisplay />
          </>
        )}
        {display === 2 && (
          <>
            <StaffStatisticsDisplay />
          </>
        )}
        {display === 3 && (
          <>
            <ClientManagementDisplay />
          </>
        )}
        {display === 4 && (
          <>
            <TeamFeedDisplay />
          </>
        )}
      </div>
    </>
  );
}
