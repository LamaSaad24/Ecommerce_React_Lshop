import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Auth() {

    const navigate = useNavigate();

    if(localStorage.getItem("token")){
        // return <Navigate to='/'/>
        return navigate(-1)
    }else{
        return <Navigate to='/login'/>
    }
    
}
