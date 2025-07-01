'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { BlogType } from '@/types';

type BlogContextType = {
  blogs: BlogType[];
  setBlogs: (blogs: BlogType[]) => void;
  fetchBlogs: () => Promise<void>;
  removeBlog: (id: number) => void;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('http://127.0.0.1:1337/api/blogs?populate=*', {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      });
      const data = await res.json();
      setBlogs(data.data);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  const removeBlog = (id: number) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, fetchBlogs, removeBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};
