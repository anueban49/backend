"use client";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCompleteInfoType } from "./AuthProvider";
export function UserProfile() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <>
      {user ? (
        <Button size="icon" className="bg-red-500 rounded-full ">
          {user?.image ? (
            <User color="white" size={20} />
          ) : (
            <img src={user?.image} />
          )}
        </Button>
      ) : (
        <Button
          onClick={() => {
            router.push("/user");
            }}
            variant={"outline"}
        >
          Log In
        </Button>
      )}
    </>
  );
}
