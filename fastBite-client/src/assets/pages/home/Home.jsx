import React from 'react'
import Banner from '../../../components/Banner'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'

const Home = () => {
    return (
        <div className='max-w-screen-2x1 container mx-auto xl:px-24 px-4'>
            <Banner/>
            <Categories/>
            <SpecialDishes/>
        </div>
    )
}

export default Home
