import React from 'react';

const UserCard = ({ user }) => {
  const {
    epin,
    name,
    email,
    number,
    sponsorId,
    level,
    createdAt,
    activate,
    selfInvestment,
    teamInvestment,
    totalActivated,
    totalDirectActivated,
  } = user;

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6 space-y-4 md:space-y-0 md:space-x-6">
      {/* User ID and Actions */}
      <div className="flex flex-col space-y-2 md:w-1/4">
        <div className="text-gray-600 font-semibold">ID: {epin}</div>
        <div className="text-gray-500 text-sm">Sponsored By {sponsorId}</div>
        <div className="flex space-x-4">
          level:{level}
        </div>
      </div>

      {/* Personal and Team Details */}
      <div className="flex flex-col md:flex-row justify-between md:w-2/3  md:space-y-0">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">PERSONAL DETAILS</h3>
          <p className="text-gray-600">Name: {name}</p>
          <p className="text-gray-600">Email: {email}</p>
          <p className="text-gray-600">Phone: {number}</p>
        </div>
      
      {/* Joined and Activated Info */}
      <div className="md:w-1/4 text-gray-500 text-sm ">
        <p>
          Joined on: {createdAt} 
        </p>
          <p className="mt-3">
            {activate ?   "activated" : "Deactivated"}
          </p>
      </div>
      </div>

    </div>
  );
};

export default UserCard;
