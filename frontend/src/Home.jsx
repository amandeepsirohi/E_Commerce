import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "./redux/api/productApiSlice";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Message from "./components/Message";
import Product from "./pages/Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  return (
    <>
      <span className=" -mt-3 p-0 flex justify-center mb-4 items-center text-[25px] h-[30px] bg-red-700  color-white">
        {" "}
        Big Billion days sale is finally here!!
        <img className="ml-2 " width="30" height="30" src="https://img.icons8.com/ios/50/FFFFFF/discount--v1.png" alt="discount--v1"/>
      </span>

      

      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[16rem] mt-[10rem] text-[3rem] ">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[15rem] mt-[10rem]">
              Shop
            </Link>
          </div>
          <div>
            <div className="flex justify-center flex-wrap mt-[1rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
