import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "../MenuItem";

export default function OrderForm({ onBack, handleSubmit, handleSetMenuTotal }) {
    const [menuItems, setMenuItems] = useState({ food: [], drink: [] });
    const [order, setOrder] = useState({   
        name: "",
        contact: "",
        no_table: "",
        type_order: "",
        items: [],
        total_price: 0,
        time: new Date().toISOString(), // current timestamp
    });
    const [orderNumber, setOrderNumber] = useState("")
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get("/api/menus");
                const data = res.data.data;
                const grouped = { food: [], drink: [] };

                data.forEach((item) => {
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

    useEffect(() => {
        const items = Object.values(menuItems)
            .flat()
            .filter((item) => item.count > 0)
            .map((item) => ({
                name: item.name,
                count: item.count,
                price: item.price,
            }));

        const total = items.reduce(
            (sum, item) => sum + item.count * item.price,
            0
        );

        setOrder((prev) => ({
            ...prev,
            items,
            total_price: total,
        }));
    }, [menuItems]);

    const handleAdd = (category, index) => {
        setMenuItems((prev) => {
            const updated = [...prev[category]];
            updated[index].count += 1;
            return { ...prev, [category]: updated };
        });
    };

    const handleRemove = (category, index) => {
        setMenuItems((prev) => {
            const updated = [...prev[category]];
            updated[index].count = Math.max(0, updated[index].count - 1);
            return { ...prev, [category]: updated };
        });
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        try {
            
            const numberOrder = await handleSubmit(order.items, order.total_price)
            setOrderNumber(numberOrder);
            setSubmitted(true);
        } catch (err) {
            console.error("Order submission failed:", err);
        }
    };

    

    return (
        submitted ? (
            <div className="text-center text-green-600 mt-10 font-semibold text-lg">
                <p>Thank you! Your order has been submitted.</p>
                <p>
                    Your Order Number:{""}
                    <span className="font-bold">{orderNumber}</span>
                </p>
            </div>
        ) : (
        <form onSubmit={handleSubmitOrder} className="p-4">
            

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

            <div className="mt-8 p-4 bg-gray-100 rounded">
                <h2 className="text-xl font-bold mb-2">Order Summary</h2>
                <ul className="mb-2">
                    {order.items.map((item) => (
                        <li key={item.name}>
                            {item.name} x {item.count}
                        </li>
                    ))}
                </ul>
                <p className="font-semibold">
                    Total: Rp.{order.total_price.toFixed(2)}
                </p>
            </div>

            
            <button
                type="submit"
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
                Submit Order
            </button>
        </form>
    ))
}
