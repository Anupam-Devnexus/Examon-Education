import React from 'react'
import HomeSlider from '../Component/HomeSlider'
import WhyChooseUs from '../Component/WhyChooseUs'
import HomeTestimonial from '../Component/Testimonial/HomeTestimonial'

const Home = () => {
  return (
    <div>
        <div className='px-3 mt-2 bg-white'>

        <HomeSlider />
        </div>
        <WhyChooseUs/>
        <HomeTestimonial/>
    </div>
  )
}

export default Home