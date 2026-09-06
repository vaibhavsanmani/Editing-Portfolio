import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
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
        pb-16
        pt-28
        text-white
        sm:px-6
        md:px-10
        md:pt-32
        lg:px-12
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.05),transparent_32%)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[-120px]
          top-[38%]
          z-0
          hidden
          -translate-y-1/2
          scale-[0.6]
          opacity-60
          lg:block
        "
      >
        <ClientOrbit />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-20 max-w-2xl"
          >
            <div className="mb-6 flex items-center gap-3 sm:mb-8">
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="text-[10px] uppercase tracking-[0.24em] text-white/50 sm:text-xs">
                Video editor • Visual storyteller
              </span>
            </div>

            <h1
              className="
                text-[clamp(3rem,8vw,8rem)]
                font-semibold
                leading-[0.8]
                tracking-[-0.07em]
                text-white
              "
            >
              Stories
              <span className="block text-white/40">that move</span>
              <span className="block">people.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base lg:text-lg">
              I shape raw footage into polished brand films, social content, and cinematic edits designed to grab attention and hold it.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/work"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-medium
                  text-black
                  transition-all
                  duration-200
                  hover:scale-[1.01]
                "
              >
                View my work
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.02]
                  px-6
                  py-3.5
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  duration-200
                  hover:border-white/20
                  hover:bg-white/[0.05]
                "
              >
                <Play size={15} className="fill-current" />
                Book a project
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/50">
              {["Brand films", "Commercials", "Social edits"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className="pointer-events-none absolute inset-0 rounded-full bg-white/[0.04] blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}