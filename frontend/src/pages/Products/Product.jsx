import React from "react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[30rem] rounded"
        />
        <HeartIcon product={product} />
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center -mt-1">
            <div className="text-lg -ml-3 font-[400]">{product.name}</div>
            <span className="bg-slate-100 text-black text-[15px] font-[600] -mr-3 px-2.5 py-0.5 rounded-md dark:bg-pink-900 dark:text-pink-300">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
