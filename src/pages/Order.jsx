import React, { useState } from 'react'; 
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaSearch } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import RecentOrders from "../components/RecentOrders";



export default function Order() {
    return (
        <div id="dashboard-container">
            <PageHeader />
            <p>Ini adalah halaman Order</p>
        </div>
    );
}