import React from 'react'
import Navbar from '../components/Web/Navbar/Navbar'
import Footer from '../components/Web/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layouts() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}
