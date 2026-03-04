import { Calendar, Award, Code2, Users, Coffee, Heart, Shield, Briefcase, MapPin, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TechStack from "@/components/ui/TechStack";
import ChatWidget from "@/components/ai/ChatWidget";

const About = () => {
  const stats = [
    { label: "Years Experience", value: "1+", icon: Calendar },
    { label: "Projects Completed", value: "2+", icon: Code2 },
    { label: "Certifications Earned", value: "4", icon: Award },
    { label: "Cups of Coffee", value: "∞", icon: Coffee },
  ];

  const skills = [
    { icon: <Code2 className="h-6 w-6" />, name: "Frontend Technologies", description: "React, Next.js, TypeScript, Tailwind CSS", proficiency: 75 },
    { icon: <Users className="h-6 w-6" />, name: "Backend Technologies", description: "Spring Boot, Rust & Axum, Node.js", proficiency: 85 },
    { icon: <Shield className="h-6 w-6" />, name: "Security Technologies", description: "Penetration Testing, Security Audits, OWASP", proficiency: 65 },
    { icon: <Award className="h-6 w-6" />, name: "DevOps & Cloud", description: "Docker, Terraform, AWS, Azure, Hashicorp, Database Systems", proficiency: 75 },
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
            <h2 className="text-3xl font-bold mb-6">My Journey</h2>
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

      {/* Professional Experience */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-world engineering experience working on industry-grade  projects
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent" />

            {/* Adorsys Entry */}
            <div className="relative pl-16 animate-slide-up">
              {/* Timeline dot */}
              <div className="absolute left-3.5 top-6 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/40" />

              <div className="glass rounded-2xl p-8 hover-lift">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-md">
                      A
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Associate Full-Stack Software Engineer</h3>
                      <p className="text-primary font-semibold">Adorsys</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:items-end text-sm text-muted-foreground flex-shrink-0">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      Mar 2026 — Present
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      Onsite
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-500 font-medium text-xs border border-green-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Full-time · Active
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-3 mb-6 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    Maintainer of <span className="text-foreground font-medium mx-1">keycloak-config-cli</span> — an open source tool for declarative Keycloak realm configuration management
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    Working across multi-version compatibility (Keycloak 23.x to 26.x+) using Maven profiles
                  </li>
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {["Java", "Spring Boot", "Keycloak", "Docker", "Maven", "JUnit", "GitHub Actions"].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs rounded-full glass border border-border/40 text-muted-foreground font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
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