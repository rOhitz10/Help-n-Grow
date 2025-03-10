import React, { useEffect, useRef, useState } from "react"
import UserCard from "./Sub_component/UserCard"
import Sidebar from "./Sidebar"
import { FaArrowCircleRight } from "react-icons/fa";
import Header from './Header';
import axios from 'axios';

function MyTeam() {
 
  const [Data,setData] = useState('');
  const sidebarRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  
  const sponsorId = localStorage.getItem('epin')
  useEffect(() => {
    const fetchData = async () => {
      if (sponsorId) { // Only fetch data if sponsorId is available
        try {
          const res = await axios.get("/api/v1/all-downline/",{
            params:{sponsorId},
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }, 
          });
         setData(res.data.data);
         
        } catch (error) {
          setError('Error fetching data');
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); // Set loading to false after data fetch attempt
        }
      } else {
        setLoading(false); // If no sponsorId, stop loading
      }
    };

    fetchData();
  }, [sponsorId]); // Run this effect when sponsorId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}:no downline found</div>;

  
 
  
  
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
    <div className="flex-1 lg:ml-60 ">
      {/* Toggle Button */}
      <button
        className="absolute m-4   rounded-full z-20 lg:hidden "
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
      <div className="flex-1 flex-col p-8 ">
      <h1 className="text-2xl font-semibold">My Team</h1>

      {Data.map((data) => 
       <div className="my-8">
        <UserCard  user={data} />
       </div>
      )}
      </div>

   
    </div>
    </div>
  )
}

export default MyTeam
