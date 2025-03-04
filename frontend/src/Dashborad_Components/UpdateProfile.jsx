import { useEffect, useState, useRef } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { Country, State, City } from 'country-state-city';

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contactNumber: "",
    country: "",
    city: "",
    state: "",
  });

  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
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

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle country change
  const handleCountryChange = (country) => {
    setFormData({ ...formData, country: country.isoCode, state: "", city: "" });
    setStates(State.getStatesOfCountry(country.isoCode)); // Get states for the selected country
    setCities([]); // Clear cities
  };

  // Handle state change
  const handleStateChange = (state) => {
    setFormData({ ...formData, state: state.isoCode, city: "" });
    setCities(City.getCitiesOfState(formData.country, state.isoCode)); // Get cities for the selected state
  };

 
 
  // handle city change 
  // const handleCityChange =(city) => {
  //  setFormData({ ...formData, city: city.isoCode, city: "" });
  //  setCities(City.getCitiesOfState(formData.country, state.isoCode));
  // }
  

  // Handle save changes
  const handleSaveChanges = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const res = await axios.put(
        "/api/v1/update-profile", 
        {
          ...formData,  // Spread the formData
          epin: epin,   // Add epin to the request body
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Profile updated successfully!"); // Success toast
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile. Please try again."); // Error toast
    }
  };

  return (
    <div className="flex h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
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
            <h2 className="text-xl text-center font-bold mb-4">Edit profile</h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
                Contact Number
              </label>
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

            <div className="mb-4 md:flex md:items-center">
              <div className="md:w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                  Country
                </label>
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={(e) => handleCountryChange(Country.getCountryByCode(e.target.value))}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:w-1/2 md:pl-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                  State
                </label>
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={(e) => handleStateChange(State.getStateByCode(formData.country, e.target.value))}
                  disabled={!formData.country}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4 md:flex md:items-center">
              <div className="md:w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                  City
                </label>
                {/* <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={(e) => handleCityChange(city.getCityByCode(formData.state, e.target.value))}
                  disabled={!formData.state}
                > */}
                  {/* <label value="">Select City</label> */}
                  {/* {cities.map((city) => (
                    <option key={city.isoCode} value={city.isoCode}>
                      {city.name}
                    </option>
                  ))} */}
                  <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                name="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
                {/* </select> */}
              </div>
            </div>

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
