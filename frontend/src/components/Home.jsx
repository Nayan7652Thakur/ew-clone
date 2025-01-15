import { Link, useNavigate } from 'react-router-dom';
import Posts from './Posts';
import { useDispatch, useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { VscAdd } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { getUser } from '../redux/userSlice';
import useGetAllPost from '../hooks/useGetAllPost';
import { useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdLocalLibrary } from "react-icons/md";
import { RiShareCircleFill } from "react-icons/ri";

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.user);
  console.log(user);


  useEffect(() => {
    if (user === null) {
      navigate("/login")
    }
  }, [])

  useGetAllPost()


  const { allPost } = useSelector(store => store.post);



  const logout = async () => {
    try {
      const res = await fetch('https://ew-clone.onrender.com/api/user/logout', { method: 'GET' });
      // Your dispatch and navigation logic here
      dispatch(getUser(null));
      // dispatch(getOtherUsers(null));
      // dispatch(getMyProfile(null));
      navigate('/login');
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="relative min-h-screen">
        {/* Profile Section (Fixed on the right) */}
        <div className="hidden  lg:block absolute top-5 right-5 bg-white border border-lime-500 shadow-lg p-4 w-60 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <div>
              <img
                src="https://steamuserimages-a.akamaihd.net/ugc/1698408203615263339/2FD09AE171B2A3EA60D89DC46CC9E08E683CD381/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
                alt="Profile"
                className="w-12 h-12 rounded-full border border-red-600"
              />
            </div>
            <div>
              <p className='font-bold'>{user?.username}</p>
              <p className='text-sm text-gray-700'>{user?.name}</p>
            </div>
          </div>
          <div className='mt-2'>
            <Link
              to={`/profile/${user?._id}`}
              className="bg-orange-500 rounded-md border border-lime-600 p-2 text-center w-full block flex items-center justify-center"
            >
              <CgProfile size={20} className='mr-2' />  About Me
            </Link>

            <Link
              className="flex items-center justify-center bg-green-700 mt-2 text-white rounded-md border border-lime-600 p-2 text-center w-full block cursor-pointer"
              to={`/${user?._id}/users`}
            >
              <span><RiShareCircleFill size={20} className='mr-2' /></span>  AllUsers
            </Link>

            <Link
              className="flex items-center justify-center bg-red-700 mt-2 text-white rounded-md border border-lime-600 p-2 text-center w-full block cursor-pointer"
              onClick={logout}
            >
              <span><CiLogout size={20} className='mr-2' /></span>  Logout
            </Link>

          </div>
        </div>

        {/* Posts Section (Centered) */}
        <div className="flex justify-center items-center min-h-screen mt-10">
          <div className="w-full max-w-4xl">
            <Posts />
          </div>
        </div>
      </div>
      <div className='lg:hidden text-2xl absolute sticky bottom-0  text-center bg-gray-500'>
        <p className='flex items-center justify-center gap-11 text-yellow-300 p-2'>
          <Link to={`/profile/${user?._id}`}>
            <CgProfile />
          </Link>
          <Link to={`/profile/${user?._id}/create`}>
            <VscAdd />
          </Link>
          <Link to={`/profile/${user?._id}/edit`}>
            <FaRegEdit />
          </Link>
          <Link to={`/users`}>
            <MdLocalLibrary />
          </Link>
        </p>
      </div>
    </>
  );
};

export default Home;
