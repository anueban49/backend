"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => { router.push('/home') }}>Food Delivery Site</Button>
    </>
  );
}
