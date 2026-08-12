import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  MapPin,
  MessageCircle,
  Sparkles,
  Video,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "Cinematic Reel",
    subtitle: "Shoot + Edit",
    price: "₹1,500+",
    label: "PER REEL",
    description:
      "High-quality cinematic reels shot and edited to make your brand stand out.",
    tools: "iPhone 15  •  CapCut",
    features: [
      "Shooting on iPhone 15",
      "Cinematic shots & angles",
      "Color grading",
      "Smooth transitions",
      "Sound design",
      "Text / Titles",
      "Basic effects",
    ],
    note: "Extra charges applicable depending on location, travel & shoot duration.",
    icon: Video,
  },
  {
    number: "02",
    title: "Informative Reel",
    subtitle: "Basic Editing",
    price: "₹1,200+",
    label: "PER REEL",
    description:
      "Clean and engaging short-form content designed for creators, brands and businesses.",
    tools: "Premiere Pro",
    features: [
      "Clean cuts & pacing",
      "Subtitles / Captions",
      "B-rolls & overlays",
      "Basic text animations",
      "Audio sync & enhancement",
      "Basic transitions",
    ],
    note: "Price may vary depending on video length, content and amount of work.",
    icon: MessageCircle,
  },
  {
    number: "03",
    title: "Informative Reel",
    subtitle: "Motion Graphics",
    price: "₹1,800+",
    label: "PER REEL",
    description:
      "Advanced edits with motion graphics and visual elements that keep viewers engaged.",
    tools: "Premiere Pro  •  After Effects",
    features: [
      "Everything in Basic Editing",
      "Motion Graphics",
      "Kinetic Typography",
      "Animated Icons / Elements",
      "Charts & Visuals",
      "Custom Transitions",
    ],
    note: "Price may increase based on the complexity and amount of motion graphics used.",
    icon: Sparkles,
  },
];

export default function Services() {
  return (
    <main className="min-h-screen bg-black px-5 py-32 text-white md:px-10 lg:px-16">

      {/* ================= HEADER ================= */}
      <section className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-white" />

          <span className="text-xs uppercase tracking-[0.3em] text-white/40">
            What I Do
          </span>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr] md:items-end">

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-5xl text-[clamp(4rem,10vw,9rem)] font-semibold leading-[0.82] tracking-[-0.07em]"
          >
            VIDEO
            <br />
            <span className="text-white/35">SERVICES.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-md pb-2"
          >
            <p className="text-base leading-relaxed text-white/50 md:text-lg">
              High-quality visuals. Powerful storytelling. Content crafted
              specifically for creators, brands and businesses.
            </p>
          </motion.div>

        </div>

        {/* Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/30"
        >
          <ArrowDownRight size={16} />
          Explore services
        </motion.div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="mx-auto mt-24 max-w-7xl">

        <div className="grid gap-5 lg:grid-cols-3">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                }}
                whileHover={{ y: -8 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b]"
              >

                {/* Top */}
                <div className="p-7 md:p-8">

                  <div className="mb-12 flex items-center justify-between">

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xs text-white/60">
                      {service.number}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 group-hover:border-white group-hover:text-white">
                      <Icon size={17} />
                    </div>

                  </div>

                  {/* Title */}
                  <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                    {service.title}
                  </h2>

                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/35">
                    {service.subtitle}
                  </p>

                  <p className="mt-7 min-h-[72px] text-sm leading-relaxed text-white/45">
                    {service.description}
                  </p>

                  {/* Price */}
                  <div className="mt-8 border-t border-white/10 pt-7">

                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/30">
                      Starting from
                    </p>

                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-4xl font-semibold tracking-[-0.05em]">
                        {service.price}
                      </span>

                      <span className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/30">
                        {service.label}
                      </span>
                    </div>

                  </div>

                  {/* Tools */}
                  <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <p className="text-xs text-white/50">
                      {service.tools}
                    </p>
                  </div>

                </div>

                {/* Features */}
                <div className="border-t border-white/10 px-7 py-7 md:px-8">

                  <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-white/30">
                    Includes
                  </p>

                  <div className="space-y-3">

                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 text-sm text-white/65"
                      >
                        <Check
                          size={15}
                          className="mt-0.5 shrink-0 text-white"
                        />

                        <span>{feature}</span>
                      </div>
                    ))}

                  </div>

                </div>

                {/* Bottom Note */}
                <div className="mt-auto border-t border-white/10 bg-white/[0.025] px-7 py-6 md:px-8">

                  <div className="flex gap-3">

                    <MapPin
                      size={17}
                      className="mt-0.5 shrink-0 text-white/40"
                    />

                    <p className="text-xs leading-relaxed text-white/35">
                      {service.note}
                    </p>

                  </div>

                </div>

              </motion.article>
            );
          })}

        </div>

      </section>

      {/* ================= NOTE ================= */}
      <section className="mx-auto mt-8 max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-7 md:p-10"
        >

          <div className="grid gap-10 md:grid-cols-2 md:items-center">

            <div>

              <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40">
                Important
              </p>

              <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                Every project is different.
              </h3>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/40">
                These prices are starting points. Final pricing depends on
                your requirements, video length, shooting location, editing
                complexity and turnaround time.
              </p>

            </div>

            <div className="md:flex md:justify-end">

              <a
                href="#contact"
                className="group flex w-full items-center justify-between rounded-2xl bg-white px-6 py-5 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.02] md:max-w-sm"
              >
                <span>Have a different requirement?</span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </a>

            </div>

          </div>

        </motion.div>

      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="mx-auto mt-32 max-w-7xl border-t border-white/10 pt-16">

        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">

          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              Let's create
            </p>

            <h2 className="mt-5 max-w-3xl text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.85] tracking-[-0.07em]">
              GREAT CONTENT
              <br />
              <span className="text-white/35">
                TOGETHER.
              </span>
            </h2>

          </div>

          <a
            href="#contact"
            className="group flex w-fit items-center gap-4 rounded-full border border-white/15 px-6 py-4 text-sm transition-all duration-300 hover:bg-white hover:text-black"
          >
            Let's Work Together

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>

        </div>

      </section>

    </main>
  );
}