import { useState } from "react";
import Main from "@/Layouts/LayoutMain";
import OrderForm from "@/Components/Index/OrderForm";
import MenuApplication from "@/Components/Index/MenuApplication";
import FoodMenu from "@/Components/Index/FoodMenu";
import ReservationForm from "@/Components/Index/ReservationForm";
import ViewOrder from "@/Components/Index/ViewOrder";

const Index = () => {
    const [order, setOrder] = useState({
        name: "",
        contact: "",
        total_price: 0,
        type_order: "dine-in",
        no_table: "",
        items: [],
        time: new Date().toISOString(),
    });

    const [submitted, setSubmitted] = useState(false);
    const [view, setView] = useState("menu"); // 'menu', 'foodMenu', 'form'

    

    const handleSubmit = () => {
        console.log("Order submitted:", order);
        setSubmitted(true);
    };

    return (
        <>
            <nav className="navbar bg-white fixed z-50 top-0 h-[40px]">
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-5 h-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl text-chocolate text-orange-800">
                        Cooking Mama
                    </a>
                </div>
            </nav>

            <section className=" pt-[80px] pb-[40px] bg-[url('/static/bg-web.jpg')] bg-cover bg-center">
                <div className="lg:max-w-5xl h-full bg-orange-100 rounded-lg shadow mx-auto p-4">
                    {submitted ? (
                        <div className="text-center text-green-600 mt-10 font-semibold text-lg">
                            Terima kasih! Pesanan Anda telah diterima.
                        </div>
                    ) : (
                        <>
                            {view === "menu" && (
                                <MenuApplication onSelect={setView} />
                            )}
                            {view === "foodMenu" && (
                                <div>
                                    <div className="mb-4">
                                        <button
                                            onClick={() => setView("menu")}
                                            className="btn btn-outline"
                                        >
                                            ← Back
                                        </button>
                                    </div>
                                    <FoodMenu />
                                </div>
                            )}

                            {view === "viewOrder" && (
                                <div>
                                    <div className="mb-4">
                                        <button
                                            onClick={() => setView("menu")}
                                            className="btn btn-outline"
                                        >
                                            ← Back
                                        </button>
                                    </div>
                                    <ViewOrder />
                                </div>
                            )}

                            {view === "form" && (
                                <>
                                    <div className="mb-4">
                                        <button
                                            onClick={() => setView("menu")}
                                            className="btn btn-outline"
                                        >
                                            ← Back
                                        </button>
                                    </div>
                                    <OrderForm
                                        order={order}
                                        setOrder={setOrder}
                                        onSubmit={handleSubmit}
                                    />
                                </>
                            )}
                            {view === "reservation" && (
                                <>
                                    <div className="mb-4">
                                        <button
                                            onClick={() => setView("menu")}
                                            className="btn btn-outline"
                                        >
                                            ← Back
                                        </button>
                                    </div>
                                    <ReservationForm
                                        order={order}
                                        setOrder={setOrder}
                                        onSubmit={handleSubmit}
                                    />
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

Index.layout = (page) => <Main>{page}</Main>;

export default Index;
