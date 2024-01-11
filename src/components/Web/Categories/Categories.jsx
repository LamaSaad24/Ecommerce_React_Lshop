import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function Categories() {

    const getCategories = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}categories`)
        return data;
    }

    const { data, isLoading } = useQuery("categories", getCategories)






    return (
        <>
            <div className="col-lg-3 d-none d-lg-block">
                <div className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-bs-toggle="collapse"
                    href="#navbar-vertical" style={{ height: 65, marginTop: '-1px', padding: '0 30px' }}>
                    <h6 className="m-0">Categories</h6>
                    <i className="fa fa-angle-down text-dark" />
                </div>
                {isLoading ? <p className='pt-2'>loading...</p> :
                    <nav className="collapse show  navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
                        <div className="navbar-nav w-100 overflow-hidden" style={{ maxHeight: 410 }}>
                            {data.categories?.map((category) => {
                                return (
                                    <Link to={`/products/${category.slug}/${category._id}`} key={category._id} className="nav-item dropdown">
                                        <div className="nav-link" data-bs-toggle="dropdown-">
                                            {category.name}
                                            <img className='float-left' src={category.image.secure_url} alt={category.slug} width="20px" />
                                            {category.subcategory.length ? <i className="fa fa-angle-down float-right mt-1" /> : <></>}
                                        </div>
                                        <div className="dropdown-menu hide position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                            {category.subcategory?.map((subcategory) => {
                                                return <p key={subcategory._id} href="#" className="dropdown-item">{subcategory.name}</p>
                                            })}
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </nav>
                }
            </div >
        </>
    )
}
