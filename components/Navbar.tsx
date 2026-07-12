"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/globalStates/useAuthStore";
import { ShoppingCart, Package, LayoutDashboard, LogOut } from "lucide-react";

const Navbar: React.FC =() => {
  const pathname = usePathname();

  const User = useAuthStore((state) => state.User);
  const updateUser = useAuthStore((state) => state.updateUser);

  const logout = () => {
    localStorage.removeItem("token");
    updateUser(null);
  };

  const navLinks = [
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "Cart",
      href: "/cart",
      icon: ShoppingCart,
    },
    {
      name: "Orders",
      href: "/orderhistory",
      icon: Package,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white font-bold">
            S
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            Shine
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-gray-100 text-black"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }`}
              >
                {Icon && <Icon size={16} />}
                {link.name}
              </Link>
            );
          })}

          {User?.role === "ADMIN" && (
            <Link
              href="/admin"
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                pathname === "/admin"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <LayoutDashboard size={16} />
              Admin
            </Link>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {User ? (
            <>
              <div className="hidden sm:flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
                <span className="text-sm font-medium text-gray-700">
                  {User.name}
                </span>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;                           