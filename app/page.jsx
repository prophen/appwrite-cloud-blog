"use client";
import Navbar from "@/components/Navbar";
import { Client, Databases, ID } from "appwrite";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const client = new Client();
  const databases = new Databases(client);
  const [blogs, setBlogs] = useState([]);

  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  useEffect(() => {
    const databases = new Databases(client);

    const promise = databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      []
    );

    promise.then(
      function (response) {
        setBlogs(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);
  function removeHtmlTags(html) {
    return html.replace(/<[^>]*>/g, "");
  }
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-3xl mx-auto py-8 px-4">
          {blogs.map((blog) => (
            <div
              key={blog.slug}
              className="bg-white shadow-md rounded-lg p-6 mb-6"
            >
              <Link href={`/blogpost/${blog.slug}`}>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {blog.title}
                </h2>
              </Link>
              <p className="text-gray-600">{blog.date}</p>
              <p className="mt-4 text-gray-700">
                {removeHtmlTags(blog.bloghtml).substring(0, 100)}...
              </p>
              <Link href={`/blogpost/${blog.slug}`}>
                <button className="text-blue-500 hover:underline focus:outline-none">
                  Read more
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
