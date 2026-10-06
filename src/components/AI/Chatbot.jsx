import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

const starterMessages = [
  "Hi! Ask me about the portfolio, services, or editing style.",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(
    starterMessages.map((text) => ({
      id: crypto.randomUUID(),
      role: "assistant",
      text,
    }))
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: trimmed,
          }),
        }
      );

      const data = await response.json();

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text:
          data?.reply ||
          "I’m here to help with portfolio questions.",
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text:
            "The AI service is unavailable right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[min(90vw,360px)] overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d0d]/95 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                  <Sparkles size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    SnipSync AI
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                    Assistant
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/30 hover:text-white"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[360px] space-y-3 overflow-y-auto bg-black/30 px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === "user"
                      ? "ml-auto max-w-[80%] rounded-2xl bg-white px-3 py-2 text-sm text-black"
                      : "max-w-[85%] rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm leading-relaxed text-white/85"
                  }
                >
                  {message.text}
                </div>
              ))}

              {loading && (
                <div className="max-w-[85%] rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/70">
                  Thinking...
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-white/10 bg-[#0d0d0d] p-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask anything..."
                  className="h-10 flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                  aria-label="Ask the AI assistant"
                />

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white text-black shadow-[0_10px_40px_rgba(255,255,255,0.18)] transition hover:scale-[1.03]"
        aria-label="Open AI assistant"
      >
        <MessageCircle size={22} />
      </button>
    </div>
  );
}
