"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LandingPage } from "./home/landingPage";
import { useState } from "react";
import BaseStructure from "./_components/BaseStructure";
//this will be landing page.
//authprovider has already been put in layout.
// it has to reroute to login/signup page only when customer wants to place an order, othertimes it has to normally dipslay the homepage
export default function HomePage() {
  const [existingUser, setExistingUser] = useState(false);
  const router = useRouter();
  return (
    <>
      <BaseStructure>
        <LandingPage></LandingPage>
      </BaseStructure>
    </>
  );
}
