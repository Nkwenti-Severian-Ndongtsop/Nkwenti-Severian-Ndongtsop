import { Calendar, Award, Code2, Users, Coffee, Heart, Shield, ExternalLink, FileText, Trophy, Target, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ai/ChatWidget";

const Achievements = () => {
  const certificates = [
    {
      title: "Java Foundations Certified Junior Associate Certification",
      issuer: "Oracle",
      issueDate: "Jun 2025",
      credentialId: "OC6289013",
      category: "Java Software Development",
      icon: "☕", // Java icon
      color: "bg-red-500",
      skills: ["Java", "Object-Oriented Programming", "Software Development"],
      certificateUrl: "#", // Add your certificate URL here
      description: "Validates foundational knowledge of Java programming language and object-oriented programming concepts."
    },
    {
      title: "Certified Linux Administrator (LPIC-1)",
      issuer: "Linux Professional Institute (LPI)",
      issueDate: "2024",
      credentialId: "LPI00637717",
      category: "Linux System Administration",
      icon: "🐧", // Linux penguin
      color: "bg-yellow-500",
      skills: ["Linux", "System Administration", "Command Line", "Shell Scripting"],
      certificateUrl: "#", // Add your certificate URL here
      description: "Demonstrates competency in Linux system administration, including installation, configuration, and maintenance."
    }
  ];

  const achievements = [
    {
      title: "Full-Stack Developer",
      description: "Built and deployed multiple full-stack applications using modern technologies",
      icon: <Code2 className="h-6 w-6" />,
      color: "bg-blue-500",
      date: "2024"
    },
    {
      title: "Open Source Contributor",
      description: "Active member of Stack-Forge-dev organization, contributing to open source projects",
      icon: <Users className="h-6 w-6" />,
      color: "bg-green-500",
      date: "2024"
    },
    {
      title: "Security Enthusiast",
      description: "Learning cybersecurity and penetration testing to build more secure applications",
      icon: <Shield className="h-6 w-6" />,
      color: "bg-purple-500",
      date: "2024"
    },
    {
      title: "AI Integration Expert",
      description: "Successfully integrated AI chatbots and LLM capabilities into web applications",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-orange-500",
      date: "2024"
    }
  ];

  const stats = [
    { label: "Certifications Earned", value: certificates.length, icon: Award },
    { label: "Tech Domains", value: "4+", icon: Target },
    { label: "Projects Completed", value: "2+", icon: Code2 },
    { label: "Years Learning", value: "1+", icon: Calendar },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            My <span className="gradient-text">Achievements</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of certifications, milestones, and professional accomplishments that demonstrate my commitment to continuous learning and technical excellence
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

      {/* Certificates Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional <span className="gradient-text">Certifications</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry-recognized certifications that validate my technical expertise and professional competency
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {certificates.map((cert, index) => (
              <div key={cert.credentialId} className="glass rounded-xl p-6 hover-lift animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-start space-x-4">
                  {/* Certificate Icon */}
                  <div className={`w-16 h-16 ${cert.color} rounded-lg flex items-center justify-center text-2xl text-white flex-shrink-0`}>
                    {cert.icon}
                  </div>
                  
                  {/* Certificate Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-2 leading-tight">{cert.title}</h3>
                    <p className="text-muted-foreground font-medium mb-1">{cert.issuer}</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Issued {cert.issueDate} • Credential ID {cert.credentialId}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
                    
                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover-glow"
                        asChild
                      >
                        <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Show credential
                        </a>
                      </Button>
                      <Badge variant="secondary" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        {cert.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Achievements */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Key <span className="gradient-text">Milestones</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Notable accomplishments and milestones in my software development journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div key={achievement.title} className="glass rounded-xl p-6 hover-lift animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${achievement.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-muted-foreground mb-2">{achievement.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {achievement.date}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="gradient-text">Collaborate?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's work together to create something amazing. I'm always excited to take on new challenges and contribute to innovative projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-hero" asChild>
              <a href="/contact">
                <Trophy className="h-5 w-5 mr-2" />
                Get In Touch
              </a>
            </Button>
            <Button size="lg" variant="outline" className="glass hover-glow" asChild>
              <a href="/projects">
                View My Projects
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Achievements;
