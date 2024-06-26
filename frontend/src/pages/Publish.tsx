import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmitPost = async () => {
    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
        title,
        content,
    },{
        headers:{
            Authorization: localStorage.getItem("token")
        }
    })

    navigate(`/blog/${response.data.id}`)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={handleInputChange}
      />

      <TextEditor
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />

      <button className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" onClick={handleSubmitPost}> Publish Post</button>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4 ">
        <div className="flex items-center justify-between border">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              //   onChange={onChange}
              id="editor"
              rows={8}
              className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
              placeholder="Write an article..."
              required
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
