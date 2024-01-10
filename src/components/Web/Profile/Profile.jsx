import React, { useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../Context/Profile'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Profile() {
    const { getUserContext, getOrderContext } = useContext(ProfileContext)
    const [user, setUser] = useState(null)
    const [orders, setOrder] = useState(null)

    const getUser = async () => {
        const res = await getUserContext()
        setUser(res.user)
    }

    const getOrder = async () => {
        const res = await getOrderContext()
        setOrder(res.orders)
    }

    useEffect(() => {
        getUser()
        getOrder()
    }, [])


    return (
        <>
            <div className="container-fluid pt-2">
                {!user ? "is loading ....." :
                    <div className="row px-xl-5">
                        <div className="col-lg-3 col-md-12 py-3 bg-secondary text-center">
                            <div className="d-block mb-2">
                                <img src={user?.image.secure_url}
                                    className='rounded-circle'
                                    style={{ width: '100px', height: '100px' }}
                                    alt={user?.image.public_id}
                                />
                            </div>
                            <h3>{user?.userName}</h3>
                            <nav className='mt-2'>
                                <div className="nav nav-tabs flex-column" id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                                        Home
                                    </button>
                                    <button className="nav-link" id="nav-order-tab" data-bs-toggle="tab" data-bs-target="#nav-order" type="button" role="tab" aria-controls="nav-order" aria-selected="false">
                                        Order
                                    </button>
                                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                                        Contact
                                    </button>
                                </div>
                            </nav>
                        </div>
                        <div className="col-lg-9 col-md-12">
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                                    ..
                                </div>
                                <div className="tab-pane fade" id="nav-order" role="tabpanel" aria-labelledby="nav-order-tab" tabIndex="0">
                                    <table className="table table-bordered text-center mb-0">
                                        <thead className="bg-secondary text-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>address</th>
                                                <th>coupone Name</th>
                                                <th>total</th>
                                                <th>payment type</th>
                                                <th>phone number</th>
                                                <th>status</th>
                                                <th>products</th>
                                            </tr>
                                        </thead>
                                        <tbody className="align-middle" >
                                            {/* {orders&& <tr><td colSpan={5}>orders art is empty</td></tr>} */}
                                            {orders?.map((order, i) =>
                                                <tr key={order._id}>
                                                    <td className="align-middle">
                                                        {i + 1}
                                                    </td>
                                                    <td className="align-middle">
                                                        {order.address}
                                                    </td>
                                                    <td className="align-middle">
                                                        {order.couponName}
                                                    </td>
                                                    <td className="align-middle">
                                                        {order.finalPrice}
                                                    </td>
                                                    <td className="align-middle">
                                                        {order.paymentType}
                                                    </td>
                                                    <td className="align-middle">
                                                        {order.phoneNumber}
                                                    </td>
                                                    <td className="align-middle">
                                                        {order.status}
                                                    </td>
                                                    <td className="align-middle">
                                                        {order.products.map(prod =>
                                                            <td>
                                                                <Link to={`/product/${prod.productId.name}/${prod.productId._id}`}>
                                                                    <img
                                                                        src={prod.productId.mainImage.secure_url}
                                                                        alt={prod.productId.mainImage.secure_url}
                                                                        style={{ width: "20px" }} />
                                                                </Link>
                                                            </td>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">.
                                    <h3>{user?.email}</h3>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>
        </>
    )
}
