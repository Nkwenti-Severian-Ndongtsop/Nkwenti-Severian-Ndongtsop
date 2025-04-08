"use client";

import { motion } from "framer-motion";
import { FaGithub, FaFacebook, FaEnvelope, FaDiscord } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      href: "https://github.com/Nkwenti-Severian-Ndongtsop",
      label: "GitHub",
      hoverColor: "hover:text-[#6e5494]",
    },
    {
      icon: <SiLeetcode className="w-5 h-5" />,
      href: "https://leetcode.com/u/Nkwenti_Severian_Ndongtsop/",
      label: "LeetCode",
      hoverColor: "hover:text-[#f89f1b]",
    },
    {
      icon: <FaFacebook className="w-5 h-5" />,
      href: "https://www.facebook.com/profile.php?id=61564517945507",
      label: "Facebook",
      hoverColor: "hover:text-[#1877f2]",
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      href: "mailto:halamadrid651643565@gmail.com",
      label: "Email",
      hoverColor: "hover:text-primary",
    },
    {
      icon: <FaDiscord className="w-5 h-5" />,
      href: "https://discordapp.com/users/1282954845237809204",
      label: "Discord",
      hoverColor: "hover:text-[#5865F2]",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-background border-t border-primary/10">
      {/* Scroll to top button */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-primary to-secondary text-white p-3 rounded-full shadow-lg hover:shadow-primary/20 transition-all duration-300"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Footer content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
              @Nkwenti @Severian @Ndongtsop
            </div>
            <p className="text-foreground/60 text-sm">© {currentYear} All rights reserved.</p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/" className="text-foreground/60 hover:text-primary transition-colors">
                Home
              </a>
              <a href="/about" className="text-foreground/60 hover:text-primary transition-colors">
                About
              </a>
              <a
                href="/projects"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                Projects
              </a>
              <a
                href="/contact"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-end space-x-4"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`text-foreground/60 transition-all duration-300 ${link.hoverColor}`}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-primary/10 text-center text-xs text-foreground/40"
        >
          <p>Designed and built with passion and modern web technologies</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
