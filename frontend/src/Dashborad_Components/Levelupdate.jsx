import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header';
import { FaArrowCircleRight, FaUserCircle } from "react-icons/fa";
import { BsArrowUpSquare } from "react-icons/bs";
import { useAuth } from '../AuthContext';
import axios from 'axios';

function Levelupdate() {
 
    const [menuBar, setMenuBar] = useState(false);
    const sidebarRef = useRef(null);
    const { logout } = useAuth();
    const [levelledUp, setlevelledUp] = useState({
      email: 0,
      level: 0,
      name: 0,
      previousLevel: 0,
      _id: 0,
    });
  
  
    const handleClick = () => {
      setMenuBar(!menuBar);
    };
  
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuBar(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, []);
  
    const token = localStorage.getItem('token')
    const receiverId = levelledUp._id;
    const handleUpdatelevel = async() => {
      if(receiverId){
        try {
          const Updatelevel = await axios.post(
            "/api/v1/send-request-for-levelup",
            { receiverId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          console.error("update level fail:",error);
        }
      }
    }
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const levelUp = await axios.get("/api/v1/get-first-levelledUp", {
            headers: { Authorization: `Bearer ${token}` },
          })
          setlevelledUp(levelUp.data.data[0]);
        } catch (error) {
          console.error("Cannot fetch data", error);
          if (error.response && error.response.status === 401) {
            logout();
          }
        }
      };
      fetchData();
    }, [logout]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div  ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-60  transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${
          menuBar ? 'translate-x-0' : '-translate-x-full'
        }  lg:w-60`}
      >
        <Sidebar />
      </div>


      {/* Main content */}
      <div className="flex-1  lg:ml-60">
        {/* Toggle Button */}
        <button
          className="absolute m-4   rounded-full z-20 lg:hidden "
          onClick={handleClick}
        >
          <FaArrowCircleRight
            size={30}
            className={`transition-transform duration-300 ${
              menuBar ? 'rotate-180' : ''
            }`}
          />
        </button>

        <Header />
     {/* Main Content */}
     <div className=' p-8 '>   
       <h1 className="text-2xl font-bold my-8">Level Update</h1>

       {
            levelledUp ? (
              <div className="flex flex-col items-center bg-slate-300 rounded-2xl p-4">
                <div className="bg-green-500 text-white rounded-full p-4 mb-2">
                  <FaUserCircle size={50} />
                </div>
                <p className="font-semibold text-gray-700">Level: {levelledUp.level}</p>
              <p className="font-semibold text-gray-700">Name: {levelledUp.name}</p>

              </div>
            ) : (<h1>No User Found</h1>)
          } 

          <div className="flex justify-end">
            <button className="p-8" onClick={handleUpdatelevel}>
              <BsArrowUpSquare size={40} />
            </button>
          </div>
        </div>
        
        {/* <div className='flex flex-col m-8 p-8 border-2 rounded-xl'>
          <h1 className='text-lg mb-4 border-b-2  '>Enter Detail</h1>

           Amount 
          <div className="mb-4 ">
        <label className="block text-gray-700 mb-1" htmlFor="amount">
          Amount
        </label>
        <select id="amount"className=" p-2 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option>Package 1 - 550</option>
          <option>Package 2 - 750</option>
        </select>
      </div>
          Quanitiy
      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="quantity">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          defaultValue="1"
          className=" p-2 placeholder:before:block w-full border-2 border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
        />
      </div>
         Payment Method Field
         <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="payment-method">
          Payment Method
        </label>
        <select
          id="payment-method"
          className=" p-2 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option>UPI</option>
          <option>Wallet</option>
          
        </select>
      </div>

      upi


       </div> */}
        </div>  
     </div> 
    // </div>
  )
}

export default Levelupdate
