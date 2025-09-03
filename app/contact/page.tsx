"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Send, Mail, User, MessageSquare, CheckCircle, XCircle } from "lucide-react";

export default function Contact() {
  const [emailContent, setEmailContent] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === "error" || status === "success") {
      timer = setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [status]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = async () => {
    if (!emailContent || isSending) return;

    if (!senderName.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your name");
      return;
    }
    if (!senderEmail.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your email");
      return;
    }
    if (!validateEmail(senderEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (!subject.trim()) {
      setStatus("error");
      setErrorMessage("Please enter a subject");
      return;
    }

    setIsSending(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: emailContent,
          senderName,
          senderEmail,
          subject,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setStatus("success");
      setEmailContent("");
      setSenderName("");
      setSenderEmail("");
      setSubject("");
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send email"
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-white relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-cyan-500/5 filter blur-[80px] -z-10" />

      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] px-6 py-3 rounded-lg shadow-xl backdrop-blur-md ${
              status === "success" 
                ? "bg-green-600/90 text-white" 
                : "bg-red-600/90 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              {status === "success" ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Message sent successfully!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5" />
                  <span>{errorMessage}</span>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Let&apos;s Connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Send me a message and I&apos;ll get back to you as soon as possible.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/50 backdrop-blur-lg border border-indigo-500/20 rounded-xl p-6"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="mt-1 w-full bg-neutral-800/40 border border-indigo-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="mt-1 w-full bg-neutral-800/40 border border-indigo-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 w-full bg-neutral-800/40 border border-indigo-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message
              </label>
              <textarea
                id="message"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                rows={6}
                className="mt-1 w-full bg-neutral-800/40 border border-indigo-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                placeholder="Write your message here..."
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleSendEmail()}
                disabled={isSending || !emailContent || !senderName || !senderEmail || !subject}
                className={`px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all ${
                  isSending || !emailContent || !senderName || !senderEmail || !subject
                    ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white"
                }`}
              >
                {isSending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce" />
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}