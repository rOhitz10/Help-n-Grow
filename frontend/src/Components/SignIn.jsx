import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Img from "../assets/signinImg.jpg"

const SignIn = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    id: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('/api/v1/user-login', { ...data });
      login(res.data.token, res.data.user.epin);
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-start bg-cover bg-center p-6 sm:p-8"
      style={{
        backgroundImage: `url(${Img})`,
      }}
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-teal-950 bg-opacity-5 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-white">Sign In to Your Account</h2>
          <p className="text-gray-400">
            Get started for free{' '}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign Up Here
            </Link>
          </p>
        </div>

        {error && (
          <div className="text-red-500 bg-red-100 text-center p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id" className="sr-only">
              ID
            </label>
            <input
              id="id"
              name="id"
              type="text"
              value={data.id}
              onChange={handleChange}
              required
              className="appearance-none rounded-lg relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              placeholder="Your epin or number"
              aria-label="id"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              value={data.password}
              onChange={handleChange}
              required
              className="appearance-none rounded-lg relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              placeholder="Password"
              aria-label="Password"
            />
            <div
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {passwordVisible ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <div className="text-sm">
            <Link to="/forgot/password" className="text-indigo-600 hover:text-indigo-500">
                Forgot Password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;



