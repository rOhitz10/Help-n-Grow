import React, { useEffect, useState } from 'react';
import { Link} from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { SlLogin } from "react-icons/sl";
import { ImTree } from "react-icons/im";
import { AiOutlineTeam } from "react-icons/ai";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { FaHandsHelping } from "react-icons/fa";
import { GrSend } from "react-icons/gr";
import { FaArrowDownWideShort,FaArrowUpShortWide } from "react-icons/fa6";
import { useAuth } from '../AuthContext';
import {jwtDecode} from 'jwt-decode';
import DP from './Sub_component/DP';
 

const Card = ({icon, title, onClick}) => {
  return (
    <div
      className="flex items-center justify-start px-4 py-2 my-2 w-full bg-white rounded-md shadow-sm transition-all duration-300"
      onClick={onClick} // Attach onClick here
    >
      <div className="text-blue-500">{icon}</div>
      <h3 className="ml-4 text-sm font-light text-gray-700">{title}</h3>
    </div>
  );
};

function Sidebar() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { logout } = useAuth();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("User"); // Fallback for userName
  const [role,setrole] = useState(true)

  const token = localStorage.getItem('token');


  useEffect(() => {
    if (token) {
     
      try {
        const decoded = jwtDecode(token);
     
        setUserId(decoded.epin);
        setUserName(decoded.name || "User"); // Use decoded userName or fallback
        if(decoded.role === 'admin'){
          setrole(true);
        }
        else{
          setrole(false)
        }
      }  catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [token]);
  
  
 
  const handleLogout = () => {
    logout();
  };


  return (
    <div className=" min-h-screen bg-gray-100 scrollbar-y ">
      <div className=' flex flex-col items-start space-y-4 px-4'>

      <h1 className="text-xl font-bold my-3 text-center">Help'n'Groww</h1>

      <div className="bg-slate-300 rounded-xl p-3  space-x-4 ">
        <div className="flex items-center w-full cursor-pointer">
          {/* <img
            src="https://cdnb.artstation.com/p/assets/images/images/026/142/657/large/sleepy-jhin-roronoa-zoro-portrait.jpg?1587999560"
            alt="Profile"
            className="rounded-full w-10 h-10"
            /> */}
            <DP/>
          <div className=" mx-2">
            <h3 className="text-sm font-semibold overflow-hidden ">{userName}</h3>
            <p className="text-xs text-gray-600">{userId}</p>
          </div>
          <button
            className=" text-sm focus:outline-none bg-slate-400 rounded-md p-2"
            onClick={() => setProfileOpen(!isProfileOpen)}
            >
              
            {isProfileOpen ?  <FaArrowDownWideShort /> : <FaArrowUpShortWide/>}
          </button>
        </div>

        {isProfileOpen && (
          <div className="ml-4 my-2  space-y-8 text-sm text-white font-semibold">
            <Link to="/dashboard/profile" >
            <div  className="p-2 shadow-xl rounded-lg hover:bg-slate-400 hover:text-black">My Profile</div>
            </Link>
            <Link to="/dashboard/financial-info">
            <div  className="p-2 shadow-xl rounded-lg hover:bg-slate-400 hover:text-black">Financial </div>
            </Link>
            {/* <div className="px-2 border-2 rounded-lg hover:bg-slate-500 hover:text-blue-600">Password</div> */}
           
          </div>
        )}
      </div>

      <div className="w-full space-y-4">
        { role &&
          <Link to="/admin/dashboard">
          <Card icon={<IoHomeOutline className="text-lg" />} title="Admin Panel" />
        </Link>
        }
        <h2 className="text-xs font-semibold text-gray-500 px-4">MAIN</h2>
        <Link to="/dashboard">
          <Card icon={<IoHomeOutline className="text-lg" />} title="Dashboard" />
        </Link>
        
        {/* Updated Link for SignUp with onClick */}
        <Link to="/signup">
          <Card icon={<SlLogin className="text-lg" />} title="SignUp" onClick={handleLogout} />
        </Link>

        <h2 className="text-xs font-semibold text-gray-500 px-4 mt-4">NETWORK</h2>
        <Link to={`/dashboard/LevelTree`}>
          <Card icon={<ImTree className="text-lg" />} title="Level Tree" />
        </Link>
        <Link to={`/dashboard/myteam`}>
          <Card icon={<AiOutlineTeam className="text-lg" />} title="My Team" />
        </Link>
        
        <h2 className="text-xs font-semibold text-gray-500 px-4 mt-4">Links</h2>
        <Link to='/dashboard/recive/help'>
          <Card icon={<FaHandsHelping className="text-lg" />} title="Recive Help" />
        </Link>
        <Link to='/dashboard/send/help'>
          <Card icon={< GrSend className="text-lg" />} title="Send Help" />
        </Link>  
    
      </div>

      {/* Sign Out Button */}
      <Link to="/">
        <Card icon={<LiaSignOutAltSolid className="w-6 h-6 mr-2" />} title="Sign Out" onClick={handleLogout} />   
          </Link>
          
        </div>
    </div>
  );
}

export default Sidebar;
