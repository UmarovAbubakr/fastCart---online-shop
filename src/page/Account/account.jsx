import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, getProfileInfo, getUser } from '../../api/userApi/userApi';
import { jwtDecode } from 'jwt-decode';
import { useFormik } from 'formik';
import { Input } from 'antd';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter ,
  DialogClose 
} from "@/components/ui/dialog"
const MyAccount = () => {
  const dispatch = useDispatch();
  const userState = useSelector((store) => store.user) || {};

  const userData = userState.data;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;


  useEffect(() => {
    if (user?.sid) {
      dispatch(getUser(user.sid));
    }
  }, [dispatch, user?.sid]);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName);
      setLastName(userData.name || '');
      setEmail(userData.email || '');
      setAddress(userData.address || '');
    }
  }, [userData]);

  console.log(userData);

  const [profile, setProfile] = useState (null);

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const decoded = jwtDecode(token);
          const userId = decoded.sid;

          const data = await getProfileInfo(userId);
          setProfile(data);
        } catch (error) {
          console.error("Invalid token or failed request", error);
        }
      };
      fetchProfile();
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      firstName,
      name: lastName,
      email,
      address,
      currentPassword,
      newPassword
    };
    console.log(updatedData);
  };


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      email: profile?.email || "",
      phoneNumber: profile?.phoneNumber || "",
      dob: profile?.dob || "",
      image: null,
    },
    onSubmit: (values) => {
      const formdata = new FormData();
      formdata.append("lastName", values.lastName);
      formdata.append("firstName", values.firstName);
      formdata.append("email", values.email);
      formdata.append("phoneNumber", values.phoneNumber);
      formdata.append("dob", values.dob);

      if (values.image) formdata.append("image", values.image);
      editProfile(formdata);
    }
  });


  return (
    <div className="max-w-[1170px] mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-16">
        <nav className="text-sm">
          <span className="text-gray-400">Home</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-black font-medium">My Account</span>
        </nav>
        <p className="text-sm">
          Welcome! <span className="text-[#DB4444]">{userData?.firstName || 'Guest'}</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
        <aside className="w-full md:w-[280px] space-y-6">
          <div>
            <h3 className="font-medium text-base mb-4">Manage My Account</h3>
            <ul className="ml-8 space-y-2 text-sm text-gray-500">
              <li className="text-[#DB4444] cursor-pointer">My Profile</li>
              <li className="hover:text-[#DB4444] cursor-pointer">Address Book</li>
              <li className="hover:text-[#DB4444] cursor-pointer">My Payment Options</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base mb-4">My Orders</h3>
            <ul className="ml-8 space-y-2 text-sm text-gray-500">
              <li className="hover:text-[#DB4444] cursor-pointer">My Returns</li>
              <li className="hover:text-[#DB4444] cursor-pointer">My Cancellations</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base mb-4 cursor-pointer">My WishList</h3>
          </div>
        </aside>

        <main className="flex-1 shadow-[0px_1px_13px_rgba(0,0,0,0.05)] rounded p-8 lg:p-12">
          <h2 className="text-[#DB4444] text-xl font-medium mb-8">Edit Your Profile</h2>
          <form onSubmit={formik.handleSubmit}>
            <label className="text-red-600 font-bold text-2xl mb-3">
              {("contactTitle")}
            </label>
            <br />
            <div className="flex justify-between md:gap-5 gap-2">
              <Input
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                placeholder={("firstName")}
              />
              <Input
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                placeholder={("lastName")}
              />
            </div>
            <div className="flex justify-between my-3 md:gap-5 gap-2">
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder={("email")}
              />
              <Input
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                placeholder={("phoneField")}
              />
            </div>
            <div className="flex md:mt-4 mt-3 md:gap-5 gap-2">
              <Input
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) =>
                  formik.setFieldValue("image", event.currentTarget.files?.[0])
                }
              />
              <Input
                name="dob"
                value={formik.values.dob}
                onChange={formik.handleChange}
                placeholder={("dob")}
              />
            </div>
            <div className="flex justify-end gap-2 md:my-5 my-3">
              <button
                type="button"
                className="border rounded-sm px-6.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 duration-200"
              >
                {("cancel")}
              </button>
              <button
                type="submit"
                className="bg-[#DB4444] hover:bg-[#db4444d5] duration-200  text-white px-3 py-1.5 rounded-sm"
              >
                {("saveChanges")}
              </button>
            </div>
          </form>

        </main>
      </div>
    </div>
  );
};

export default MyAccount;