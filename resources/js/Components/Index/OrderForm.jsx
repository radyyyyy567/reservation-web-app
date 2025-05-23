import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "../MenuItem";

export default function OrderForm({ onBack }) {
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
    const [submitted, setSubmitted] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/orders", order);
            setOrderNumber(res.data.data.number_order); // Capture the number_order
            setSubmitted(true);
        } catch (err) {
            console.error("Order submission failed:", err);
        }
    };

    if (submitted) {
        return (
            <div className="text-center text-green-600 mt-10 font-semibold text-lg">
                <p>Thank you! Your order has been submitted.</p>
                <p>
                    Your Order Number:{" "}
                    <span className="font-bold">{orderNumber}</span>
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="p-4">
            

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

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={order.name}
                    onChange={(e) =>
                        setOrder((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="No Table"
                    value={order.no_table}
                    onChange={(e) =>
                        setOrder((prev) => ({
                            ...prev,
                            no_table: e.target.value,
                        }))
                    }
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                />

                <select
                    value={order.type_order}
                    onChange={(e) =>
                        setOrder((prev) => ({
                            ...prev,
                            type_order: e.target.value,
                        }))
                    }
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                >
                    <option value="">Are you Dine In or Take Away?</option>
                    <option value="dine-in">Dine In</option>
                    <option value="takeaway">Take Away</option>
                </select>
            </div>

            <button
                type="submit"
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
                Submit Order
            </button>
        </form>
    );
}
