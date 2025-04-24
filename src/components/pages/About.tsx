"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code, Server, Layout, Database, Terminal, Cpu } from "lucide-react"
import profileImage from "./me.jpg"

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const skills = [
    {
      name: "Frontend Development",
      icon: <Layout className="w-6 h-6" />,
      description: "Building responsive and interactive user interfaces with modern frameworks",
    },
    {
      name: "Backend Development",
      icon: <Server className="w-6 h-6" />,
      description: "Creating robust server-side applications and APIs",
    },
    {
      name: "Database Design",
      icon: <Database className="w-6 h-6" />,
      description: "Designing and optimizing database schemas and queries",
    },
    {
      name: "UI/UX Design",
      icon: <Code className="w-6 h-6" />,
      description: "Crafting intuitive and visually appealing user experiences",
    },
    {
      name: "Linux Administration",
      icon: <Terminal className="w-6 h-6" />,
      description: "Managing and configuring Linux servers and environments",
    },
    {
      name: "System Architecture",
      icon: <Cpu className="w-6 h-6" />,
      description: "Designing scalable and maintainable system architectures",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-24 pt-32"
    >
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-secondary/10 blur-[80px]" />
      </div>

      {/* About Me Section */}
      <section>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
              <span className="text-primary font-medium">About Me</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient bg-size-200">
              My Journey
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                <img src={profileImage} alt="Profile" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
              </div>
              <motion.div
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="absolute -bottom-6 -right-6 w-2/3 h-2/3 rounded-2xl bg-gradient-to-r from-primary/30 to-secondary/30 -z-10 blur-sm"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                👋 I'm a junior software engineer still on intensive training with a lot of passion and enthusiasm. I'm
                constantly learning and growing in this field, eager to apply my skills to real-world projects.
              </p>
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                🐧 Linux is my daily driver; I enjoy tweaking and optimizing my shell on Linux. I find the open-source
                ecosystem fascinating and love contributing to it whenever possible.
              </p>
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                🎨 I'm a frontend enthusiast with a keen eye for web development. When I'm not coding, you can find me
                exploring new technologies 😎, contributing to open-source projects on GitHub 💻, or watching movies 😜.
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <a
                  href="https://github.com/Nkwenti-Severian-Ndongtsop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  <span>View My GitHub</span>
                  <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} className="ml-2">
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
              <span className="text-primary font-medium">My Expertise</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient bg-size-200">
              Skills & Capabilities
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              I've developed a diverse set of skills that allow me to tackle various aspects of software development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="mb-4 p-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 inline-block group-hover:bg-gradient-to-r group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  {skill.name}
                </h3>
                <p className="text-foreground/80">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 relative">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
              <span className="text-primary font-medium">My Journey</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient bg-size-200">
              Experience & Education
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Professional Experience
              </h3>

              <div className="relative border-l-2 border-primary/30 pl-8 pb-8">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary" />
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold">Software Development Training</h4>
                      <p className="text-foreground/80">@GIS</p>
                    </div>
                    <span className="text-foreground/60 bg-primary/10 px-3 py-1 rounded-full text-sm">2024 - 2025</span>
                  </div>
                  <p className="text-foreground/80">
                    Currently undergoing an intensive 18-month training program in full-stack software development,
                    focusing on modern web technologies and best practices.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Education
              </h3>

              <div className="space-y-8">
                <div className="relative border-l-2 border-primary/30 pl-8 pb-8">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold">Advanced Level</h4>
                        <p className="text-foreground/80">St CLARA</p>
                      </div>
                      <span className="text-foreground/60 bg-primary/10 px-3 py-1 rounded-full text-sm">
                        2023 - 2024
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div className="relative border-l-2 border-primary/30 pl-8">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold">Ordinary Level</h4>
                        <p className="text-foreground/80">St CLARA</p>
                      </div>
                      <span className="text-foreground/60 bg-primary/10 px-3 py-1 rounded-full text-sm">
                        2021 - 2022
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default About
