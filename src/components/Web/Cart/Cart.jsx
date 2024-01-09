import React, { useContext } from 'react'
import { CartContext } from '../Context/Cart'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { ConfirmToast } from 'react-confirm-toast'

export default function Cart() {

    const { total, getCartContext, removeFromCartContext, clearCartContext } = useContext(CartContext)

    const getCart = async () => {
        const res = await getCartContext()
        return res
    }

    const removeFromCart = async (productId) => {
        event.target.closest('tr').style.display = "none"
        const res = await removeFromCartContext(productId)
        if (res.message == "success") {
            toast.success("Deleted successfuly", {
                position: "top-left",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error(res.response.data.message, {
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

    const clearCart = async () => {
        const res = await clearCartContext()
        document.getElementById("items").style.display = "none"
        if (res.message == "success") {
            toast.success("Deleted successfuly", {
                position: "top-left",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error(res.response.data.message, {
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

    const { isLoading, data } = useQuery("cart", getCart)



    return (
        <div className="container-fluid pt-5">
            <div className="row px-xl-5">
                <div className="col-lg-8 table-responsive mb-5">
                    {isLoading ? <p>Cart is empty</p> :
                        (<table className="table table-bordered text-center mb-0">
                            <thead className="bg-secondary text-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle" id="items">
                                {data?.products?.map(product =>
                                    <tr key={product._id}>
                                        <td className="align-middle"><img src={product.details.mainImage.secure_url} alt="" style={{ "width": "100px", "height": "100px" }} /> {product.details.name}</td>
                                        <td className="align-middle">${product.details.price}</td>
                                        <td className="align-middle">
                                            <div className="input-group quantity mx-auto" style={{ "width": "100px" }}>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-minus" >
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input type="text" className="form-control form-control-sm bg-secondary text-center" value={product.quantity} />
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-plus">
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">${product.quantity * product.details.price}</td>
                                        <td className="align-middle">
                                            <ConfirmToast
                                                asModal={true}
                                                childrenClassName=''
                                                customCancel='Cancel'
                                                customConfirm='Delete'
                                                customFunction={() => { removeFromCart(product._id) }}
                                                message='Do you want to delete item?'
                                                position='top-right'
                                                showCloseIcon={true}
                                                theme='light'
                                            >
                                                <button className="btn btn-sm btn-primary"><i className="fa fa-times"></i></button>
                                            </ConfirmToast>
                                        </td>

                                    </tr>
                                )}
                            </tbody>
                        </table>)
                    }
                </div>
                <div className="col-lg-4">
                    <form className="mb-5" action="">
                        <div className="input-group">
                            <input type="text" className="form-control p-4" placeholder="Coupon Code" />
                            <div className="input-group-append">
                                <button className="btn btn-primary">Apply Coupon</button>
                            </div>
                        </div>
                    </form>
                    <div className="card border-secondary mb-5">
                        <div className="card-header bg-secondary border-0">
                            <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3 pt-1">
                                <h6 className="font-weight-medium">Subtotal</h6>
                                <h6 className="font-weight-medium">${total}</h6>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6 className="font-weight-medium">Shipping</h6>
                                <h6 className="font-weight-medium">$0</h6>
                            </div>
                        </div>
                        <div className="card-footer border-secondary bg-transparent">
                            <div className="d-flex justify-content-between mt-2">
                                <h5 className="font-weight-bold">Total</h5>
                                <h5 className="font-weight-bold">${total}</h5>
                            </div>
                            <button className="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</button>
                        </div>
                    </div>
                    <ConfirmToast
                        asModal={true}
                        childrenClassName=''
                        customConfirm='Clear All'
                        customCancel='Cancel'
                        customFunction={() => { clearCart() }}
                        message='Do you want to delete all?'
                        position='top-right'
                        showCloseIcon={true}
                        theme='light'
                    >
                        <button className="btn btn-block py-3 btn-primary">Clear Cart</button>
                    </ConfirmToast>
                </div>
            </div>
        </div>
    )
}
