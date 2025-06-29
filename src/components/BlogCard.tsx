import { BlogType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogCard = ({ blog }: { blog: BlogType }) => {
  const description = blog.Description?.[0]?.children?.[0]?.text ?? "No description available";
  const TuncateBlogDesc = description.length > 80 ? description.substring(0, 80) + "..." : description;

  const imgUrl = "http://127.0.0.1:1337" + blog.img.url;
  return (
    <div className='rounded-lg shadow-md p-4 mb-4 overflow-hidden border border-b-gray-600 cursor-pointer'>
      <Link href={`/blog/${blog.id}`}>
        <div className='relative w-full h-1' style={{ paddingBottom: "100%" }}>
          <Image
            src={imgUrl}
            alt={blog.img.name || blog.Title}
            fill
            className='rounded-t-lg object-cover'
          />
        </div>
        <div className='p-2'>
          <h2 className='text-xl font-semibold mb-2 overflow-ellipsis'>
            {blog.Title}
          </h2>
          <p className='text-gray-600'>{TuncateBlogDesc}</p>
        </div>
      </Link>
    </div>
  )
}

export default BlogCard