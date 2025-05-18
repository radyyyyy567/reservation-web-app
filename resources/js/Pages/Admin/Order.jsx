import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import VerifyOrder from "@/Components/Order/VerifyOrder";

export default function Order({ auth }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [verifyMode, setVerifyMode] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        setLoading(true);
        axios.get("/api/orders")
            .then((res) => setOrders(res.data.data))
            .finally(() => setLoading(false));
    };

    const handleVerifyClick = (orderId) => {
        axios.get(`/api/orders/${orderId}`)
            .then((res) => {
                setSelectedOrder(res.data.data);
                setVerifyMode(true);
            });
    };

    const handleVerifySuccess = () => {
        toast.success("Order verified successfully");
        setVerifyMode(false);
        fetchOrders();
    };

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this order?")) return;

        axios.delete(`/api/orders/${id}`).then(() => {
            toast.success("Order deleted");
            fetchOrders();
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-bold">Order List</h2>}>
            <Head title="Orders" />

            {verifyMode ? (
                <div className="mt-4">
                    <VerifyOrder
                        order={selectedOrder}
                        onCancel={() => setVerifyMode(false)}
                        onSuccess={handleVerifySuccess}
                    />
                </div>
            ) : (
                <div className="py-6">
                    <div className="max-w-7xl mx-auto space-y-4">
                        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                            {loading ? (
                                <p className="text-center">Loading...</p>
                            ) : (
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th>Order #</th>
                                            <th>Name</th>
                                            <th>Contact</th>
                                            <th>Type</th>
                                            <th>No. Table</th>
                                            <th>Total Price</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.number_order}</td>
                                                <td>{order.name}</td>
                                                <td>{order.contact}</td>
                                                <td>{order.type_order}</td>
                                                <td>{order.no_table ?? '-'}</td>
                                                <td>Rp{order.total_price.toLocaleString()}</td>
                                                <td>
                                                    <span className={`badge ${order.status === 'verified' ? 'badge-success' : 'badge-warning'}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td>{new Date(order.created_at).toLocaleString()}</td>
                                                <td className="flex gap-2 justify-center">
                                                    {order.status !== 'verified' && (
                                                        <button
                                                            className="btn btn-sm btn-success"
                                                            onClick={() => handleVerifyClick(order.id)}
                                                        >
                                                            Verify
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn btn-sm btn-error"
                                                        onClick={() => handleDelete(order.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </AuthenticatedLayout>
    );
}
