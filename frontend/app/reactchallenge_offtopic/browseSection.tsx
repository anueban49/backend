"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductType } from "../staff_nomnom/page";
import { useState, useEffect } from "react";

const products = require("./mockapi.json");

export const BrowseSection = () => {
  const [baraa, setBaraa] = useState<ProductType[]>([]);
  setBaraa(products);
  return (
    <div className="w-full grid-cols-4">
      {products.map((baraa) => {
        <Card>
          <CardTitle>
            {baraa.name}
          </CardTitle>
          <CardContent>{baraa.price}</CardContent>
          <CardDescription>{baraa.description}</CardDescription>
        </Card>;
      })}
    </div>
  );
};
