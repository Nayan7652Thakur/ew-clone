import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../redux/userSlice'

const useGetAllUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getAllUser = async () => {
            try {
                const res = await fetch("http://localhost:2000/api/user/users", {
                    method: "GET",
                    credentials: 'include'
                })
                const data = await res.json()

                if (res.ok) {
  dispatch(getAllUsers(data))
                }

            } catch (error) {
                console.log(error);

            }
        }
        getAllUser()
    }, [])
}

export default useGetAllUser
