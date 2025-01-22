import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { TbWorld } from "react-icons/tb";
import { MdMenu } from "react-icons/md";
import { ImCross } from "react-icons/im";

function Navbar() {
  const [menuOpen,setMenuOpen] = useState(false)
  return (
    <nav className="bg-[#876f56]  sticky top-0 z-50 text-white">
    <div className=' mx-auto  flex  justify-between items-center p-4'>
  
      <Link to='/'>
      <h1 className='font-bold text-xl flex'>HELP 'N' GROWW</h1>
      </Link>
    
     <ul className={`md:flex md:space-x-4  md:static hidden  md:flex-row `}>
    
     <Link to='/about'>
      <li>ABOUT</li>
     </Link>
     <Link to='/plan.pdf'>
      <li>PLAN</li>
     </Link>
     <Link to='/contact'>
      <li >CONTACT</li>
     </Link>
     </ul>
     <button className='md:hidden' onClick={() => setMenuOpen(!menuOpen)}>{menuOpen?<ImCross />:<MdMenu size={30}/>}
     {/* Dropdown Menu */}
     {menuOpen && (
        <div className="absolute left-0 top-[60px] min-h-[93vh] bg-white w-full z-50 shadow-lg transition-transform duration-500 ease-in-out transform translate-y-0">
          <ul className="flex flex-col items-center space-y-6 py-10 ">
          
            <Link to="/about" onClick={() => setMenuOpen(false)} className="w-full text-center">
              <li className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                ABOUT
              </li>
            </Link>
            <Link to="/plan.pdf" onClick={() => setMenuOpen(false)} className="w-full text-center">
              <li className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                PLAN
              </li>
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="w-full text-center">
              <li className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                CONTACT
              </li>
            </Link>
          </ul>
          <div className='flex justify-center gap-6 text-gray-800'>
          <Link to='/signin'>
      <button className='py-2 px-8 rounded-full  font-bold border-2 border-orange-400 hover:bg-[#ff853e] '>LOG IN </button>
      </Link>
      <Link to='/signup'>
      <button className='py-2 px-8 rounded-full  font-bold border-2 border-orange-400 hover:bg-[#ff853e] '>SIGN UP</button>
      </Link>
          </div>
        </div>
      )}</button>
     
     <div className=' md:flex gap-4 hidden '>
      <TbWorld className='mt-2' size={25}/>
      <Link to='/signin'>
      <button className='py-2 px-8 rounded-full  font-bold border-2  hover:bg-[#312e2c] '>LOG IN </button>
      </Link>
      <Link to='/signup'>
      <button className='py-2 px-6 rounded-full  font-bold border-2 bg-[#312e2c] hover:border-white  hover:bg-[#876f56]'>SIGN UP</button>
      </Link>
      
     
      </div> 

    </div>
    <Outlet/>
    </nav>
  )
}

export default Navbar
