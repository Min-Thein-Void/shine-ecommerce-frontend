"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/globalStates/useAuthStore";
import { Camera, Loader2, Save } from "lucide-react";

const API_URL = "http://localhost:3100";

const ProfilePage = () => {
  const router = useRouter();

  const User = useAuthStore((state) => state.User);
  const updateUser = useAuthStore((state) => state.updateUser);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================
  // LOAD USER DATA
  // =========================

  useEffect(() => {
    if (!User) {
      router.push("/login");
      return;
    }

    setName(User.name || "");
    setPhone(User.userProfile?.phone || "");
    setAddress(User.userProfile?.address || "");
  }, [User, router]);

  // =========================
  // UPDATE PROFILE
  // =========================

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(`${API_URL}/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          phone,
          address,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await res.json();

      // Update global Zustand state
      updateUser(updatedUser);

      setMessage("Profile updated successfully.");
    } catch (error) {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // IMAGE UPLOAD
  // =========================

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setUploading(true);
    setMessage("");
    setError("");

    try {
      const formData = new FormData();

      formData.append("image", file);

      const res = await fetch(`${API_URL}/users/profile/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const updatedProfile = await res.json();

      // Merge updated profile with existing user
      if (User) {
        updateUser({
          ...User,
          userProfile: updatedProfile,
        });
      }

      setMessage("Profile image updated successfully.");
    } catch (error) {
      setError("Failed to upload profile image.");
    } finally {
      setUploading(false);

      // Allow selecting the same image again
      e.target.value = "";
    }
  };

  // =========================
  // LOADING / AUTH
  // =========================

  if (!User) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-gray-500" size={28} />
      </div>
    );
  }

  const profileImage = User.userProfile?.image;

  const profileImageUrl = profileImage
    ? `${API_URL}/uploads/${profileImage}`
    : null;

  const userInitial = User.name?.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information and profile photo.
          </p>
        </div>

        {/* =========================
            PROFILE CARD
        ========================= */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* =========================
              PROFILE HEADER
          ========================= */}

          <div className="border-b border-gray-100 px-6 py-8 sm:px-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              {/* Avatar */}

              <div className="relative">
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt={User.name}
                    className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-black text-3xl font-bold text-white shadow-md">
                    {userInitial}
                  </div>
                )}

                {/* Upload button */}

                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-black text-white shadow-md transition hover:bg-gray-800"
                >
                  {uploading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Camera size={16} />
                  )}

                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              {/* User information */}

              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold text-gray-900">
                  {User.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">{User.email}</p>

                <span className="mt-3 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  {User.role}
                </span>
              </div>
            </div>
          </div>

          {/* =========================
              FORM
          ========================= */}

          <form onSubmit={handleUpdateProfile}>
            <div className="space-y-6 px-6 py-8 sm:px-8">
              {/* Name */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-4 focus:ring-gray-100"
                />
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  value={User.email}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Email address cannot be changed.
                </p>
              </div>

              {/* Phone */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-4 focus:ring-gray-100"
                />
              </div>

              {/* Address */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Address
                </label>

                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-4 focus:ring-gray-100"
                />
              </div>

              {/* Success */}

              {message && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                  <p className="text-sm text-green-700">{message}</p>
                </div>
              )}

              {/* Error */}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>

            {/* =========================
                FORM FOOTER
            ========================= */}

            <div className="flex justify-end border-t border-gray-100 bg-gray-50 px-6 py-4 sm:px-8">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
