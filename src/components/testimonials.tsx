"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO at TechStart",
    content:
      "Working with John was an absolute pleasure. His attention to detail and creative problem-solving skills helped us launch our platform ahead of schedule. I highly recommend his services!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager at DesignHub",
    content:
      "John's expertise in both frontend and backend development made him the perfect developer for our project. He understood our vision and executed it flawlessly. We'll definitely work with him again.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder of FitConnect",
    content:
      "I was impressed by John's ability to translate our ideas into a beautiful, functional application. His communication throughout the project was excellent, and he delivered exactly what we needed.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const next = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="relative overflow-hidden py-10 animate-float">
      <div className="absolute top-0 left-0 w-20 h-20 bg-primary/10 rounded-full blur-xl -z-10 animate-gradient bg-size-200" />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-secondary/10 rounded-full blur-xl -z-10 animate-gradient bg-size-200" />

      <div className="flex justify-center mb-8">
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoplay(false);
                setCurrent(index);
              }}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === current ? "bg-primary animate-pulse-slow" : "bg-primary/20"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-primary/10 shadow-lg relative animate-shimmer"
          >
            <div className="absolute top-6 left-6 text-primary/20 animate-pulse-slow">
              <Quote className="h-10 w-10 rotate-180" />
            </div>
            <div className="absolute bottom-6 right-6 text-primary/20 animate-pulse-slow">
              <Quote className="h-10 w-10" />
            </div>

            <div className="flex flex-col items-center text-center">
              <Avatar className="w-20 h-20 border-4 border-background mb-4 animate-float">
                <AvatarImage src={testimonials[current].avatar} alt={testimonials[current].name} />
                <AvatarFallback>{testimonials[current].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="text-lg md:text-xl mb-6 text-foreground/80 relative z-10">
                "{testimonials[current].content}"
              </p>
              <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-shimmer">
                {testimonials[current].name}
              </h3>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border-primary/10 bg-background/80 backdrop-blur-sm hover:bg-primary/5 z-10 animate-pulse-slow"
          onClick={prev}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous testimonial</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border-primary/10 bg-background/80 backdrop-blur-sm hover:bg-primary/5 z-10 animate-pulse-slow"
          onClick={next}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>
    </div>
  );
}
