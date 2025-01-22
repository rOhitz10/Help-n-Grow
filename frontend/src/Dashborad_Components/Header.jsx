import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import Notifications from './Sub_component/Notificaion';
import DP from './Sub_component/DP';

function Header({ id, name, dp }) {
  const { sponsorId } = useParams();
  const [profile, setProfile] = useState(false);
  const [notify, setNotify] = useState(false);
  
  const notifyRef = useRef(null);  // Reference for the notifications dropdown
  const profileRef = useRef(null);  // Reference for the profile dropdown
  
  // Toggle notification menu
  const handleNotifyToggle = useCallback(() => {
    setNotify((prevNotify) => !prevNotify);
  }, []);
  
  // Toggle profile menu
  const handleProfileToggle = useCallback(() => {
    setProfile((prevProfile) => !prevProfile);
  }, []);

  // Close notification dropdown if clicked outside
  const handleClickOutside = useCallback((e) => {
    if (notifyRef.current && !notifyRef.current.contains(e.target) && !e.target.closest('.notification-icon')) {
      setNotify(false);
    }
    if (profileRef.current && !profileRef.current.contains(e.target) && !e.target.closest('.profile-icon')) {
      setProfile(false);
    }
  }, []);
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="py-4 flex justify-end items-center border-b-2 relative">
      {/* Notifications Icon and Dropdown */}
      <div className="mx-6 relative notification-icon" onClick={handleNotifyToggle}>
        <IoNotifications size={30} />
        {notify && (
          <div
            ref={notifyRef}
            className="absolute top-16 right-4  min-h-[80%] rounded-xl z-10  shadow-lg"
          >
            <Notifications />
          </div>
        )}
      </div>

      {/* Profile Icon and Dropdown */}
      <div onClick={handleProfileToggle} className="relative mx-4 cursor-pointer profile-icon">
        <DP />
        {profile && (
          <div
            ref={profileRef}
            className="absolute top-24 right-14 p-6 bg-transparent backdrop-blur-xl rounded-xl flex flex-col justify-center items-center z-10 shadow-lg"
          >
            <Link to={`/dashboard/profile`}>
              <div className="font-semibold hover:bg-gray-300 py-2 px-2  rounded-xl flex gap-2">
                <FaRegUser className="" size={18} />
                <h1>My Profile</h1>
              </div>
            </Link>
            <div className="font-semibold hover:bg-gray-300 px-4 py-2 rounded-xl flex gap-2">
              <IoSettingsOutline size={20} />
              <h1>Settings</h1>
            </div>
            <div className="font-semibold hover:bg-gray-300 px-4 py-2 rounded-xl flex gap-2">
              <RiLogoutCircleRLine size={20} />
              <h1>Log Out</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
