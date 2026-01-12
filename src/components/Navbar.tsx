import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Contact', href: '#booking' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container px-6">
        <div
          className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 ${isScrolled ? 'glass-card' : ''
            }`}
        >
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-bold"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="/Quuwa.png"
              alt="Quwa Studio"
              className="h-12 md:h-16 w-auto object-contain"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="link-hover text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}

            <motion.a
              href="#booking"
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px hsl(27 100% 55% / 0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Call
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden mt-4 glass-card overflow-hidden ${isMobileMenuOpen ? 'block' : 'hidden'
            }`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0, height: isMobileMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#booking"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-center mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a Call
            </a>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;
