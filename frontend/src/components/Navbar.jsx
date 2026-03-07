import React from "react";

const Navbar = () => {
  return (
    <header className="fixed top-6 left-0 w-full flex justify-center z-50">

      <nav className="flex items-center justify-between w-187.5 px-8 py-3 rounded-full
      bg-white/70 backdrop-blur-md shadow-lg border border-gray-200">

        {/* Logo */}
        <h1 className="text-lg font-bold">
          Srinu<span className="text-green-600">.dev</span>
        </h1>

        {/* Links */}
        <ul className="flex items-center gap-6 text-gray-700 text-sm font-medium">

          <li className="hover:text-black transition cursor-pointer">
            About
          </li>

          <li className="hover:text-black transition cursor-pointer">
            Education
          </li>

          <li className="hover:text-black transition cursor-pointer">
            Skills
          </li>

          <li className="hover:text-black transition cursor-pointer">
            Projects
          </li>

        </ul>

        {/* Resume Button */}
        <button className="bg-black text-white px-5 py-2 rounded-full text-sm
        hover:bg-gray-800 transition">
          Resume
        </button>

      </nav>

    </header>
  );
};

export default Navbar;