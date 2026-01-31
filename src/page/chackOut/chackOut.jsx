import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "6YzVHK7FsWOFAq5tU";
  const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_xi3ycml";
  const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "lu6gres";
  console.log(emailjsPublicKey);
  console.log(emailjsServiceId);
  console.log(emailjsTemplateId);
  

  emailjs.init(emailjsPublicKey);

  const [orderItems, setOrderItems] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    phone: '',
    email: '',
    document: null
  });
  const [saveInfo, setSaveInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSending, setIsSending] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('billingDetails');
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setSaveInfo(true);
    }

    const checkoutData = localStorage.getItem('checkoutData');
    if (checkoutData) {
      const data = JSON.parse(checkoutData);
      setOrderItems(data.cartItems || []);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const sendOrderEmail = async (orderData) => {
    try {
      const templateParams = {
        to_email: formData.email,
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: `${formData.streetAddress}, ${formData.city}`,
        order_id: orderData.orderId,
        order_date: new Date().toLocaleDateString('ru-RU'),
        order_total: `$${orderData.total.toFixed(2)}`,
        order_items: orderData.items.map(item =>
          `${item.name || 'Товар'} x${item.quantity || 1} - $${((item.price || 0) * (item.quantity || 1)).toFixed(2)}`
        ).join('\n'),
        subtotal: `$${orderData.subtotal.toFixed(2)}`,
        shipping: orderData.shipping === 0 ? 'Бесплатно' : `$${orderData.shipping.toFixed(2)}`,
        payment_method: orderData.paymentMethod === 'cod' ? 'Наличными при получении' : 'Банковский перевод'
      };

      const response = await emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        templateParams
      );

      console.log('✅ Письмо отправлено успешно:', response.status, response.text);
      return true;
    } catch (error) {
      console.error('❌ Ошибка отправки письма:', error);
      return false;
    }
  };

  const handlePlaceOrder = async () => {
    if (!formData.firstName || !formData.email || !formData.phone ||
      !formData.streetAddress || !formData.city) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (orderItems.length === 0) {
      alert('Ваша корзина пуста');
      return;
    }

    if (isSending) return;

    if (saveInfo) {
      localStorage.setItem('billingDetails', JSON.stringify(formData));
    } else {
      localStorage.removeItem('billingDetails');
    }

    const subtotal = orderItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
    const shipping = 0;
    const total = subtotal + shipping;

    const generatedOrderId = `ORD-${Date.now()}`;

    const order = {
      orderId: generatedOrderId,
      items: orderItems,
      customerInfo: formData,
      paymentMethod: paymentMethod,
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      date: new Date().toISOString()
    };

    setIsSending(true);

    try {
      const emailSent = await sendOrderEmail(order);

      if (emailSent) {
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.push(order);
        localStorage.setItem('orders', JSON.stringify(existingOrders));

        localStorage.removeItem('checkoutData');

        setOrderId(generatedOrderId);
        setOrderPlaced(true);

        setTimeout(() => {
          window.location.href = '/';
        }, 5000);
      } else {
        alert('Заказ оформлен, но не удалось отправить письмо с подтверждением. Пожалуйста, свяжитесь с поддержкой.');
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.push(order);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
        setIsSending(false);
      }
    } catch (error) {
      console.error('Ошибка оформления заказа:', error);
      alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
      setIsSending(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-[1170px] mx-auto px-4 py-20 text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8">
          <h2 className="text-2xl font-bold mb-2">🎉 Заказ успешно оформлен!</h2>
          <p className="mb-4">Номер вашего заказа: <strong>{orderId}</strong></p>
          <p>Письмо с подтверждением отправлено на {formData.email}</p>
        </div>
        <p className="mb-8">Мы свяжемся с вами для уточнения деталей доставки.</p>
        <Link
          to="/"
          className="bg-[#DB4444] text-white px-6 py-3 rounded font-medium hover:bg-[#c03939]"
        >
          Вернуться на главную
        </Link>
      </div>
    );
  }

  const subtotal = orderItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  if (orderItems.length === 0) {
    return (
      <div className="max-w-[1170px] mx-auto px-4 py-20">
        <nav className="flex mb-8 text-sm text-gray-400">
          <Link to="/" className="hover:underline">Главная</Link> /
          <Link to="/cart" className="hover:underline ml-1">Корзина</Link> /
          <span className="text-black ml-1">Оформление заказа</span>
        </nav>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Ваша корзина пуста</h2>
          <p className="text-gray-600 mb-8">Добавьте товары в корзину перед оформлением заказа</p>
          <Link
            to="/cart"
            className="bg-[#DB4444] text-white px-6 py-3 rounded font-medium hover:bg-[#c03939]"
          >
            Вернуться в корзину
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1170px] mx-auto px-4 py-20">
      <nav className="flex mb-8 text-sm text-gray-400">
        <Link to="/" className="hover:underline">Главная</Link> /
        <Link to="/cart" className="hover:underline ml-1">Корзина</Link> /
        <span className="text-black ml-1">Оформление заказа</span>
      </nav>

      <h1 className="text-3xl font-medium mb-8">Детали оформления</h1>

      <div className="flex flex-col lg:flex-row gap-20">
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm">
                Имя <span className="text-[#DB4444]">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-[#F5F5F5] rounded p-3 outline-none focus:ring-1 focus:ring-[#DB4444]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm">
                Фамилия
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-[#F5F5F5] rounded p-3 outline-none focus:ring-1 focus:ring-[#DB4444]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm">
              Название компании
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="bg-[#F5F5F5] rounded p-3 outline-none focus:ring-1 focus:ring-[#DB4444]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm">
              Адрес <span className="text-[#DB4444]">*</span>
            </label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className="bg-[#F5F5F5] rounded p-3 outline-none focus:ring-1 focus:ring-[#DB4444]"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm">
              Квартира, этаж и т.д.
            </label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              className="bg-[#F5F5F5] rounded p-3 outline-none focus:ring-1 focus:ring-[#DB4444]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm">
              Город <span className="text-[#DB4444]">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="bg-[#F5F5F5] rounded p-3 outline-none focus:ring-1 focus:ring-[#DB4444]"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm">
              Телефон <span className="text-[#DB4444]">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-[#F5F5F5] rounded p-3 outline-none focus:ring-1 focus:ring-[#DB4444]"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm">
              Email <span className="text-[#DB4444]">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-[#F5F5F5] rounded p-3 outline-none focus:ring-1 focus:ring-[#DB4444]"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm">
              Документы (если требуется)
            </label>
            <input
              type="file"
              name="document"
              onChange={handleChange}
              className="bg-[#F5F5F5] rounded p-3 outline-none focus:ring-1 focus:ring-[#DB4444]"
            />
            <p className="text-xs text-gray-500">Максимальный размер: 5MB</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="save-info"
              className="w-5 h-5 accent-[#DB4444]"
              checked={saveInfo}
              onChange={() => setSaveInfo(!saveInfo)}
            />
            <label htmlFor="save-info" className="text-sm">
              Сохранить эту информацию для быстрого оформления в будущем
            </label>
          </div>
        </div>

        <div className="w-full lg:w-[420px] pt-4">
          <div className="space-y-6 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4">Ваш заказ</h3>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {orderItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL || ''}/images/${item.image}`}
                          alt={item.name}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <div className="text-xs text-gray-400">img</div>
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-medium">{item.name || 'Товар'}</span>
                      <div className="text-xs text-gray-500">
                        Кол-во: {item.quantity || 1} × ${(item.price || 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Подытог:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Доставка:</span>
                <span className="font-medium">{shipping === 0 ? 'Бесплатно' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-3 border-t border-gray-200">
                <span>Итого:</span>
                <span className="text-[#DB4444]">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="font-medium">Способ оплаты</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    id="bank"
                    className="w-5 h-5 accent-black"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                  />
                  <label htmlFor="bank" className="text-sm">Банковский перевод</label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    id="cod"
                    className="w-5 h-5 accent-black"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <label htmlFor="cod" className="text-sm">Наличными при получении</label>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isSending}
              className={`w-full py-3 rounded font-medium transition-colors mt-6 ${isSending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#DB4444] text-white hover:bg-[#c03939]'
                }`}
            >
              {isSending ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Оформляем заказ...
                </span>
              ) : (
                'Оформить заказ'
              )}
            </button>

            <div className="text-xs text-gray-500 text-center mt-4">
              Оформляя заказ, вы соглашаетесь с нашими условиями
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;