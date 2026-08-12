import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    name: "Work",
    path: "/work",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Services",
    path: "/services",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] px-5 pb-8 pt-16 text-white md:px-10 md:pt-24">
      <div className="mx-auto max-w-7xl">

        {/* Top Divider */}
        <div className="mb-16 h-px w-full bg-white/10" />

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[2fr_1fr_1fr]">

          {/* ================= BRAND ================= */}

          <div>
            <Link to="/">
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                className="w-fit text-3xl font-semibold tracking-[-0.05em]"
              >
                SNIPSYNC
                <span className="ml-1 text-sm text-white/40">
                  ®
                </span>
              </motion.div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/40">
              Video Editing • Content Creation • Reels • YouTube
            </p>

            {/* Availability */}
            <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/40">
              <span className="h-2 w-2 rounded-full bg-green-400" />

              Available for projects
            </div>
          </div>

          {/* ================= NAVIGATION ================= */}

          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.25em] text-white/30">
              Navigation
            </p>

            <div className="flex flex-col gap-5">
              {footerLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="group flex w-fit items-center gap-2 text-base text-white/60 transition-colors hover:text-white"
                >
                  {item.name}

                  <ArrowUpRight
                    size={15}
                    className="opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* ================= CONNECT ================= */}

          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.25em] text-white/30">
              Connect
            </p>

            <div className="flex items-center gap-3">

              {/* Instagram SVG */}
              <motion.a
                href="https://instagram.com/vaibhav_sanmani"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -5,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-white/30"
                aria-label="Instagram"
              >
                <img
                  src="/logos/instagram.svg"
                  alt="Instagram"
                  className="h-6 w-6 opacity-70 transition-opacity duration-300 hover:opacity-100"
                />
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:hello@snipsync.studio"
                whileHover={{
                  y: -5,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/30 hover:text-white"
                aria-label="Email"
              >
                <Mail size={22} />
              </motion.a>

            </div>
          </div>

        </div>

        {/* Bottom Divider */}
        <div className="my-12 h-px w-full bg-white/10" />

        {/* ================= BOTTOM ================= */}

        <div className="flex flex-col justify-between gap-5 text-sm text-white/40 md:flex-row md:items-center">

          <p>
            © {new Date().getFullYear()} SnipSync Studios. All rights reserved.
          </p>

          <p>
            Designed & Developed by{" "}
            <span className="text-white/60">
              Vaibhav Sanmani
            </span>
            .
          </p>

        </div>

      </div>
    </footer>
  );
}