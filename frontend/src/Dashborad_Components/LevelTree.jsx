import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaRedoAlt, FaUserCircle, FaArrowCircleRight, FaTimes } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const LevelCard = ({ node, grandChildCount, onClick }) => {
  const { name, epin, children } = node;

  return (
    <div className="flex justify-center items-center border-2 shadow-lg px-2 min-w-full h-52 cursor-pointer" onClick={() => onClick(node)}>
      <div>
        <div className="flex flex-col justify-center items-center rounded-full p-4 mx-4">
          <span className="flex justify-center items-center bg-green-500 text-white rounded-full p-4">
            <FaUserCircle size={40} />
          </span>
          <h2>{name}</h2>
          <p className="text-center">{epin}</p>
        </div> 
      </div>

      <div className={`flex mx-4 ${children.length > 3 ? 'overflow-x-scroll rounded-lg shadow-md scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200' : ''} w-[85%]`}>
        {children.length > 0 ? (
          children.map((child) => (
            <div className="flex flex-col mx-8 justify-center items-center" key={child._id} onClick={(e) => { e.stopPropagation(); onClick(child); }}>
              <span className="flex justify-center items-center bg-green-400 text-white rounded-full p-4">
                <FaUserCircle size={40} />
              </span>
              <h1>{child.name}</h1>
              <h1>{child.epin}</h1>
            </div>
          ))
        ) : (
          <p className="text-gray-500 p-4">No children</p>
        )}
      </div>
    </div>
  );
};

function LevelTree() {
  const [menuBar, setMenuBar] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null); // Store selected node for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open/close state
  const modalRef = useRef(null);
  const sidebarRef = useRef(null);
  const { logout } = useAuth();

  const handleClick = () => setMenuBar(!menuBar);

  const handleOutsideClick = (event) => {
    // Close modal if clicked outside of the modal
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/v1/get-grand-nodes', { headers: { Authorization: `Bearer ${token}` } });
        setData(res.data.data || []);
      } catch (error) {
        console.error("Cannot fetch data", error);
        if (error.response && error.response.status === 401) {
          logout();
        }
      }
    };
    fetchData();
  }, [token, logout]);

  const countGrandChildren = (node) => {
    if (!node.children || node.children.length === 0) return 0;
    return node.children.reduce((count, child) => count + 1 + countGrandChildren(child), 0);
  };

  const filteredData = data.filter((node) =>
    node.epin.includes(searchQuery) ||
    node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (node.children && node.children.some((child) =>
      child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.epin.includes(searchQuery)
    ))
  );

  const openModal = (node) => {
    setSelectedNode(node);
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    setSelectedNode(null);
  };

  return (
    <div className="flex min-h-screen">
      <div ref={sidebarRef} className={`fixed top-0 left-0 w-60 transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${menuBar ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      <div className="flex-1 lg:ml-60">
        <button className="absolute m-4 rounded-full z-20 lg:hidden" onClick={handleClick}>
          <FaArrowCircleRight size={30} className={`transition-transform duration-300 ${menuBar ? 'hidden' : ''}`} />
        </button>

        <Header />

        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-8">Level Tree</h1>
          <div className="flex space-x-4 mb-6">
            <input
              type="text"
              placeholder="Search by epin or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
              <FaSearch className="inline mr-2" />
              Search
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md" onClick={() => setSearchQuery('')}>
              <FaRedoAlt className="inline mr-2" />
              Reset
            </button>
          </div>

          {/* Modal for selected node */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div
                ref={modalRef}
                className="bg-white p-8 rounded-md shadow-lg w-96 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modal-open"
              >
                <button
                  className="absolute top-2 right-2 text-gray-500 text-2xl hover:text-gray-700"
                  onClick={closeModal}
                >
                  <FaTimes />
                </button>
                <h2 className="text-2xl font-semibold mb-4">{selectedNode.name}</h2>
                <p><strong>Epin:</strong> {selectedNode.epin}</p>
                <p><strong>Children:</strong> {selectedNode.children ? selectedNode.children.length : 0}</p>
                <p><strong>Grandchildren:</strong> {countGrandChildren(selectedNode)}</p>

                {/* Display children in the modal */}
                {selectedNode.children && selectedNode.children.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold">Children:</h3>
                    {selectedNode.children.map((child) => (
                      <div key={child._id} className="mt-2" onClick={(e) => { e.stopPropagation(); openModal(child); }}>
                        <p>Name: {child.name}</p>
                        <p>Epin: {child.epin}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Render the filtered data */}
        {filteredData.map((node) => (
          <LevelCard key={node._id} node={node} grandChildCount={countGrandChildren(node)} onClick={openModal} />
        ))}
      </div>
    </div>
  );
}

export default LevelTree;