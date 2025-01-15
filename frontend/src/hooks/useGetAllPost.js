import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../redux/postSlice';
import { useNavigate } from 'react-router-dom';

const useGetAllPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        const getAllPost = async () => {
            try {
                const res = await fetch("https://ew-clone.onrender.com/api/post/getallpost", {
                    method: "GET",
                    credentials: 'include', // Include cookies for authentication
                });

                const data = await res.json(); // Await the JSON response
                console.log(data);

                if (data.message == 'user not authenticated') {
                    navigate("/login")
                }

                if (res.ok) {
                    dispatch(getAllPosts(data)); // Dispatch the action to Redux
                    console.log("Data fetched successfully", data);
                } else {
                    console.log("Failed to fetch data:", data);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        getAllPost();
    }, [dispatch]); // Add 'dispatch' as a dependency
};

export default useGetAllPost;
