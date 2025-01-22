import React from 'react'
import Navbar from './Navbar'

function About() {
  return (
    <div>
     <Navbar/>
     
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-12 bg-gary-100">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-600">
            Home - About Our Company
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Company that works for your business
          </p>
          <p className="mt-4 text-lg text-gray-500">
         Your gateway to the
ultimate Success Network,
seamlessly connecting people,
businesses, and opportunities
globally. Revolutionizing networking
with cutting-edge technology and
limitless possibilities.
          </p>
          
        </div>
       
       {/* boxes */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
            <div className="rounded-lg bg-indigo-50 p-6">
              <h1 className="text-base font-medium text-indigo-700">
                450K
              </h1>
              <p className="mt-1 text-sm text-gray-500">Loyal Customers</p>
            </div>
          

         
            <div className="rounded-lg bg-indigo-50 p-6">
              <h1 className="text-base font-medium text-indigo-700">
                500M
              </h1>
              <p className="mt-1 text-sm text-gray-500">Capital Raised</p>
            </div>
        
          
            <div className="rounded-lg bg-indigo-50 p-6">
              <h1 className="text-base font-medium text-indigo-700">
                10B
              </h1>
              <p className="mt-1 text-sm text-gray-500">Tracked Leads</p>
            </div>
       

          
            <div className="rounded-lg bg-indigo-50 p-6">
              <h1 className="text-base font-medium text-indigo-700">
                450K
              </h1>
              <p className="mt-1 text-sm text-gray-500">Active Users</p>
            </div>
         
        </div>
         {/* Quotes */}
        <div className="mt-20 max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-center">
           
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                We Believe Great Businesses Always Put People First.
              </h2>
           
            <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-0 lg:grid-cols-1">
             
                <blockquote className="relative rounded-lg bg-indigo-50 py-8 px-6 md:py-12 md:px-10">
                  <div className="relative">
                    <p className="text-lg text-gray-700">
                      "Astra's Pentest Suite provides exactly the features we need
                      to maximize the security of the service."
                    </p>
                   
                      <div className="flex items-center space-x-4">
                        <div className="text-base font-medium text-gray-900">
                          Ranjan Soni, CEO 
                        </div>
                      </div>
                   
                  </div>
                   <svg
                    className="absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/2"
                    width={24}
                    height={24}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 19H12a2 2 0 01-2-.263l-.441-.844A2 2 0 012 16.355V7.61l3.5 6.239a2 2 0 01.789 2.894L15 10zM12 6.708l-1.5 3.5L12 10l1.5-3.5L12 6.708zM12 13.979l-1.5-3.5L12 10l1.5 3.5L12 13.979z"
                    />
                  </svg>
                </blockquote>
            </div>
          </div>
        </div>

     {/* other section */}
     
      
    </div>
    </div>
  )
}

export default About
