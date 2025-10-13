import React from 'react'

const Hero = ({ bg, Title, desc }) => {
  return (
    <section
      className="relative flex items-center justify-center flex-col h-[80vh] gap-3 text-[var(--background-color)] bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4">
        <h1 className="font-bold text-3xl">{Title}</h1>
        <p className="text-sm w-3/4 mx-auto  mt-2">{desc}</p>
      </div>
    </section>
  )
}

export default Hero
