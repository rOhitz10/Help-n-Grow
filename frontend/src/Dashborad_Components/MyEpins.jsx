import { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import { PiFlyingSaucerDuotone } from "react-icons/pi";
import Header from './Header';
import { FaArrowCircleRight } from "react-icons/fa";


const MyEpins = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const [menuBar, setMenuBar] = useState(false);

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
          className="absolute m-4 lg:hidden rounded-full z-20 "
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
      <div className=' p-8'>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Epins</h1>
          <button
            className="bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-2 px-4 rounded"
            >
            Transfer History
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow min-h-96">
          <div className="flex justify-end mb-4">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
              Excel Export
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Filter 0
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className='flex gap-10 my-2'>
              <input className='ml-4' type="checkbox" />
              <h1> SR no.</h1>
            </div>
            <div className='min-h-52 bg-gray-50 rounded flex justify-center items-center'>
            <PiFlyingSaucerDuotone size={80}/>
            No  data to show
            </div>
          </div>

          <div className="text-sm text-gray-500 my-6 ">
            Showing to of {0} Entries
          </div>
        </div>
      </div>
      </div>
   
    </div>
  );
};

export default MyEpins;
