import * as yup from 'yup'

export const userSchema = yup.object({
    userName: yup.string().required("field is required").min(4,"name must be at least 3 character").max(30,"name must be at max 30 charcter"),
    email : yup.string().required('field is required').email("email not valid"),
    password : yup.string().required('field is required'),  
    image: yup.string().required('field is required'),
})


export const loginSchema = yup.object({
    email : yup.string().required('field is required').email("email not valid"),
    password : yup.string().required('field is required'),  
})

export const forgetPasswordSchema = yup.object({
    email : yup.string().required('field is required').email("email not valid"),
})

export const resetPasswordSchema = yup.object({
    email : yup.string().required('field is required').email("email not valid"),
    password : yup.string().required('field is required'),  
    code: yup.string().length(4,"must exactly 4").required("field is required")
})

export const orderSchema = yup.object({
    address : yup.string().required("address is required"),
    phone : yup.string().required("phone is required"),
    couponName : yup.string().required("couponeName is required"),
})


// const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
// const passwordPattern = /^[A-Za-z0-9]{8,30}$/i

// export  const  validate = (values) => {
//     const errors = {}
//     if !valu .userName) errors.userName = "name is required"
//     else if (values.userName.length < 4) errors.userName = "name must be at lest 4 character"

//     if (!values.email) errors.email = "email is required"
//     else if (!emailPattern.test(values.email)) {
//         errors.email = 'Invalid email address';
//     }
//     if (!values.password) errors.password = "password is required"
//     else if (values.userName.length < 8) errors.userName = "password must be at lest 6 character"
//     else if (!passwordPattern.test(values.password)) {
//         errors.password = ' password must contain capital,small,number';
//     }

//     if (!values.image) errors.image = "image is required"

//     return errors;
// }