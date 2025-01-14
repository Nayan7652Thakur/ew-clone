import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getMyProfile } from '../redux/userSlice'

const useGetMyProfile = (id) => {
const dispatch = useDispatch()
    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const res = await fetch(`http://localhost:2000/api/user/profile/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                },)
                const data = await res.json()
                   dispatch(getMyProfile(data))
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchMyProfile()
    }, [id, dispatch])
}

export default useGetMyProfile
