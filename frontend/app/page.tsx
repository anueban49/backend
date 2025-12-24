"use client";
import BaseStructucture from "../app/_components/BaseSctructure";
import { PromoBanner } from "./_components/PromoBanner";
import { DisplayShelf } from "./_components/DisplayShelf";
export default function HomePage() {
  return (
    <BaseStructucture>
      <div>this a test</div>
      <DisplayShelf></DisplayShelf>
      <DisplayShelf></DisplayShelf>
    </BaseStructucture>
  );
}
