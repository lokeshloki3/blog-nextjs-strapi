import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='max-w-3xl mx-auto p-4'>
      <Link href="/">{"< Back"}</Link>
      <div className='relative w-full h-96 overflow-hidden rounded-lg mt-5'>
        <Image
          src={""}
          alt={""}
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='mt-4'>
        <h1 className='text-3xl font-semibold'>
          {"This is title of blog"}
        </h1>
        <p className='text-gray-600 mt-2'>{"This is the description"}</p>
        <div className='text-gray-400 mt-3 flex items-center'>
          <span className='text-sm'>Published on {"23-23-2222"}</span>
        </div>
      </div>
    </div>
  )
}

export default page