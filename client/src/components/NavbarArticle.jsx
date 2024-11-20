import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavbarArticle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const user = localStorage.getItem("User");

  // Empty dependency array ensures this runs only once when the component mounts

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 relative px-4 py-4 md:py-6 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl md:text-2xl sm:mb-2 font-bold">
            Cosmic Journey
          </h1>
          <button onClick={toggleMenu} className="text-white md:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
            <span className="sr-only">
              {isOpen ? "Close Menu" : "Open Menu"}
            </span>
          </button>
        </div>
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:space-x-6 mt-4 md:mt-0 space-y-2 md:space-y-0`}
        >
          <li>
            <Link
              to="/"
              className={`text-white hover:text-blue-300 block ${
                location.pathname === "/" ? "underline" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/articles"
              className={`text-white hover:text-blue-300 block ${
                location.pathname === "/articles" ? "underline" : ""
              }`}
            >
              Articles
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white hover:text-blue-300 block"
            >
              Contact
            </Link>
          </li>
          <li>
            {user ? (
              <Link
                to="/profile"
                className={`text-white hover:text-blue-300 block ${
                  location.pathname === "/profile" ? "underline" : ""
                }`}
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/signin"
                className={`text-white hover:text-blue-300 block ${
                  location.pathname === "signin" ? "underline" : ""
                }`}
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarArticle;
