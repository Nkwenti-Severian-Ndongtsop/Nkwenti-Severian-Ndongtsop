import { useState, useEffect } from "react";
import { Code, Sparkles, Rocket, ArrowDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard from "@/components/ui/ProjectCard";
import TechStack from "@/components/ui/TechStack";
import ChatWidget from "@/components/ai/ChatWidget";
import heroBackground from "@/assets/hero-bg.jpg";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const techStack = [
    { icon: <Code className="h-6 w-6" />, name: "React & Next.js", description: "Modern frontend frameworks", proficiency: 70 },
    { icon: <Sparkles className="h-6 w-6" />, name: "TypeScript", description: "Type-safe development", proficiency: 70 },
    { icon: <Rocket className="h-6 w-6" />, name: "Three.js", description: "3D web experiences", proficiency: 70 },
    { icon: <Rocket className="h-6 w-6" />, name: "Rust", description: "Backend development", proficiency: 80 },
    { icon: <Rocket className="h-6 w-6" />, name: "Axum", description: "Backend development", proficiency: 90 },
    { icon: <Rocket className="h-6 w-6" />, name: "Docker", description: "DevOps", proficiency: 90 },
    { icon: <Rocket className="h-6 w-6" />, name: "GitHub", description: "DevOps", proficiency: 90 },
    { icon: <Rocket className="h-6 w-6" />, name: "Spring Boot", description: "Backend development", proficiency: 90 },
  ];

  const projects = [
    {
      title: "LinkSphere",
      description: "A link management system for storing and organizing links",
      image: "/src/assets/linksphere.png",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js", "Rust", "Axum", "Docker","GitHub"],
      liveUrl: "https://linksphere-98u3.onrender.com/",
      githubUrl: "https://github.com/Vitalisn4/LinkSphere.git",
      featured: true,
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center parallax">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="absolute inset-0 bg-background/80 z-10" />
        
        <div className={`relative z-20 max-w-6xl mx-auto px-4 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Building the
                <span className="gradient-text animate-gradient"> Future </span>
                of <span className="gradient-text animate-gradient"> Technology </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Full-stack engineer crafting immersive digital experiences with React, Rust, and cutting-edge 3D technologies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button size="lg" className="btn-hero">
                  <Play className="h-5 w-5 mr-2" />
                  View My Work
                </Button>
                <Button size="lg" variant="outline" className="glass hover-glow">
                  Let's Connect
                </Button>
              </div>
            </div>

            {/* Right Profile Picture */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-primary to-accent p-2 animate-pulse-glow hover-lift transition-all duration-500 group-hover:scale-105">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-muted-foreground border-2 border-muted glass overflow-hidden">
                    <img
                      src="/my-photo.jpg"
                      alt="Nkwenti Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <Badge variant="outline" className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 glass animate-float">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Available for Work
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="animate-bounce">
            <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technologies I <span className="gradient-text">Master</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized in modern web technologies that power tomorrow's digital experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techStack.map((tech, index) => (
              <div key={tech.name} className={`animate-slide-up`} style={{ animationDelay: `${index * 0.2}s` }}>
                <TechStack {...tech} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of innovative solutions that blend creativity with cutting-edge technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.title} className="animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="glass hover-glow">
              View All Projects
              <ArrowDown className="h-4 w-4 ml-2 rotate-[-90deg]" />
            </Button>
          </div>
        </div>
      </section>


      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
