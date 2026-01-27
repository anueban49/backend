"use client";
import { useEffect } from "react";
import { DisplayShelf } from "../_components/DisplayShelf";
import { useIMcrud } from "../../context/SSR-inventoryContext";
export function LandingPage() {
  const { fetchAllCategories, categories } = useIMcrud();
  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <>
      {categories.slice(0, 5).map((category) => (
        <DisplayShelf key={category._id} name={category.name} _id={category._id}></DisplayShelf>
      ))}
    </>
  );
}
