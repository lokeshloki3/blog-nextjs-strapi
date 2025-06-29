import Blogs from "@/components/Blogs";
import Categories from "@/components/Categories";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Categories />
      <Blogs />
    </div>
  );
}
