import React from 'react'
import Input from '../pages/Input'
import { useFormik } from 'formik'
import { forgetPasswordSchema } from '../../Validation/validate'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassowrd() {


    const initialValues = {
        email: ''
    }

    const navigate = useNavigate()


    const onSubmit = async user => {
        try {
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}auth/sendcode`, user)
            if (data.message == "success") {
                navigate('/restPassword')
                toast.success('send code successful', {
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
        } catch (e) {
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
        validationSchema: forgetPasswordSchema
    })


    const Inputs = [
        {
            type: 'email',
            id: 'email',
            name: 'email',
            placeholder: "Enter Your Email",
            value: formik.values.email
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
                <h1 className='text-center'>forget password</h1>
                <form onSubmit={formik.handleSubmit}>
                    {renderInputs}
                    <div className="card-footer px-0 border-secondary bg-transparent">
                        <button disabled={!formik.isValid} type='submit' className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">SendCode</button>
                    </div>
                </form>
            </div>
        </>
    )
}
