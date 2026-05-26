import { MdDashboard, MdShoppingCart, MdPeople, MdAnalytics, MdAdd, MdErrorOutline, MdInventory } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";


export default function Sidebar() {
        const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4  space-x-2
        ${isActive ? 
            "text-hijau bg-green-200 font-extrabold" : 
            "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
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
            <ul id="menu-list" className="space-y-3">
                    {/* Menu yang sudah ada */}
                    <li>
                        <NavLink to="/" className={menuClass}>
                            <MdDashboard className="mr-4 text-xl" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/orders" className={menuClass}>
                            <MdShoppingCart className="mr-4 text-xl" />
                            <span>Orders</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/customers" className={menuClass}>
                            <MdPeople className="mr-4 text-xl" />
                            <span>Customers</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={menuClass}>
                            <MdInventory className="mr-4 text-xl" />
                            <span>Products</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/components" className={menuClass}>
                            <MdInventory className="mr-4 text-xl" />
                            <span>Components</span>
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to="/orders" className={menuClass}>
                            <MdShoppingCart className="mr-4 text-xl" />
                            <span>Fitur-xyz</span>
                        </NavLink>
                    </li>
                


                    {/* PEMBATAS (Opsional agar rapi) */}
                    <div className="pt-4 pb-2">
                        <p className="text-xs font-bold text-gray-400 uppercase">Error Pages</p>
                    </div>

                    {/* MENU ERROR BARU */}
                    <li>
                        <NavLink to="/error-400" className={menuClass}>
                            <MdErrorOutline className="mr-4 text-xl" />
                            <span>Error 400</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/error-401" className={menuClass}>
                            <MdErrorOutline className="mr-4 text-xl" />
                            <span>Error 401</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/error-403" className={menuClass}>
                            <MdErrorOutline className="mr-4 text-xl" />
                            <span>Error 403</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/error-404" className={menuClass}>
                            <MdErrorOutline className="mr-4 text-xl" />
                            <span>Error 404</span>
                        </NavLink>
                    </li>
                </ul>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center">
                    <div id="footer-text" className="text-white text-sm">
                        <span>Please organize your menus through button below!</span>
                        
                        <div id="add-menu-button" className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2">
                            <span className="text-gray-600 flex items-center">
                                <MdAdd className="mr-4 text-xl" />
                                Add Menus
                            </span>
                        </div>
                    </div>
                    <img id="footer-avatar" className="w-20 rounded-full" src="https://avatar.iran.liara.run/public/28" alt="Avatar" />
                </div>
                <span id="footer-brand" className="font-bold text-gray-400">Sedap Restaurant Admin Dashboard</span>
                <p id="footer-copyright" className="font-light text-gray-400">&copy; 2025 All Right Reserved</p>
            </div>
        </div>
    );
}