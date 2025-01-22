import React from 'react'

function Hero5() {
  return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gradient-to-b from-green-400 to-blue-500 text-center rounded-lg shadow-lg p-12 w-full max-w-2xl sm:max-w-2xl mx-2 ">
        <h2 className="text-4xl sm:text-3xl font-bold text-gray-900 mb-4">
          Create an account or sign in to comment
        </h2>
        <p className="text-gray-800 mb-6 text-lg sm:text-base">
          You need to be a member in order to leave a comment
        </p>

        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="text-left">
            <h3 className="font-semibold text-xl sm:text-lg text-gray-900">
              Create an account
            </h3>
            <p className="text-gray-700 text-base sm:text-sm">
              Sign up for a new account in our community. It's easy!
            </p>
            <button className=" my-4 border-2 border-gray-900 text-gray-900 font-semibold py-2 px-4 rounded-full transition hover:bg-gray-900 hover:text-white">
            Register a new account
          </button>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-xl sm:text-lg text-gray-900">
              Sign in
            </h3>
            <p className="text-gray-700 text-base sm:text-sm">
              Already have an account? Sign in here.
            </p>
            <button className=" my-4 border-2 border-gray-900 text-gray-900 font-semibold py-2 px-4 rounded-full transition hover:bg-gray-900 hover:text-white">
            Sign In Now
          </button>
          </div>
        </div>

        {/* <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="border-2 border-gray-900 text-gray-900 font-semibold py-2 px-4 rounded-full transition hover:bg-gray-900 hover:text-white">
            Register a new account
          </button>
          <button className="border-2 border-gray-900 text-gray-900 font-semibold py-2 px-4 rounded-full transition hover:bg-gray-900 hover:text-white">
            Sign In Now
          </button>
        </div> */}
      </div>
    </div>
    </>
  )
}

export default Hero5
