"use client";
import { Button } from "@/components/ui/button";
import { AddNewCategory } from "../categories/AddNewCategory";
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";
export function Settings() {
  return (
    <>
      <div className="w-full h-fit p-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button>Add new Category</Button>
          </PopoverTrigger>
          <PopoverContent>
            <AddNewCategory></AddNewCategory>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
