import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/User'

export default function Contact() {

    const { getUserContext } = useContext(UserContext)

    const [user, setUser] = useState(null)


    const getUser = async () => {
        const res = await getUserContext()
        setUser(res.user)
    }



    useEffect(() => {
        getUser()
    }, [])
    return (
        <div>Contact <h3>{!user?"is loading ... " : user.email}</h3></div>
    )
}
