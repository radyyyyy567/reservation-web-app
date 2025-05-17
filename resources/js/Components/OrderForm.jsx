import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';

export default function OrderForm() {
  // Initialize state for menu items in categories with default count 0
  const [menuItems, setMenuItems] = useState({
     food: [
    { name: "Rice Bowl", image: "food-1.jpg", price: 15000, count: 0 },
    { name: "Chicken Garlic", image: "food-2.jpg", price: 18000, count: 0 },
    { name: "Fried Noodle", image: "food-3.jpg", price: 12000, count: 0 },
  ],
  drink: [
    { name: "Cappuccino", image: "drink-1.jpg", price: 10000, count: 0 },
    { name: "Ice Tea", image: "drink-2.jpg", price: 5000, count: 0 },
    { name: "Milkshake", image: "drink-3.jpg", price: 12000, count: 0 },
  ],
  side: [
    { name: "French Fries", image: "side-1.jpg", price: 8000, count: 0 },
    { name: "Donut", image: "side-2.jpg", price: 7000, count: 0 },
    { name: "Onion Rings", image: "side-3.jpg", price: 8500, count: 0 },
  ],
  });

  // State for order summary and form fields
  const [order, setOrder] = useState({ items: [], total_price: 0 });
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [typeOrder, setTypeOrder] = useState('Pickup');

  // Update order summary whenever menuItems change
  useEffect(() => {
    const items = Object.values(menuItems)
      .flat()
      .filter(item => item.count > 0)
      .map(item => ({ name: item.name, count: item.count }));
    const total = Object.values(menuItems)
      .flat()
      .reduce((sum, item) => sum + item.count * item.price, 0);
    setOrder({ items, total_price: total });
  }, [menuItems]);

  // Handlers to update item count
  const handleAdd = (category, index) => {
    setMenuItems(prev => {
      const updatedCategory = [...prev[category]];
      updatedCategory[index] = { 
        ...updatedCategory[index], 
        count: updatedCategory[index].count + 1 
      };
      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleRemove = (category, index) => {
    setMenuItems(prev => {
      const updatedCategory = [...prev[category]];
      const currentCount = updatedCategory[index].count;
      updatedCategory[index] = { 
        ...updatedCategory[index], 
        count: currentCount > 0 ? currentCount - 1 : 0 
      };
      return { ...prev, [category]: updatedCategory };
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const orderDetails = {
      name,
      contact,
      typeOrder,
      items: order.items,
      total_price: order.total_price,
    };
    // TODO: submit orderDetails to backend or API
    console.log('Order submitted:', orderDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      {/* Render each category */}
      {Object.entries(menuItems).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h2 className="text-2xl font-semibold capitalize mb-4">
            {category}
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {items.map((item, index) => (
              <MenuItem
                key={item.name}
                name={item.name}
                image={item.image}
                price={item.price}
                count={item.count}
                onAdd={() => handleAdd(category, index)}
                onRemove={() => handleRemove(category, index)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Order Summary */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-2">Order Summary</h2>
        <ul className="mb-2">
          {order.items.map(item => (
            <li key={item.name} className="flex justify-between py-1">
              <span>{item.name} x {item.count}</span>
            </li>
          ))}
        </ul>
        <p className="font-semibold">
          Total: Rp.{order.total_price.toFixed(2)}
        </p>
      </div>

      {/* Customer Info Form */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={e => setContact(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          required
        />
        <select
          value={typeOrder}
          onChange={e => setTypeOrder(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="Pickup">Pickup</option>
          <option value="Delivery">Delivery</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Submit Order
      </button>
    </form>
  );
}
