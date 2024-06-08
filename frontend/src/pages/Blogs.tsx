import React from "react";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Appbar } from "../components/Appbar";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
        <Appbar/>
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => {
            return (
              <BlogCard
                id={blog.id}
                title={blog.title}
                content={blog.content}
                authorName={blog.author.name || "Anonymus"}
                publishedDate={"2nd Feb 2024"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
