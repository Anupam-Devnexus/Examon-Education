import React from 'react'
import HomeSlider from '../Component/HomeSlider'
import WhyChooseUs from '../Component/WhyChooseUs'

const Home = () => {
  return (
    <div>
        <div className='px-3 mt-2 bg-white'>

        <HomeSlider />
        </div>
        <WhyChooseUs/>
    </div>
  )
}

export default Home