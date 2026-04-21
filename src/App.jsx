import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./assets/tailwind.css"
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from 'react-router-dom';
import Customer from './pages/Customer';
import Order from './pages/Order';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
                <div id="layout-wrapper" className="flex flex-row flex-1">
                <Sidebar/>
                <div id="main-content" className="flex-1 p-4">
                 <Header/>
                 <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/orders" element={<Order />} />
                      <Route path="/customers" element={<Customer />} />
                </Routes>
                  </div>
                </div>
            </div>
  );
}

export default App;
