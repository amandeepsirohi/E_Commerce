import React from "react";
import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);
  return <div className="ml-[15rem] ">
    <h1 className="text-[32px] -mt-1 font-semibold mb-7 ml-9  ">
      Favorite Products
    </h1>
    <div className="flex flex-wrap">
  {favorites.map((product) => (
    <Product key={product._id} product={product}/>
  ))}
    </div>
  </div>;
};

export default Favorites;
