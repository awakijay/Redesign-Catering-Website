import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import logo from 'figma:asset/e1adf43f3eb04a483432cb116d34e91ab2fcbaa0.png';

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Open Seas Catering" className="h-16 w-auto" />
            </div>
            <p className="text-gray-400 mb-6">
              Delivering delicious Nigerian, African, and intercontinental dishes to offshore rigs and events.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'About', 'Gallery', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-3">
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                Offshore Catering
              </li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                Facility Management
              </li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                Event Catering
              </li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                Nigerian Cuisine
              </li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                African & Intercontinental
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li>
                <p className="text-sm text-gray-400">Location</p>
                <p>Port Harcourt, Nigeria</p>
                <p>Serving offshore rigs nationwide</p>
              </li>
              <li>
                <p className="text-sm text-gray-400">Phone</p>
                <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                 +2347068841116
                </a>
              </li>
              <li>
                <p className="text-sm text-gray-400">Email</p>
                <a
                  href="mailto:info.catering@openseascatering.com"
                  className="hover:text-green-400 transition-colors"
                >
                  info.catering@openseascatering.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 Openseas Catering. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
              <a
                href="#admin"
                className="hover:text-green-400 transition-colors font-semibold"
              >
                Admin Portal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}