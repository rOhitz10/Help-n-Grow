import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { FaArrowCircleRight } from 'react-icons/fa';

function ReceiveRequest() {
  const sidebarRef = useRef(null);
  const [menuBar, setMenuBar] = useState(false);
  const [requests, setRequests] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  // const [receiveData, setReceiveData] = useState([]);
  const [receiveCount, setReceiveCount] = useState('');

  const userId = localStorage.getItem('epin');

   // Handle menu bar toggling 
   const handleClick = () => setMenuBar(!menuBar);

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

  useEffect(() => {
    const fetchReceiveData = async () => {
      try {
        const response = await axios.get('/api/v1/my-requests', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log(response,"res");
        
        const requestsData = response.data.data;
        setRequests(requestsData);
        

        // Update pending requests count in the parent component
        const pendingCount = requestsData.filter((req) => req.status === 'pending').length;
              setReceiveCount(pendingCount);
      } catch (error) {
          console.error('Failed to fetch requests:', error);
        }
      };
    
      fetchReceiveData();
    }, []);


  // Function to handle acceptance of a request
  const handleAccept = async (requestId) => {
    try {
      const response = await axios.put(
        `/api/v1/accept/${requestId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      const newStatus = response.data.data.status;

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status: newStatus } : request
        )
      );
      setErrorMessage(null); // Clear any previous errors
    } catch (error) {
      setErrorMessage('Failed to accept the request. Please try again.');
      console.error('Failed to accept request:', error);
    }
  };

  // Function to handle rejection of a request
  const handleReject = async (requestId) => {
    try {
      const response = await axios.put(
        `/api/v1/reject/${requestId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      const newStatus = response.data.data.status;

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status: newStatus } : request
        )
      );
      setErrorMessage(null); // Clear any previous errors
    } catch (error) {
      setErrorMessage('Failed to reject the request. Please try again.');
      console.error('Failed to reject request:', error);
    }
  };

  return (
    

    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-60 transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${menuBar ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-60">
        <button
          className={`absolute m-4 lg:hidden rounded-full z-20 ${menuBar ? 'hidden' : ''}`}
          onClick={handleClick}
        >
          <FaArrowCircleRight size={30} className="transition-transform duration-300" />
        </button>

        <Header />
    
    <div className="border-2 border-green-400 rounded-lg text-center m-8 p-6">
      <h2 className="text-xl font-semibold text-green-500">Receive Help</h2>
      <button className="my-4 px-4 py-2 bg-green-500 text-white rounded-full"   >
        {receiveCount} Receive Link Available
      </button>
     
    <div className="overflow-y-auto h-80 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-4">
      {errorMessage && (
        <div className="text-red-500 text-sm bg-red-100 border border-red-500 p-2 rounded-md mb-4">
          {errorMessage}
        </div>
      )}

      {requests.length > 0 ? (
        requests.map((request) => (
          <div
          key={request._id}
          className="flex items-center justify-between p-4 mb-4 bg-white shadow hover:shadow-green-300 rounded-lg transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-gray-700">
                {request.senderId?.name || 'Unknown Sender'}
              </div>
            </div>

            <div className="flex space-x-3">
              {request.status === 'pending' && (
                <>
                  <button
                    className="flex items-center px-3 py-1 text-sm font-medium text-green-600 border border-green-500 rounded hover:bg-green-500 hover:text-white transition"
                    onClick={() => handleAccept(request._id)}
                    >
                    <FaCheck className="mr-1" /> Accept
                  </button>
                  <button
                    className="flex items-center px-3 py-1 text-sm font-medium text-red-600 border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
                    onClick={() => handleReject(request._id)}
                    >
                    <FaTimes className="mr-1" /> Reject
                  </button>
                </>
              )}

              {request.status === 'accepted' && (
                <span className="px-3 py-1 text-sm font-medium text-green-600 border border-green-500 rounded">
                  Accepted
                </span>
              )}

              {request.status === 'rejected' && (
                <span className="px-3 py-1 text-sm font-medium text-red-600 border border-red-500 rounded">
                  Rejected
                </span>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          <p>No requests available.</p>
        </div>
      )}
    </div>
      </div>
      </div>
      </div>
  );
}

export default ReceiveRequest;
