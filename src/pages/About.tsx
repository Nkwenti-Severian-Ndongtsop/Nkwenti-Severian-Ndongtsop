import { Calendar, Award, Code2, Users, Coffee, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TechStack from "@/components/ui/TechStack";
import ChatWidget from "@/components/ai/ChatWidget";

const About = () => {
  const stats = [
    { label: "Years Experience", value: "1+", icon: Calendar },
    { label: "Projects Completed", value: "1+", icon: Code2 },
    // { label: "Happy Clients", value: "30+", icon: Users },
    { label: "Cups of Coffee", value: "∞", icon: Coffee },
  ];

  const skills = [
    { icon: <Code2 className="h-6 w-6" />, name: "Frontend Development", description: "React, Next.js, TypeScript", proficiency: 70 },
    { icon: <Users className="h-6 w-6" />, name: "Backend Development", description: "Spring Boot, Java, Rust, Axum", proficiency: 80 },
    { icon: <Award className="h-6 w-6" />, name: "DevOps", description: "Docker, Kubernetes, CI/CD", proficiency: 60 },
    { icon: <Award className="h-6 w-6" />, name: "AI", description: "OpenAI, Anthropic, Gemini", proficiency: 50 },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate software engineer crafting digital experiences that merge creativity with cutting-edge technology
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={stat.label} className="glass rounded-xl p-6 text-center hover-lift">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Story */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">My Journey</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                My passion for technology began early, but it was the intersection of design and development 
                that truly captured my imagination. I believe the best digital experiences come from understanding 
                both the technical possibilities and the human needs they serve.
              </p>
              <p className="mb-6">
                Over the past months, I've had the privilege of working with teams, 
                helping them transform ideas into powerful digital solutions. My approach combines modern 
                development practices with creative problem-solving to deliver results that both look 
                beautiful and perform exceptionally.
              </p>
              <p className="mb-6">
                I'm particularly excited about the future of web technology - from immersive 3D experiences 
                powered by WebGL to AI-enhanced user interfaces. I believe we're just scratching the surface 
                of what's possible when we push the boundaries of what the web can do.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Badge variant="outline" className="glass">
                <Heart className="h-4 w-4 mr-2" />
                Problem Solver
              </Badge>
              <Badge variant="outline" className="glass">
                <Code2 className="h-4 w-4 mr-2" />
                Full-Stack Developer
              </Badge>
              <Badge variant="outline" className="glass">
                <Users className="h-4 w-4 mr-2" />
                Team Player
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expertise across the full spectrum of modern web development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <TechStack {...skill} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What I <span className="gradient-text">Value</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-xl p-8 text-center hover-lift">
              <Code2 className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Clean Code</h3>
              <p className="text-muted-foreground">
                Writing maintainable, scalable code that stands the test of time and collaboration.
              </p>
            </div>
            
            <div className="glass rounded-xl p-8 text-center hover-lift">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">User-Centric</h3>
              <p className="text-muted-foreground">
                Putting user experience at the heart of every design and development decision.
              </p>
            </div>
            
            <div className="glass rounded-xl p-8 text-center hover-lift">
              <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                Embracing new technologies and approaches to solve complex problems creatively.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default About;