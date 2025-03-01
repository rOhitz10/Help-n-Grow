import React from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import Helpngroww from '../assets/Helpngrowlogo.png'
import { FaTwitter ,FaLinkedin ,FaInstagram,FaFacebookSquare} from "react-icons/fa";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='bg-gray-700 '>
     <div className='mx-11 flex justify-between items-center border-b'>
      <img className='w-22 h-20' src={Helpngroww} alt="" />
      <div className='flex gap-3'>
      <FaTwitter className='fill-white  hover:fill-blue-400 w-5 h-5' /> 
      <FaLinkedin  className='fill-white hover:fill-blue-400 w-5 h-5' />
      <FaInstagram  className='fill-white hover:fill-blue-400 w-5 h-5' />
      <FaFacebookSquare  className='fill-white hover:fill-blue-400 w-5 h-5' />

      </div>

     </div>

      <div className="w-full  p-6 flex flex-col lg:flex-row justify-evenly items-start lg:items-center text-white">
        <div className="mb-4 lg:mb-0">
          <ul className="p-4 flex flex-col gap-2">
            <li className="font-bold text-xl">EXPLORE</li>
            <li>Dashboard</li>
            <li>Market Place</li>
          </ul>
        </div>

        <div className="mb-4 lg:mb-0">
          <ul className="p-4 flex flex-col gap-2">
            <li className="font-bold text-xl">Learn & Get help</li>
            <li>Empower Your Network</li>
            <li>Real-Time Insights</li>
            <li>Simplified Operations</li>
            <li>Executive Circle</li>
            
         
          </ul>
        </div>

        <div className="mb-4 lg:mb-0">
          <ul className="p-4 flex flex-col gap-2">
            <Link to="/" className="font-bold text-xl">Company</Link>
            <Link to="/about">About us</Link>
            <li>Careers</li>
            <li>SiteMap</li>
          </ul>
        </div>
      
        <div className="mb-4 lg:mb-0">
          <Link to="/contact">
          <ul className="p-4 flex flex-col gap-2">
            <li className="font-bold text-xl">Contact Us</li>
          </ul>
          </Link>
          <ul className="my-2 flex flex-row items-center gap-2">
            <IoLocationOutline size={20} />
            <li>Official Location</li>
          </ul>
          <ul className="my-2 flex flex-row items-center gap-2">
            <AiOutlineMail size={20} />
            <li>E-mail Address</li>
          </ul>
        </div>
      </div>


      <div className="mx-11 bg-gray-700 flex justify-center py-4 border-t-2">
        <h2 className="text-white text-center">
          © 2024 Help'n'Groww, Inc. All rights reserved
        </h2>
      </div>
    </footer>
  );
}

export default Footer;
