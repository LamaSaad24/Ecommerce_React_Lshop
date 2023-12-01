import React from 'react'
import Input from '../pages/Input'
import { useFormik } from 'formik'
import { validate } from '../../Validation/validate'

export default function Register() {


    const initialValues = {
        userName: '', email: '', password: '', image: ""
    }

    const onSubmit = values => { console.log(values) }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    })

    const Inputs = [
        {
            type: 'text',
            id: 'name',
            name: 'userName',
            placeholder: "Enter Your Name",
        },
        {
            type: 'email',
            id: 'email',
            name: 'email',
            placeholder: "Enter Your Email",
        },
        {
            type: 'password',
            id: 'password',
            name: 'password',
            placeholder: "Enter Your Password",
        },
        {
            type: 'file',
            id: 'image',
            name: 'image',
            placeholder: "Enter Your Image",
        }
    ]

    const renderInputs = Inputs.map((input, index) =>
        <Input
            key={index}
            input={input}
            errors={formik.errors}
            value={formik.values.password}
            onChange={formik.handleChange}
            touched={formik.touched}
        />
    )

    return (
        <>
            <div className="container mt-4">
                <h1 className='text-center'>Create An New Account</h1>
                <form onSubmit={formik.handleSubmit}>
                    {renderInputs}
                    <div className="card-footer border-secondary bg-transparent">
                        <button type='submit' className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}
