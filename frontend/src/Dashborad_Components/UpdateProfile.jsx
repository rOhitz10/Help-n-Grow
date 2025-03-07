import { useState, useRef, useEffect } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contactNumber: "",
    country: "",
    state: "",
    city: "",
  });
  
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  const [menuBar, setMenuBar] = useState(false);
  const sidebarRef = useRef(null);
  const token = localStorage.getItem("token");

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

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle save changes
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "/api/v1/update-profile", 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (res.status === 200) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-60 transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${menuBar ? 'translate-x-0' : '-translate-x-full'} lg:w-60`}
      >
        <Sidebar />
      </div>

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
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-8 w-full max-w-md">
            <h2 className="text-xl text-center font-bold mb-4">Edit Profile</h2>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                name="address"
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Contact Number */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">Contact Number</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="contactNumber"
                name="contactNumber"
                type="text"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>

            {/* Country */}
            <div className="mb-4 md:flex md:items-center">
              <div className="md:w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">Country</label>
                <CountrySelect
                  containerClassName="form-group"
                  onChange={(country) => {
                    setCountries(country);
                    setFormData((prevState) => ({
                      ...prevState,
                      country: country.name,
                      state: "",
                      city: "",
                    }));
                  }}
                  placeHolder="Select Country"
                />
              </div>

              {/* State */}
              <div className="md:w-1/2 md:pl-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">State</label>
                <StateSelect
                  disabled={!formData.country}
                  countryid={countries?.id}
                  containerClassName="form-group"
                  onChange={(state) => {
                    setStates(state);
                    setFormData((prevState) => ({
                      ...prevState,
                      state: state.name,
                      city: "",
                    }));
                  }}
                  placeHolder="Select State"
                />
              </div>
            </div>

            {/* City */}
            <div className="mb-4 md:flex md:items-center">
              <div className="md:w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
                <CitySelect
                  countryid={countries?.id}
                  stateid={states?.id}
                  containerClassName="form-group"
                  onChange={(city) => {
                    setCities(city);
                    setFormData((prevState) => ({
                      ...prevState,
                      city: city.name,
                    }));
                  }}
                  placeHolder="Select City"
                  disabled={!formData.state}
                />
              </div>
            </div>

            {/* Save Changes Button */}
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}