"use client";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
export function UserProfile() {

  return (
    <>
      <Button size="icon" className="bg-red-500 rounded-full " >
        <User color="white" size={20}/>
      </Button>

    </>
  );
}
