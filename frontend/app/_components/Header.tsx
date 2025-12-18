"use client";

import { Logo } from "./Logo";
export function Header() {
  return (
    <div className="w-screen h-[3em] bg-gray-900">
      <Logo/>
      <DeliveryAddress />
      <Cart />
      <UserProfile />
    </div>
  );
}
