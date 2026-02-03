"use client";
import { FormField } from "@/components/ui/form";
import { StaffAuthContext, useStaffAuth } from "@/context/StaffContext";
import { Input } from "@/components/ui/input";
import { Form } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Stafflogin from "./login";
import { Settings } from "lucide-react";
import { BadgeQuestionMark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/app/_components/Logo";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Staffregister from "./register";

export default function StaffAuthPage() {
  const { staff } = useStaffAuth();
  const [fresh, setFresh] = useState(false);
  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <div className="w-full h-20 bg-zinc-800 flex p-4 justify-between items-center">
          <Logo />
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size={"icon"}
                  className="scale-120 rounded-full bg-zinc-800"
                >
                  <BadgeQuestionMark color="white" className="scale-120" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Help</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size={"icon"}
                  className="scale-120 rounded-full bg-zinc-800"
                >
                  <Settings color="white" className="scale-120" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {fresh ? (
                  <DropdownMenuItem
                    onClick={() => {
                      setFresh(false);
                    }}
                  >
                    Log In
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => {
                      setFresh(true);
                    }}
                  >
                    Register fresh employee
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="w-screen h-full max-w-360 max-h-full p-10 bg-white flex flex-col justify-center items-center">
          {fresh ? (
            <>
              {" "}
              <Staffregister />
            </>
          ) : (
            <>
              {" "}
              <div className=" flex flex-col gap-20 items-center">
                {" "}
                <h1 className="text-xl font-bold flex flex-col ">
                  Log in with your StaffID to access to inventory.
                </h1>
                <Stafflogin />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
