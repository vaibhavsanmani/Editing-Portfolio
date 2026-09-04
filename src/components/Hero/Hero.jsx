import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ClientOrbit from "./ClientOrbit";

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050505]
        px-4
        pb-12
        pt-28
        text-white
        sm:px-6
        md:px-10
        md:pt-36
        lg:px-12
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[350px]
          w-[350px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.025]
          blur-[120px]
          sm:h-[420px]
          sm:w-[420px]
          lg:h-[500px]
          lg:w-[500px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[-60px]
          top-[43%]
          z-0
          hidden
          -translate-y-1/2
          scale-[0.72]
          lg:block
        "
      >
        <ClientOrbit />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-3 sm:mb-8"
        >
          <span className="h-2 w-2 rounded-full bg-white" />
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/50 sm:text-xs">
            Video Editor & Content Creator
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            z-10
            max-w-6xl
            text-[clamp(2.8rem,12vw,9rem)]
            font-semibold
            leading-[0.82]
            tracking-[-0.07em]
          "
        >
          TURNING RAW
          <br />
          <span className="text-white/40">FOOTAGE</span> INTO
          <br />
          CONTENT.
        </motion.h1>

        <div className="relative z-10 mt-8 flex flex-col gap-6 sm:mt-10 md:mt-12 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-md text-sm leading-relaxed text-white/55 sm:text-base md:text-lg"
          >
            I create engaging reels, YouTube videos and social content that turns attention into impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            className="w-full max-w-[220px] sm:max-w-none"
          >
            <Link
              to="/work"
              className="
                group
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                bg-white
                px-5
                py-3.5
                text-sm
                font-medium
                text-black
                transition-transform
                duration-200
                hover:scale-[1.01]
                sm:w-fit
                sm:justify-start
                sm:px-6
                sm:py-4
              "
            >
              View My Work
              <motion.span
                variants={{ hover: { x: 4, y: -4 } }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowUpRight size={18} />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-2 sm:mt-12"
        >
          {["Reels", "Brand Films", "Commercials", "Social Content"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/55 sm:text-[11px]"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}