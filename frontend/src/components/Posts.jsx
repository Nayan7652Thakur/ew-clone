import React, { useEffect } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Posts = () => {

    const { user } = useSelector(store => store.user)


    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            navigate("/login")
        }
    }, [])

    const { allPost } = useSelector(store => store.post)
    const posts = allPost.posts
    console.log(posts);


    return (
        <div className='max-w-xs mx-auto items-center justify-center'>
            <div className='flex flex-col gap-6'>
                {
                    posts?.map((post) => (
                        <div className='flex flex-col gap-4 border border-red-700 p-2 ' key={post?._id}>
                            <div className='flex ml-3 gap-6 items-center mt-3'>
                                <div>
                                    <img
                                        src={post?.user?.profilePicture || 'https://steamuserimages-a.akamaihd.net/ugc/1698408203615263339/2FD09AE171B2A3EA60D89DC46CC9E08E683CD381/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'}
                                        alt="Profile"
                                        onClick={() => navigate('/profile')}
                                        className="w-12 h-12 rounded-full cursor-pointer object-cover"
                                    />
                                </div>
                                <div >
                                    <Link className='text-xl cursor-pointer' to={`/profile/${post?.user?._id}`}>{post?.user?.username}</Link>
                                    <p className='text-sm'>{post?.user?.name}</p>
                                </div>
                            </div>
                            <div>
                                <img src={post?.image} alt=""
                                    className='w-screen h-96 object-cover'
                                />
                            </div>
                            <div className='flex justify-around mb-3'>
                                <div className='text-lg'><FaRegHeart size={23} /></div>
                                <div><FaRegComment size={23} /></div>
                                <div>
                                    <CiBookmark size={23} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Posts
