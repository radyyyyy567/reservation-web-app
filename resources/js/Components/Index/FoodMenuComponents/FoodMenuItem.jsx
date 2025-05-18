import React from "react";

const FoodMenuItem = ({ name, image, price }) => {
  return (
    <div className="border p-3 rounded-2xl shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer bg-white">
      <div className="h-[180px] w-full rounded-xl overflow-hidden">
        <img
          src={`/storage/images/menus/${image}`}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="mt-3 text-center space-y-1">
        <div className="text-base font-semibold text-gray-800">{name}</div>
        <div className="text-sm font-medium text-gray-500">Rp.{price}</div>
      </div>
    </div>
  );
};


export default FoodMenuItem;
