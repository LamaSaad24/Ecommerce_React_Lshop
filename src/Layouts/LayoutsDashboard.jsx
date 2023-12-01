import React from 'react'
import NavbarDashboard from '../components/Dashboard/Navbar/Navbar'
import FooterDashboard from '../components/Dashboard/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function LayoutsDashboard() {
    return (
        <>
            <NavbarDashboard />
            <Outlet />
            <FooterDashboard />
        </>
    )
}
