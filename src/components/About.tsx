import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const features = [
  'Nigerian, African, and intercontinental cuisines',
  'Offshore rig and platform catering expertise',
  'Safety and hygiene compliance',
  'Cultural sensitivity and diversity',
  'Nutritious and flavorful meals',
  'Professional event coordination',
];

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1664993101841-036f189719b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWdlcmlhbiUyMGpvbGxvZiUyRjJyaWduJTIwZm9vZFxlbnwxfHx8fDE3NzAzNjQwNTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Nigerian cuisine"
                  className="w-full h-64 object-cover"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl overflow-hidden shadow-xl mt-8"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1702827482556-481adcd68f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY3Vpc2luZSUyMGRpc2hlcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MDM2NTUxNHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="African cuisine"
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden shadow-xl mt-4"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1767785990437-dfe1fe516fe8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwY2F0ZXJpbmclMjBraXRjaGVuJTIwY2hlZnxlbnwxfHx8fDE3NzAzNjU1MTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Professional kitchen"
                className="w-full h-72 object-cover"
              />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-gradient-to-br from-green-600 to-blue-500 text-white p-6 rounded-2xl shadow-2xl"
            >
              <p className="text-4xl font-bold">10+</p>
              <p className="text-sm">Years of Excellence</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
              Leading Offshore & Onshore Catering Services
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Openseas Catering, proudly owned by Westend Diamond Energy Limited Offshore Energy Spec Limited, specializes in delivering high-quality catering services to offshore rigs, platforms, and events across Nigeria and beyond.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our team is dedicated to providing nutritious, flavorful meals that cater to diverse tastes, with a focus on Nigerian, African, and intercontinental cuisines. With a commitment to safety, hygiene, and cultural sensitivity, we ensure every meal enhances the well-being and morale of our clients, whether on a rig or at a special event.
            </p>

            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-green-600 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-shadow"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}