'use client';

import { BlogType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useBlogContext } from '@/context/BlogContext';
import React from 'react';

const BlogCard = ({ blog }: { blog: BlogType }) => {
  const description = blog.Description?.[0]?.children?.[0]?.text || '';
  const truncatedDescription =
    description.length > 80 ? description.substring(0, 80) + '...' : description;
  const imgUrl = 'http://127.0.0.1:1337' + blog.img.url;

  const { removeBlog } = useBlogContext();

  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete "${blog.Title}"?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`http://127.0.0.1:1337/api/blogs/${blog.documentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete blog');

      removeBlog(blog.id);
    } catch (err) {
      console.error(err);
      alert('Error deleting blog');
    }
  };

  return (
    <div className='rounded-lg shadow-md p-4 mb-4 overflow-hidden border border-b-gray-600'>
      <Link href={`/blog/${blog.documentId}`}>
        <div className='relative w-full h-1' style={{ paddingBottom: '100%' }}>
          <Image
            src={imgUrl}
            alt={blog.img.name || blog.Title}
            fill
            className='rounded-t-lg object-cover'
          />
        </div>
        <div className='p-2'>
          <h2 className='text-xl font-semibold mb-2'>{blog.Title}</h2>
        </div>
      </Link>
      <p className='text-gray-600'>{truncatedDescription}</p>
      <div className='flex justify-end'>
        <button
          onClick={handleDelete}
          className='mt-2 px-4 py-1 bg-amber-800 text-white rounded cursor-pointer'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;


// 'use client';

// import { BlogType } from '@/types'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// const BlogCard = ({ blog }: { blog: BlogType }) => {
//   const description = blog.Description?.[0]?.children?.[0]?.text;
//   const TruncateBlogDesc = description.length > 80 ? description.substring(0, 80) + "..." : description;

//   const imgUrl = "http://127.0.0.1:1337" + blog.img.url;

//   const handleDelete = async () => {
//     const confirmed = confirm(`Are you sure you want to delete "${blog.Title}"?`);
//     if (!confirmed) return;

//     try {
//       const res = await fetch(`http://127.0.0.1:1337/api/blogs/${blog.documentId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
//         },
//       });

//       if (!res.ok) {
//         throw new Error('Failed to delete blog');
//       }

//       // Reload or re-fetch
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//       alert('Error deleting blog');
//     }
//   };

//   return (
//     <div className='rounded-lg shadow-md p-4 mb-4 overflow-hidden border border-b-gray-600'>
//       <Link href={`/blog/${blog.documentId}`}>
//         <div className='relative w-full h-1' style={{ paddingBottom: "100%" }}>
//           <Image
//             src={imgUrl}
//             alt={blog.img.name || blog.Title}
//             fill
//             className='rounded-t-lg object-cover'
//           />
//         </div>
//         <div className='p-2'>
//           <h2 className='text-xl font-semibold mb-2 overflow-ellipsis'>
//             {blog.Title}
//           </h2>
//         </div>
//       </Link>
//       <p className='text-gray-600'>{TruncateBlogDesc}</p>

//       <div className='flex justify-end'>
//         <button
//           onClick={handleDelete}
//           className="mt-2 px-4 py-1 bg-amber-400 text-white rounded"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BlogCard;
