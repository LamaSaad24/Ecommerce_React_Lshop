import React from 'react'
import Input from '../pages/Input'
import { useFormik } from 'formik'
// import { validate } from '../../Validation/validate'
import { userSchema } from '../../Validation/validate'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Register() {


    const initialValues = {
        userName: '', email: '', password: '', image: ''
    }

    const handleImage = (event) => {
        formik.setFieldValue('image',event.target.files[0])
    }

    const onSubmit = async user => {
        
        const formData = new FormData()
        formData.append("userName",user.userName)
        formData.append("email",user.email)
        formData.append("password",user.password)
        formData.append("image",user.image)

            const {data} = await axios.post("https://ecommerce-node4.vercel.app/auth/signup",formData)

            if(data.message=="success"){
                formik.resetForm()
                toast.success('account created succefuly please confirm', {
                    position: "top-left",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }else{
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
        

    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        // validate,
        validationSchema: userSchema
    })


    const Inputs = [
        {
            type: 'text',
            id: 'name',
            name: 'userName',
            placeholder: "Enter Your Name",
            value: formik.values.userName
        },
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
            type: 'file',
            id: 'image',
            name: 'image',
            onChange:handleImage
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
                <h1 className='text-center'>Create An New Account</h1>
                <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                    {renderInputs}
                    <div className="card-footer border-secondary bg-transparent">
                        <button disabled={!formik.isValid} type='submit' className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}
