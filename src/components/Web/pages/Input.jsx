import React from 'react'

export default function Input({ input, index, errors, onChange, touched ,onBlur }) {
    const { type = "text", id, name, placeholder, value } = input

    return (
            <div className="form-group mb-4" key={index}>
                <label className='text-capitalize' htmlFor='id'>{id}</label>
                <input className="form-control"
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    autoComplete="true"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}/>
                {touched[name] && errors[name] && <p className="rounded-1 bg-danger mt-2 text-white py-1 px-2 text-small">{errors[name]}</p>}
            </div>
    )
}
