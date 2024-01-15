import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../../../Shared/PageHeader'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import ReactImageMagnify from 'react-image-magnify'
import { CartContext } from '../Context/Cart'
import { toast } from 'react-toastify'

export default function ProductDetails() {

    const [qty, setQty] = useState(1)

    const { id, name } = useParams()

    const getProductDetails = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}products/${id}`)
        return data?.product;
    }

    const { data, isLoading } = useQuery(`products.${name}`, getProductDetails)

    const { addToCartContext } = useContext(CartContext)

    const getProductsByCategories = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}products/category/${data?.categoryId}`)
        return data.products;
    }

    const addToCart = async (productID) => {
        const res = await addToCartContext(productID)
        if (res.message == "success") {
            toast.success(res.message, {
                position: "top-left",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error(res?.type=="login"?"you must login":res.response.data.message, {
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

    const products = []

    return (
        <>
            <PageHeader name={name} title={"product"} />
            {isLoading ? "isLoading...." :
                <>
                    <div className="container-fluid py-5">
                        <div className="row px-xl-5">
                            <div className="col-lg-5 pb-5">
                                <div id="product-carousel" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner border">
                                        {data?.subImages.map((img, i) => {
                                            return (
                                                <div className={`carousel-item ${i == 0 ? "active" : ''}`} key={img.public_id}>
                                                    <ReactImageMagnify {...{
                                                        smallImage: {
                                                            alt: img.secure_url,
                                                            src: img.secure_url,
                                                            width: 600,
                                                            height: 600,
                                                        },
                                                        largeImage: {
                                                            src: img.secure_url,
                                                            width: 1200,
                                                            height: 1200,
                                                        },
                                                        isHintEnabled: true,
                                                        hintTextMouse: "over mouse",
                                                        enlargedImagePosition:'over'
                                                    }} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <a className="carousel-control-prev" href="#product-carousel" data-bs-slide="prev">
                                        <i className="fa fa-2x fa-angle-left text-dark"></i>
                                    </a>
                                    <a className="carousel-control-next" href="#product-carousel" data-bs-slide="next">
                                        <i className="fa fa-2x fa-angle-right text-dark"></i>
                                    </a>
                                </div>
                            </div>

                            <div className="col-lg-7 pb-5">
                                <h3 className="font-weight-semi-bold">{data?.name}</h3>
                                <div className="d-flex mb-3">
                                    <div className="text-primary mr-2">
                                        <small className="fas fa-star"></small>
                                        <small className="fas fa-star"></small>
                                        <small className="fas fa-star"></small>
                                        <small className="fas fa-star-half-alt"></small>
                                        <small className="far fa-star"></small>
                                    </div>
                                    <small className="pt-1">({data?.reviews.length} Reviews)</small>
                                </div>
                                <h3 className="font-weight-semi-bold mb-4">${data?.finalPrice}</h3>
                                <p className="mb-4">{data?.description}</p>
                                <div className="d-flex mb-3">
                                    <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
                                    <form>
                                        {data?.sizes.map(size => {
                                            return (
                                                <div className="custom-control custom-radio custom-control-inline" key={size}>
                                                    <input type="radio" className="custom-control-input" id="size-1" name="size" />
                                                    <label className="custom-control-label" htmlFor="size-1">{size}</label>
                                                </div>
                                            )
                                        })}
                                    </form>
                                </div>
                                <div className="d-flex mb-4">
                                    <p className="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
                                    <form>
                                        {data?.colors.map(color => {
                                            return (
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" className="custom-control-input" id="color-1" name="color" />
                                                    <label className="custom-control-label" htmlFor="color-1">{color}</label>
                                                </div>
                                            )
                                        })}
                                    </form>
                                </div>
                                <div className="d-flex align-items-center mb-4 pt-2">
                                    <div className="input-group quantity mr-3" style={{ width: "130px" }}>
                                        <div className="input-group-btn">
                                            <button className="btn btn-primary btn-minus" onClick={()=>setQty(qty-1)} 
                                            disabled={qty==0?true:false}>
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text" className="form-control bg-secondary text-center" disabled  value={qty} />
                                        <div className="input-group-btn">
                                            <button className="btn btn-primary btn-plus"
                                            onClick={()=>setQty(qty+1)}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary px-3" onClick={() => addToCart(data?._id)}><i className="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
                                </div>
                                <div className="d-flex pt-2">
                                    <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                                    <div className="d-inline-flex">
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-pinterest"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row px-xl-5">
                            <div className="col">
                                <div className="nav nav-tabs justify-content-center border-secondary mb-4">
                                    <a className="nav-item nav-link active" data-bs-toggle="tab" href="#tab-pane-1">Description</a>
                                    <a className="nav-item nav-link" data-bs-toggle="tab" href="#tab-pane-2">Information</a>
                                    <a className="nav-item nav-link" data-bs-toggle="tab" href="#tab-pane-3">Reviews ({data?.reviews.length})</a>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="tab-pane-1">
                                        <h4 className="mb-3">Product Description</h4>
                                        <p>{data?.description}</p>
                                    </div>
                                    <div className="tab-pane fade" id="tab-pane-2">
                                        <h4 className="mb-3">Additional Information</h4>
                                        <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item px-0">
                                                        Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item px-0">
                                                        Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tab-pane-3">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h4 className="mb-4">{data?.reviews.length} review  "Colorful Stylish Shirt"</h4>
                                                {data?.reviews.map(review => {
                                                    return (
                                                        <div className="media mb-4" key={review._id}>
                                                            <img src={review.createdBy.image.secure_url} alt={review.createdBy.image.secure_url} className="img-fluid mr-3 mt-1" style={{ width: "45px" }} />
                                                            <div className="media-body">
                                                                <h6>{review.createdBy.userName}<small> - <i>{review.createdBy.createdAt}</i></small></h6>
                                                                <div className="text-primary mb-2">
                                                                    {/* {review.rating.map(() => {
                                                                        return (
                                                                            <>
                                                                                <i className="fas fa-star"></i>
                                                                                <i className="fas fa-star-half-alt"></i>
                                                                            </>

                                                                        )
                                                                    })} */}
                                                                </div>
                                                                <p>{review.comment}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="col-md-6">
                                                <h4 className="mb-4">Leave a review</h4>
                                                <small>Your email address will not be published. Required fields are marked *</small>
                                                <div className="d-flex my-3">
                                                    <p className="mb-0 mr-2">Your Rating * :</p>
                                                    <div className="text-primary">
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                    </div>
                                                </div>
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="message">Your Review *</label>
                                                        <textarea id="message" cols="30" rows="5" className="form-control"></textarea>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="name">Your Name *</label>
                                                        <input type="text" className="form-control" id="name" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Your Email *</label>
                                                        <input type="email" className="form-control" id="email" />
                                                    </div>
                                                    <div className="form-group mb-0">
                                                        <input type="submit" value="Leave Your Review" className="btn btn-primary px-3" />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid py-5">
                        <div className="text-center mb-4">
                            <h2 className="section-title px-5"><span className="px-2">You May Also Like</span></h2>
                        </div>
                        <div className="row px-xl-5">
                            <div className="col">
                                <Swiper
                                    // install Swiper modules
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    spaceBetween={50}
                                    slidesPerView={3}
                                    navigation
                                    pagination={{ clickable: true }}
                                    scrollbar={{ draggable: true }}
                                    onSlideChange={() => console.log('slide change')}
                                >
                                    {products?.data?.map(product => {
                                        return (
                                            <SwiperSlide>
                                                <div className="card product-item border-0">
                                                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                                        <img className="img-fluid w-100" src={product.mainImage.secure_url} alt={product.mainImage.secure_url} />
                                                    </div>
                                                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                                        <h6 className="text-truncate mb-3">{product.name}</h6>
                                                        <div className="d-flex justify-content-center">
                                                            <h6>${product.finalPrice}</h6><h6 className="text-muted ml-2"><del>${product.price}</del></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>

                                        )
                                    })}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
