"use client";
import Navbar from "@/components/Navbar";
import { Client, Databases, ID, Query } from "appwrite";
import { useEffect, useState } from "react";

const BlogPost = ({ params }) => {
  const { slug } = params;
  const [blog, setBlog] = useState();

  useEffect(() => {
    const client = new Client();
    const databases = new Databases(client);

    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

    const promise = databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      [Query.equal("slug", slug)]
    );
    promise.then(
      function (response) {
        setBlog(response.documents[0]);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-3xl mx-auto py-8 px-4">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl mb-4 font-semibold text-gray-800">
              {blog?.title}
            </h2>
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: blog?.bloghtml }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
