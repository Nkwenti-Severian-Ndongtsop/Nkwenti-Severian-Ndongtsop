"use client"

import type React from "react"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import type { ReactNode } from "react"

interface SkillBadgeProps {
  name: string
  icon: ReactNode
  delay: number
}

export default function SkillBadge({ name, icon, delay }: SkillBadgeProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const badgeRef = useRef<HTMLDivElement>(null)

  // Mouse position for 3D effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for the 3D rotation
  const rotateX = useSpring(useTransform(y, [-50, 50], [10, -10]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-50, 50], [-10, 10]), { stiffness: 300, damping: 30 })

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return

    const rect = badgeRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="perspective-500"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={badgeRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="flex flex-col items-center justify-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/10 h-full shadow-lg hover:shadow-primary/20 transition-all duration-300"
      >
        <motion.div
          className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)",
          }}
          whileHover={{
            rotate: 360,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <span className="text-white">{icon}</span>
        </motion.div>
        <motion.span
          className="font-medium text-center"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(10px)",
          }}
        >
          {name}
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
