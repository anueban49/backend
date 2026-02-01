"use client";
import { LandingPage } from "./home/landingPage";
import BaseStructure from "./_components/BaseStructure";

export default function HomePage() {
  return (
    <>
      <div className="w-screen absolute">
        <BaseStructure>
          <LandingPage></LandingPage>
        </BaseStructure>
      </div>
    </>
  );
}
