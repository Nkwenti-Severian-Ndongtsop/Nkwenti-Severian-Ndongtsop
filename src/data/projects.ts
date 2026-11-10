export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  featured?: boolean;
  /** Whether the project appears in the featured section on the landing page. */
  showOnHome?: boolean;
}

export const projects: Project[] = [
  {
    title: "AI-Powered Portfolio Platform",
    description:
      "A professional portfolio website featuring an intelligent chatbot powered by Groq's GPT-OSS models, with secure backend architecture",
    image: "/portfolio-ai.png",
    technologies: ["Groq AI", "Node.js", "React", "TypeScript"],
    liveUrl: "https://nkwenti-severian-ndongtsop.vercel.app/",
    githubUrl:
      "https://github.com/Nkwenti-Severian-Ndongtsop/Nkwenti-Severian-Ndongtsop.git",
    category: "AI/ML",
    featured: true,
    showOnHome: true,
  },
  {
    title: "Keycloak Config CLI",
    description: "A command-line interface for managing Keycloak configurations",
    image: "/keycloak-config-cli.png",
    technologies: ["Java", "SpringBoot", "Docker", "GitHub"],
    githubUrl: "https://github.com/adorsys/keycloak-config-cli.git",
    category: "IAM",
    featured: true,
    showOnHome: true,
  },
  {
    title: "LinkSphere",
    description:
      "A comprehensive link management platform with analytics dashboard, built with secure Rust backend and modern React frontend",
    image: "/linksphere.png",
    technologies: ["Chart.js", "Rust", "React", "TypeScript"],
    liveUrl: "https://linksphere-98u3.onrender.com/",
    githubUrl: "https://github.com/Vitalisn4/LinkSphere.git",
    category: "Web App",
    featured: true,
  },
  {
    title: "Ferriskey Identity and Access Management",
    description: "A Modern IAM Built for Distributed Systems",
    image: "/ferriskey.png",
    technologies: ["Rust", "React", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/ferriskey/ferriskey",
    category: "IAM",
    featured: true,
  },
  {
    title: "Alkelang",
    description:
      "A platform for teaching and preserving native African languages — making mother tongue learning accessible through interactive lessons and community-driven content",
    image: "/alkelang.png",
    technologies: ["Node.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://alkelang.com",
    category: "EdTech",
    featured: true,
    showOnHome: true,
  },
];

export const homeProjects = projects.filter((project) => project.showOnHome);
