import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CiSearch, CiUser } from "react-icons/ci";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useExamStore } from "../../Zustand/GetAllExams";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

/** SECRET KEY for encryption – must match your auth store **/
const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /** ------------------ UI States ------------------ **/
  const [menuOpen, setMenuOpen] = useState(false);
  const [examOpen, setExamOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const searchInputRef = useRef(null);

  /** ------------------ Zustand Store ------------------ **/
  const { exams, loading, error, fetchAllExams } = useExamStore();

  useEffect(() => {
    if (exams.length === 0) fetchAllExams();
  }, [fetchAllExams, exams.length]);

  /** ------------------ Token & Decryption ------------------ **/
  const getDecryptedUser = useCallback(() => {
    try {
      const encryptedData = localStorage.getItem("userData");
      if (!encryptedData) return null;
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decrypted;
    } catch {
      return null;
    }
  }, []);

  const updateUserData = useCallback(() => {
    const user = getDecryptedUser();
    setUserData(user);
  }, [getDecryptedUser]);

  useEffect(() => {
    updateUserData();

    const syncHandler = () => updateUserData();
    window.addEventListener("storage", syncHandler);
    window.addEventListener("userDataChanged", syncHandler);

    return () => {
      window.removeEventListener("storage", syncHandler);
      window.removeEventListener("userDataChanged", syncHandler);
    };
  }, [updateUserData]);

  /** ------------------ Token Detection ------------------ **/
  const token = useMemo(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    return authData?.user?.refreshToken || null;
  }, []);

  /** ------------------ Logout ------------------ **/


  /** ------------------ Navigation ------------------ **/
  const handleNavigate = useCallback(
    (path) => {
      setMenuOpen(false);
      setExamOpen(false);
      setSearchOpen(false);
      navigate(path);
    },
    [navigate]
  );

  const handleExamClick = useCallback(
    (id) => {
      setExamOpen(false);
      setMenuOpen(false);
      navigate(`/exams/${id}`);
    },
    [navigate]
  );

  const handleMobileAuth = useCallback(() => {
    setMenuOpen(false);
    navigate("/login");
  }, [navigate]);

  /** ------------------ Focus Search ------------------ **/
  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  /** ------------------ Navigation Links ------------------ **/
  const navLinks = useMemo(
    () => [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Courses", path: "/courses" },
      { label: "Quiz", path: "/quiz" },
      { label: "Study Material", path: "/study-material" },
      { label: "Blog", path: "/blog" },
      { label: "Contact", path: "/contact" }
    ],
    []
  );

  /** ------------------ Animations ------------------ **/
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" }
  };

  const underlineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    exit: { scaleX: 0, opacity: 0 }
  };

  return (
    <>
      {/* 🌐 Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-[998] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo + Exams */}
          <div className="flex items-center gap-6">
            <img
              src="/logo2.svg"
              alt="Logo"
              className="h-12 w-auto cursor-pointer select-none"
              onClick={() => handleNavigate("/")}
            />

            <div className="h-8 w-0.5 bg-gray-300" />

            {/* Exams Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExamOpen((p) => !p)}
                aria-haspopup="true"
                aria-expanded={examOpen}
                className="px-3 py-1 rounded-xl border-2 border-[var(--secondary-color)] text-gray-700 font-medium hover:text-[var(--primary-color)] transition flex items-center gap-2"
              >
                All Exams ▾
              </button>

              <AnimatePresence>
                {examOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-60 bg-white border rounded-md shadow-lg z-10 max-h-64 overflow-auto"
                  >
                    {loading && (
                      <p className="text-sm text-gray-500 p-4 text-center">
                        Loading exams...
                      </p>
                    )}
                    {error && (
                      <p className="text-sm text-red-500 p-4 text-center">
                        Failed to load exams
                      </p>
                    )}
                    {!loading &&
                      !error &&
                      exams.map((exam) => (
                        <div
                          key={exam._id}
                          onClick={() => handleExamClick(exam._id)}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer transition text-gray-700"
                        >
                          {exam.name}
                        </div>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <div key={path} className="relative">
                  <button
                    onClick={() => handleNavigate(path)}
                    className={`text-gray-700 font-medium hover:text-[var(--primary-color)] transition ${
                      isActive ? "text-[var(--primary-color)]" : ""
                    }`}
                  >
                    {label}
                  </button>
                  {isActive && (
                    <motion.div
                      key={path}
                      className="absolute left-0 bottom-[-4px] h-[2px] bg-[var(--primary-color)] w-full origin-left"
                      variants={underlineVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    />
                  )}
                </div>
              );
            })}

            <CiSearch
              className="text-2xl text-gray-600 cursor-pointer hover:text-[var(--primary-color)] transition"
              onClick={() => setSearchOpen(true)}
            />

            <div className="hidden md:block w-1 border-2 rounded-2xl bg-pink-500 h-10"></div>

            {/* Show Cart & Profile only if token exists */}
            {token ? (
              <div className="flex items-center gap-3">
                <FiShoppingCart
                  className="text-2xl text-gray-700 cursor-pointer hover:text-[var(--primary-color)] transition"
                  onClick={() => handleNavigate("/cart")}
                />
                <CiUser
                  className="text-2xl text-gray-700 cursor-pointer hover:text-[var(--primary-color)] transition"
                  onClick={() => handleNavigate(`/profile/${userData?._id || ""}`)}
                />
            
              </div>
            ) : (
              <button
                onClick={() => handleNavigate("/login")}
                className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-full hover:brightness-95 transition"
              >
                Login / Signin
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-3">
            <CiSearch
              className="text-xl text-gray-600 cursor-pointer hover:text-[var(--primary-color)] transition"
              onClick={() => setSearchOpen(true)}
            />
            <button
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-md"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="md:hidden px-4 pb-4 border-t bg-white"
            >
              <div className="flex flex-col gap-2 mt-2">
                {navLinks.map(({ label, path }) => (
                  <button
                    key={path}
                    onClick={() => handleNavigate(path)}
                    className={`w-full text-left py-2 px-2 rounded-md ${
                      location.pathname === path
                        ? "text-[var(--primary-color)]"
                        : "text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}

                <div className="border-t my-2" />

                {token ? (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleNavigate("/cart")}
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      <FiShoppingCart className="text-xl" />
                      <span>Cart</span>
                    </button>
                    <button
                      onClick={() =>
                        handleNavigate(`/profile/${userData?._id || ""}`)
                      }
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      <CiUser className="text-xl" />
                      <span>Profile</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleMobileAuth}
                    className="mt-3 w-full bg-[var(--primary-color)] text-white py-2 rounded-full font-medium hover:brightness-95 transition"
                  >
                    Login / Sign Up
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default React.memo(Navbar);