import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../api/authApi/authApi';
import { notification } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const resultAction = await dispatch(loginUser({ userName: userName.trim(), password: password.trim() }));
    
    if (loginUser.fulfilled.match(resultAction)) {
      if (resultAction.payload?.statusCode === 200) {
        api.open({
          message: 'Success Login',
          description: `Welcome back, ${userName}!`,
          icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
          placement: 'topRight',
          duration: 2,
        });

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setError(resultAction.payload?.message || 'Access denied');
      }
    } else {
      setError('Invalid username or password');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB] px-4">
      {contextHolder}
      <div className="w-full max-w-[450px] bg-white p-8 md:p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Please enter your details to sign in</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 animate-shake">
            <span className="font-bold">!</span>
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Username</label>
            <input 
              type="text" 
              placeholder="e.g. alex_smith"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-xl outline-none focus:bg-white focus:border-[#E04F4F] focus:ring-4 focus:ring-red-50 transition-all text-gray-700 placeholder:text-gray-300"
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
              <button type="button" className="text-xs text-[#E04F4F] hover:underline font-medium">Forgot?</button>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-xl outline-none focus:bg-white focus:border-[#E04F4F] focus:ring-4 focus:ring-red-50 transition-all text-gray-700 placeholder:text-gray-300"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#E04F4F] hover:bg-[#c94444] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-200 transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account? 
            <button className="text-[#E04F4F] font-bold ml-1 hover:underline">Create one</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;