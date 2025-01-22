import React, { useEffect, useState, useRef } from 'react';
import AdminSidebar from './AdminSidebar';
import { FaArrowCircleRight } from 'react-icons/fa';
import axios from 'axios';

function AdminLevel() {
  const [menuBar, setMenuBar] = useState(false);
  const sidebarRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user data
  const modalRef = useRef(null); // Reference for the modal to detect clicks outside

  // Handle search input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Toggle sidebar menu visibility
  const handleClick = () => {
    setMenuBar(!menuBar);
  };

  // Close sidebar if clicked outside
  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setMenuBar(false);
    }
    // Close modal if clicked outside the modal
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/v1/get-all-users",{
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },

        });
        setUsers(res.data.users);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Filtered users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle modal visibility and set selected user
  const toggleModal = (user) => {
    setSelectedUser(user); // Set the selected user data
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-60 transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${menuBar ? 'translate-x-0' : '-translate-x-full'} lg:static lg:w-60`}
      >
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Toggle Button */}
        <button
          aria-label="Toggle sidebar"
          className={`absolute m-4 lg:hidden rounded-full z-20 ${menuBar ? 'hidden' : ''}`}
          onClick={handleClick}
        >
          <FaArrowCircleRight size={30} className="text-gray-600" />
        </button>

        {/* Dashboard Container */}
        <div className="p-8 m-12">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-700">All Users</h1>
          </div>

          {/* Search Bar */}
          <div className="flex border border-gray-300 rounded-lg p-2 mb-6">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
              className="w-full p-2 outline-none text-gray-700"
            />
          </div>

          {/* All Users Section with Scroll */}
          <aside className="p-4 bg-white rounded-lg shadow-md overflow-y-auto max-h-80">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user._id} // Ensure unique keys
                  className="flex items-center mb-4 p-4 rounded-lg hover:bg-blue-50 shadow-sm transition-shadow"
                >
                 
                  
                  {/* User Info */}
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="bg-slate-500 text-white px-3 py-1 rounded-lg text-xs">Level</button>
                    <button
                      className="bg-blue-400 text-white px-3 py-1 rounded-lg text-xs"
                      onClick={() => toggleModal(user)} // Pass the clicked user data to modal
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No users found</div>
            )}
          </aside>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-30">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Details</h2>

            {/* Display selected user data */}
            <div className="mb-4">
              <p className="font-semibold">Name: </p>
              <p>{selectedUser.name}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">SponsorId: </p>
              <p>{selectedUser.sponsorId}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Epin </p>
              <p>{selectedUser.epin}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Email: </p>
              <p>{selectedUser.email}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Number: </p>
              <p>{selectedUser.number}</p>
            </div>

            {/* Add any other user-specific details you want to show here */}

            <button
              onClick={toggleModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminLevel;
