import React from 'react';
import { GiSevenPointedStar } from "react-icons/gi";
import image from '../../assets/funding.png';
import { Link } from 'react-router-dom';

function Hero1() {
  return (
    <div className="min-h-screen bg-[#F7F2ED] flex flex-col md:flex-row items-center justify-around p-6 md:p-10 space-y-8 md:space-y-0">
      {/* Left Section */}
      <div className="flex flex-col justify-center gap-8 md:w-1/2">
        <h1 className="text-3xl md:text-5xl font-bold  text-[#1C1E87]">
       HELP'N'GROWW TECHNOLOGIES 
WHERE NETWORKING MEETS
OPPORTUNITIES.
        </h1>
        <p className="text-gray-600  mr-8 text-2xl md:text-xl">
        Your pathway to unlocking
limitless potential through the
world’s biggest affiliate
network.
        </p>
        <div className="flex space-x-4">
          <Link to="/signup">
          <button className="border-2 border-[#ff9a60] text-black font-bold py-2 px-6 rounded-xl transition-all duration-300 hover:bg-[#ff9a60] hover:text-white">
            Get Started
          </button>
          </Link>
          <button className="bg-black text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 hover:bg-[#ff9a60] hover:text-black">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative md:w-1/2">
        <img
          className="min-h-[48vh] w-full rounded-xl object-cover shadow-lg transform transition-transform duration-300 "
          src={image}
          alt="Funding"
        />
      </div>
    </div>
  );
}

export default Hero1;
