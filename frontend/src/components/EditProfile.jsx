import React, { useState } from "react";
import { readFileAsDataURL } from "../lib/utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const { profile } = useSelector((store) => store.user);

  const [input, setInput] = useState({
    username: "",
    name: "",
    description: "",
  });
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const fileChangeHandler = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      await readFileAsDataURL(selectedFile); // Handle the dataUri if needed
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    // Trim the value before updating the state
    const trimmedValue = value.trimStart(); // Allow trailing spaces

    if (name === "description" && trimmedValue.length > 30) return; // Enforce limit on description

    setInput({ ...input, [name]: trimmedValue });
  };

  const submitHandler = async () => {
    // Trim all inputs before submitting
    const trimmedInput = {
      username: input.username.trim(),
      name: input.name.trim(),
      description: input.description.trim(),
    };

    const formData = new FormData();
    formData.append("username", trimmedInput.username);
    formData.append("name", trimmedInput.name);
    formData.append("description", trimmedInput.description);
    if (file) {
      formData.append("profilePicture", file);
    }

    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:2000/api/user/profile/${user?._id}/edit`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        navigate(`/profile/${user?._id}`);
        toast.success(data.message || "Profile updated successfully!");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen mx-auto shadow-2xl">
      <div className="shadow-md p-7 max-w-2xl w-full flex flex-col gap-6">
        <div className="mx-auto">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : profile?.user?.profilePicture ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border border-gray-400"
          />
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={fileChangeHandler}
            className="mt-2"
          />
        </div>
        <div className="flex flex-col gap-4">
          <input
            onChange={changeHandler}
            name="username"
            value={input.username}
            type="text"
            placeholder="You can change your username here..."
            className="p-2 rounded-md border-b border-gray-500 outline-red-400"
          />
          <input
            onChange={changeHandler}
            name="name"
            value={input.name}
            type="text"
            placeholder="You can change your name here..."
            className="p-3 rounded-md border-b border-gray-500 outline-red-400"
          />
          <div>
            <textarea
              onChange={changeHandler}
              name="description"
              value={input.description}
              maxLength={30} // Enforce character limit
              className="w-full p-3 rounded-md border-b border-gray-500 outline-red-400"
              placeholder="You can add your bio here..."
            />
            <p className="text-sm text-gray-500">
              {input.description.length}/30 characters
            </p>
          </div>
          <button
            onClick={submitHandler}
            className="p-3 bg-purple-400 rounded-lg shadow-md border-2 border-pink-300 hover:bg-pink-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
