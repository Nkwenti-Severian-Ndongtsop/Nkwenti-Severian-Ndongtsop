import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      href: "https://github.com/yourusername",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/yourusername",
      label: "LinkedIn",
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      href: "https://twitter.com/yourusername",
      label: "Twitter",
    },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-foreground/60">© {currentYear} Your Name. All rights reserved.</p>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
