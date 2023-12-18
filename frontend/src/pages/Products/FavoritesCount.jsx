import React from "react";
import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return <div className="absolute left-2 top-8">
    {favoriteCount > 0 && (
        <span className="ml-2 px-[5px] py-0 text-sm text-white bg-red-600 rounded-full">
            {favoriteCount}
        </span>
    )}
  </div>;
};

export default FavoritesCount;
