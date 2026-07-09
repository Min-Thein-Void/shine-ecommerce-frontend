"use client";
import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/globalStates/useAuthStore";

const Navbar: React.FC = () => {
  const User = useAuthStore((state) => state.User);
  const updateUser = useAuthStore((state) => state.updateUser);

  const logout = () => {
    localStorage.removeItem("token");
    updateUser(null);
    alert("logout success");
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold">Shine</h1>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6">
          <li>
            <Link href="/products" className="hover:text-blue-500">
              Products
            </Link>
          </li>
          <li>
            <Link href="/cart" className="hover:text-blue-500">
              Cart
            </Link>
          </li>
          <li>
            <Link href="/orderhistory" className="hover:text-blue-500">
              OrderHistory
            </Link>
          </li>
          {User?.role === "ADMIN" && (
            <li>
              <Link href="/admin" className="hover:text-blue-500">
                Admin Panel
              </Link>
            </li>
          )}
        </ul>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {User && (
            <div className="flex space-x-2">
              <p className="text-blue-600">{User.name}</p>
              <button type="button" onClick={logout} className="text-red-600">
                logout
              </button>
            </div>
          )}
          {!User && (
            <>
              <Link
                href="/login"
                className="px-4 py-1 border rounded hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
