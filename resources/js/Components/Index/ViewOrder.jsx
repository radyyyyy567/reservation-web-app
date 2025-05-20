import React, { useState } from 'react'
import axios from 'axios'

const ViewOrder = () => {
  const [inputOrderNumber, setInputOrderNumber] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    setOrder(null)
    setError(null)
    setLoading(true)

    try {
      const res = await axios.get(`/api/orders/number/${inputOrderNumber}`)
      setOrder(res.data.data)
    } catch (err) {
      setError('Order not found.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Order</h2>

      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={inputOrderNumber}
          onChange={(e) => setInputOrderNumber(e.target.value)}
          placeholder="Enter Order Number"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {order && (
        <div className="bg-gray-50 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Order Detail</h3>
          <p><strong>Order Number:</strong> {order.number_order}</p>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Contact:</strong> {order.contact || '-'}</p>
          <p><strong>Type:</strong> {order.type_order}</p>
          <p><strong>Table:</strong> {order.no_table || '-'}</p>
          <p><strong>Total Price:</strong> ${order.total_price}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Time:</strong> {order.time}</p>
          {order.time_reservation && <p><strong>Reservation:</strong> {order.time_reservation}</p>}
          <p><strong>Items:</strong></p>
          <ul className="list-disc ml-6">
            {order.items && order.items.map((item, idx) => (
              <li key={idx}>{item.name} × {item.quantity}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ViewOrder
