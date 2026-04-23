// Data untuk halaman Customers (30 data)
export const customersData = Array.from({ length: 30 }, (_, i) => ({
  customerID: `CUST-${(i + 1).toString().padStart(3, '0')}`,
  customerName: [
    "Budi Santoso", "Siti Aminah", "Ahmad Hidayat", "Dewi Lestari", 
    "Rian Pratama", "Putri Utami", "Eko Prasetyo", "Ani Wijaya"
  ][i % 8] + ` ${i + 1}`,
  email: `user${i + 1}@prakreact.com`,
  phone: `0812-9000-${1000 + i}`,
  loyalty: i % 3 === 0 ? "Gold" : i % 3 === 1 ? "Silver" : "Bronze",
}));

// Data untuk halaman Orders (30 data)
export const ordersData = Array.from({ length: 30 }, (_, i) => ({
  orderID: `ORD-${(i + 101).toString()}`,
  customerName: customersData[i % 30].customerName, // Mengambil dari data customer diatas
  status: i % 4 === 0 ? "Completed" : i % 4 === 1 ? "Pending" : "Cancelled",
  totalPrice: Math.floor(Math.random() * 1000000) + 50000,
  orderDate: `2024-05-${(i % 28) + 1}`.padStart(10, '0'),
}));