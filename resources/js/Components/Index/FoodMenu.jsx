import React, { useState, useEffect } from "react";
import axios from "axios";
import FoodMenuItem from "./FoodMenuComponents/FoodMenuItem";

const FoodMenu = () => {
    const [menuItems, setMenuItems] = useState({
        food: [],
        drink: [],

    });

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get("/api/menus"); // Adjust API path if needed
                const data = res.data.data;

                // Group by category
                const grouped = {
                    food: [],
                    drink: [],
                
                };

                data.forEach((item) => {
                    console.log(item.url)
                    if (grouped[item.category]) {
                        grouped[item.category].push({
                            name: item.name,
                            image: item.url,
                            price: parseFloat(item.price),
                            count: 0,
                        });
                    }
                });

                setMenuItems(grouped);
            } catch (err) {
                console.error("Failed to fetch menu:", err);
            }
        };

        fetchMenu();
    }, []);

    return (
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
    );
};

export default FoodMenu;
