import React from 'react'
import Navbar from './Navbar'
import Hero1 from './hero_components/Hero1'
import Hero2 from './hero_components/Hero2'
import Hero3 from './hero_components/Hero3'
import Hero4 from './hero_components/Hero4'
import Hero5 from './hero_components/Hero5'
import Footer from './Footer'

function Home() {
  return (
    <div>
     <Navbar/>
     <Hero1/>
     <Hero4/>
     <Hero2/>
     {/* <Hero3/> */}
     {/* <Hero5/> */}
     <Footer/>
      
    </div>
  )
}

export default Home
