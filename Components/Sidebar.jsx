import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../public/logo.png";
import { useAuth } from "../src/AuthContext"; // Import useAuth

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, logout, user, userRole } = useAuth(); // Get isLoggedIn, logout, user, and userRole from AuthContext
  const navigate = useNavigate();

  // Close on Escape for accessibility
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/signin"); // Redirect to signin page after logout
  };

  const loggedOutNavItems = [
    { label: "Home", to: "/" },
    { label: "Signup", to: "/signup" },
    { label: "Signin", to: "/signin" },
  ];

  const getLoggedInNavItems = (role) => {
    const items = [
      { label: "Profile", to: "/profile" },
      { label: "Dashboard", to: "/dashboard" },
    ];
    if (role === 'farmer') {
      items.push({ label: "Products", to: "/products" });
    } else if (role === 'retailer') {
      items.push({ label: "Shopping", to: "/shopping" });
    }
    return items;
  };

  return (
    <>
      {/* Global top bar (always visible) */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-stone-50/80 backdrop-blur px-4 md:px-6 py-3 border-b border-stone-200">
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-stone-300 bg-white text-stone-700 hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500"
        >
          <svg
            className={`h-6 w-6 transition-transform ${open ? "rotate-90" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>

        {/* Top-bar logo (bigger on larger screens) */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Farm2Bazaar Logo"
            className="h-12 md:h-16 lg:h-20 xl:h-24 w-auto object-contain"
          />
        </div>

        {/* Right side space or actions placeholder */}
        <div className="w-11" />
      </header>

      {/* Overlay for all sizes */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 z-50 h-screen bg-stone-100 text-stone-800 shadow-2xl",
          // Widths: comfortable desktop sizing
          "w-72 md:w-80 xl:w-96",
          // Offcanvas behavior
          "transform transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Brand inside sidebar for larger sizes */}
        <div className="hidden md:flex items-center gap-2 px-6 pt-5 pb-2">
          <img
            src={logo}
            alt="Farm2Bazaar Logo"
            className="h-12 lg:h-16 xl:h-20 w-auto object-contain"
          />
        </div>

        <nav className="px-4 md:px-6 py-4">
          <ul className="space-y-1">
            {(isLoggedIn ? getLoggedInNavItems(userRole) : loggedOutNavItems).map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3 md:py-3.5 text-lg md:text-xl font-medium text-stone-800 hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500"
                >
                  <span>{item.label}</span>
                  <svg
                    className="h-4 w-4 text-stone-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              </li>
            ))}
            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-between rounded-lg px-3 py-3 md:py-3.5 text-lg md:text-xl font-medium text-stone-800 hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500 w-full"
                >
                  <span>Logout</span>
                  <svg
                    className="h-4 w-4 text-stone-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </li>
            )}
          </ul>

          
        </nav>
      </aside>

      {/* Content spacer so layout doesn’t hide under sidebar on large screens */}
      <div
        className={[
          "hidden lg:block",
          "pointer-events-none",
          "fixed left-0 top-0 h-screen",
          "w-72 md:w-80 xl:w-96",
        ].join(" ")}
      />

      {/* Example page content container */}
    </>
  );
};

export default Sidebar;
