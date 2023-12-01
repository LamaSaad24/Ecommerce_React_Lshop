const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const passwordPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

export  const  validate = (values) => {
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