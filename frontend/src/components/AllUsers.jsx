import React, { useEffect } from 'react';
import useGetAllUser from '../hooks/useGetAllUser';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';


const AllUsers = () => {
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const { user } = useSelector((store) => store.user);

    useEffect(() => {
        if (id !== user?._id) {
            navigate("/login")
        }
    }, [])

    useGetAllUser();
    const { allUsers } = useSelector((store) => store.user);


    return (
        <div className="flex flex-wrap gap-3 items-center justify-center">
            {

                allUsers?.map((user) => (
                    <div
                        className="flex items-center justify-between w-64 bg-white shadow-2xl border border-orange-400 p-3 mt-5"
                        key={user?._id}
                    >
                        {/* Profile Picture */}

                        <div>
                            <img
                                src={
                                    user?.profilePicture ||
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s'
                                }
                                alt="Profile"
                                className="rounded-full w-14 h-14 object-cover"
                            />
                        </div>
                        {/* User Info */}
                        <div>
                            <Link to={`/profile/${user?._id}`} className="font-bold text-md">
                                {user?.username?.length > 6
                                    ? `${user?.username.slice(0, 6)}...`
                                    : user?.username}
                            </Link>
                            <p className="font-extralight text-sm">
                                {user?.name?.length > 8
                                    ? `${user?.name.slice(0, 8)}...`
                                    : user?.name}
                            </p>
                        </div>
                        <div>
                            <button className='bg-blue-500 p-2 rounded-md px-3'>View</button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default AllUsers;
