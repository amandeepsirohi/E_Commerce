import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);
  const dispatch = useDispatch();
  const submitHandler = async(e) => {
    e.preventDefault();
    if(password !== confirmPassword)
    {
        toast.error("Passwords don't match");
    }
    else{
        try{
            const res = await updateProfile({_id:userInfo._id , username , email ,password}).unwrap();
            dispatch(setCredentials({...res}));
            toast.success("Profile updated successfully");
        } catch(error)
        {
            toast.error(error?.data?.message || error.message)
        }
    }
  }
  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-7 text-white">
            Update Profile
          </h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
                <label className=" block text-white mb-1">Name</label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    className="mt-1 p-3  rounded w-full bg-[#262626] text-white"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className=" block text-white mb-1">Email</label>
                <input
                    type="email"
                    placeholder="Enter Email"
                    className="mt-1 p-3  rounded w-full bg-[#262626] text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className=" block text-white mb-1">Password</label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    className="mt-1 p-3  rounded w-full bg-[#262626] text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className=" block text-white mb-1">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="mt-1 p-3  rounded w-full bg-[#262626] text-white"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#ff1493] text-white px-4 py-2 rounded cursor-pointer my-[0.5rem]">
              Update
            </button>
            <Link to="/user-orders" className="text-white py-2 bg-[#ff1493] px-3 rounded my-[0.5rem]  hover:bg-[#960050] ">
            My Orders
            </Link>
            </div>
          </form>
        </div>
        {loadingUpdateProfile && <Loader/>}
      </div>
    </div>
  );
};

export default Profile;
