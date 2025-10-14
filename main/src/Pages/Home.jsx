import React from 'react'
import HomeSlider from '../Component/HomeSlider'
import WhyChooseUs from '../Component/WhyChooseUs'
import HomeTestimonial from '../Component/Testimonial/HomeTestimonial'
import StudyMaterialHome from '../Component/StudyMaterialHome'
import ContactSection from '../Component/ContactSection'
import HomeNumber from '../Component/HomeNumber'

const Home = () => {
  return (
    <div className='flex flex-col p-2 gap-2 '>

      <HomeSlider />
      <HomeNumber/>

      <WhyChooseUs />
      <StudyMaterialHome />
      <HomeTestimonial />
      <section className='py-10'>
        <ContactSection />
      </section>
    </div>
  )
}

export default Home