import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.init';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const callName = async () => {
            const getReview = await getDocs(collection(db, "Review"))
            const dt = []
            getReview.docs.forEach((item) => {
                dt.push(item.data())
            })
            console.log(dt)
            setReviews(dt);
        }
        callName();
    }, [])

    return (
        <div className='w-4/5 lg:w-4/6 mx-auto my-12 lg:my-16 text-center'>
            <h1 className='text-secondary text-xl md:text-3xl'>Ratings and Reviews</h1>
            <h2 className='text-lg font-semibold my-8'>Check out what our buyers are saying about us </h2>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper bg-teal-50 shadow-xl">
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className="card h-fit w-full bg-teal-50">
                            <div className="card-body">
                                <h2 className="text-center text-secondary my-4 px-6">
                                    {review.ratings && parseInt(review.ratings) > 0 ? (
                                        [...Array(parseInt(review.ratings))].map((e, i) => (
                                            <FontAwesomeIcon icon={faStar} key={i} />
                                        ))
                                    ) : null}
                                </h2>
                                <p className='md:px-4'>{review.review}</p>
                                <div className="card-actions justify-center">
                                    <p className="text-secondary font-bold">{review.name}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
};

export default Reviews;
