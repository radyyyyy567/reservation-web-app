import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import OrderFormReservation from "./OrderFormReservation";

export default function ReservationForm({ onBack }) {
    const [reservation, setReservation] = useState({
        name: "",
        contact: "",
        selected_tables: [],
        type_order: "dine-in",
        items: [],
        total_price: 0,
        time: new Date().toISOString(),
        time_reservation: "",
        people: 0,
    });

    const [tables, setTables] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reservationMode, setReservationMode] = useState(true)

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get("/api/tables");
                setTables(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch tables:", err);
                setError("Failed to load tables. Please try again later.");
                setLoading(false);
            }
        };

        fetchTables();
    }, []);

    const handleSubmit = async (menu, total) => {
        try {
            
            const payload = {
                ...reservation,
                no_table: reservation.selected_tables.join(", "),
                items: menu,
                total_price: total
            };
            const res = await axios.post("/api/orders", payload);
            return res.data.data.number_order
        } catch (err) {
            console.error("Reservation submission failed:", err);
            alert("Reservation submission failed. Please try again.");
        }
    };

    const handleSetMenuTotal = (menu, total) => {
        setReservation((prev) => ({
                            ...prev,
                            items: menu,
                            total_price: total
                        }))
                                
    }

    const handleSubmitReservation = () => {
        setReservationMode(!reservationMode)
    }

    const toggleTable = (tableId) => {
        setReservation((prev) => {
            const isSelected = prev.selected_tables.includes(tableId);
            const newSelection = isSelected
                ? prev.selected_tables.filter((id) => id !== tableId)
                : [...prev.selected_tables, tableId];
            return { ...prev, selected_tables: newSelection };
        });
    };

   const getTotalCapacity = () => {
    return reservation.selected_tables
        .map((id) => {
            const table = tables.find((t) => t.id === id);
            // Convert the persons value to a number before returning
            return table ? Number(table.persons) || 0 : 0;
        })
        .reduce((a, b) => a + b, 0); // This will now perform numeric addition
};

    if (submitted) {
        return (
            <OrderFormReservation 
                order={reservation} 
                setOrder={setReservation} 
                orderNumber={orderNumber} 
            />
        );
    }

    if (loading) {
        return <div className="text-center p-4">Loading tables...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-600">{error}</div>;
    }

    return (
        reservationMode ? (
            <form onSubmit={handleSubmitReservation} className="p-4 max-w-xl mx-auto">
            <button
                type="button"
                onClick={onBack}
                className="mb-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
                ← Back
            </button>

            <h2 className="text-2xl font-semibold mb-6">Table Reservation</h2>

            <div className="grid gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Name"
                    value={reservation.name}
                    onChange={(e) =>
                        setReservation((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                    className="border border-gray-300 rounded px-3 py-2"
                    required
                />
                <input
                    type="text"
                    placeholder="Contact Number"
                    value={reservation.contact}
                    onChange={(e) =>
                        setReservation((prev) => ({
                            ...prev,
                            contact: e.target.value,
                        }))
                    }
                    className="border border-gray-300 rounded px-3 py-2"
                    required
                />
                <input
                    type="number"
                    placeholder="How many people?"
                    value={reservation.people}
                    onChange={(e) =>
                        setReservation((prev) => ({
                            ...prev,
                            people: e.target.value,
                            selected_tables: [],
                        }))
                    }
                    min={1}
                    className="border border-gray-300 rounded px-3 py-2"
                    required
                />
                <input
                    type="datetime-local"
                    value={reservation.time_reservation}
                    onChange={(e) =>
                        setReservation((prev) => ({
                            ...prev,
                            time_reservation: e.target.value,
                        }))
                    }
                    className="border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>

            {reservation.people ? (
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">
                        Choose Your Tables
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                        Select one or more tables (total capacity must be at
                        least {reservation.people}).
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {tables.map((table) => {
                            const selected =
                                reservation.selected_tables.includes(table.id);
                            const totalCapacity = getTotalCapacity();
                            const maxReached =
                                totalCapacity >=
                                parseInt(reservation.people || 0);

                            const isDisabled = !selected && maxReached;

                            return (
                                <button
                                    key={table.id}
                                    type="button"
                                    onClick={() => toggleTable(table.id)}
                                    disabled={isDisabled}
                                    className={clsx(
                                        "border rounded px-4 py-2 text-center transition-all",
                                        selected
                                            ? "bg-blue-500 text-white"
                                            : isDisabled
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-white hover:bg-gray-100"
                                    )}
                                >
                                    {table.id}
                                    <br />
                                    <span className="text-sm text-gray-500">
                                        Seats: {table.persons}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <p className="mt-3 text-sm">
                        Total capacity selected:{" "}
                        <span
                            className={
                                getTotalCapacity() >=
                                reservation.people
                                    ? "text-green-600"
                                    : "text-red-600"
                            }
                        >
                            {getTotalCapacity()}
                        </span>
                    </p>
                </div>
            ) : ""}

            <button
                type="submit"
                className={clsx(
                    "mt-6 px-6 py-2 rounded",
                    getTotalCapacity() >= parseInt(reservation.people || 0)
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                )}
                disabled={
                    getTotalCapacity() < parseInt(reservation.people || 0)
                }
            >
                Reserve Table
            </button>
        </form>
        ) : (
            <OrderFormReservation onBack={handleSubmitReservation} handleSubmit={handleSubmit} handleSetMenuTotal={handleSetMenuTotal}/>
        )

        
        
    );
}