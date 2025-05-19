import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import AddUpdate from "@/Components/Menus/AddUpdate";
import { toast, ToastContainer } from "react-toastify";

export default function MenuIndex({ auth }) {
    const [menus, setMenus] = useState([]);
    const [menu, setMenu] = useState(null)
    const [loading, setLoading] = useState(true);
    const [formMode, setFormMode] = useState(false);

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = () => {
        axios
            .get("/api/menus")
            .then((res) => setMenus(res.data.data))
            .finally(() => setLoading(false));
    };


    const handleFormMode = () => {
        setFormMode(!formMode);
        fetchMenus();
        console.log(menu)
    };

    const onSuccess = (message) => {
        toast.success(message)
        handleFormMode();
        setMenu(null)
    }

    const handleFormModeUpdate = async (id) => {
        const resoponse = await axios.get(`/api/menus/${id}`)
        setMenu(resoponse.data.data);
        handleFormMode();
    }

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this menu item?")) return;

        axios.delete(`/api/menus/${id}`).then(() => {
            fetchMenus();
        });
    };  

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-bold">Menu List</h2>}
        >
            <Head title="Menus" />
            {formMode ? (
                <div className="mt-4">
                <AddUpdate menu={menu} onCancel={handleFormMode} onSuccess={onSuccess} />
                </div>
            ) : (
                <div className="py-6">
                    <div className="max-w-7xl mx-auto space-y-4">
                        {/* Add Button */}
                        <div className="flex justify-end">
                            <button
                                className="btn btn-primary"
                                onClick={() =>
                                    handleFormMode()
                                }
                            >
                                + Add New Menu
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                            {loading ? (
                                <p className="text-center">Loading...</p>
                            ) : (
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Category</th>
                                            <th>Status</th>
                                            <th className="text-center">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {menus.map((menu) => (
                                            <tr key={menu.id}>
                                                <td>
                                                    <img
                                                        src={menu.url}
                                                        alt={menu.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                </td>
                                                <td>{menu.name}</td>
                                                <td>{menu.price}</td>
                                                <td>{menu.category}</td>
                                                <td>{menu.status ?? "-"}</td>
                                                <td className="flex gap-2 justify-center">
                                                    <button
                                                        className="btn btn-sm btn-warning"
                                                        onClick={() =>
                                                            handleFormModeUpdate(menu.id)
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-error"
                                                        onClick={() =>
                                                            handleDelete(
                                                                menu.id
                                                            )
                                                        }
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
