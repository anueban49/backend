"use client";
import { LandingPage } from "./home/landingPage";
import BaseStructure from "./_components/BaseStructure";

export default function HomePage() {
  return (
    <>
      <div className="w-screen flex flex-col items-center">
        <div className="max-w-560 flex flex-col ">
        <BaseStructure>
          <LandingPage></LandingPage>
        </BaseStructure></div>
      </div>
    </>
  );
}
