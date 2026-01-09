import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Book a Call', href: '#booking' },
  { label: 'Privacy Policy', href: '#' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: MessageCircle, href: '#', label: 'WhatsApp' },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-border">
      <div className="container px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Left - Brand */}
          <div className="text-center md:text-left">
            <motion.h3
              className="text-2xl font-bold mb-2"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/main.logo.png"
                alt="Quwa Studio"
                className="h-12 md:h-16 w-auto object-contain mb-4 mx-auto md:mx-0"
              />
            </motion.h3>
            <p className="text-muted-foreground text-sm">
              Web Design · Branding · Growth
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              © 2026 Quwa Studio. All rights reserved.
            </p>
          </div>

          {/* Center - Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="link-hover text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Right - Social */}
          <div className="flex justify-center md:justify-end gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
