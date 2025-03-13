import { useEffect, useState, useRef } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import Sidebar from './Sidebar';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import Toastify
import { Link } from 'react-router-dom';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contactNumber: "",
    city: "",
    state: "",
    country:"",
  });

  const [menuBar, setMenuBar] = useState(false);
  const sidebarRef = useRef(null); 
  const token = localStorage.getItem("token");
  const epin = localStorage.getItem("epin");

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

  // Fetch profile details using POST and sending epin in the request body
  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/get-profile-detail?epin=${epin}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // params:{epin},
          },  
      );
      
        if (res.data) {
          const { name, email, address, number, city, state, country } = res.data;
          setFormData({
            name: name || "",          
            email: email || "", 
            address: address || "",  
            contactNumber: number || "",  
            city: city || "",  
            state: state || "", 
            country: country || "", 
          });
        } else {
          console.error("Invalid response:", res.data);
        }
      } catch (error) {
        console.error("Failed to get profile info", error);
        toast.error("Failed to fetch profile details. Please try again.");
      }
    };

    fetchProfileDetails();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-60 h-screen bg-white z-30 transition-transform duration-300 ease-in-out transform ${
          menuBar ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Overlay for Mobile */}
      {menuBar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={handleClick} // Close sidebar when clicking outside
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-60 transition-all duration-300">
        <button
          className={`absolute m-4 lg:hidden rounded-full z-20 ${menuBar ? 'hidden' : ''}`}
          onClick={handleClick}
        >
          <FaArrowCircleRight size={30} className="transition-transform duration-300" />
        </button>

        <div className="flex justify-center items-center h-full">
          {/* Profile Form */}
          <div className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 my-8 w-full max-w-md">
            <h2 className="text-xl text-center font-bold mb-4">Profile</h2>

            {/* Display Profile Info */}
            <div className="mb-4">
              <h1 className="text-lg font-semibold">Name: {formData.name}</h1>
            </div>

            <div className="mb-4">
              <h1 className="text-lg font-semibold">Email: {formData.email}</h1>
            </div>

            <div className="mb-4">
              <h1 className="text-lg font-semibold">Address: {formData.address}</h1>
            </div>

            <div className="mb-4">
              <h1 className="block text-gray-700 text-sm font-bold mb-2">Contact Number: {formData.contactNumber}</h1>
            </div>

            <div className="mb-4">
                <h1 className="block text-gray-700 text-sm font-bold mb-2">Country: {formData.country}</h1>
              </div>

           


              <div className="mb-4">
                <h1 className="block text-gray-700 text-sm font-bold mb-2">State: {formData.state}</h1>
              </div>
              
              <div className="mb-4">
                <h1 className="block text-gray-700 text-sm font-bold mb-2">City: {formData.city}</h1>
              </div>

           

            {/* Update Profile Button */}
            <Link to="/dashboard/update-profile">
              <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full mt-6">
                Update Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
