import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getMyPost } from '../redux/postSlice'

const useGetMyPost = (id) => {
const dispatch = useDispatch()
    useEffect(() => {
        const myPost = async () => {
            try {
                const res = await fetch(`http://localhost:2000/api/post/getmypost/${id}`, {
                    method: "GET",
                    credentials: 'include'
                })


                const data = await res.json()
                
                if (res.ok) {
                 dispatch(getMyPost(data))   
                }

            } catch (error) {
                console.log(error);

            }
        }
        myPost()
    }, [id])

}

export default useGetMyPost
