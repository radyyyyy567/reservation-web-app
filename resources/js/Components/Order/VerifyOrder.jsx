import axios from "axios";
import { useState } from "react";

export default function VerifyOrder({ order, onCancel, onSuccess }) {
    const [loading, setLoading] = useState(false);

    const handleVerify = () => {
        setLoading(true);
        axios
            .post(`/api/orders/${order.id}/verify`)
            .then(() => onSuccess())
            .catch(() => alert("Verification failed"))
            .finally(() => setLoading(false));
    };

    return (
        <div className="bg-white p-6 rounded shadow-md space-y-4 mx-auto max-w-lg">
            <h2 className="text-xl font-bold">Verify Order #{order.number_order}</h2>

            <div>
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Contact:</strong> {order.contact}</p>
                <p><strong>Type:</strong> {order.type_order}</p>
                <p><strong>No. Table:</strong> {order.no_table ?? '-'}</p>
                <p><strong>Total Price:</strong> Rp{order.total_price.toLocaleString()}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Time:</strong> {new Date(order.time).toLocaleString()}</p>
                {order.time_reservation && (
                    <p><strong>Reservation Time:</strong> {new Date(order.time_reservation).toLocaleString()}</p>
                )}
            </div>

            {order.items && (
                <div>
                    <h3 className="font-semibold mt-4">Items</h3>
                    <ul className="list-disc pl-6">
                        {order.items.map((item, i) => (
                            <li key={i}>{item.name} - {item.quantity} pcs</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex gap-4 mt-6">
                <button
                    className="btn btn-success"
                    onClick={handleVerify}
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Confirm Verify"}
                </button>
                <button className="btn btn-outline" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
