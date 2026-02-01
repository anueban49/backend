"use client";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCompleteInfoType } from "./AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { email } from "zod";
import { DialogTitle } from "@/components/ui/dialog";
import { EditUserProfile } from "./EdituserProfile";
export function UserProfile() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const UserMenu = (user: UserCompleteInfoType) => {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="bg-red-500 rounded-full ">
              {user?.image ? (
                <img src={user?.image} />
              ) : (
                <>
                  <p>{user.email[0]}</p>
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 z-99" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"outline"}>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="absolute">
                  <EditUserProfile/>
                </DialogContent>
              </Dialog>

              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Settings</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Help</DropdownMenuItem>
                    <DropdownMenuItem>Redeem Promo Code</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => {logout(user._id, user)}}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  };

  return (
    <>
      {user ? (
        <UserMenu
          email={user.email}
          _id={user._id}
          username={user.email}
        ></UserMenu>
      ) : (
        <Button
          onClick={() => {
            router.push("/auth");
          }}
          variant={"outline"}
        >
          Log In
        </Button>
      )}
    </>
  );
}
