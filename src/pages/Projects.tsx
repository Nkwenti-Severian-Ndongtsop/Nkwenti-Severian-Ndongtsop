import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard from "@/components/ui/ProjectCard";
import ChatWidget from "@/components/ai/ChatWidget";
import project1Image from "@/assets/project1.jpg";
import project2Image from "@/assets/project2.jpg";
import project3Image from "@/assets/project3.jpg";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const projects = [
    {
      title: "Modern Dashboard",
      description: "A comprehensive analytics dashboard with real-time data visualization, built with React and advanced charting libraries. Features include custom charts, data filtering, and responsive design.",
      image: project1Image,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js", "Firebase"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "Web App",
      featured: true,
    },
    {
      title: "3D Portfolio Site",
      description: "An immersive 3D portfolio website featuring interactive elements and smooth animations powered by Three.js. Includes particle systems, interactive meshes, and GLSL shaders.",
      image: project2Image,
      technologies: ["Three.js", "React", "GLSL", "Framer Motion", "WebGL"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "3D/WebGL",
    },
    {
      title: "AI Chat Assistant",
      description: "An intelligent chatbot with natural language processing capabilities and context-aware responses. Built with OpenAI API and real-time messaging.",
      image: project3Image,
      technologies: ["OpenAI API", "React", "Node.js", "Socket.io", "MongoDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "AI/ML",
    },
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with payment integration, inventory management, and modern UI design. Features include shopping cart, checkout flow, and admin dashboard.",
      image: project1Image,
      technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "Web App",
    },
    {
      title: "Interactive Data Visualization",
      description: "A complex data visualization platform featuring 3D charts, interactive maps, and real-time data streaming capabilities.",
      image: project2Image,
      technologies: ["D3.js", "Three.js", "React", "WebSockets", "Python"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "Data Viz",
    },
    {
      title: "Mobile-First PWA",
      description: "A progressive web application optimized for mobile devices with offline capabilities, push notifications, and native-like performance.",
      image: project3Image,
      technologies: ["PWA", "Service Workers", "React", "IndexedDB", "Web Push"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "Mobile",
    },
  ];

  const categories = ["All", "Web App", "3D/WebGL", "AI/ML", "Data Viz", "Mobile"];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A collection of innovative digital solutions showcasing expertise in modern web technologies, 
            3D visualization, AI integration, and user experience design.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects, technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "bg-gradient-primary" : "hover-glow"}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.title}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="glass rounded-xl p-12 max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or browse all projects.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  variant="outline"
                  className="hover-glow"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Skills Showcase */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Technology <span className="gradient-text">Stack</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React", "Next.js", "TypeScript", "Three.js", "Node.js", "Python",
              "AI/ML", "WebGL", "D3.js", "MongoDB", "PostgreSQL", "AWS",
              "Docker", "GraphQL", "Prisma", "Tailwind CSS"
            ].map((tech) => (
              <Badge key={tech} variant="outline" className="text-sm hover-glow">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Projects;