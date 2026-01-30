//this component has to update the user profile.
"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthProvider";
export function EditUserProfile() {
  const { user } = useAuth();
  return (
    <DialogContent>
      <DialogTitle>Hello, {user?.username}</DialogTitle>
    </DialogContent>
  );
}
