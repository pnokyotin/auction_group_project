import React from "react";
import { UserCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import LogoImage from '../../assets/images/logo.png';
import { useNavigate } from "react-router-dom";
import useDropdown from '../../hooks/useDropdown';

export default function Navbar() {
  const { open, toggle, ref } = useDropdown();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="backdrop-blur-md bg-white/10 fixed w-full z-20 top-0 border-b border-white/20 shadow-lg">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
        <a href="/" className="flex items-center space-x-3">
          <img src={LogoImage} className="h-12" alt="Logo" />
          <span className="text-xl text-white font-semibold">Pramoon</span>
        </a>

        <div className="flex items-center space-x-3">
          <button className="relative p-2 rounded-full hover:bg-white/20">
            <ShoppingCartIcon className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <div className="relative" ref={ref}>
            <button onClick={toggle} className="flex text-sm bg-white/10 rounded-full p-1">
              <UserCircleIcon className="w-8 h-8 text-white" />
            </button>

            <div
              className={`absolute right-0 mt-2 w-44 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg shadow-lg text-white transition-all duration-300
                ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
              `}
            >
              <ul className="p-2 text-sm font-medium space-y-1">
                <li><a href="#" className="block w-full p-2 rounded hover:bg-white/20">Dashboard</a></li>
                <li><a href="#" className="block w-full p-2 rounded hover:bg-white/20">Settings</a></li>
                <li><a href="#" className="block w-full p-2 rounded hover:bg-white/20">Earnings</a></li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-2 rounded hover:bg-white/20"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
