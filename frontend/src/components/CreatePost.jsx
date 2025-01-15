import React, { useEffect, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai'; // Importing the upload icon
import { toast } from 'react-toastify';
import { readFileAsDataURL } from '../lib/utils';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '../redux/postSlice';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';


const CreatePost = () => {

    const navigate = useNavigate()
    const { user } = useSelector((store) => store.user);
useEffect(() => {
    if (user === null) {
      navigate("/login")
    }
  }, [])

    const [loading, setLoading] = useState(true)
    const [imagePreview, setImagePreview] = useState();
    const [description, setDescription] = useState('');
    const [file, setFile] = useState("")

    // Handle image file input
    const fileHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file)
            const dataUri = await readFileAsDataURL(file)
            setImagePreview(dataUri)
        }
    };


    const submitHandler = async () => {
        const formData = new FormData()
        formData.append("description", description)
        if (imagePreview) formData.append("image", file)
        try {
            setLoading(true)
            const res = await axios.post("http://localhost:2000/api/post/create", formData, {
                headers: {
                    'Content-Type': 'multipart/formdata'
                },
                withCredentials: true
            })
            console.log(res);

            getAllPosts()
            navigate("/")
            console.log("correct");

            if (res.ok) {
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)

        } finally {
            setLoading(false)
        }


    }

    return (
        <div className="max-w-3xl bg-white shadow-xl mx-auto p-3 mt-14 animate-fade-in-up">
            <div className="w-full">
                <h1 className="text-4xl mb-4 animate-slide-in-up">Create Post</h1>
                <div>
                    <div className="mb-4 animate-slide-in-up">
                        <label className="block text-lg font-medium">Description*</label>
                        <textarea
                            className="w-full h-32 border border-gray-300 rounded-md outline-purple-500 p-3 transition-all duration-300 ease-in-out hover:border-purple-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write your post description here..."
                        ></textarea>
                    </div>

                    {/* Custom file input with icon */}
                    <div className="mb-4 animate-slide-in-up">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={fileHandler}
                            id="fileInput"
                            className="hidden"
                        />
                        <label htmlFor="fileInput" className="cursor-pointer flex items-center justify-center border border-gray-300 rounded-md p-2 bg-gray-100 hover:bg-gray-200 transition-all duration-200 ease-in-out">
                            <AiOutlineUpload size={24} className="mr-2" />
                            <span>Upload Image</span>
                        </label>
                    </div>

                    {/* Image Preview */}
                    <div className="mb-4 animate-slide-in-up">
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Post Preview"
                                className="rounded-md shadow-lg w-full max-h-96 object-cover transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105"
                            />
                        )}

                    </div>

                    {/* Post button */}
                    <div className="text-center animate-slide-in-up w-full">
                        {
                            loading ? (
                                <button
                                    type="submit"
                                    onClick={submitHandler}
                                    className="bg-purple-500 p-3 rounded-md text-white hover:bg-purple-600 hover:shadow-lg transition duration-200 ease-in-out"
                                >
                                    <span>  PostImage...  </span> <span><Loader2 className='mr-2 h-4 w-4 animate-spin' /></span>
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    onClick={submitHandler}
                                    className="bg-purple-500 p-3 rounded-md text-white hover:bg-purple-600 hover:shadow-lg transition duration-200 ease-in-out"
                                >
                                    <span>  PostImage </span>
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
