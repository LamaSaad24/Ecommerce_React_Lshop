import React from 'react'
import Input from '../pages/Input'
import { useFormik } from 'formik'
import { loginSchema } from '../../Validation/validate'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Login({saveCurrentUser}) {


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
                saveCurrentUser()
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
                    <div className="card-footer border-secondary bg-transparent">
                        <button disabled={!formik.isValid} type='submit' className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}
