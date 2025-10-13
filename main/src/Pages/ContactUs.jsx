import React from 'react'
import Hero from "../Component/Hero"
import ContactForm from '../Form/ContactUspageForm'
const ContactUs = () => {
    return (
        <div className='flex flex-col '>
            <Hero Title={"Contact Us"} bg={"https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"} desc="We would love to hear from you!" />
            <div className='px-4 -mt-24 z-999'>

                <ContactForm />
            </div>
        </div>
    )
}

export default ContactUs