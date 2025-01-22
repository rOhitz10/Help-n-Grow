import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Img from '../assets/binaryImg.jpg'

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sponsorId: '',
    epin: '',
    password: '',
    name: '',
    email: '',
    number: '',
    acceptTerms: false,
  });
  
  const [error, setError] = useState(''); // State to handle error messages
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/v1/create-chain", formData)
      .then((res) => {
        if (res.status === 201) {
          alert("You are registered");
          navigate('/signin');
        }
      })
      .catch((err) => {
        console.error(err);
        // Set the error message to state
        const errorMessage = err.response?.data?.msg || 'Registration failed. Please try again.';
        setError(errorMessage);
      });
  };

  return (
 <div
      className="min-h-screen flex items-center justify-start bg-cover bg-center  sm:p-8"
      style={{
        backgroundImage: `url(${Img})`,
      }}
    >      <div className="border-2 border-blue-950 rounded-lg shadow-lg p-8 max-w-lg w-full">
        {/* Left Side - Form */}
        {/* <div className="w-full md:w-1/2 p-8"> */}
          <div className="text-center mb-4">
            <img src={Logo} alt="Logo" className="w-32 mx-auto" />
            <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
            <p className="text-gray-400 mt-1">
              Already have an account?{' '}
              <Link to="/signin" className="text-indigo-600 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Display error message */}
          {error && (
            <div className="text-red-500 bg-red-100 border border-red-400 text-center rounded-lg p-2 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="sponsorId"
              placeholder="Sponsor ID"
              value={formData.sponsorId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="epin"
              placeholder="Epin"
              value={formData.epin}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <div
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {passwordVisible ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
              </div>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="tel"
              name="number"
              placeholder="Mobile No."
              value={formData.number}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-400">
                I accept the{' '}
                <a href="#" className="text-indigo-600 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              disabled={!formData.acceptTerms}
              className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
            >
              Sign up
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        {/* <div className="hidden md:block w-1/2 bg-cover bg-center rounded-r-lg" style={{ backgroundImage: `url(${signupImg})` }}></div> */}
      {/* </div> */}
    </div>
  );
}

export default SignUp;
