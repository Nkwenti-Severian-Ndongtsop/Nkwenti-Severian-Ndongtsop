"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ArrowRight, Github, Mail, ExternalLink } from "lucide-react"
import profileImage from "./me.jpg";
import project1Image from "./project1.png";
import project2Image from "./project2.png";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const skills = [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Rust",
    "Linux",
    "Docker",
    "PostgresSql",
    "Github",
    "Java",
    "Spring Boot",
  ]

  return (
    <div className="space-y-20">
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

      {/* Profile Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-16 relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <a href={profileImage} target="_blank" rel="noopener noreferrer">
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-background relative z-10 shadow-xl hover:opacity-90 transition-opacity duration-300 cursor-pointer">
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-60" />
                </div>
              </a>
              <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-full blur-md -z-10 opacity-70 animate-pulse-slow" />
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="absolute -inset-3 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-md -z-20 opacity-50"
              />
            </motion.div>

            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex-1"
            >
              <div className="inline-block px-4 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
                <span className="text-primary font-medium">Full Stack Software Engineer</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient bg-size-200">
                @Nkwenti @Severian @Ndongtsop
              </h1>
              <p className="text-xl text-foreground/80 mb-8 max-w-2xl">
                I'm a passionate developer specializing in building exceptional Web Applications with modern
                technologies and creative designs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    View My Work
                    <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </Link>
                <Link
                  to="/contact"
                  className="relative overflow-hidden border border-primary/30 px-6 py-3 rounded-lg hover:border-primary transition-all duration-300 group"
                >
                  <span className="relative z-10">Contact Me</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex space-x-4">
                <motion.a
                  href="https://github.com/Nkwenti-Severian-Ndongtsop"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-background/80 border border-border p-2 rounded-full hover:border-primary/50 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:halamadrid651643565@gmail.com"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-background/80 border border-border p-2 rounded-full hover:border-primary/50 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Skills */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4"
            >
              <span className="text-primary font-medium">My Skills</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              Growing up in these skills
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg text-center border border-primary/10 hover:border-primary/30 transition-all duration-300 h-full flex items-center justify-center">
                  <span className="font-medium">{skill}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Projects */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 relative"
      >
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4"
            >
              <span className="text-primary font-medium">Featured Work</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              Featured Projects
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-10 flex items-center justify-center">
                <div className="text-white p-6 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 text-center">
                  <h3 className="text-xl font-bold mb-2">Qr Image Generator</h3>
                  <p className="mb-4">A command-line tool that generates QR codes from a given URL.</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://github.com/Nkwenti-Severian-Ndongtsop/Rust-QR-Code-Generator.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://crates.io/crates/qr-image"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-xl overflow-hidden">
                <a href={project1Image} target="_blank" rel="noopener noreferrer">
                  <img src={project1Image} alt="QR Code Generator Project" className="w-full h-64 object-cover object-center hover:opacity-90 transition-opacity duration-300 cursor-pointer" />
                </a>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Qr Image Generator
                  </h3>
                  <p className="text-foreground/80 mb-4">
                    A command-line tool that generates QR codes from a given URL. Designed with Rust and Axum.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Rust</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Axum</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-10 flex items-center justify-center">
                <div className="text-white p-6 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 text-center">
                  <h3 className="text-xl font-bold mb-2">Weather application</h3>
                  <p className="mb-4">A command-line tool that generates weather information.</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://github.com/Nkwenti-Severian-Ndongtsop/rust-server-projects/tree/main/weather-app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://crates.io/crates/weather-app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-xl overflow-hidden">
                <a href={project2Image} target="_blank" rel="noopener noreferrer">
                  <img src={project2Image} alt="Weather App Project" className="w-full h-64 object-cover object-center hover:opacity-90 transition-opacity duration-300 cursor-pointer" />
                </a>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Weather application
                  </h3>
                  <p className="text-foreground/80 mb-4">
                    A command-line tool that generates weather information using APIs.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Rust</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Axum</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-primary/30 hover:border-primary transition-all duration-300 group"
            >
              View All Projects
              <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} className="ml-2">
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              Interested in working together?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-foreground/80 mb-8"
            >
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                to="/contact"
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-4 rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300 inline-flex items-center"
              >
                <span className="relative z-10">Let's Connect</span>
                <motion.span
                  initial={{ x: 0, opacity: 0.5 }}
                  whileHover={{ x: 5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2 relative z-10"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home
