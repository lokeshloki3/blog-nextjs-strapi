import React from "react";
import Category from "./Category";
import { CategoryType } from "@/types";

const Categories = ({ categories }: { categories: CategoryType[] }) => {
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