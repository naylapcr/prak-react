export const customersData = Array.from({ length: 30 }, (_, i) => ({
  id: `CUST-${100 + i}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@prak-react.com`,
  phone: `0812-3456-78${i}`,
  loyalty: i % 3 === 0 ? "Gold" : i % 3 === 1 ? "Silver" : "Bronze",
}));

export const ordersData = Array.from({ length: 30 }, (_, i) => ({
  orderId: `ORD-${1000 + i}`,
  customerName: `User ${Math.floor(Math.random() * 30) + 1}`,
  status: i % 3 === 0 ? "Completed" : i % 3 === 1 ? "Pending" : "Cancelled",
  totalPrice: `Rp ${(Math.random() * 500000 + 50000).toLocaleString("id-ID")}`,
  orderDate: "2024-05-22",
}));