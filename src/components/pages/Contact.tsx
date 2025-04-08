"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaFacebook, FaDiscord } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Mail, Send, MapPin, Phone, ArrowRight, Loader2 } from "lucide-react";

const Contact = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const socialLinks = [
    {
      icon: <FaGithub className="w-6 h-6" />,
      href: "https://github.com/Nkwenti-Severian-Ndongtsop",
      label: "GitHub",
      color: "hover:text-[#6e5494]",
    },
    {
      icon: <SiLeetcode className="w-6 h-6" />,
      href: "https://leetcode.com/u/Nkwenti_Severian_Ndongtsop/",
      label: "LeetCode",
      color: "hover:text-[#f89f1b]",
    },
    {
      icon: <FaFacebook className="w-6 h-6" />,
      href: "https://www.facebook.com/profile.php?id=61564517945507",
      label: "Facebook",
      color: "hover:text-[#1877f2]",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:halamadrid651643565@gmail.com",
      label: "Email",
      color: "hover:text-primary",
    },
    {
      icon: <FaDiscord className="w-6 h-6" />,
      href: "https://discordapp.com/users/1282954845237809204",
      label: "Discord",
      color: "hover:text-[#5865F2]",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="pt-32 pb-20"
    >
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-[100px] opacity-50"
          style={{
            left: mousePosition.x - 250,
            top: mousePosition.y - 250,
            transition: "all 0.3s ease-out",
          }}
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-secondary/10 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
            <span className="text-primary font-medium">Contact Me</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient bg-size-200">
            Get In Touch
          </h1>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Feel free to reach out if you have any questions or want to work together on a project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-xl p-8 shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-6 text-white"
                  >
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-foreground/80 mb-8">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Send Me a Message
                  </h2>

                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background/50 border border-primary/10 rounded-lg focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background/50 border border-primary/10 rounded-lg focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background/50 border border-primary/10 rounded-lg focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="Your message"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-xl p-8 shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full">
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Contact Information
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-3 rounded-full mr-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a
                      href="mailto:halamadrid651643565@gmail.com"
                      className="text-foreground/80 hover:text-primary transition-colors"
                    >
                      halamadrid651643565@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-3 rounded-full mr-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Location</h3>
                    <p className="text-foreground/80">Cameroon</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-3 rounded-full mr-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-foreground/80">+237672399102</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Connect With Me</h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`bg-background/80 border border-primary/10 p-3 rounded-full transition-all duration-300 ${link.color}`}
                      aria-label={link.label}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg"
              >
                <h3 className="font-medium mb-2">Looking for a Junior developer?</h3>
                <p className="text-foreground/80 mb-4">
                  I'm currently available for any part time work to grow my skills and experience.
                </p>
                <motion.a
                  href="https://github.com/Nkwenti-Severian-Ndongtsop"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-primary hover:text-secondary transition-colors"
                >
                  View my resume <ArrowRight className="ml-2 w-4 h-4" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
