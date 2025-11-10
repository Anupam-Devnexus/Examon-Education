import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CiSearch, CiUser } from "react-icons/ci";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useExamStore } from "../../Zustand/GetAllExams";
import CryptoJS from "crypto-js";

// Lazy load the Global Search Modal for performance
const GlobalSearchModal = lazy(() => import("../GlobalSearch"));

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /** ------------------ UI States ------------------ **/
  const [menuOpen, setMenuOpen] = useState(false);
  const [examOpen, setExamOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const searchInputRef = useRef(null);

  /** ------------------ Zustand Store ------------------ **/
  const { exams, loading, error, fetchAllExams } = useExamStore();

  useEffect(() => {
    if (!exams.length) fetchAllExams();
  }, [exams.length, fetchAllExams]);

  /** ------------------ Decrypt User Data ------------------ **/
  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "your-secret-key";

  const getDecryptedUser = useCallback(() => {
    try {
      const encryptedData = localStorage.getItem("userData");
      if (!encryptedData) return null;
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch {
      return null;
    }
  }, [SECRET_KEY]);

  useEffect(() => {
    const user = getDecryptedUser();
    setUserData(user);

    const syncHandler = () => setUserData(getDecryptedUser());
    window.addEventListener("storage", syncHandler);
    window.addEventListener("userDataChanged", syncHandler);

    return () => {
      window.removeEventListener("storage", syncHandler);
      window.removeEventListener("userDataChanged", syncHandler);
    };
  }, [getDecryptedUser]);

  /** ------------------ Token ------------------ **/
  const token = useMemo(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    return authData?.user?.refreshToken || null;
  }, []);

  /** ------------------ Handlers ------------------ **/
  const handleNavigate = useCallback(
    (path) => {
      setMenuOpen(false);
      setExamOpen(false);
      setIsSearchOpen(false);
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

  /** ------------------ Focus on Search ------------------ **/
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [isSearchOpen]);

  /** ------------------ Navigation Links ------------------ **/
  const navLinks = useMemo(
    () => [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Courses", path: "/courses" },
      { label: "Quiz", path: "/quiz" },
      { label: "Study Material", path: "/study-material" },
      { label: "Blog", path: "/blog" },
      { label: "Contact", path: "/contact" },
    ],
    []
  );

  /** ------------------ Framer Motion Variants ------------------ **/
  const dropdownVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: -8 },
  };

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 260, damping: 25 },
    },
    exit: { opacity: 0, x: "100%" },
  };

  const underlineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: { scaleX: 0, opacity: 0 },
  };

  /** ------------------ Component JSX ------------------ **/
  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-[999]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo + Exam Dropdown */}
          <div className="flex items-center gap-5">
            <img
              src="/examon_logo.svg"
              alt="Logo"
              className="h-12 w-auto cursor-pointer select-none"
              onClick={() => handleNavigate("/")}
            />

            <div className="h-12 w-px bg-gray-300" />

            <div className="relative">
              <button
                onClick={() => setExamOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={examOpen}
                className="px-3 py-1 rounded-xl border-2 border-[var(--secondary-color)] text-gray-700 font-medium hover:text-[var(--primary-color)] transition flex items-center gap-1"
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
                    className="absolute top-full left-0 mt-2 w-60 bg-white border rounded-md shadow-lg z-10 max-h-64 overflow-y-auto"
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
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 transition"
                        >
                          {exam.title}
                        </div>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Nav Links */}
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

            {/* Search Icon */}
            <CiSearch
              className="text-2xl text-gray-600 cursor-pointer hover:text-[var(--primary-color)] transition"
              onClick={() => setIsSearchOpen(true)}
            />

            <div className="h-8 w-px bg-gray-300" />

            {/* Auth & Cart */}
            {token ? (
              <div className="flex items-center gap-3">
                <FiShoppingCart
                  className="text-2xl text-gray-700 cursor-pointer hover:text-[var(--primary-color)] transition"
                  onClick={() => handleNavigate("/cart")}
                />
                <CiUser
                  className="text-2xl text-gray-700 cursor-pointer hover:text-[var(--primary-color)] transition"
                  onClick={() =>
                    handleNavigate(`/profile/${userData?._id || ""}`)
                  }
                />
              </div>
            ) : (
              <button
                onClick={() => handleNavigate("/login")}
                className="bg-[var(--primary-color)] text-white px-5 py-2 rounded-full hover:brightness-95 transition"
              >
                Login / Signup
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-3">
            <CiSearch
              className="text-xl text-gray-600 cursor-pointer hover:text-[var(--primary-color)] transition"
              onClick={() => setIsSearchOpen(true)}
            />
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-md"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-[998]"
                onClick={() => setMenuOpen(false)}
              />
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-[999] p-5 overflow-y-auto"
              >
                <div className="flex flex-col gap-4 mt-5">
                  {navLinks.map(({ label, path }) => (
                    <button
                      key={path}
                      onClick={() => handleNavigate(path)}
                      className={`text-left border-l-2 py-2 px-2 ${
                        location.pathname === path
                          ? "text-[var(--primary-color)] font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {label}
                    </button>
                  ))}

                  <div className="border-t my-2" />

                  {token ? (
                    <div className="flex items-center justify-between gap-2">
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
                      className="mt-3 bg-[var(--primary-color)] text-white py-2 rounded-full font-medium hover:brightness-95 transition"
                    >
                      Login / Sign Up
                    </button>
                  )}

                  <div className="border-t my-2" />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Global Search Modal */}
      <Suspense fallback={null}>
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </Suspense>
    </>
  );
};

export default React.memo(Navbar);
