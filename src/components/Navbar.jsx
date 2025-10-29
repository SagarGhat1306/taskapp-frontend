import React from "react";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white shadow-md">
      <div className="max-w-[100%] mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-20 py-3">
        
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          {/* Hide Task Manager on small screens */}
          <div className="hidden sm:block text-xl sm:text-2xl font-bold tracking-wide">
            Task Manager
          </div>

          {/* Show only user name on small screens */}
          <div className="block sm:hidden font-semibold text-sm">
            {user?.name || "User"}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Show user info on md+ screens only */}
          <div className="hidden sm:block text-right">
            <p className="font-semibold text-sm sm:text-base lg:text-lg">
              Welcome, {user?.name || "User"}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 truncate max-w-[200px]">
              {user?.email}
            </p>
          </div>

          {/* Logout Button - Always Visible */}
          <button
            onClick={onLogout}
            className="px-3 sm:px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-xs sm:text-sm font-medium transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
