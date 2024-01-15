import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from '../Context/User'

export default function Profile() {
    const { getUserContext} = useContext(UserContext)
    const [user, setUser] = useState(null)

    const getUser = async () => {
        const res = await getUserContext()
        setUser(res.user)
    }



    useEffect(() => {
        getUser()
    }, [])


    return (
        <>
            <div className="container-fluid pt-2">
                {!user ? "is loading ....." :
                    <div className="row px-xl-5">
                        <div className="col-lg-3 col-md-12 py-3 bg-secondary text-center">
                            <div className="d-block mb-2">
                                <img src={user?.image.secure_url}
                                    className='rounded-circle'
                                    style={{ width: '100px', height: '100px' }}
                                    alt={user?.image.public_id}
                                />
                            </div>
                            <h3>{user?.userName}</h3>
                            <nav className='mt-2'>
                                <div className="nav nav-tabs flex-column">
                                    <Link to="" className="nav-link">Home</Link>
                                    <Link to="orders" className="nav-link">Order</Link>
                                    <Link to="contact" className="nav-link">Contact</Link>
                                </div>
                            </nav>
                        </div>
                        <div className="col-lg-9 col-md-12">
                            <Outlet/>
                        </div>

                    </div>
                }
            </div>
        </>
    )
}
