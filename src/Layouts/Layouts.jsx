import React from 'react'
import Navbar from '../components/Web/Navbar/Navbar'
import Footer from '../components/Web/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layouts({user,setUser}) {
    return (
        <>
            <Navbar user={user} setUser />
            <Outlet />
            <Footer />
        </>
    )
}
