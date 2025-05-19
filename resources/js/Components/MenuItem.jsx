import React from "react";

const MenuItem = ({ name, image, price, selected = false, count = 0, onAdd, onRemove }) => {
  return (
    <div
      className={`space-y-2 border p-2 rounded-lg cursor-pointer transition-all ${
        selected ? "border-orange-500 bg-orange-50" : "border-gray-200"
      }`}
    >
      <div className="h-[100px] w-full rounded-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="text-sm text-center font-medium">{name}</div>
      <div className="text-xs text-center text-gray-500">
        Harga: Rp{price.toLocaleString("id-ID")}
      </div>

      <div className="flex items-center justify-center space-x-2">
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={onRemove}
          disabled={count === 0}
        >
          -
        </button>
        <input
          type="text"
          className="w-12 text-center bg-transparent border-none"
          value={count}
          
          readOnly
        />
        <button type="button" className="btn btn-outline btn-sm" onClick={onAdd}>
          +
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
