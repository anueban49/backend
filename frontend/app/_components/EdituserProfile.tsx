//this component has to update the user profile.
"use client";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";

import { useAuth } from "./AuthProvider";
export function EditUserProfile() {
  const { user } = useAuth();
  return (
    <DialogContent>
      <DialogTitle>Hello, {user?.username}</DialogTitle>
    </DialogContent>
  );
}
