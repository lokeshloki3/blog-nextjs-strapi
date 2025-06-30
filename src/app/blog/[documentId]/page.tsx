import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const fetchBlogs = async (documentId: string) => {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(`http://127.0.0.1:1337/api/blogs/${documentId}?populate=*`, options);
    const response = await res.json();
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Page = async ({ params }: { params: { documentId: string } }) => {
  const blog = await fetchBlogs(params.documentId);
  if (!blog) return <div>Blog not found</div>;

  const description = blog.Description?.[0]?.children?.[0]?.text || '';
  const imgUrl = blog.img?.url ? `http://127.0.0.1:1337${blog.img.url}` : '';

  return (
    <div className='max-w-3xl mx-auto p-4'>
      <Link href="/">{"< Back"}</Link>

      <div className='relative w-full h-96 overflow-hidden rounded-lg mt-5'>
        {imgUrl && (
          <Image
            src={imgUrl}
            alt={blog.img?.name || blog.Title}
            layout='fill'
            objectFit='cover'
          />
        )}
      </div>

      <div className='mt-4'>
        <h1 className='text-3xl font-semibold'>{blog.Title}</h1>
        <p className='text-gray-600 mt-2'>{description}</p>
        <div className='text-gray-400 mt-3 flex items-center'>
          <span className='text-sm'>
            Published on {new Date(blog.publishedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
