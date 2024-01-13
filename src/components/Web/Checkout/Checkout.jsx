import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/Cart'
import { useFormik } from 'formik'
import Input from '../pages/Input'
import { orderSchema } from '../../Validation/validate'

export default function Checkout() {

    const { getCartContext, total } = useContext(CartContext)
    const [products, setProducts] = useState([])

    const getCart = async () => {
        const res = await getCartContext()
        setProducts(res.products)
    }

    useEffect(() => {
        getCart()
    }, [])

    const initialValues = { couponName: "", address: "", phone: "" }

    const onSubmit = (order)=>{
        console.log(order)
    }

    const formik = useFormik({ initialValues,onSubmit, validationSchema: orderSchema })
    const inputs = [
        {
            id: "address",
            name: "address",
            placeHolder: "enter your address",
            type: "text",
            value: formik.values.address
        },
        {
            id: "phone",
            name: "phone",
            placeHolder: "enter your phone",
            type: "text",
            value: formik.values.phone
        },
        {
            id: "couponName",
            name: "couponName",
            placeHolder: "enter your couponName",
            type: "text",
            value: formik.values.couponName
        }
    ]

    const renderInputs = inputs.map((input, index) =>
        <Input
            key={index}
            input={input}
            errors={formik.errors}
            onChange={input.onChange || formik.handleChange}
            touched={formik.touched}
            onBlur={formik.handleBlur}
        />
    )


    return (
        <>
            <div className="container-fluid pt-5" >
                <div className="row px-xl-5" >
                    <div className="col-lg-8" >
                        <div className="mb-4" >
                            <h4 className="font-weight-semi-bold mb-4" >Billing Address</h4>
                            <div className="row" >
                                <form onSubmit={formik.handleSubmit}>
                                    {renderInputs}
                                    <div className="border-secondary bg-transparent" >
                                        <button type='submit' className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" >Place Order</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4" >
                        <div className="card border-secondary mb-5" >
                            <div className="card-header bg-secondary border-0" >
                                <h4 className="font-weight-semi-bold m-0" >Order Total</h4>
                            </div>
                            <div className="card-body" >
                                <h5 className="font-weight-medium mb-3" >Products</h5>
                                {products ?
                                    products.map(prod => (
                                        <div className="d-flex justify-content-between" >
                                            <p>{prod.details.name}  {prod.quantity}x</p>
                                            <p>${prod.details.finalPrice}</p>
                                        </div>
                                    ))
                                    : "isLoading ..."}
                                <hr className="mt-0" />
                                <div className="d-flex justify-content-between mb-3 pt-1" >
                                    <h6 className="font-weight-medium" >Subtotal</h6>
                                    <h6 className="font-weight-medium" >${total}</h6>
                                </div>
                                <div className="d-flex justify-content-between" >
                                    <h6 className="font-weight-medium" >Shipping</h6>
                                    <h6 className="font-weight-medium" >$0</h6>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent" >
                                <div className="d-flex justify-content-between mt-2" >
                                    <h5 className="font-weight-bold" >Total</h5>
                                    <h5 className="font-weight-bold" >${total}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
