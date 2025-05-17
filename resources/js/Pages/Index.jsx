import { useState } from "react";
import Main from "@/Layouts/LayoutMain";
import OrderForm from "@/Components/OrderForm";

const Index = () => {
  const [order, setOrder] = useState({
    name: "",
    contact: "",
    total_price: 0,
    type_order: "dine-in",
    no_table: "", // ini tetap ada di object tapi tidak diinput oleh user
    items: [],
    time: new Date().toISOString(),
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Lakukan proses pengiriman data di sini (misalnya ke API)
    console.log("Order submitted:", order);
    setSubmitted(true);
  };

  return (
    <>
      <nav className="navbar bg-white">
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

      {submitted ? (
        <div className="text-center text-green-600 mt-10 font-semibold text-lg">
          Terima kasih! Pesanan Anda telah diterima.
        </div>
      ) : (
        <OrderForm order={order} setOrder={setOrder} onSubmit={handleSubmit} />
      )}
    </>
  );
};

Index.layout = (page) => <Main>{page}</Main>;

export default Index;
