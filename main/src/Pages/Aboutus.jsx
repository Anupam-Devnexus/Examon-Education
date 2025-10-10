import React from 'react'
import Hero from '../Component/Hero'
import { FourStepSelection } from '../Component/FourStepSelection'
import AboutNumber from '../Component/AboutNumber'
import MissionVisionValues from '../Component/MissionVisionValus'

const Aboutus = () => {
  return (
    <>
    <div className='flex flex-col '>
      <div className='flex flex-col relative'>

        <Hero
          Title={"About Us"}
          desc={"Home / About Us"}
          bg={"https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"}
        />
        <div className=' min-w-full'>

          <FourStepSelection />
        </div>
      </div>
      <AboutNumber />
      <div className='flex items-center justify-center'>

      <MissionVisionValues/>
      </div>
    </div>
    </>
  )
}

export default Aboutus