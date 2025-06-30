'use client';

import React, { useContext, useEffect } from 'react';
import Category from './Category';
import { CategoryType } from '@/types';
import { CategoryContext } from '@/context/CategoryContext';

const Categories = ({ categories }: { categories: CategoryType[] }) => {
  const { changeCategory } = useContext(CategoryContext);

  // // useEffect after page render, useLayoutEffect before page render
  // useLayoutEffect(() => {
  //   changeCategory(categories[0]?.Title);
  // }, []);
  useEffect(() => {
    if (categories.length > 0) {
      changeCategory('All');
    }
  }, [categories]);

  return (
    <div className="flex gap-6 mb-8">
      <button
        onClick={() => changeCategory('All')}
        className="cursor-pointer"
      >
        All
      </button>
      {categories.map((category) => (
        <div key={category.id}>
          <Category cat={category} />
        </div>
      ))}
    </div>
  );
};

export default Categories;
