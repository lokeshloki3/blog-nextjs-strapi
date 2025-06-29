import React from 'react'
import BlogCard from './BlogCard'
import { BlogType } from '@/types'

const Blogs = ({ blogs }: { blogs: BlogType[] }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {blogs?.map((blog) => (
        <div key={blog.id}>
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  )
}

export default Blogs