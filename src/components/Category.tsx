"use client";

import { CategoryType } from "@/types";
import React from "react";

const Category = ({ cat }: { cat: CategoryType }) => {
  return (
    <div
      onClick={() => { }}
      className="bg-amber-300 p-4 rounded-lg shadow-md cursor-pointer"
    >
      {cat?.Title}
    </div>
  )
}

export default Category;