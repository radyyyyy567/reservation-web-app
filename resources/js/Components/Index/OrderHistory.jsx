// OrdersTable.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersTable = ({user, history}) => {
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    let response;
    if(history){
    response = axios.get(`/api/orders/user/${user.id}`)
      .then(res => {
        setOrders(res.data.data);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
      });
    } else {
        response = axios.get(`/api/order_pending/user/${user.id}`)
      .then(res => {
        setOrders(res.data.data);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
      });
    }
      console.log(response)
  }, [user.id]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-primary">Riwayat Order</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>Type Order</th>
              <th>No Table</th>
              <th>Status</th>
              <th>Number Order</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.type_order}</td>
                <td>{order.no_table || '-'}</td>
                <td>
                  <span className="badge badge-outline badge-info">{order.status}</span>
                </td>
                <td className="font-mono">{order.number_order}</td>
                <td>
                  <ul className="list-disc pl-4">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} x{item.count} - Rp{item.price}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
