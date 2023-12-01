import React from 'react'
import Input from '../pages/Input'
import { useFormik } from 'formik'

export default function Register() {

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    const passwordPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    const validate = (values) => {
        const errors = {}
        if (!values.userName) errors.userName = "name is required"
        else if (values.userName.length < 4) errors.userName = "name must be at lest 4 character"

        if (!values.email) errors.email = "email is required"
        else if (!emailPattern.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) errors.password = "password is required"
        else if (values.userName.length < 8) errors.userName = "password must be at lest 6 character"
        else if (!passwordPattern.test(values.password)) {
            errors.password = ' password must contain capital,small,number';
        }

        if (!values.image) errors.image = "image is required"

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            userName: '', email: '', password: '', image: ""
        },
        onSubmit: values => { console.log(values) },
        validate,
    })

    const Inputs = [
        {
            type: 'text',
            id: 'name',
            name: 'userName',
            placeholder: "Enter Your Name",
            value: formik.values.userName,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur(e)
        },
        {
            type: 'email',
            id: 'email',
            name: 'email',
            placeholder: "Enter Your Email",
            value: formik.values.email,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur
        },
        {
            type: 'password',
            id: 'password',
            name: 'password',
            placeholder: "Enter Your Password",
            value: formik.values.password,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur
        },
        {
            type: 'file',
            id: 'image',
            name: 'image',
            placeholder: "Enter Your Image",
            value: formik.values.image,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur
        }
    ]

    const renderInputs = Inputs.map((input, index) => <Input key={index} input={input} errors={formik.errors} />)
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
