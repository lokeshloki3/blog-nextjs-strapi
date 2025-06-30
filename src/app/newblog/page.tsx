'use client';

import { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !image) {
      setMessage('Please fill all fields');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('files.img', image);
      formData.append('data[Title]', title);
      formData.append(
        'data[Description]',
        JSON.stringify([
          {
            type: 'paragraph',
            children: [{ type: 'text', text: description }],
          },
        ])
      );

      const res = await fetch('http://127.0.0.1:1337/api/blogs', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('Blog created successfully!');
        setTitle('');
        setDescription('');
        setImage(null);
      } else {
        console.error(result);
        setMessage('Error creating blog');
      }
    } catch (error) {
      console.error(error);
      setMessage('Server error');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          rows={4}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
};

export default Page;
