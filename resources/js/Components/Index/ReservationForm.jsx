import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import OrderFormReservation from "./OrderFormReservation";
import TableSVG from "./TableSVG";
import MapSVG from "./MapSVG";

export default function ReservationForm({ user }) {
    const [step, setStep] = useState(1); // 👈 step 1: enter people
    const [reservation, setReservation] = useState({
        name: user.name,
        contact: user.phone,
        selected_tables: [],
        type_order: "reservation",
        items: [],
        total_price: 0,
        time: new Date().toISOString(),
        time_reservation: "",
        hour_reservation: "07:00",
        date: "",
        people: 0,
        user_id: user.id
    });

    const [tables, setTables] = useState([]);
    const [orderNumber, setOrderNumber] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reservationMode, setReservationMode] = useState(true);
    const [reservedTables, setReservedTables] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const responseBooked = await axios.get(
                    `/api/reserved-tables?time=${reservation.date === "" ? "1999-12-12" : reservation.date}T${reservation.hour_reservation}`
                );
                console.log(reservation.time)
                setReservedTables(responseBooked.data.reserved_tables);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch tables:", err);
                setError("Failed to load tables. Please try again later.");
                setLoading(false);
            }
        };

        fetchTables();
    }, [reservation]);

    const getTotalCapacity = () =>
        reservation.selected_tables
            .map((id) => Number(tables.find((t) => t.id === id)?.persons || 0))
            .reduce((a, b) => a + b, 0);

    const setNoTable = (noTable) => {
        setReservation((prev) => ({
            ...prev,
            no_table: noTable,
        }));
    };

    const handleSubmit = async (menu, total) => {
        try {
            const fullDateTime =
                reservation.date && reservation.hour_reservation
                    ? `${reservation.date} ${reservation.hour_reservation}:00`
                    : null;
            console.log(fullDateTime);
            const payload = {
                ...reservation,
                items: menu,
                total_price: total,
                time_reservation: fullDateTime, // merged datetime string
            };
            const res = await axios.post("/api/orders", payload);
            return res.data.data.number_order;
        } catch (err) {
            console.error("Reservation submission failed:", err);
            alert("Reservation submission failed. Please try again.");
        }
    };

    const handleSetMenuTotal = (menu, total) => {
        setReservation((prev) => ({
            ...prev,
            items: menu,
            total_price: total,
        }));
    };

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const clearNoTable = () => {
  setReservation(prev => ({
    ...prev,
    no_table: ''
  }));
};

    const timeOptions = Array.from({ length: 6 }, (_, i) => {
        const hourStart = 7 + i * 3;
        const hourEnd = 9 + i * 3;
        const hStart = hourStart.toString().padStart(2, "0");
        const hEnd = hourEnd.toString().padStart(2, "0");
        return [`${hStart}:00`, `${hStart}:00 - ${hEnd}:00`];
    });

    if (loading)
        return <div className="text-center p-4">Loading tables...</div>;
    if (error)
        return <div className="text-center p-4 text-red-600">{error}</div>;

    if (!reservationMode) {
        return (
            <OrderFormReservation
                onBack={() => setReservationMode(true)}
                handleSubmit={handleSubmit}
                handleSetMenuTotal={handleSetMenuTotal}
            />
        );
    }

    return (
        <form
            className="p-4 max-w-xl mx-auto"
            onSubmit={(e) => e.preventDefault()}
        >
            {step === 1 && (
                <>
                    <h2 className="text-2xl font-semibold mb-6">
                        Berapa banyak yang orang yang kamu bawa?
                    </h2>
                    <div className="space-y-4">
                    <input
                        type="number"
                        placeholder="Jumlah Orang"
                        value={reservation.people || ""}
                        onChange={(e) =>
                            setReservation((prev) => ({
                                ...prev,
                                people: Number(e.target.value),
                                selected_tables: [],
                            }))
                        }
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        min={1}
                        required
                    />
                    <input
                        type="date"
                        value={reservation.date}
                        onChange={(e) =>
                            setReservation((prev) => ({
                                ...prev,
                                date: e.target.value,
                            }))
                        }
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        required
                    />

                    <select
                        value={reservation.hour_reservation}
                        onChange={(e) =>
                            setReservation((prev) => ({
                                ...prev,
                                time: e.target.value,
                            }))
                        }
                        className="border border-gray-300 rounded px-3 py-2  w-full"
                        required
                    >
                        <option value="">Select Time</option>
                        {timeOptions.map((time) => (
                            <option key={time[0]} value={time[0]}>
                                {time[1]}
                            </option>
                        ))}
                    </select>
                    </div>
                    <button
                        type="button"
                        disabled={!reservation.people}
                        onClick={handleNext}
                        className="mt-6 w-full px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Next
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <h2 className="text-xl font-semibold mb-4">
                        Select Tables
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">
                        Pilih Meja yang ingin anda reservasi (Kapasitas anda
                        pesan {reservation.people}).
                    </p>
                    <div className="flex flex-col gap-2 text-sm font-medium mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-green-500 border border-black"></div>
                            <span>B = 7 Orang</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-green-500 border border-black"></div>
                            <span>BB = 20 Orang</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-red-500 border border-black"></div>
                            <span>A = 6 Orang</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-white border border-black"></div>
                            <span>D = 8 Orang</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-yellow-300 border border-black"></div>
                            <span>C = 8 Orang</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-orange-500"></div>
                            <span>VIP</span>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-2 gap-4 mb-4">
                        {tables.map((table) => {
                            const selected =
                                reservation.selected_tables.includes(table.id);
                            const totalCapacity = getTotalCapacity();
                            const maxReached =
                                totalCapacity >= reservation.people;
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
                    </div> */}
                    <div className="relative min-h-screen overflow-auto">
                        <div className="absolute top-0 z-[41]">
                            <TableSVG
                                reservedTables={reservedTables}
                                setNoTable={setNoTable}
                                capacity={reservation.people}
                            />
                        </div>

                        <div className="absolute top-0 z-40">
                            <MapSVG />
                        </div>
                        <div className="relative opacity-0 top-0 z-[39s]">
                            <MapSVG />
                        </div>
                    </div>
                    <p className="text-sm mb-4">
                        Meja yang anda pilih:{" "}
                        <span>{reservation.no_table}</span>
                    </p>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => {
                                handleBack();
                                clearNoTable();
                            }}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={reservation.no_table === ""}
                            className={clsx(
                                "px-4 py-2 rounded",
                                reservation.no_table
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            )}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {step === 3 && (
                <>
                    <h2 className="text-xl font-semibold mb-4">
                        Enter Your Details
                    </h2>
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
                        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Contact"
                        value={reservation.contact}
                        onChange={(e) =>
                            setReservation((prev) => ({
                                ...prev,
                                contact: e.target.value,
                            }))
                        }
                        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                        required
                    />

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={() => setReservationMode(false)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Proceed to Menu
                        </button>
                    </div>
                </>
            )}
        </form>
    );
}
