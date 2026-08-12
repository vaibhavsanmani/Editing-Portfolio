import { motion } from "framer-motion";

// ============================================================
// CLIENT LOGOS
// ============================================================

const clients = [
  {
    id: 1,
    name: "Aadhya",
    logo: "/clients/client1.png",
  },
  {
    id: 2,
    name: "Client 2",
    logo: "/clients/client2.png",
  },
  {
    id: 3,
    name: "Client 3",
    logo: "/clients/client3.png",
  },
  {
    id: 4,
    name: "Client 4",
    logo: "/clients/client4.png",
  },
  {
    id: 5,
    name: "Client 5",
    logo: "/clients/client5.png",
  },
  {
    id: 6,
    name: "Client 6",
    logo: "/clients/client6.png",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ClientOrbit() {
  return (
    <div
      className="
        relative
        h-[620px]
        w-[620px]
      "
    >
      {/* =====================================================
          AMBIENT GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          rounded-full
          bg-gradient-to-r
          from-[#050505]/20
          via-transparent
          to-transparent
          opacity-60
        "
      />

      {/* =====================================================
          ORBIT 1
      ===================================================== */}

      <motion.div
        className="
          absolute
          left-[29%]
          top-[29%]
          h-[260px]
          w-[260px]
          rounded-full
          border
          border-white/[0.28]
          shadow-[0_0_25px_rgba(255,255,255,0.05)]
        "
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <OrbitLogo
          logo={clients[0].logo}
          name={clients[0].name}
          className="
            left-[8%]
            top-[12%]
          "
        />
      </motion.div>

      {/* =====================================================
          ORBIT 2
      ===================================================== */}

      <motion.div
        className="
          absolute
          left-[17%]
          top-[17%]
          h-[380px]
          w-[380px]
          rounded-full
          border
          border-white/[0.20]
          shadow-[0_0_30px_rgba(255,255,255,0.035)]
        "
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <OrbitLogo
          logo={clients[1].logo}
          name={clients[1].name}
          className="
            right-[4%]
            top-[22%]
          "
        />

        <OrbitLogo
          logo={clients[2].logo}
          name={clients[2].name}
          className="
            bottom-[8%]
            left-[17%]
          "
        />
      </motion.div>

      {/* =====================================================
          ORBIT 3
      ===================================================== */}

      <motion.div
        className="
          absolute
          left-[7%]
          top-[7%]
          h-[500px]
          w-[500px]
          rounded-full
          border
          border-white/[0.16]
          shadow-[0_0_35px_rgba(255,255,255,0.025)]
        "
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 58,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <OrbitLogo
          logo={clients[3].logo}
          name={clients[3].name}
          className="
            right-[7%]
            bottom-[22%]
          "
        />

        <OrbitLogo
          logo={clients[4].logo}
          name={clients[4].name}
          className="
            left-[4%]
            top-[32%]
          "
        />
      </motion.div>

      {/* =====================================================
          ORBIT 4
      ===================================================== */}

      <motion.div
        className="
          absolute
          left-0
          top-0
          h-[620px]
          w-[620px]
          rounded-full
          border
          border-white/[0.12]
        "
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 72,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <OrbitLogo
          logo={clients[5].logo}
          name={clients[5].name}
          className="
            right-[18%]
            top-[8%]
          "
        />
      </motion.div>

      {/* =====================================================
          ORBIT HIGHLIGHT
          Small glowing points for a brighter premium feel
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[7%]
          top-[7%]
          h-[500px]
          w-[500px]
          rounded-full
          border
          border-white/[0.04]
        "
      />

      {/* =====================================================
          CENTER LOGO
      ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          z-20
          flex
          h-[180px]
          w-[180px]
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/[0.22]
          bg-[#050505]/90
          shadow-[0_0_50px_rgba(255,255,255,0.08)]
          backdrop-blur-xl
        "
      >
        {/* Inner ring */}

        <div
          className="
            absolute
            inset-[9px]
            rounded-full
            border
            border-white/[0.08]
          "
        />

        {/* Logo glow */}

        <div
          className="
            pointer-events-none
            absolute
            h-[105px]
            w-[105px]
            rounded-full
            bg-white/[0.07]
            blur-2xl
          "
        />

        {/* Logo container */}

        <div
          className="
            relative
            flex
            h-[112px]
            w-[112px]
            items-center
            justify-center
            rounded-full
            bg-white
            p-5
            shadow-[0_0_35px_rgba(255,255,255,0.12)]
          "
        >
          <img
            src="/clients/sniplogo.png"
            alt="SnipSync Studios"
            className="
              h-full
              w-full
              object-contain
            "
          />
        </div>

        {/* Studios label */}

        <span
          className="
            absolute
            bottom-[17px]
            text-[8px]
            font-medium
            uppercase
            tracking-[0.45em]
            text-white/50
          "
        >
          Studios
        </span>
      </div>

      {/* =====================================================
          LEFT SIDE FADE
          Put this ABOVE orbit but BELOW center
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          rounded-full
          bg-gradient-to-r
          from-[#050505]
          via-[#050505]/20
          to-transparent
        "
      />
    </div>
  );
}

// ============================================================
// LOGO COMPONENT
// ============================================================

function OrbitLogo({
  logo,
  name,
  className = "",
}) {
  return (
    <motion.div
      className={`
        absolute
        ${className}
        z-10
        flex
        h-[58px]
        w-[58px]
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        border-white/[0.30]
        bg-white/[0.10]
        p-2
        shadow-[0_0_20px_rgba(255,255,255,0.06)]
        backdrop-blur-md
      `}
      whileHover={{
        scale: 1.18,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
    >
      <img
        src={logo}
        alt={`${name} logo`}
        className="
          h-full
          w-full
          rounded-full
          object-contain
        "
      />
    </motion.div>
  );
}