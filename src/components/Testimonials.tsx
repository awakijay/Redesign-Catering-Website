import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Chukwu Okafor',
    role: 'Rig Manager',
    event: 'Offshore Platform Operations',
    rating: 5,
    text: 'Open Seas has been servicing our offshore rig for over 2 years. The quality and consistency of their meals, especially the Nigerian dishes, have significantly improved crew morale. Their understanding of safety protocols is exceptional.',
    image: 'CO',
  },
  {
    name: 'Adebayo Williams',
    role: 'Operations Director',
    event: 'Multi-Platform Contract',
    rating: 5,
    text: 'We have Open Seas managing catering across three of our platforms. Their facility management is top-notch, and the cultural diversity in their menus keeps our international crew satisfied. Highly professional team.',
    image: 'AW',
  },
  {
    name: 'Ngozi Eze',
    role: 'Event Coordinator',
    event: 'Corporate Anniversary Gala',
    rating: 5,
    text: 'For our company\'s 25th anniversary, Open Seas provided an outstanding mix of Nigerian and intercontinental dishes. The presentation was elegant and the flavors were authentic. Our guests were thoroughly impressed!',
    image: 'NE',
  },
  {
    name: 'Mohammed Bello',
    role: 'HSE Manager',
    event: 'Safety Compliance Audit',
    rating: 5,
    text: 'As someone responsible for safety standards, I can confidently say Open Seas exceeds all hygiene and safety requirements. Their kitchen management and staff training are exemplary.',
    image: 'MB',
  },
  {
    name: 'Sarah Johnson',
    role: 'Offshore Supervisor',
    event: 'Long-term Catering Contract',
    rating: 5,
    text: 'The variety in their menu is impressive - from traditional African meals to international cuisines. They cater to all dietary requirements and the food quality never drops, even in challenging offshore conditions.',
    image: 'SJ',
  },
  {
    name: 'Emeka Nwachukwu',
    role: 'CEO',
    event: 'Product Launch Event',
    rating: 5,
    text: 'Open Seas catered our product launch with a beautiful spread of intercontinental dishes alongside Nigerian favorites. Their attention to detail and professional service made our event a huge success.',
    image: 'EN',
  },
];

export function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by offshore platforms, energy companies, and event organizers across Nigeria.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-100" />

              <div className="relative">
                {/* Avatar */}
                <div className="bg-gradient-to-br from-green-600 to-blue-500 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                  {testimonial.image}
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.text}</p>

                {/* Client Info */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-blue-600 mt-1">{testimonial.event}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex -space-x-2">
              {['SJ', 'MC', 'ER', 'DT'].map((initial) => (
                <div
                  key={initial}
                  className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white"
                >
                  {initial}
                </div>
              ))}
            </div>
            <div className="flex gap-0.5 ml-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="ml-2 text-gray-700 font-semibold">
              5.0 from 500+ happy clients
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}