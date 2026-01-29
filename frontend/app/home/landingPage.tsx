"use client";
import { useEffect } from "react";
import { DisplayShelf } from "../_components/DisplayShelf";
import { CategoryType, useIMcrud } from "../../context/SSR-inventoryContext";
import { useState } from "react";
export function LandingPage() {
  const [DisplayCategories, setDisplayCategories] = useState<CategoryType[]>(
    [],
  );
  const { category, fetchCategoryByID } = useIMcrud();
  //it doesn't have to fetchg all the categories, only intended few.
  const CategoryIDs = [
    "695d23820826dae39194f056",
    "696f0b1b81d87f6363a001d3",
    "695d23940826dae39194f058",
  ]; //fetch items belonging to this category first.

  return (
    <>
      <DisplayShelf _id="695d23820826dae39194f056" name="Appetizers" />
      <DisplayShelf _id="696f0b1b81d87f6363a001d3" name="Lunch Favorites" />
      <DisplayShelf _id="695d23940826dae39194f058" name="Salads" />
    </>
  );
}
