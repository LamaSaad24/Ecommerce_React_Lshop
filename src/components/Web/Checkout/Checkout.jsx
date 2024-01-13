import React from 'react'

export default function Checkout() {
    return (
        <>
            <div className="container-fluid pt-5" >
                <div className="row px-xl-5" >
                    <div className="col-lg-8" >
                        <div className="mb-4" >
                            <h4 className="font-weight-semi-bold mb-4" >Billing Address</h4>
                            <div className="row" >
                                <div className="col-md-6 form-group" >
                                    <label>Mobile No</label>
                                    <input class="form-control" type="text" placeHolder="+123 456 789" />
                                </div>
                                <div className="col-md-6 form-group" >
                                    <label>Address</label>
                                    <input class="form-control" type="text" placeHolder="123 Street" />
                                </div>
                                <div className="col-md-6 form-group" >
                                    <label>Coupon Name</label>
                                    <input class="form-control" type="text" placeHolder="coupon name" />
                                </div>
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
                                <div className="d-flex justify-content-between" >
                                    <p>Colorful Stylish Shirt 1</p>
                                    <p>$150</p>
                                </div>
                                <div className="d-flex justify-content-between" >
                                    <p>Colorful Stylish Shirt 2</p>
                                    <p>$150</p>
                                </div>
                                <div className="d-flex justify-content-between" >
                                    <p>Colorful Stylish Shirt 3</p>
                                    <p>$150</p>
                                </div>
                                <hr className="mt-0" />
                                    <div className="d-flex justify-content-between mb-3 pt-1" >
                                        <h6 className="font-weight-medium" >Subtotal</h6>
                                        <h6 className="font-weight-medium" >$150</h6>
                                    </div>
                                    <div className="d-flex justify-content-between" >
                                        <h6 className="font-weight-medium" >Shipping</h6>
                                        <h6 className="font-weight-medium" >$10</h6>
                                    </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent" >
                                <div className="d-flex justify-content-between mt-2" >
                                    <h5 className="font-weight-bold" >Total</h5>
                                    <h5 className="font-weight-bold" >$160</h5>
                                </div>
                            </div>
                        </div>
                        <div className="card border-secondary mb-5" >
                            <div className="card-header bg-secondary border-0" >
                                <h4 className="font-weight-semi-bold m-0" >Payment</h4>
                            </div>
                            <div className="card-body" >
                                <div className="form-group" >
                                    <div className="custom-control custom-radio" >
                                        <input type="radio" class="custom-control-input" name="payment" id="paypal" />
                                            <label class="custom-control-label" htmlFor="paypal" >Paypal</label>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <div className="custom-control custom-radio" >
                                        <input type="radio" class="custom-control-input" name="payment" id="directcheck" />
                                            <label class="custom-control-label" htmlFor="directcheck" >Direct Check</label>
                                    </div>
                                </div>
                                <div className="" >
                                    <div className="custom-control custom-radio" >
                                        <input type="radio" class="custom-control-input" name="payment" id="banktransfer" />
                                            <label class="custom-control-label" htmlFor="banktransfer" >Bank Transfer</label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent" >
                                <button className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" >Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
