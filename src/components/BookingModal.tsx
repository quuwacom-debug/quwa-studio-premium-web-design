import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    industry: '',
    otherIndustry: '',
    whatsapp: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            full_name: formData.fullName,
            company_name: formData.companyName,
            email: formData.email,
            whatsapp: formData.whatsapp,
            industry: formData.industry === 'other' ? formData.otherIndustry : formData.industry,
            message: formData.message,
          },
        ]);

      if (error) throw error;

      // Trigger email notification
      await supabase.functions.invoke('send-booking-email', {
        body: {
          record: {
            full_name: formData.fullName,
            company_name: formData.companyName,
            email: formData.email,
            message: formData.message,
          }
        }
      });

      setIsSubmitted(true);
      toast.success('Booking request submitted successfully!');
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        companyName: '',
        industry: '',
        otherIndustry: '',
        whatsapp: '',
        email: '',
        message: '',
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl glass-card p-8 md:p-10 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gradient">
                    Book Your Strategy Call
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Let's discuss how we can transform your digital presence.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Row 1: Full Name & Company Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & WhatsApp */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>

                    {/* Row 3: Industry (full width with other input) */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Industry *
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      >
                        <option value="">Select your industry</option>
                        <option value="tech">Technology / SaaS</option>
                        <option value="finance">Finance / Fintech</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="realestate">Real Estate</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="school">School</option>
                        <option value="agency">Agency / Consulting</option>
                        <option value="other">Other</option>
                      </select>

                      {formData.industry === 'other' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3"
                        >
                          <input
                            type="text"
                            name="otherIndustry"
                            value={formData.otherIndustry}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="Please specify your industry"
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* Message (full width) */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full glass-button text-lg mt-4"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Submit Request
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </motion.div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Thanks for reaching out! Our team will contact you shortly.
                  </p>

                  <motion.button
                    onClick={handleClose}
                    className="mt-8 px-8 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
