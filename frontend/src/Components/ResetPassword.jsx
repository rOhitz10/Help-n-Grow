import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

function ResetPassword() {
  const {token} = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = () => {
    // Check password length
    if (password.length < 6) {
      setError('Password must be at least 8 characters long.');
      return false;
    }
    // Check password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validatePassword()) {
     try {
      const res = await axios.post('/api/v1/renew-Password-reset-password', {
       password, 
       confirmPassword,
       token
     },
    // { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }}
    )
        console.log(res,"reset password")
        setSuccess('Password has been successfully reset.');
        
     } catch (error) {
      console.error(error,"fail to reset password");
      
     }
      // Simulate API call
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <div className="absolute top-4 left-4">
        <Link to='/forgot/password' className="flex items-center text-gray-700 hover:text-gray-900">
          <FaArrowLeftLong className="mr-2" />
          <span>Back</span>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-bold mb-2">Create New Password</h1>
        <p className="text-gray-600 text-sm mb-4">
          Your new password must be different from previously used passwords.
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm mb-2">New Password</label>
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
            <div
              className="absolute top-9 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm mb-2">Confirm Password</label>
            <input 
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
            />
            <div
              className="absolute top-9 right-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Reset Password
          </button>
        </form>
      </div>
      <span className='absolute bottom-6 p-6'><h1 className='text-white'>Did you success to reset password ?<Link to='/signin'><p className='text-black hover:text-red-500'>Login</p></Link></h1></span>
    </div>
  );
}

export default ResetPassword;
