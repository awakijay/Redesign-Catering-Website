import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Ship, Settings, Utensils } from 'lucide-react';

const services = [
  {
    icon: Ship,
    title: 'Offshore Catering',
    description:
      'Nutritious and culturally diverse meals tailored for offshore rigs and workers, ensuring safety, quality, and satisfaction in challenging environments.',
    features: ['Diverse Cultural Menus', 'Safety & Hygiene Standards', '24/7 Service Availability', 'Specialized Logistics'],
  },
  {
    icon: Settings,
    title: 'Facility Management',
    description:
      'Comprehensive support including meal planning, delivery, and kitchen management for seamless operations onshore and offshore.',
    features: ['Meal Planning & Scheduling', 'Kitchen Management', 'Quality Control', 'Staff Training'],
  },
  {
    icon: Utensils,
    title: 'Event Catering',
    description:
      'From corporate events to private celebrations, we provide bespoke catering with Nigerian, African, and intercontinental flavors.',
    features: ['Nigerian Delicacies', 'African Cuisines', 'Intercontinental Options', 'Custom Menus'],
  },
];

export function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Comprehensive Catering Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized catering services for offshore rigs, onshore facilities, and special events across Nigeria and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="bg-gradient-to-br from-green-600 to-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 text-green-600 font-semibold hover:text-green-700 flex items-center gap-2 group"
              >
                Learn More
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}