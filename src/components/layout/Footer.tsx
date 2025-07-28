import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/Nkwenti-Severian-Ndongtsop", label: "GitHub" },
    { icon: Mail, href: "mailto:nkwentiseverian@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-card/50 border-t border-border/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
              <span className="text-xl font-bold gradient-text">DevPortfolio</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Building innovative digital experiences as a Full Stack, Backend & DevOps Engineer with modern technologies.
              Passionate about React, AI, backend systems, cloud infrastructure, and automating beautiful user interfaces.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hover-glow"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="font-semibold mb-4">Technologies</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">React & Next.js</li>
              <li className="text-muted-foreground">Spring Boot</li>
              <li className="text-muted-foreground">Tailwind CSS</li>
              <li className="text-muted-foreground">Three.js</li>
              <li className="text-muted-foreground">Docker</li>
              <li className="text-muted-foreground">GitHub CI/CD</li>
              <li className="text-muted-foreground">GitHub</li>
              <li className="text-muted-foreground">Axum</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} @Nkwenti @Severian. Built using React and modern web technologies.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;