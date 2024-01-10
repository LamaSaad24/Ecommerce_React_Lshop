import React from 'react'
import Input from '../pages/Input'
import { useFormik } from 'formik'
import { resetPasswordSchema } from '../../Validation/validate'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

export default function ResetPassword({saveCurrentUser}) {


    const initialValues = {
        email: '', password: '',code:''
    }

    const navigate = useNavigate()


    const onSubmit = async user => {
        try{
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}auth/forgotPassword`, user)
            if (data.message == "success") {
                navigate('/login')
                toast.success('update password successful', {
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
        validationSchema: resetPasswordSchema
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
        },
        {
            type: 'code',
            id: 'code',
            name: 'code',
            placeholder: "Enter Your code",
            value: formik.values.code
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
                <h1 className='text-center'>Reset Password</h1>
                <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                    {renderInputs}
                    <div className="card-footer px-0  bg-transparent">
                        <button disabled={!formik.isValid} type='submit' className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">reset</button>
                    </div>
                </form>
            </div>
        </>
    )
}
