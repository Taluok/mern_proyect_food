import React from 'react';

const categoryItems = [
    { id: 1, title: "Hamburgers", des: "(86 dishes)", image: "/images/home/category/img1.png" },
    { id: 2, title: "Pizzas", des: "(12 dishes)", image: "/images/home/category/img2.png" },
    { id: 4, title: "Browse All", des: "(86 dishes)", image: "/images/home/category/img4.png" },
];

const Categories = () => {
    return (
        <div className='section-container py-16'>
            <div className='text-center'>
                <p className='text-orange uppercase tracking-wide font-medium text-lg'>Customer Favorites</p>
                <h2 className='text-4xl md:text-5xl font-bold my-2 md:leading-snug leading-snug'>Popular Categories</h2>
            </div>

            <div className='flex flex-wrap gap-8 justify-center items-center mt-12'>
                {categoryItems.map((item) => (
                    <div key={item.id} className='shadow-lg rounded-md bg-white py-6 px-5 w-64 text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all'>
                        <div className='flex w-full mx-auto items-center justify-center'>
                            <img src={item.image} alt={item.title} className='bg-[#ff8c18] p-5 rounded-full w-28 h-28' />
                        </div>
                        <div className='mt-5 space-y-1'>
                            <h5 className='font-medium text-xl'>{item.title}</h5>
                            <p className='text-gray-600'>{item.des}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;



