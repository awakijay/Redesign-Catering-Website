import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export function Menu() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const menuCategories = [
    {
      title: 'Nigerian Cuisine',
      items: [
        { name: 'Jollof Rice', description: 'Classic Nigerian party rice with rich tomato flavor' },
        { name: 'Egusi Soup', description: 'Traditional melon seed soup with assorted meat' },
        { name: 'Pounded Yam & Soup', description: 'Smooth pounded yam with your choice of soup' },
        { name: 'Pepper Soup', description: 'Spicy, aromatic soup with fish or meat' },
      ],
    },
    {
      title: 'African Delicacies',
      items: [
        { name: 'Fufu & Light Soup', description: 'Ghanaian specialty with goat meat' },
        { name: 'Waakye', description: 'Rice and beans with traditional accompaniments' },
        { name: 'Suya', description: 'Grilled spiced meat skewers' },
        { name: 'Plantain Dishes', description: 'Fried, roasted, or boiled plantains' },
      ],
    },
    {
      title: 'Intercontinental',
      items: [
        { name: 'Grilled Seafood Platter', description: 'Fresh fish, prawns, and calamari' },
        { name: 'Pasta Selection', description: 'Various pasta dishes with choice of sauce' },
        { name: 'Continental Breakfast', description: 'Full English breakfast spread' },
        { name: 'International Buffet', description: 'Diverse selection from around the world' },
      ],
    },
  ];

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
            Our Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Diverse Culinary Offerings
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our selection of authentic Nigerian, African, and intercontinental dishes
            crafted for your events and offshore operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-green-600">
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-6">
            *Custom menus available for dietary restrictions and special requirements
          </p>
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
            Request Custom Menu
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
