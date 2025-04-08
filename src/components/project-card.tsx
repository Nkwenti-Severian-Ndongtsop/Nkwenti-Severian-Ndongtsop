"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="animate-float"
    >
      <Card className="overflow-hidden h-full flex flex-col group border-primary/10 bg-card/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
        <div className="relative overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-70 z-10 animate-gradient bg-size-200" />
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full aspect-video object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6 z-20">
            <div className="flex space-x-3">
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 animate-pulse-slow"
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 animate-shimmer"
              >
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Demo
                </a>
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="flex flex-col flex-grow p-6 relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full -z-10 animate-gradient bg-size-200" />
          <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-shimmer">
            {project.title}
          </h3>
          <p className="text-foreground/80 mb-4 flex-grow">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag, i) => (
              <Badge
                key={i}
                variant="outline"
                className="font-normal border-primary/20 bg-primary/5 text-primary animate-pulse-slow"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
