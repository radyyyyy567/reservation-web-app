import React, { useState, useEffect } from "react";
import axios from "axios";

const AddUpdate = ({ menu = null, onSuccess, onCancel }) => {
    console.log(menu === null)
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        status: "",
        image: null,
    });

    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;

    useEffect(() => {
        if (menu) {
            setFormData({
                name: menu.name || "",
                price: menu.price || "",
                category: menu.category || "",
                status: menu.status || "",
                image: null, // don't pre-fill file input
            });
        }
    }, [menu]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("category", formData.category);
        data.append("status", formData.status);
        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            if (menu) {
                await axios.post(`/api/menus/${menu.id}?_method=PUT`, data);
            } else {
                await axios.post("/api/menus", data, {
                    withCredentials: true,
                });
            }
            onSuccess(menu ? "Update Successfull" : "Create Succesfully");
        } catch (err) {
            console.error("Submit failed:", err);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md max-w-lg mx-auto">
            <h3 className="text-lg font-semibold mb-4">
                {menu ? "Edit Menu" : "Add New Menu"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="input input-bordered w-full"
                    required
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="food">Food</option>
                    <option value="drink">Drink</option>
                    <option value="side">Side</option>
                </select>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="">Select Status</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                </select>
                <div className="relative">
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="file-input file-input-bordered w-full"
                        accept="image/*"
                    />
                    {menu && !formData?.image && (
                        <div className="absolute  bg-white truncate pl-2 left-[120px] top-[10px] max-w-xs">{menu.file_original}</div>
                    )}
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-outline"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        {menu ? "Update" : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUpdate;
