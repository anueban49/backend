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
  useEffect(() => {
    let selected = [];
    const fetchSelected = async () => {
      for (const id of CategoryIDs) {
        const data = await fetchCategoryByID(id);
        if (data) {
          selected.push(data);
        }
      }
      setDisplayCategories(selected);
    };
    fetchSelected();
  }, []);

  return (
    <>
      {DisplayCategories.map((item) => (
        <DisplayShelf
          key={item._id}
          name={item.name}
          _id={item._id}
        ></DisplayShelf>
      ))}
    </>
  );
}
