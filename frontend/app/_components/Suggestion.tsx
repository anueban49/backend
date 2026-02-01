"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const Suggestion = () => {
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="scale-120 aspect-square rounded-full absolute right-4 bottom-4 bg-white flex items-center justify-center "
        >
          <Plus color="red" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          Please register or log in first to place order
        </DialogTitle>
        <Button
          className="bg-red-400"
          onClick={() => {
            router.push("/auth");
          }}
        >
          Log In / Register
        </Button>
      </DialogContent>
    </Dialog>
  );
};
