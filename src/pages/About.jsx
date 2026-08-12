import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen bg-black px-5 py-32 text-white md:px-10">
      
      {/* Hero */}
      <section className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-white" />

          <span className="text-xs uppercase tracking-[0.3em] text-white/40">
            About Me
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-6xl text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[0.88] tracking-[-0.07em]"
        >
          I EDIT
          <br />
          <span className="text-white/40">STORIES,</span>
          <br />
          NOT JUST
          <br />
          VIDEOS.
        </motion.h1>

        {/* Intro */}
        <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-end">

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="max-w-xl text-lg leading-relaxed text-white/50 md:text-xl"
          >
            I'm Vaibhav Sanmani, a video editor and content creator
            focused on creating engaging reels, short-form content,
            YouTube videos and visual stories that capture attention.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="md:ml-auto md:max-w-sm"
          >
            <p className="text-sm leading-relaxed text-white/40">
              From raw footage to the final frame, I focus on pacing,
              storytelling, sound, motion and details that make content
              feel intentional.
            </p>
          </motion.div>

        </div>
      </section>


      {/* Divider */}
      <div className="mx-auto my-28 h-px max-w-7xl bg-white/10" />


      {/* What I Do */}
      <section className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">
            What I Do
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
            Turning footage
            <br />
            <span className="text-white/40">
              into attention.
            </span>
          </h2>
        </motion.div>


        {/* Services */}
        <div className="grid border-t border-white/10 md:grid-cols-2">

          {[
            {
              number: "01",
              title: "Short-Form Content",
              text: "Reels, Shorts and social content designed around strong hooks, pacing and retention.",
            },
            {
              number: "02",
              title: "YouTube Editing",
              text: "Clean, engaging edits with storytelling, sound design, transitions and visual rhythm.",
            },
            {
              number: "03",
              title: "Brand Content",
              text: "Professional video content that keeps your brand visually consistent and memorable.",
            },
            {
              number: "04",
              title: "Creative Editing",
              text: "Motion, effects, typography and creative sequences that give ordinary footage more impact.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className="group border-b border-white/10 p-8 md:p-12"
            >

              <div className="mb-12 flex items-start justify-between">

                <span className="text-xs text-white/30">
                  {item.number}
                </span>

                <motion.div
                  whileHover={{
                    x: 4,
                    y: -4,
                  }}
                  className="text-white/30 transition-colors group-hover:text-white"
                >
                  <ArrowUpRight size={20} />
                </motion.div>

              </div>

              <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                {item.title}
              </h3>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/40">
                {item.text}
              </p>

            </motion.div>
          ))}

        </div>
      </section>


      {/* Tools */}
      <section className="mx-auto mt-32 max-w-7xl">

        <div className="grid gap-12 md:grid-cols-2">

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">
              Tools
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              My creative
              <br />
              <span className="text-white/40">
                toolkit.
              </span>
            </h2>
          </div>


          <div className="grid grid-cols-2 gap-3">

            {[
              "Premiere Pro",
              "CapCut",
              "After Effects",
              "Photoshop",
              "Lightroom",
              "Canva",
            ].map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -4,
                }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
              >
                {tool}
              </motion.div>
            ))}

          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="mx-auto mt-32 max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-16"
        >

          {/* Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-[100px]" />

          <p className="relative mb-5 text-xs uppercase tracking-[0.3em] text-white/30">
            Let's create
          </p>

          <h2 className="relative max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
            Have footage?
            <br />
            <span className="text-white/40">
              Let's turn it into something people watch.
            </span>
          </h2>

          <motion.a
            href="/contact"
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            className="group relative mt-10 flex w-fit items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-medium text-black"
          >
            Let's Work Together

            <motion.span
              variants={{
                hover: {
                  x: 4,
                  y: -4,
                },
              }}
            >
              <ArrowUpRight size={18} />
            </motion.span>
          </motion.a>

        </motion.div>

      </section>

    </main>
  );
}