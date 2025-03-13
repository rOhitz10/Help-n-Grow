import React from 'react';
import { Link, useParams } from "react-router-dom";
import { IoHomeOutline} from "react-icons/io5";
import { SlLogin } from "react-icons/sl";
import { ImTree } from "react-icons/im";
import { FaMapPin } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useAuth } from "../AuthContext";

const Card = ({ icon, title }) => {
  return (
    <div className="flex items-center justify-start px-4 py-2 w-full bg-white rounded-md shadow hover:shadow-lg hover:bg-blue-50 transition-all duration-300">
      <div className="text-blue-500">{icon}</div>
      <h3 className="ml-4 text-sm font-medium text-gray-700">{title}</h3>
    </div>
  );
};

function AdminSidebar() {
  const { sponsorId } = useParams();
  const {isAdmin} = useAuth();

  return (
    <div className="fixed flex flex-col items-start p-4 bg-white h-screen w-60 lg:w-72 shadow-lg overflow-y-auto">
      {/* Sidebar Header */}
      <h1 className="text-2xl font-bold text-blue-600 mb-6 px-2">Help'n'Groww</h1>

      {/* Profile Section */}
      <div className="bg-slate-100 rounded-xl p-4 w-full flex items-center space-x-3">
        <img
          src="https://cdnb.artstation.com/p/assets/images/images/026/142/657/large/sleepy-jhin-roronoa-zoro-portrait.jpg?1587999560"
          alt="Profile"
          className="rounded-full w-12 h-12 object-cover"
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-800">John Smith</h3>
          <p className="text-xs text-gray-600">Administrator</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="w-full mt-6 flex flex-col gap-4 ">
        {/* <h2 className="text-xs font-semibold text-gray-500 px-4 uppercase">Main</h2> */}
        {isAdmin && 
        <Link to={`/dashboard`}>
        <Card icon={<FaRegUser  className="text-lg" />} title="User Panel" />
      </Link>
        }
        <Link to={"/admin/dashboard"}>
          <Card icon={<IoHomeOutline className="text-lg" />} title="Dashboard" />
        </Link>
        <Link to="/signup">
          <Card icon={<SlLogin className="text-lg" />} title="SignUp" />
        </Link>

        {/* <h2 className="text-xs font-semibold text-gray-500 px-4 uppercase mt-4">Networ</h2> */}
        <Link to={`/admin/Level`}>
          <Card icon={<ImTree className="text-lg" />} title="All User " />
        </Link>
        <Link to={`/generate/epin`}>
          <Card icon={<FaMapPin className="text-lg" />} title="Generate Epin" />
        </Link>

  
      </div>

      {/* Sign Out Button */}
      <button className="flex items-center mt-auto text-gray-700 hover:text-blue-600 transition-colors duration-300 p-4 w-full">
        <LiaSignOutAltSolid className="w-5 h-5 mr-2" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}

export default AdminSidebar;
