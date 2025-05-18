import React, { useState } from "react";

import FoodMenuItem from "./FoodMenuComponents/FoodMenuItem";

const FoodMenu = () => {
    const [menuItems, setMenuItems] = useState({
        food: [
            { name: "Rice Bowl", image: "food-1.jpg", price: 15000, count: 0 },
            {
                name: "Chicken Garlic",
                image: "food-2.jpg",
                price: 18000,
                count: 0,
            },
            {
                name: "Fried Noodle",
                image: "food-3.jpg",
                price: 12000,
                count: 0,
            },
        ],
        drink: [
            {
                name: "Cappuccino",
                image: "drink-1.jpg",
                price: 10000,
                count: 0,
            },
            { name: "Ice Tea", image: "drink-2.jpg", price: 5000, count: 0 },
            { name: "Milkshake", image: "drink-3.jpg", price: 12000, count: 0 },
        ],
        side: [
            {
                name: "French Fries",
                image: "side-1.jpg",
                price: 8000,
                count: 0,
            },
            { name: "Donut", image: "side-2.jpg", price: 7000, count: 0 },
            { name: "Onion Rings", image: "side-3.jpg", price: 8500, count: 0 },
        ],
    });

    return (
        <>
            <div className="p-4 overflow-auto h-full">
                {Object.entries(menuItems).map(([category, items]) => (
                    <div key={category} className="mb-6">
                        <h2 className="text-2xl font-semibold capitalize mb-4">
                            {category}
                        </h2>
                        <div className="lg:grid grid-cols-3 gap-6">
                            {items.map((item, index) => (
                                <FoodMenuItem
                                    key={index}
                                    name={item.name}
                                    image={item.image}
                                    price={item.price}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FoodMenu;
