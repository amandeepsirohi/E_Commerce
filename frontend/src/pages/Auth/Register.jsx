import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        console.log({ username, email, password });
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("Successfully Registered!");
      } catch (error) {
        console.log(error);
        toast.error(error.data.message);
      }
    }
  };
  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4 text-white">Register</h1>
        <form className="container w-[40rem]" onSubmit={submitHandler}>
          <div className="my-[2rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 rounded w-full bg-[#262626] text-white"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label
              htmlFor="name"
              className="mt-5 block text-sm font-medium text-white">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2  rounded w-full bg-[#262626] text-white"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="name"
              className="block mt-5 text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2  rounded w-full bg-[#262626] text-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="name"
              className=" mt-5 block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2  rounded w-full bg-[#262626] text-white"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              disabled={isLoading}
              type="submit"
              className="bg-[#ff1493] text-white px-4 py-2 rounded cursor-pointer my-[1.5rem]">
              {isLoading ? "Registering " : "Register"}
            </button>
            {isLoading && <Loader />}
          </div>
        </form>
        <div className="-mt-8">
          <p className="text-white">
            Already have a account ?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-[#ff1493] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <img
        src="https://wallpapercrafter.com/th8006/1637151-black-and-white-interior-people-coffee-shop-seating.jpg"
        alt=""
        className="-mt-3 h-[971px] w-[1054px] object-cover xl:block md:hidden sm:hidden rounded-lg"
      />
    </section>
  );
};

export default Register;
