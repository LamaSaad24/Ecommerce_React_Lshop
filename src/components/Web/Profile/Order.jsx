import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/User'
import { Link } from 'react-router-dom'

export default function Order() {

    const { getOrderContext } = useContext(UserContext)

    const [orders, setOrder] = useState(null)


    const getOrder = async () => {
        const res = await getOrderContext()
        setOrder(res.orders)
    }

    useEffect(() => {
        getOrder()
    }, [])

    return (
        <div>Order
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
                    {!orders?"is loading.." : orders.map((order, i) =>
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
    )
}
