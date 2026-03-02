import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StaffAuthProvider } from "@/context/StaffContext";
import { CrudProvider } from "@/context/SSR-inventoryContext";
import { OrderProvider } from "../_components/OrderContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NomNom Swift Delivery",
  description: "",
};
//webpage -> relative to the viewport/device width; container/elements -> relative to the body; fonts-> relative to the container
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StaffAuthProvider>
      <OrderProvider>
        <CrudProvider>{children}</CrudProvider>
      </OrderProvider>
    </StaffAuthProvider>
  );
}
