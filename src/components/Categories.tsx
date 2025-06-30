"use client";

import React, { useContext, useLayoutEffect } from "react";
import Category from "./Category";
import { CategoryType } from "@/types";
import { CategoryContext } from "@/context/CategoryContext";

const Categories = ({ categories }: { categories: CategoryType[] }) => {
  const { changeCategory } = useContext(CategoryContext);

  // useEffect after page render, useLayoutEffect before page render
  useLayoutEffect(() => {
    changeCategory(categories[0]?.Title);
  }, []);

  return (
    <div className="flex gap-6 mb-8">
      {categories?.map((category) => (
        <div key={category.id}>
          <Category cat={category} />
        </div>
      ))}
    </div>
  )
}

export default Categories;