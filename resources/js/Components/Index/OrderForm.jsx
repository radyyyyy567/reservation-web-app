import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "../MenuItem";

export default function OrderForm({ user }) {
    const [menuItems, setMenuItems] = useState({ food: [], drink: [] });
    const [order, setOrder] = useState({
        name: user.name,
        contact: user.contact,
        no_table: "",
        type_order: "take-away",
        items: [],
        total_price: 0,
        time: new Date().toISOString(), // current timestamp
        user_id: user.id,
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
                <select
                    value={order.no_table}
                    onChange={(e) =>
                        setOrder((prev) => ({
                            ...prev,
                            no_table: e.target.value,
                        }))
                    }
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                >
                    <option value="">Select no table?</option>
                    <option value="A1">A1</option>
                    <option value="B1">B1</option>
                    <option value="C1">C1</option>
                    <option value="D1">D1</option>
                    <option value="E1">E1</option>
                    <option value="F1">F1</option>
                    <option value="G1">G1</option>
                    <option value="H1">H1</option>
                    <option value="I1">I1</option>
                    <option value="J1">J1</option>
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
