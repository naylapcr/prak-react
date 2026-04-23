import { MdDashboard } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AiFillCustomerService } from "react-icons/ai";
import { CiShoppingCart } from "react-icons/ci";

export default function Sidebar() {
        const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4  space-x-2

        ${isActive ? 
            "text-hijau bg-blue-200 font-extrabold" : 
            "text-gray-600 hover:text-hijau hover:bg-blue-200 hover:font-extrabold"
        }`
    return (
        <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col">
                <span id="logo-title" className="font-poppins text-[48px] text-gray-900">
                    Sedap <b id="logo-dot" className="text-hijau">.</b>
                </span>
                <span id="logo-subtitle" className="font-semibold text-gray-400">Modern Admin Dashboard</span>
            </div>

            {/* List Menu */}
            <div id="sidebar-menu" className="mt-10">
                <ul id="menu-list" className="space-y-3">
                    <NavLink 
                    id="menu-1" 
                    to="/" 
                    className={menuClass}>
                        <MdDashboard className="mr-4 text-xl" />
                        <span> Dashboard</span>
                    </NavLink>
                    <NavLink 
                    id="menu-2" 
                    to="/orders" 
                    className={menuClass}>
                        <CiShoppingCart />
                        <span> Orders</span>
                    </NavLink>
                    <NavLink id="menu-3" to="/customers" 
                    className={menuClass}>
                        <AiFillCustomerService />
                        <span> Customers</span>
                    </NavLink>
                    {/* --- Tambahkan kode ini di bawah menu Orders --- */}
<div className="mt-8 border-t pt-4">
  <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
    Error Pages
  </p>
  
  <ul className="space-y-2">
    <li>
      <Link to="/error/400" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition">
        <span className="mr-3 text-lg">⚠️</span>
        <span>Error 400</span>
      </Link>
    </li>
    <li>
      <Link to="/error/401" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition">
        <span className="mr-3 text-lg">👤</span>
        <span>Error 401</span>
      </Link>
    </li>
    <li>
      <Link to="/error/403" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition">
        <span className="mr-3 text-lg">🔒</span>
        <span>Error 403</span>
      </Link>
    </li>
  </ul>
</div>
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center">
                    <div id="footer-text" className="text-white text-sm">
                        <span>Please organize your menus through button below!</span>
                        <div id="add-menu-button" className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2">
                            <FaPlus className="mr-4 text-xl" />
                            <span className="text-gray-600 flex items-center">Add Menus</span>
                        </div>
                    </div>
                    <img id="footer-avatar" className="w-20 rounded-full" src="https://images.pexels.com/photos/18253842/pexels-photo-18253842.jpeg" />
                </div>
                <span id="footer-brand" className="font-bold text-gray-400">Sedap Restaurant Admin Dashboard</span>
                <p id="footer-copyright" className="font-light text-gray-400">&copy; 2025 All Right Reserved</p>
            </div>
        </div>
    );
}