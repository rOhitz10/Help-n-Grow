import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';


const DP = () => {
 
   const token = localStorage.getItem('token');
   const [name,setname] = useState('');
 
   useEffect(() => {
     if (token) {
      
       try {
         const decoded = jwtDecode(token);
         setname(decoded.name || "User"); // Use decoded userName or fallback
        
       }  catch (error) {
         console.error("Failed to decode token:", error);
       }
     }
   }, [token]);
   
  // Extract the first letter of the name
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center ">
      <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold text-lg rounded-full">
        {firstLetter}
      </div>
    </div>
  );
};

export default DP;
