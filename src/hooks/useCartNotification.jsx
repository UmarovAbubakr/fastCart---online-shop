import { useSelector } from 'react-redux';
import { notification } from 'antd';
import { Link } from 'react-router-dom';

export const useCartNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
  
  const showAuthError = () => {
    api.error({
      message: 'Authentication Required',
      description: 'Please log in to add items to your cart',
      placement: 'bottomRight',
      duration: 4,
      btn: (
        <Link to="/LogIn">
          <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
            Go to Login
          </button>
        </Link>
      ),
    });
  };
  
  return { showAuthError, isAuthenticated, contextHolder };
};