import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="text-2xl font-bold text-[var(--primary-color)]">Examon</div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-full hover:brightness-95 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="border border-[var(--primary-color)] text-[var(--primary-color)] px-4 py-2 rounded-full hover:bg-[var(--primary-color)] hover:text-white transition"
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
