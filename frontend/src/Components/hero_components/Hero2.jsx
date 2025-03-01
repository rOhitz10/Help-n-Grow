import React from 'react'
import { Link } from 'react-router-dom'



function Hero2() {


  return (
    <div className="bg-slate-200">
    {/* First Section - Testimonial */}
    <section className="py-16 px-4 md:px-16 lg:px-32 bg-slate-200">
      <div className="flex flex-col lg:flex-row items-center lg:justify-between">
        {/* Left Column */}
        <div className="mb-8 lg:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700">
          EVERYONE HAS
          DESIRES
          </h1>
          <ul className="space-y-2 mt-4 text-lg text-gray-700">
            <li>Financial Freedom</li>
            <li>Luxury Homes and Cars</li>
            <li>Global Travel</li>
            <li>Independence and Lifestyle
Choices
</li>
           
          </ul>
          {/* <button className="mt-6 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
            Read customer stories
          </button> */}
        </div>

      <img className='rounded-2xl' src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
      </div>
    </section>

    {/* Second Section - Trusted Clients and Reviews */}
    <section className="bg-indigo-300 text-white py-12 rounded-3xl">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Over 500,000+ customers trust Help'n'Groww
        </h2>
        <p className="mx-11 my-4 text-xl text-white">
          Businesses around the world have built better
          customer relationships.
        </p>
      </div>



      {/* Reviews */}
      <div className="my-12 mx-16 py-11  bg-gray-50 text-indigo-500 rounded-3xl flex flex-col gap-6 md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-12">
        {/* Review 1 */}
        <div className="text-center">
          <div className="text-4xl font-bold">4.5</div>
          <div className="text-yellow-300">★★★★★</div>
          <p className="mt-2 ">3700+ reviews</p>
          <p className="mt-1 text-lg text-black">Trustpilot</p>
        </div>
        {/* Review 2 */}
        <div className="text-center">
          <div className="text-4xl font-bold">4.5</div>
          <div className="text-yellow-300">★★★★★</div>
          <p className="mt-2 ">1600+ reviews</p>
          <p className="mt-1 text-lg text-black">Early Target Market</p>
        </div>
        {/* Review 3 */}
        <div className="text-center">
          <div className="text-4xl font-bold">4.2</div>
          <div className="text-yellow-300">★★★★★</div>
          <p className="mt-2 ">1600+ </p>
          <p className="mt-1 text-lg text-black">Potential Market Share</p>
        </div>
      </div>
    </section>

   

    <div className="bg-[#dcb790] rounded-t-3xl">
      {/* Tools Integration Section */}
      <section className="py-16 px-4 md:px-16 lg:px-32 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1C1E87]">
        GLOBAL
        OPPORTUNITIES        </h2>
        <p className="mt-4 text-lg ">
        Help 'n' Groww  affiliates can
expand their network across
borders, connecting with
businesses and individuals
worldwide.
        </p>

        {/* Logos marque */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-8 ">
         <h1 className='text-3xl font-extrabold animate-bounce'>
          Help 'n' Groww
         </h1>
         
        </div>

       
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-[#F7F2ED] text-center py-12 rounded-t-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-black">
          Ready to get started?
        </h2>
        <p className="mt-4 text-lg text-black">
          Create your free account.
        </p>
        <Link to='/signup'>
        <button className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-500 animate-pulse">
          Get join
        </button>
        </Link>
      </section>
    </div>
  </div>
  )
}

export default Hero2
