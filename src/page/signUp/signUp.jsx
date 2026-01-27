import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../api/authApi/authApi';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ userName: '', email: '', phoneNumber: '', password: '', confirmPassword: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const resultAction = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(resultAction)) {
      if (resultAction.payload?.statusCode === 200) {
        alert('Success!');
        navigate('/LogIn');
      } else {
        setError(resultAction.payload?.message || 'Registration failed');
      }
    }
    setLoading(false);
  };

  return (
    <section className="flex items-center justify-center min-h-[80vh] px-4 py-10">
      <div className="w-full max-w-[370px]">
        <h2 className="text-3xl font-medium mb-10">Create an account</h2>
        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input name="userName" placeholder="User Name" onChange={handleChange} className="border-b border-gray-300 pb-2 outline-none" required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border-b border-gray-300 pb-2 outline-none" required />
          <input name="phoneNumber" placeholder="Phone" onChange={handleChange} className="border-b border-gray-300 pb-2 outline-none" required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border-b border-gray-300 pb-2 outline-none" required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="border-b border-gray-300 pb-2 outline-none" required />
          <button type="submit" disabled={loading} className="bg-[#DB4444] text-white py-4 rounded font-medium disabled:bg-gray-400">
            {loading ? 'Processing...' : 'Create Account'}
          </button>
        </form>
        <div className="mt-8 text-center">
          <Link to="/LogIn" className="text-gray-600">Already have account? <span className="text-black font-medium border-b border-black">Log in</span></Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;