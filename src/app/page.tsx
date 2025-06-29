import Blogs from "@/components/Blogs";
import Categories from "@/components/Categories";
import { BlogType, CategoryType } from "@/types";

const fetchCategories = async (): Promise<CategoryType[]> => {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    },
  };

  try {
    const res = await fetch("http://127.0.0.1:1337/api/categories", options);
    const response = await res.json();
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const fetchBlogs = async (): Promise<BlogType[]> => {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    },
  };

  try {
    const res = await fetch("http://127.0.0.1:1337/api/blogs?populate=*", options);
    const response = await res.json();
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Home() {
  const categories = await fetchCategories();
  const blogs = await fetchBlogs();
  return (
    <div>
      <Categories categories={categories} />
      <Blogs blogs={blogs} />
    </div>
  );
}
