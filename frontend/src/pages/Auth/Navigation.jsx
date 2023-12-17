import React, { useState } from "react";
import "./Navigation.css";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { LuLogIn } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import {
  useLoginMutation,
  useLogoutMutation,
} from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container">
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to={"/"}
          className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineHome className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>
        <Link
          to={"/shop"}
          className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShopping className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
        </Link>
        <Link
          to={"/cart"}
          className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShoppingCart className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
        </Link>
        <Link
          to={"/favorite"}
          className="flex items-center transition-transform transform hover:translate-x-2">
          <FaHeart className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem]">FAVORITE</span>{" "}
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-white focus:outline-none">
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
        {dropdownOpen && userInfo && (
          <ul
            className={`absolute -right-[50px] -mt-[29px] mr-[120px] space-y-2  text-gray-100 rounded-sm bg-[#1B1B1B] ${
              !userInfo.isAdmin ? "-top-[100px]" : "-top-[300px] mr-[90px]"
            }`}>
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-[#2b2b2b]">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-[#2b2b2b]">
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-[#2b2b2b]">
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-[#2b2b2b]">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-[#2b2b2b]">
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-[#2b2b2b]">
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="block px-4 py-2 hover:bg-[#2b2b2b]"
                onClick={logoutHandler}>
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>
      {!userInfo && (
        <ul>
          <li>
            <Link
              to={"/login"}
              className="flex items-center transition-transform transform hover:translate-x-2">
              <LuLogIn className="mr-2 mt-[3rem] " size={26} />
              <span className="hidden nav-item-name mt-[3rem]">
                Log in
              </span>{" "}
            </Link>
          </li>
          <li>
            <Link
              to={"/register"}
              className="flex items-center transition-transform transform hover:translate-x-2">
              <AiOutlineUserAdd className="mr-2 mt-[3rem] " size={26} />
              <span className="hidden nav-item-name mt-[3rem]">
                Register
              </span>{" "}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
