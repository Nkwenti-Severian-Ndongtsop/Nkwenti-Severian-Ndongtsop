"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Search, Code, Server } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  category: "frontend" | "backend" | "fullstack";
}

const Projects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Qr Image Generator",
      description: "A command-line tool that generates QR codes from a given URL.",
      technologies: ["Rust", "Axum"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      githubUrl: "https://github.com/Nkwenti-Severian-Ndongtsop/Rust-QR-Code-Generator.git",
      category: "backend",
    },
  ]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let result = projects;

    // Filter by category
    if (activeFilter !== "all") {
      result = result.filter((project) => project.category === activeFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(query))
      );
    }

    setFilteredProjects(result);
  }, [activeFilter, searchQuery, projects]);

  const categories = [
    { id: "all", label: "All Projects", icon: <Code className="w-4 h-4" /> },
    { id: "frontend", label: "Frontend", icon: <Code className="w-4 h-4" /> },
    { id: "backend", label: "Backend", icon: <Server className="w-4 h-4" /> },
    { id: "fullstack", label: "Full Stack", icon: <Server className="w-4 h-4" /> },
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
            <span className="text-primary font-medium">My Work</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient bg-size-200">
            Projects & Creations
          </h1>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Explore my projects showcasing my skills and passion for creating innovative solutions.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full md:w-64"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-foreground/60" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card/50 backdrop-blur-sm border border-primary/10 rounded-lg focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2 justify-center"
            >
              {categories.map((category,) => (
                <motion.button
                  key={category.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeFilter === category.id
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : "bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30"
                  }`}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-card/50 backdrop-blur-sm border border-primary/10 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-primary/10"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <div className="flex space-x-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-primary/20 backdrop-blur-md p-2 rounded-full hover:bg-primary/30 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-secondary/20 backdrop-blur-md p-2 rounded-full hover:bg-secondary/30 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                      {project.title}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-foreground/80 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-block p-6 rounded-full bg-primary/10 mb-6">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No projects found</h3>
            <p className="text-foreground/80">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;
