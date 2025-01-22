import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'; 
import AdminSidebar from './AdminSidebar';
import { FaArrowCircleRight } from 'react-icons/fa';
import { FaCopy } from 'react-icons/fa';

function GenerateEpin() {
  const [menuBar, setMenuBar] = useState(false);
  const sidebarRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [isCopied, setIsCopied] = useState(false);


  const fetchData = async () => {
    try {
      const response = await axios.post("/api/v1/generateEpins", {
        quantity,
      });
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.error("Unexpected data format:", response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSearch = () => {
  };

  const handleClick = () => {
    setMenuBar(!menuBar);
  };

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setMenuBar(false);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setQuantity(0);
    setData([]);
  };

  const handleCopyAll = () => {
  if (data.length > 0) {
    const epinsText = data.map(item => item.epins).join('\n');
    navigator.clipboard.writeText(epinsText)
      .then(() => {
        setIsCopied(true); // Set to "Copied" after success
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy text:', err);
      });
  } else {
    alert('No ePins to copy!');
  }
};


  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-60 transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${menuBar ? 'translate-x-0' : '-translate-x-full'} lg:static lg:w-60`}
      >
        <AdminSidebar />
      </div>

      {/* Dashboard content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Toggle Button */}
        <button
          className={`absolute m-4 lg:hidden rounded-full z-20 ${menuBar ? 'hidden' : ''}`}
          onClick={handleClick}
        >
          <FaArrowCircleRight size={30} className="text-gray-600" />
        </button>

        <div className="p-6 m-12">
          {/* <div className="flex border border-gray-300 rounded-lg p-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
              className="w-full p-2 outline-none text-gray-700"
            />
            <button
              onClick={handleSearch}
              className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div> */}

          <div className="font-bold flex flex-col gap-4 justify-center items-center p-8">
            <label htmlFor="Quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="p-2 border rounded"
            />
            <button
              onClick={fetchData}
              className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Generate Epin
            </button>
            <button
              onClick={handleReset}
              className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Reset
            </button>

            {/* Display the generated epins */}
            <div className="w-full min-w-60 p-4 border rounded-lg shadow-lg bg-white mt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-blue-500">Generated EPins</h2>
                {data.length > 0 && (
                 <button
                  onClick={handleCopyAll}
                  className="flex items-center px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                 >
                  <FaCopy className="mr-2" />
                  {isCopied ? 'Copied' : 'Copy All'}
                </button>
                )}

              </div>
              <div className="h-60 scrollbar-y mt-2 border-t border-gray-200 pt-2">
                {data.length > 0 ? (
                  <ul className="space-y-2">
                    {data.map((item, index) => (
                      <li key={index} className="p-2 bg-gray-100 rounded">
                        {item.epins}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 p-2">No EPin generated.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateEpin;
