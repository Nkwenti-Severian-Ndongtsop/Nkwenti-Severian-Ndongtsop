"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

interface SkillBadgeProps {
  name: string;
  icon: ReactNode;
  delay: number;
}

export default function SkillBadge({ name, icon, delay }: SkillBadgeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center justify-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/10 h-full"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4">
        <span className="text-white">{icon}</span>
      </div>
      <span className="font-medium text-center">{name}</span>
    </motion.div>
  );
}
