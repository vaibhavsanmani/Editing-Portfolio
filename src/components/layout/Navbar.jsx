import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ videoPlaying = false }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {!videoPlaying && (
        <motion.nav
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="
            fixed
            left-0
            right-0
            top-0
            z-50
            px-4
            pt-4
            sm:px-6
            md:px-8
            lg:px-10
          "
        >
          {/* NAVBAR CONTAINER */}
          <div
            className="
              mx-auto
              flex
              h-[64px]
              w-full
              max-w-7xl
              items-center
              justify-between
              rounded-full
              border
              border-white/10
              bg-black/70
              px-5
              backdrop-blur-xl
              sm:h-[70px]
              sm:px-6
              md:px-7
              lg:h-[76px]
              lg:px-8
          "
          >
            {/* ================= LOGO ================= */}

            <Link
              to="/"
              onClick={closeMenu}
              className="shrink-0"
            >
              <motion.div
                whileHover={{ opacity: 0.8 }}
                className="
                  text-[18px]
                  font-semibold
                  tracking-[-0.04em]
                  text-white
                  sm:text-[19px]
                  md:text-[20px]
                "
              >
                SNIPSYNC
                <span className="text-white/40">
                  ®
                </span>
              </motion.div>
            </Link>

            {/* ================= DESKTOP NAV ================= */}

            <div
              className="
                absolute
                left-1/2
                hidden
                -translate-x-1/2
                items-center
                gap-7
                md:flex
                lg:gap-10
              "
            >
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative py-2"
                  >
                    <motion.span
                      whileHover={{ opacity: 1 }}
                      className={`
                        relative
                        text-sm
                        transition-colors
                        duration-300
                        lg:text-[15px]
                        ${
                          isActive
                            ? "text-white"
                            : "text-white/55"
                        }
                      `}
                    >
                      {item.name}
                    </motion.span>

                    {/* ACTIVE LINE */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active"
                        className="
                          absolute
                          -bottom-0.5
                          left-0
                          h-px
                          w-full
                          bg-white
                        "
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ================= DESKTOP CTA ================= */}

            <Link
              to="/contact"
              className="hidden md:block"
            >
              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-black
                  lg:px-6
                  lg:py-3
                "
              >
                Let's Talk

                <ArrowUpRight
                  size={17}
                  strokeWidth={2}
                />
              </motion.div>
            </Link>

            {/* ================= MOBILE MENU BUTTON ================= */}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                text-white
                md:hidden
              "
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>

          {/* ================= MOBILE MENU ================= */}

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  mx-auto
                  mt-3
                  w-full
                  max-w-7xl
                  rounded-3xl
                  border
                  border-white/10
                  bg-black/90
                  p-5
                  backdrop-blur-xl
                  md:hidden
                "
              >
                <div className="flex flex-col">
                  {navItems.map((item) => {
                    const isActive =
                      location.pathname === item.path;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeMenu}
                        className="
                          border-b
                          border-white/10
                          py-4
                        "
                      >
                        <div
                          className={`
                            flex
                            items-center
                            justify-between
                            text-lg
                            ${
                              isActive
                                ? "text-white"
                                : "text-white/60"
                            }
                          `}
                        >
                          {item.name}

                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </Link>
                    );
                  })}

                  {/* MOBILE CTA */}

                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className="mt-5"
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-full
                        bg-white
                        px-5
                        py-3.5
                        text-sm
                        font-medium
                        text-black
                      "
                    >
                      Let's Talk

                      <ArrowUpRight size={18} />
                    </div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}