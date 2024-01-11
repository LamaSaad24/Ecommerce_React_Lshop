import React, { useContext } from 'react'
import Input from '../pages/Input'
import { useFormik } from 'formik'
import { loginSchema } from '../../Validation/validate'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/User'

export default function Login() {

    const {setUserToken} = useContext(UserContext)
    
    const initialValues = {
        email: '', password: ''
    }

    const navigate = useNavigate()


    const onSubmit = async user => {
        try{
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}auth/signin`, user)
            if (data.message == "success") {
                navigate('/')
                localStorage.setItem("token",data.token)
                setUserToken(data.token)
                toast.success('Login successful', {
                    position: "top-left",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(data.message, {
                    position: "top-left",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }catch(e){
            toast.error(e.response.data.message, {
                position: "top-left",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }


    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        // validate,
        validationSchema: loginSchema
    })


    const Inputs = [
        {
            type: 'email',
            id: 'email',
            name: 'email',
            placeholder: "Enter Your Email",
            value: formik.values.email
        },
        {
            type: 'password',
            id: 'password',
            name: 'password',
            placeholder: "Enter Your Password",
            value: formik.values.password
        }
    ]

    const renderInputs = Inputs.map((input, index) =>
        <Input
            key={index}
            input={input}
            errors={formik.errors}
            value={formik.values.password}
            onChange={input.onChange || formik.handleChange}
            touched={formik.touched}
            onBlur={formik.handleBlur}
        />
    )

    return (
        <>
            <div className="container mt-4">
                <h1 className='text-center'>Sign in</h1>
                <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                    {renderInputs}
                    <div className="card-footer px-0  bg-transparent">
                        <button disabled={!formik.isValid} type='submit' className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">Login</button>
                    </div>
                </form>
                <Link to="/forgetPassword" className='text-primary text-decoration-underline d-block text-center'>forget password</Link>
            </div>
        </>
    )
}
