"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/globalStates/useAuthStore";
import {
  ShoppingCart,
  Package,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  UserCircle,
} from "lucide-react";

const API_URL = "http://localhost:3100";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const User = useAuthStore((state) => state.User);
  const updateUser = useAuthStore((state) => state.updateUser);

  const logout = () => {
    localStorage.removeItem("token");
    updateUser(null);
    setIsMenuOpen(false);
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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const profileImage = User?.userProfile?.image;

  const profileImageUrl = profileImage
    ? `${API_URL}/uploads/${profileImage}`
    : null;

  const userInitial = User?.name?.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* ================= HEADER ================= */}

        <div className="flex h-16 items-center justify-between">
          {/* ================= LOGO ================= */}

          <Link
            href="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black font-bold text-white">
              S
            </div>

            <span className="text-xl font-bold tracking-tight text-gray-900">
              Shine
            </span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}

          <nav className="hidden items-center gap-2 md:flex">
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

            {/* ================= ADMIN ================= */}

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

          {/* ================= DESKTOP RIGHT ================= */}

          <div className="hidden items-center gap-3 md:flex">
            {User ? (
              <>
                {/* Profile */}

                <Link
                  href="/profile"
                  className={`group flex items-center gap-3 rounded-full border px-3 py-1.5 transition ${
                    pathname === "/profile"
                      ? "border-gray-300 bg-gray-100"
                      : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {/* Avatar */}

                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt={User.name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                      {userInitial}
                    </div>
                  )}

                  {/* User name */}

                  <div className="max-w-32">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {User.name}
                    </p>

                    <p className="text-xs text-gray-400">View profile</p>
                  </div>
                </Link>

                {/* Logout */}

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
                {/* Login */}

                <Link
                  href="/login"
                  className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Login
                </Link>

                {/* Register */}

                <Link
                  href="/register"
                  className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-100 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}

        {isMenuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">
            {/* Navigation */}

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      pathname === link.href
                        ? "bg-gray-100 text-black"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }`}
                  >
                    {Icon && <Icon size={18} />}
                    {link.name}
                  </Link>
                );
              })}

              {/* Mobile Admin */}

              {User?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    pathname === "/admin"
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  <LayoutDashboard size={18} />
                  Admin
                </Link>
              )}
            </nav>

            {/* ================= MOBILE USER ================= */}

            <div className="mt-4 border-t border-gray-100 pt-4">
              {User ? (
                <div className="space-y-3">
                  {/* Profile Card */}

                  <Link
                    href="/profile"
                    onClick={closeMenu}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
                      pathname === "/profile"
                        ? "border-gray-300 bg-gray-100"
                        : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {/* Avatar */}

                    {profileImageUrl ? (
                      <img
                        src={profileImageUrl}
                        alt={User.name}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                        {userInitial}
                      </div>
                    )}

                    {/* User info */}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {User.name}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        View your profile
                      </p>
                    </div>

                    <UserCircle size={18} className="shrink-0 text-gray-400" />
                  </Link>

                  {/* Logout */}

                  <button
                    onClick={logout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              ) : (
                /* Login / Register */

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-center rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="flex items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
