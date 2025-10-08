import { Calendar, Award, Code2, Users, Coffee, Heart, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TechStack from "@/components/ui/TechStack";
import ChatWidget from "@/components/ai/ChatWidget";

const About = () => {
  const stats = [
    { label: "Years Experience", value: "1+", icon: Calendar },
    { label: "Projects Completed", value: "2+", icon: Code2 },
    // { label: "Happy Clients", value: "30+", icon: Users },
    { label: "Cups of Coffee", value: "∞", icon: Coffee },
  ];

  const skills = [
    { icon: <Code2 className="h-6 w-6" />, name: "Frontend Technologies", description: "React, Next.js, TypeScript, Tailwind CSS", proficiency: 75 },
    { icon: <Users className="h-6 w-6" />, name: "Backend Technologies", description: "Spring Boot, Rust & Axum, Node.js", proficiency: 85 },
    { icon: <Shield className="h-6 w-6" />, name: "Security Technologies", description: "Penetration Testing, Security Audits, OWASP", proficiency: 65 },
    { icon: <Award className="h-6 w-6" />, name: "DevOps & Cloud", description: "Docker, CI/CD, AWS, Database Systems", proficiency: 75 },
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
            Passionate full-stack engineer & cybersecurity enthusiast crafting secure, innovative digital solutions that merge creativity with cutting-edge technology
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
            <h2 className="text-3xl font-bold mb-6">Professional Journey</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                My journey in software engineering began with a deep fascination for building robust, scalable systems. 
                What started as curiosity about how applications work evolved into a comprehensive understanding of 
                full-stack development, with a particular focus on security-first architecture and modern web technologies.
              </p>
              <p className="mb-6">
                As a dedicated software engineer, I specialize in creating enterprise-grade applications using 
                cutting-edge technologies like Spring Boot for backend services, React ecosystem for dynamic frontends, 
                and Rust for high-performance systems. My recent focus on cybersecurity has enhanced my ability to 
                build applications that are not only functional but also resilient against modern security threats.
              </p>
              <p className="mb-6">
                I'm passionate about the intersection of innovation and security in software development. Whether it's 
                implementing secure AI integrations, designing scalable microservices architectures, or conducting 
                penetration testing, I approach each project with a commitment to excellence and continuous learning. 
                My goal is to contribute to the development of secure, efficient, and user-centric digital solutions 
                that make a meaningful impact.
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
                <Shield className="h-4 w-4 mr-2" />
                Security Enthusiast
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
              Expertise across enterprise-grade technologies, security frameworks, and modern development practices
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
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Security First</h3>
              <p className="text-muted-foreground">
                Building secure systems from the ground up, with security considerations integrated into every development decision.
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