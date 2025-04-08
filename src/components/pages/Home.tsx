import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-16 relative overflow-hidden animate-float"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 -z-10 animate-gradient bg-size-200" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-shimmer">
              Hi, I'm <span className="text-primary animate-pulse-slow">Your Name</span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              I'm a passionate developer specializing in building exceptional digital experiences.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/projects"
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/20 animate-shimmer bg-size-200"
              >
                View My Work
              </Link>
              <Link
                to="/contact"
                className="border border-border px-6 py-3 rounded-lg hover:bg-accent transition-all duration-300 hover:scale-105 animate-pulse-slow"
              >
                Contact Me
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Skills */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="animate-float"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-shimmer">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["React", "TypeScript", "Node.js", "Python"].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg text-center hover:bg-accent/80 transition-all duration-300 hover:scale-105 animate-pulse-slow backdrop-blur-sm"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Projects */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="animate-float"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-shimmer">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg hover:bg-accent/80 transition-all duration-300 hover:scale-105 animate-gradient bg-size-200 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-shimmer">
                Project Title
              </h3>
              <p className="text-foreground/80 mb-4">
                Brief description of the project and its key features.
              </p>
              <Link
                to="/projects"
                className="text-primary hover:underline transition-colors animate-pulse-slow"
              >
                View Project →
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
