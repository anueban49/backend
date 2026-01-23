"use client";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { AuthProvider, useAuth } from "./AuthProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function UserProfile() {
  const { user, login, signup, logout } = useAuth();
  const [existingUser, setExistingUser] = useState(false);

  const router = useRouter();
  return (
    <>
      {existingUser ? (
        <Button size="icon" className="bg-red-500 rounded-full ">
          <User color="white" size={20} />
        </Button>
      ) : (
        <Button
          onClick={() => {
            router.push("/user");
          }}
        >
          Sign Up
        </Button>
      )}
    </>
  );
}
