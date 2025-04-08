import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-20 pt-32 animate-float"
    >
      {/* About Me Section */}
      <section>
        <div className="container mx-auto px-4">
          <motion.h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-shimmer">
            About Me
          </motion.h1>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-foreground/80 mb-6">
                I'm a passionate developer with a strong focus on creating exceptional digital
                experiences. With expertise in modern web technologies, I strive to build
                applications that are both functional and beautiful.
              </p>
              <p className="text-lg text-foreground/80">
                My journey in software development began [Your Story]. Since then, I've worked on
                various projects ranging from small business websites to complex web applications.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-accent rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-shimmer">
                What I Do
              </h2>
              <ul className="space-y-4">
                <motion.li
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-primary mr-2">•</span>
                  <span>Web Development</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-primary mr-2">•</span>
                  <span>UI/UX Design</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-primary mr-2">•</span>
                  <span>Mobile Development</span>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-primary mr-2">•</span>
                  <span>Technical Consulting</span>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-shimmer">
            Experience
          </motion.h2>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-accent p-6 rounded-lg hover:bg-accent/80 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Job Title</h3>
                  <p className="text-foreground/80">Company Name</p>
                </div>
                <span className="text-foreground/60">2020 - Present</span>
              </div>
              <p className="text-foreground/80">
                Description of your role and achievements at this position.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section>
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-shimmer">
            Education
          </motion.h2>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-accent p-6 rounded-lg hover:bg-accent/80 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Degree Name</h3>
                  <p className="text-foreground/80">University Name</p>
                </div>
                <span className="text-foreground/60">2016 - 2020</span>
              </div>
              <p className="text-foreground/80">Description of your studies and achievements.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
