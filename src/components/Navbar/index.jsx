import React from "react";
import { UserCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import LogoImage from '../../assets/images/logo.png'; 

export default function Navbar() {
  return (
    <nav className="backdrop-blur-md bg-white/10 fixed w-full z-20 top-0 start-0 border-b border-white/20 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
        
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={LogoImage} 
            className="h-15"
            alt="Pramoon Logo"
          />
          <span className="self-center text-xl text-white font-semibold whitespace-nowrap">
            Pramoon
          </span>
        </a>

        {/* Right side: Cart + User */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

          {/* Shopping Cart */}
          <button
            type="button"
            className="relative p-2 rounded-full hover:bg-white/20 focus:ring-2 focus:ring-white/30"
            aria-label="Shopping Cart"
          >
            <ShoppingCartIcon className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
              3
            </span>
          </button>

          {/* User Icon */}
          <button
            type="button"
            className="flex text-sm bg-white/10 rounded-full md:me-0 focus:ring-4 focus:ring-white/30"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <UserCircleIcon className="w-8 h-8 text-white" />
          </button>

          {/* Dropdown menu */}
          <div
            className="z-50 hidden bg-white/20 backdrop-blur-md border border-white/20 rounded-base shadow-lg w-44"
            id="user-dropdown"
          >
            <div className="px-4 py-3 text-sm border-b border-white/20">
              <span className="block text-white font-medium">Joseph McFall</span>
              <span className="block text-white truncate">name@flowbite.com</span>
            </div>

            <ul className="p-2 text-sm text-white font-medium" aria-labelledby="user-menu-button">
              <li>
                <a href="#" className="inline-flex items-center w-full p-2 hover:bg-white/20 rounded">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center w-full p-2 hover:bg-white/20 rounded">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center w-full p-2 hover:bg-white/20 rounded">
                  Earnings
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center w-full p-2 hover:bg-white/20 rounded">
                  Sign out
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile menu button */}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-base md:hidden hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-white/20 rounded-base bg-white/10 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <a
                href="#" 
                className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-white rounded hover:bg-white/20 md:hover:bg-transparent md:hover:text-white md:p-0">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-white rounded hover:bg-white/20 md:hover:bg-transparent md:hover:text-white md:p-0">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-white rounded hover:bg-white/20 md:hover:bg-transparent md:hover:text-white md:p-0">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-white rounded hover:bg-white/20 md:hover:bg-transparent md:hover:text-white md:p-0">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
