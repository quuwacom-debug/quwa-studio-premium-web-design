import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import ParticleBackground from './ParticleBackground';
const Hero = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const backgroundX = useTransform(mouseX, [0, window.innerWidth], [20, -20]);
  const backgroundY = useTransform(mouseY, [0, window.innerHeight], [20, -20]);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      {/* Mouse glow effect */}
      <motion.div className="pointer-events-none fixed w-[500px] h-[500px] rounded-full" style={{
      background: 'radial-gradient(circle, hsl(27 100% 55% / 0.08), transparent 60%)',
      left: mousePosition.x - 250,
      top: mousePosition.y - 250
    }} />
      
      <div className="container relative z-10 px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <motion.div initial={{
            opacity: 0,
            y: 40
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}>
              <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-muted-foreground mb-6">
                Premium Web Design Agency
              </span>
            </motion.div>
            
            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight" initial={{
            opacity: 0,
            y: 50
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}>
              <span className="text-gradient">We Build Websites</span>
              <br />
              <span className="text-gradient">That Convert</span>
              <br />
              <span className="text-gradient-orange">Visitors Into</span>
              <br />
              <span className="text-gradient-orange">Customers</span>
            </motion.h1>
            
            <motion.p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed" initial={{
            opacity: 0,
            y: 40
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}>
              Quwa Studio designs high-performance websites for brands that want growth, clarity, and authority.
            </motion.p>
            
            <motion.div className="flex flex-wrap gap-4" initial={{
            opacity: 0,
            y: 40
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1]
          }}>
              <motion.button onClick={scrollToBooking} className="glass-button text-lg" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                Book a Free Strategy Call
              </motion.button>
              
              <motion.button onClick={() => document.getElementById('works')?.scrollIntoView({
              behavior: 'smooth'
            })} className="px-8 py-4 rounded-xl border border-border text-foreground font-semibold transition-all duration-300 hover:bg-secondary hover:border-primary/50" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                View Our Work
              </motion.button>
            </motion.div>
          </div>
          
          {/* Right visual */}
          <motion.div className="relative hidden lg:block" style={{
          x: backgroundX,
          y: backgroundY
        }}>
            <motion.div className="relative" initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}>
              {/* Abstract UI mockup */}
              <div className="glass-card p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-1/2 bg-muted rounded" />
                  <div className="h-32 w-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mt-4" />
                  <div className="flex gap-4 mt-4">
                    <div className="h-10 w-24 bg-primary/80 rounded-lg" />
                    <div className="h-10 w-24 bg-muted rounded-lg" />
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div className="absolute -top-8 -right-8 glass-card p-4 glow-orange" animate={{
              y: [0, -10, 0]
            }} transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}>
                <div className="text-3xl font-bold text-primary">96%</div>
                <div className="text-sm text-muted-foreground">Conversion Rate</div>
              </motion.div>
              
              <motion.div className="absolute -bottom-4 -left-12 glass-card p-4" animate={{
              y: [0, 10, 0]
            }} transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Project Delivered</div>
                    <div className="text-xs text-muted-foreground">2 days ahead</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1
    }}>
        <motion.div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2" animate={{
        y: [0, 5, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity
      }}>
          <motion.div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>;
};
export default Hero;