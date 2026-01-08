import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Zap, Rocket } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Strategy-Driven Design',
    description: 'Every design decision is rooted in data and aligned with your business objectives.',
  },
  {
    icon: Zap,
    title: 'Conversion-Focused UX',
    description: 'User experiences crafted to guide visitors naturally toward action.',
  },
  {
    icon: Rocket,
    title: 'High-Performance Development',
    description: 'Lightning-fast websites built with modern technology that scales with you.',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
      
      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center mb-20" ref={ref}>
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass-card text-sm text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            About Us
          </motion.span>
          
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-gradient">We Design With</span>{' '}
            <span className="text-gradient-orange">Purpose.</span>
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Quwa Studio is a creative web design agency focused on building digital experiences 
            that feel simple, elegant, and powerful. We combine strategy, design, and technology 
            to help brands communicate clearly and grow faster.
          </motion.p>
        </div>
        
        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group glass-card p-8 lg:p-10 hover:border-primary/30 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="relative">
                {/* Glow effect on hover */}
                <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
