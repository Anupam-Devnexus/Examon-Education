import React from 'react'
import HomeSlider from '../Component/HomeSlider'
import WhyChooseUs from '../Component/WhyChooseUs'
import HomeTestimonial from '../Component/Testimonial/HomeTestimonial'
import StudyMaterialHome from '../Component/StudyMaterialHome'
import ContactSection from '../Component/ContactSection'
import HomeNumber from '../Component/HomeNumber'
import LiveRecordedBatches from '../Component/LiveRecordedBatches'
import MeetMentor from '../Component/MeetMentor'

const Home = () => {
  return (
    <div className='flex flex-col space-y-2 '>

      <HomeSlider />
      <HomeNumber/>
      <LiveRecordedBatches/>

      <StudyMaterialHome />
      <WhyChooseUs />
      <MeetMentor/>
      <HomeTestimonial />
      <section className='py-10'>
        <ContactSection />
      </section>

    </div>
  )
}

export default Home