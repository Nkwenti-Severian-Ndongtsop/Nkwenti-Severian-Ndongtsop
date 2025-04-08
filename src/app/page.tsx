"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, Code, ExternalLink, Github, Mail, User, Menu, X, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import SkillBadge from "@/components/skill-badge";
import ContactForm from "@/components/contact-form";
import FloatingNav from "@/components/floating-nav";

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const skills = [
    { name: "React", icon: <Code className="w-4 h-4" /> },
    { name: "TypeScript", icon: <Code className="w-4 h-4" /> },
    { name: "Tailwind CSS", icon: <Code className="w-4 h-4" /> },
    { name: "Node.js", icon: <Code className="w-4 h-4" /> },
    { name: "PostgresSql", icon: <Code className="w-4 h-4" /> },
    { name: "UI/UX Design", icon: <User className="w-4 h-4" /> },
    { name: "Responsive Design", icon: <User className="w-4 h-4" /> },
  ];

  const projects = [
    {
      title: "QR code generator",
      description: "A command-line tool that generates QR codes from a given URL.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Axum", "Rust"],
      github: "https://github.com/Nkwenti-Severian-Ndongtsop/Rust-QR-Code-Generator.git",
      demo: "#",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 overflow-hidden">
      {/* Cursor follower */}
      <div
        className="fixed w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl pointer-events-none z-0 opacity-70"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Mobile Menu */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm border"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-8 p-4"
          >
            <a
              href="#about"
              className="text-2xl font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Me
            </a>
            <a
              href="#skills"
              className="text-2xl font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Skills
            </a>
            <a
              href="#projects"
              className="text-2xl font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a
              href="#testimonials"
              className="text-2xl font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-2xl font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <FloatingNav />

      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 relative"
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-40 h-40 bg-secondary/30 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 relative w-32 h-32 mx-auto"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-70 blur-md" />
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="Profile"
              className="rounded-full w-full h-full object-cover border-4 border-background relative z-10"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 animate-gradient"
          >
            @Nkwenti @Severian @Ndongtsop
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-foreground/80 font-light"
          >
            <span className="font-semibold text-primary">Full Stack Software Developer</span> &
            UI/UX Designer
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              <Link href="#contact">Get in touch with Me</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-primary/20 hover:bg-primary/5"
            >
              <Link href="#projects">View my work</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ArrowDown className="h-8 w-8 text-primary" />
        </motion.div>

        {/* Background animation */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-primary/10 to-secondary/10"
                initial={{
                  opacity: Math.random() * 0.5 + 0.1,
                  scale: Math.random() * 0.5 + 0.5,
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                  x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                }}
                transition={{
                  duration: Math.random() * 20 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{
                  width: Math.random() * 200 + 50,
                  height: Math.random() * 200 + 50,
                  filter: "blur(40px)",
                }}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-8 max-w-6xl mx-auto relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative z-10 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 mix-blend-overlay" />
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="John Doe"
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -right-6 w-2/3 h-2/3 rounded-2xl bg-gradient-to-r from-primary to-secondary -z-10"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="inline-block mb-6 px-4 py-1 bg-primary/10 rounded-full">
              <span className="text-primary font-medium">About Me</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              My Journey
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              👋 I'm a junior software engineer still on intensive training will alot of passion and
              enthusiast. - 🐧 Linux is my daily driver; I enjoy tweaking and optimizing my shell on
              linux. - 🎨 Frontend enthusiast with a keen eye for web Development.
            </p>
            <p className="text-foreground/80 mb-8 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies😎, contributing to
              open-source projects on GitHub 💻. - Love Watching Movies too 😜.
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-primary/20 hover:bg-primary/5"
            >
              <Link href="#contact">Let's Connect</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 px-4 md:px-8 bg-gradient-to-b from-background/50 to-background relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-4 py-1 bg-primary/10 rounded-full">
              <span className="text-primary font-medium">My Skills</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Technical Expertise
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              I've played around with a variety of technologies and frameworks to assimilate and
              outstand myself from the crowd 💪.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <SkillBadge key={index} name={skill.name} icon={skill.icon} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 md:px-8 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-4 py-1 bg-primary/10 rounded-full">
              <span className="text-primary font-medium">My Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Featured Projects
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Here are some of my recent projects. Each one presented unique challenges and
              opportunities to learn and grow as a developer.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button
              asChild
              variant="outline"
              className="rounded-full border-primary/20 hover:bg-primary/5"
            >
              <a
                href="https://github.com/Nkwenti-Severian-Ndongtsop"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                View more on GitHub
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 px-4 md:px-8 bg-gradient-to-b from-background/50 to-background relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-4 py-1 bg-primary/10 rounded-full">
              <span className="text-primary font-medium">Testimonials</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8 max-w-6xl mx-auto relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1 bg-primary/10 rounded-full">
            <span className="text-primary font-medium">Contact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Get In Touch
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Have a project in mind or just want to connect? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-primary/10 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">mailto:halamadrid651643565@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-full mr-4">
                  <Github className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <p className="font-medium">https://github.com/Nkwenti-Severian-Ndongtsop</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4 text-primary">Follow Me</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-secondary p-3 rounded-full shadow-md text-white"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-secondary p-3 rounded-full shadow-md text-white"
                >
                  <ExternalLink className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-secondary p-3 rounded-full shadow-md text-white"
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 border border-primary/10"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-primary/10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              @Nkwenti @Severian @Ndongtsop
            </div>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
