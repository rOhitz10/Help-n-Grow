import { useEffect, useRef, useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa'; // Import the missing icon
import Sidebar from './Sidebar';
import ProfileHead from './Sub_component/ProfileHead';

export default function Profile() {
  const [firstName, setFirstName] = useState('Mehrab');
  const [lastName, setLastName] = useState('Bozorgi');
  const [email, setEmail] = useState('Mehrabbozorgi.business@gmail.com');
  const [address, setAddress] = useState('33062 Zboncak isle');
  const [contactNumber, setContactNumber] = useState('58077.79');
  const [city, setCity] = useState('Mehrab');
  const [state, setState] = useState('Bozorgi');
  const [menuBar, setMenuBar] = useState(false);
  const sidebarRef = useRef(null); 

  const handleClick = () => {
    setMenuBar(!menuBar);
  };

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setMenuBar(false); // Close the sidebar if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-60 transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${menuBar ? 'translate-x-0' : '-translate-x-full'}  lg:w-60`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1  lg:ml-60 transition-all duration-300">
        <button
          className={`absolute m-4 lg:hidden rounded-full z-20  ${menuBar ? 'hidden' : ''}`}
          onClick={handleClick}
        >
          <FaArrowCircleRight size={30} className="transition-transform duration-300" />
        </button>
       
        <div className="flex justify-center items-center h-full">
          {/* Profile Form */}
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-8 w-full max-w-md ">
            <h2 className="text-xl text-center font-bold mb-4">Edit profile</h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="contactNumber"
                type="text"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>

            <div className="mb-4 md:flex md:items-center">
              <div className="md:w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                  City
                </label>
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="Mehrab">Mehrab</option>
                  <option value="Bozorgi">Bozorgi</option>
                </select>
              </div>

              <div className="md:w-1/2 md:pl-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                  State
                </label>
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="Mehrab">Mehrab</option>
                  <option value="Bozorgi">Bozorgi</option>
                </select>
              </div>
            </div>

            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full" type="submit">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
