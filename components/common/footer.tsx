"use client";
import { FaGithub, FaLinkedin ,FaDiscord} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-800 relative z-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4 ">
          {/* Social Links */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/vivekr077"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-blue-500 transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/vivekr07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-blue-500 transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-neutral-500 text-sm">
            <p>© {currentYear} Vivek Ranjan</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
