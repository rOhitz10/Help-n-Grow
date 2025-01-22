import React, { useState, useEffect } from 'react';
import Logo from '../assets/Logo.png';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Img from '../assets/signupImg.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

function ReferalSignUp() {
  const { sponsorEpin } = useParams();
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

  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (sponsorEpin) {
      setFormData((prevData) => ({
        ...prevData,
        sponsorId: sponsorEpin,
      }));
    }
  }, [sponsorEpin]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/create-chain", formData)
      .then((res) => {
        if (res.status === 201) {
          // Show success toast
          toast.success('You are successfully registered!', {
            position: "top-right", // You can customize the position
            autoClose: 5000,        // Auto close after 5 seconds
            hideProgressBar: false, // Show progress bar
            closeOnClick: true,     // Close on click
            pauseOnHover: true,     // Pause on hover
            draggable: true,        // Allow dragging
            progress: undefined,    // Display progress bar
          });
          navigate('/signin');
        }
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.msg || 'Registration failed. Please try again.';
        setError(errorMessage);
      });
  };

  return (
    <div
      className="bg-teal-950 min-h-screen flex items-center justify-start bg-cover bg-center p-6 sm:p-8"
      style={{
        backgroundImage: `url(${Img})`,
      }}
    >
      <div className="border-2 border-teal-700 rounded-lg hover:shadow-lg opacity-90 hover:bg-black p-8 max-w-lg w-full">
        <div className="text-center mb-4">
          <img src={Logo} alt="Logo" className="w-24 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
          <p className="text-gray-400 mt-1">
            Already have an account?{' '}
            <Link to="/signin" className="text-indigo-600 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>

        {error && (
          <div className="text-red-500 bg-red-100 border border-red-400 text-center rounded-lg p-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="sponsorId"
            value={formData.sponsorId}
            readOnly
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
      <ToastContainer />
    </div>
  );
}

export default ReferalSignUp;
