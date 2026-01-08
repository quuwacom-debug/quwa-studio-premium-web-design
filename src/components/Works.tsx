import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    id: 1,
    name: 'Luxe Finance',
    category: 'Fintech',
    beforeImage: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop&auto=format',
    afterImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 2,
    name: 'Artisan Coffee',
    category: 'E-commerce',
    beforeImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop&auto=format',
    afterImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 3,
    name: 'Nova Tech',
    category: 'SaaS',
    beforeImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format',
    afterImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 4,
    name: 'Verde Studio',
    category: 'Agency',
    beforeImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&auto=format',
    afterImage: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 5,
    name: 'Wellness Hub',
    category: 'Health',
    beforeImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&auto=format',
    afterImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 6,
    name: 'Primo Real Estate',
    category: 'Property',
    beforeImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&auto=format',
    afterImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&auto=format',
  },
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-[400px] h-[280px] flex-shrink-0 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 glass-card overflow-hidden">
        {/* Before image */}
        <motion.img
          src={project.beforeImage}
          alt={`${project.name} before`}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* After image */}
        <motion.img
          src={project.afterImage}
          alt={`${project.name} after`}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: 'inset 0 0 60px hsl(27 100% 55% / 0.2)',
          }}
        />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">{project.name}</h3>
              <p className="text-sm text-muted-foreground">{project.category}</p>
            </div>
            
            <motion.div
              className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              {isHovered ? 'After' : 'Before'} →
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="works" className="relative py-32 overflow-hidden">
      <div className="container relative z-10 px-6 mb-16" ref={ref}>
        <motion.span
          className="inline-block px-4 py-2 rounded-full glass-card text-sm text-muted-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Our Work
        </motion.span>
        
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-gradient">Transformations</span>{' '}
          <span className="text-gradient-orange">We've Created</span>
        </motion.h2>
      </div>
      
      {/* Horizontal scroll showcase */}
      <div 
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-8 py-4"
          animate={{
            x: isPaused ? undefined : [0, -50 * projects.length * 8],
          }}
          transition={{
            x: {
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
          style={{
            width: 'fit-content',
          }}
        >
          {/* Duplicate projects for seamless loop */}
          {[...projects, ...projects, ...projects].map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Works;
