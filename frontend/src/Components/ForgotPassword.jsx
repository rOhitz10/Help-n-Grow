import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState(''); // Only need ID (email or username)
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setemail( value );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setLoading(true);

    try {
      const res = await axios.post('/api/v1/reset-Password-token-generate', { email },
       { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }}
     );

     
      console.log(res);
      

      alert('Password reset email sent! Please check your inbox.');

    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'Failed to send password reset email. Please try again.';
      setError(errorMessage); // Update error state with the message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-6 sm:p-8">
      <div className="absolute top-4 left-4">
              <Link to='/signin' className="flex items-center text-gray-700 hover:text-gray-900">
                <FaArrowLeftLong className="mr-2" />
                <span>Back</span>
              </Link>
            </div>
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-800">Forgot Password</h2>
          <p className="text-gray-600">
            Enter your email address to reset your password.
          </p>
          <p className="text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign Up here
            </Link>
          </p>
        </div>

        {/* Display error message */}
        {error && (
          <div className="text-red-500 bg-red-100 text-center p-2 mb-4">
            {error}
          </div>
        )}

        {/* Forgot password form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id" className="sr-only">ID (Email)</label>
            <input
              id="id"
              name="id"
              type="email" // Assuming email for password recovery
              value={email}
              onChange={handleChange}
              required
              className="appearance-none rounded-lg relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              placeholder="Enter Your Email Address"
              aria-label="id"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? (
                <span className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full text-white mr-2"></span>
              ) : (
                'Send Password Reset Link'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
