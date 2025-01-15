import React, { useEffect } from 'react';
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { Link, useNavigate, useParams } from 'react-router-dom';
import useGetMyProfile from '../hooks/useGetMyProfile';
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { VscAdd } from "react-icons/vsc";
import useGetMyPost from '../hooks/useGetMyPost';

const Profile = () => {
    const navigate = useNavigate();
    const { user, profile } = useSelector(store => store.user);
    const { myPost } = useSelector(store => store.post);


    useEffect(() => {
        if (user === null) {
            navigate("/login")
        }
    }, [])


    const { id } = useParams();

    console.log(profile);
    console.log(user);

    if (user === null) {
        navigate("/login")
    }

    useGetMyPost(id);
    useGetMyProfile(id);

    return (
        <div className="w-full overflow-x-hidden flex flex-col gap-7"> {/* Fix overflow here */}
            {/* Profile Section */}
            <div className="border border-red-700 w-full p-4">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div>
                        <img
                            src={profile?.user?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s"}
                            alt="Profile"
                            className="rounded-full h-32 w-32 object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <p className="text-xl">
                            <strong>Username:</strong> <span>{profile?.user?.username}</span>
                        </p>
                        <p className="text-lg">
                            <strong>Name:</strong> <span>@{`${profile?.user?.name}`}</span>
                        </p>
                        <p className="mt-4">
                            <strong>Description:</strong> <span>{profile?.user?.description}</span>
                        </p>
                    </div>
                    {/* Edit Profile Button */}
                    {
                        user?._id === profile?.user?._id ? (
                            <div>
                                <Link
                                    to={`/profile/${id}/edit`}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    Edit Profile
                                </Link>
                            </div>
                        ) : (
                            <Link
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                follow
                            </Link>
                        )
                    }
                </div>
            </div>

            <div className='flex justify-between items-center'>
                <h1 className="text-5xl">Posts</h1>
                {
                    user?._id === profile?.user?._id && (
                        <Link to={`/profile/${id}/create`} className='mr-3 cursor-pointer'><VscAdd size={25} /></Link>
                    )
                }
            </div>

            {/* Posts Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {
                    myPost?.posts?.map((post, index) => (
                        <div key={index} className="border border-red-700 rounded-lg overflow-hidden">
                            <div className="flex items-center p-2 justify-between">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={post?.image}
                                        alt="Post Profile"
                                        className="w-12 h-12 rounded-full cursor-pointer object-cover"
                                    />
                                    <p
                                        className="text-2xl font-extralight cursor-pointer"
                                    >
                                        {post?.user?.username}
                                    </p>
                                </div>
                                <div>
                                    {
                                        user?._id === profile?.user?._id && (
                                            <MdDelete size={'25'} className='cursor-pointer' />
                                        )
                                    }
                                </div>
                            </div>
                            <div>
                                <img
                                    src={post.image}
                                    alt="Post"
                                    className="w-full h-96 object-cover"
                                />
                            </div>
                            <div className="flex justify-around p-4">
                                <div className="text-lg"><FaRegHeart size={23} /></div>
                                <div><FaRegComment size={23} /></div>
                                <div><CiBookmark size={23} /></div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Profile;
