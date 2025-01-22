import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import {  FaUserCircle } from 'react-icons/fa';

function Menu() {
  const { sponsorId } = useParams();
  return (
    <div>
     <div className='fixed  sm:scale-y-0 bg-white bottom-0  p-6 w-screen flex justify-evenly items-center font-extrabold'>
     <Link to={`/${sponsorId}`}>
       <div><IoHomeOutline size={30} className='mx-3'/> Home</div>
       </Link>
       <Link to={`/${sponsorId}/myteam`}>
       <div> <AiOutlineTeam size={30} className='mx-3'/> My Team</div>
       </Link>
       <Link to='/user/profile'>
       <div><FaUserCircle  size={30} className='mx-3'/> Account</div>
       </Link>
      </div>
    </div>
  )
}

export default Menu
