import React from 'react'
import HomeSlider from '../Component/HomeSlider'
import WhyChooseUs from '../Component/WhyChooseUs'
import HomeTestimonial from '../Component/Testimonial/HomeTestimonial'
import StudyMaterialHome from '../Component/StudyMaterialHome'
import ContactSection from '../Component/ContactSection'
import HomeNumber from '../Component/HomeNumber'
import LiveRecordedBatches from '../Component/LiveRecordedBatches'
import MeetMentor from '../Component/MeetMentor'
import LatestNewsInsights from '../Component/LatestNewsInsights'

const Home = () => {
  return (
    <div className='flex flex-col '>

      <HomeSlider />
      <HomeNumber/>
      <LiveRecordedBatches/>

      <StudyMaterialHome />
      <LatestNewsInsights/>
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