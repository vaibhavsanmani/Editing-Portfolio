import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("sending");

    try {
      await emailjs.send(
        "service_jxxyg4",
        "template_givi9eq",
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          message: formData.message,
        },
        {
          publicKey: "0C2WJWDArwATssDF4",
        }
      );

      setStatus("success");

      setFormData({
        from_name: "",
        from_email: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-black px-5 py-28 text-white md:px-10 lg:px-16">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-white" />

            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              Contact
            </span>
          </div>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.06em] md:text-7xl lg:text-8xl">
            Let's create
            <br />
            something{" "}
            <span className="text-white/40">
              great.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/50 md:text-xl">
            Have a project in mind? Tell me about it and let's
            turn your idea into content that gets attention.
          </p>
        </motion.div>

        {/* Content */}
        <div className="mt-20 grid gap-20 lg:grid-cols-[1fr_0.7fr]">

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-10"
          >

            {/* Name */}
            <div>
              <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-white/40">
                Your Name
              </label>

              <input
                type="text"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full border-b border-white/20 bg-transparent py-4 text-lg text-white outline-none placeholder:text-white/20 transition focus:border-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-white/40">
                Email
              </label>

              <input
                type="email"
                name="from_email"
                value={formData.from_email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full border-b border-white/20 bg-transparent py-4 text-lg text-white outline-none placeholder:text-white/20 transition focus:border-white"
              />
            </div>

            {/* Message */}
            <div>
              <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-white/40">
                Tell me about your project
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="What are you looking to create?"
                className="w-full resize-none border-b border-white/20 bg-transparent py-4 text-lg text-white outline-none placeholder:text-white/20 transition focus:border-white"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="group flex items-center gap-4 rounded-full bg-white px-8 py-4 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  Sending...
                </>
              ) : status === "success" ? (
                <>
                  <Check size={20} />
                  Inquiry Sent
                </>
              ) : (
                <>
                  Send Inquiry

                  <ArrowUpRight
                    size={20}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

            {/* Messages */}
            {status === "success" && (
              <p className="text-sm text-green-400">
                Your inquiry has been sent successfully.
              </p>
            )}

            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </motion.form>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:pl-10"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              Available for
            </p>

            <div className="mt-6 space-y-3 text-2xl text-white/70 md:text-3xl">
              <p>Reels</p>
              <p>YouTube Videos</p>
              <p>Brand Content</p>
              <p>Social Media</p>
              <p>Video Production</p>
            </div>

            <div className="mt-16 border-t border-white/10 pt-8">
              <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                Direct Contact
              </p>

              <a
                href="mailto:vaibhavsanmani9@gmail.com"
                className="mt-4 block text-lg text-white/60 transition hover:text-white"
              >
                vaibhavsanmani9@gmail.com
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}