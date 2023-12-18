import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Categories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    const getcategories = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}categories`)
            setCategories(data.categories)
        } catch (error) {
            console.log("categories api", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(
        () => { getcategories() }
        , [])

    return (
        <>
            <div className="col-lg-3 d-none d-lg-block">
                <a className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-bs-toggle="collapse"
                    href="#navbar-vertical" style={{ height: 65, marginTop: '-1px', padding: '0 30px' }}>
                    <h6 className="m-0">Categories</h6>
                    <i className="fa fa-angle-down text-dark" />
                </a>
                {loading ? <p className='pt-2'>loading...</p> :
                    <nav className="collapse show  navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
                        <div className="navbar-nav w-100 overflow-hidden" style={{ maxHeight: 410 }}>
                            {categories?.map((category) => {
                                return (
                                    <div key={category._id} className="nav-item dropdown">
                                        <a href="#" className="nav-link" data-bs-toggle="dropdown">
                                            {category.name} <img className='float-left' src={category.image.secure_url} alt={category.slug} width="20px" />
                                            {category.subcategory.length ? <i className="fa fa-angle-down float-right mt-1" /> : <></>}</a>
                                        <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                            {category.subcategory?.map((subcategory) => {
                                                return <a key={subcategory._id} href="#" className="dropdown-item">{subcategory.name}</a>
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </nav>
                }
            </div>
        </>
    )
}