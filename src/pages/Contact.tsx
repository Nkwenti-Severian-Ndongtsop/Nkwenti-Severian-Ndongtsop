import { useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ai/ChatWidget";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "nkwentiseverian@gmail.com",
      href: "mailto:nkwentiseverian@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+237 6 72 39 91 02",
      href: "tel:+237672399102",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Banagangte, Cameroon",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/Nkwenti-Severian-Ndongtsop", color: "hover:text-gray-600" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/severian-nkwenti-83b345389", color: "hover:text-blue-600" },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://formspree.io/f/mgvzzkwv', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "I'll get back to you within 24 hours.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your next project to life? Let's discuss how we can work together 
            to create something extraordinary.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Send me a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" required />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input id="subject" name="subject" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full btn-hero"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Let's connect</h2>
                <p className="text-muted-foreground mb-8">
                  I'm always excited to discuss new opportunities, innovative projects, 
                  cybersecurity challenges, or the latest in web development and security. Don't hesitate to reach out!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="glass rounded-lg p-4 hover-lift">
                    <a href={item.href} className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-muted-foreground">{item.value}</div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold mb-4">Follow me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((link) => (
                    <Button
                      key={link.label}
                      variant="outline"
                      size="sm"
                      asChild
                      className="glass hover-glow"
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                      >
                        <link.icon className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="glass rounded-lg p-6">
                <h3 className="font-semibold mb-2">Current Availability</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Available for new projects</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  I typically respond within 24 hours and am available for both short-term projects 
                  and long-term collaborations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          
          <div className="space-y-6">
            {[
              {
                q: "What technologies and frameworks do you work with?",
                a: "I specialize in modern full-stack technologies including React ecosystem (React, Next.js, TypeScript), Spring Boot for enterprise Java applications, Rust & Axum for high-performance services, Docker & DevOps, cybersecurity tools, and AI integration. I focus on building secure, scalable, and maintainable solutions."
              },
              {
                q: "What types of projects do you take on?",
                a: "I work on full-stack web applications, enterprise software solutions, secure backend services, AI-powered applications, and cybersecurity assessments. Whether it's building from scratch or enhancing existing systems, I focus on delivering robust, security-first solutions."
              },
              {
                q: "How do you approach project security?",
                a: "Security is integrated into every phase of development. I follow secure coding practices, conduct security assessments, implement proper authentication and authorization, and can perform penetration testing to identify vulnerabilities. Every project is built with a security-first mindset."
              },
              {
                q: "Do you work with remote teams and international clients?",
                a: "Absolutely! I have experience collaborating with distributed teams and clients worldwide. I'm comfortable with remote work, different time zones, and use modern collaboration tools to ensure seamless communication and project delivery."
              },
              {
                q: "What's your approach to project delivery?",
                a: "I follow agile development practices with regular communication, milestone-based delivery, and comprehensive documentation. Projects include proper testing, security reviews, deployment automation, and post-launch support to ensure long-term success."
              }
            ].map((faq, index) => (
              <div key={index} className="glass rounded-lg p-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Contact;