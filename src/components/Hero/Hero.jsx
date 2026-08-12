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
        px-5
        pb-0
        pt-32
        text-white
        md:px-10
        md:pt-40
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.025]
          blur-[120px]
        "
      />

      {/* =====================================================
          CLIENT ORBIT
          - Smaller
          - Right aligned
          - Behind hero text
          - Hidden on mobile
      ===================================================== */}

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

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-7xl">

        {/* ===================================================
            SMALL LABEL
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mb-8
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-white
            "
          />

          <span
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-white/50
            "
          >
            Video Editor & Content Creator
          </span>
        </motion.div>

        {/* ===================================================
            MAIN HEADING
        =================================================== */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            z-10
            max-w-6xl
            text-[clamp(3.5rem,9vw,9rem)]
            font-semibold
            leading-[0.85]
            tracking-[-0.07em]
          "
        >
          TURNING RAW
          <br />

          <span className="text-white/40">
            FOOTAGE
          </span>{" "}
          INTO
          <br />

          CONTENT.
        </motion.h1>

        {/* ===================================================
            BOTTOM CONTENT
        =================================================== */}

        <div
          className="
            relative
            z-10
            mt-12
            flex
            flex-col
            gap-10
            md:mt-16
            md:flex-row
            md:items-end
            md:justify-between
          "
        >

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.4,
            }}
            className="
              max-w-md
              text-base
              leading-relaxed
              text-white/50
              md:text-lg
            "
          >
            I create engaging reels, YouTube videos and
            social content that turns attention into impact.
          </motion.p>

          {/* =================================================
              CTA
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            whileHover="hover"
            whileTap={{
              scale: 0.95,
            }}
          >
            <Link
              to="/work"
              className="
                group
                flex
                w-fit
                items-center
                gap-3
                rounded-full
                bg-white
                px-6
                py-4
                text-sm
                font-medium
                text-black
              "
            >
              View My Work

              <motion.span
                variants={{
                  hover: {
                    x: 4,
                    y: -4,
                  },
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                }}
              >
                <ArrowUpRight size={18} />
              </motion.span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}