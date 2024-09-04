import React from 'react'

const Banner = () => {
    return (
        <div className='section-container bg-gradient-to-r from-[#fafafa] from-0% to-[#fcfcfc] to-100%'>
            <div className='py-24 flex flex-col md:flex-row justify-between items-center gap-8'>
                {/*Text*/}
                <div className='md:w-1/2 space-y-7 px-4'>
                    <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                        Dive into the pleasures of the best <span className='text-orange'>food</span>
                    </h2>
                    <p className='text-xl text-[#4a4a4a]'>
                        Where Every Bite Packs a Punch of Flavor and Fun
                    </p>
                    <button className='btn bg-orange px-8 py-3 font-semibold text-white rounded-full'>
                        Order Now
                    </button>
                </div>
                {/*Image*/}
                <div className='md:w-1/2'>
                    <img src="/images/home/banner.png" alt="Banner Image" />
                    <div className='flex flex-col md:flex-row items-center justify-around -mt-1 gap-6'>
                        <div className='flex bg-white py-2 px-3 rounded-2x1 items-center gap-3 shadow-md w-64 rounded-2xl'>
                            <img src="/images/home/b-food1.jpg" alt="" className='w-24 h-24  rounded-2xl' />
                            <div className='space-y-1'>
                                <h5 className='font-medium mb-1'>Chesse Burger</h5>
                                <div className="rating rating-sm">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                        defaultChecked />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                </div>
                                <p className='text-rose-700'>$7.00</p>
                            </div>
                        </div>
                        <div className='sm:flex hidden bg-white py-2 px-3 rounded-2x1 items-center gap-3 shadow-md w-64 rounded-2xl'>
                            <img src="/images/home/b-food1.jpg" alt="" className='w-24 h-24  rounded-2xl' />
                            <div className='space-y-1'>
                                <h5 className='font-medium mb-1'>Chesse Burger</h5>
                                <div className="rating rating-sm">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                        defaultChecked />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly readOnly/>
                                </div>
                                <p className='text-rose-700'>$7.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner


