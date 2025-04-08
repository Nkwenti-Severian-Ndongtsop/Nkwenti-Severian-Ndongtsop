"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex flex-col items-center justify-center text-center py-8 animate-float"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-4 text-white animate-gradient bg-size-200"
        >
          <svg
            className="w-8 h-8 animate-pulse-slow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-shimmer">
          Message Sent!
        </h3>
        <p className="text-foreground/80 mb-6">
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 animate-pulse-slow"
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-float">
      <div className="space-y-2">
        <Label htmlFor="name" className="animate-shimmer">
          Name
        </Label>
        <Input
          id="name"
          placeholder="Your name"
          required
          className="bg-background/50 border-primary/10 focus-visible:ring-primary rounded-lg animate-pulse-slow"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="animate-shimmer">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Your email address"
          required
          className="bg-background/50 border-primary/10 focus-visible:ring-primary rounded-lg animate-pulse-slow"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="animate-shimmer">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Your message"
          required
          className="min-h-[120px] bg-background/50 border-primary/10 focus-visible:ring-primary rounded-lg animate-pulse-slow"
        />
      </div>
      <Button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 animate-shimmer"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="mr-2"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </motion.div>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" /> Send Message
          </>
        )}
      </Button>
    </form>
  );
}
