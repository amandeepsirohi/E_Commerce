import { Link } from "react-router-dom";
import React from "react";
import HeartIcon from './HeartIcon';

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-auto rounded"
        />
        <HeartIcon product={product} />
        <div className="p-54">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center mt-2">
              <div>{product.name}</div>
              <span className="bg-slate-100 text-black text-sm font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-pink-900 dark:text-pink-300">
                ${product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
