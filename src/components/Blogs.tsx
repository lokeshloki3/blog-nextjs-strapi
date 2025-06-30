'use client';

import React, { useContext } from 'react';
import BlogCard from './BlogCard';
import { BlogType } from '@/types';
import { CategoryContext } from '@/context/CategoryContext';

const Blogs = ({ blogs }: { blogs: BlogType[] }) => {
  const { category } = useContext(CategoryContext);

  const filteredBlogs = category === 'All'
    ? blogs
    : blogs.filter((blog) =>
      blog.categories?.some((cat: any) => cat.Title === category)
    );

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {filteredBlogs?.map((blog) => (
        <div key={blog.id}>
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  );
};

export default Blogs;
