import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1758797849151-1725021be42a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZzaG9yZSUyMG9pbCUyMHJpZyUyMHBsYXRmb3JtJTIwb2NlYW58ZW58MXx8fHwxNzcwMjgyMTYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Offshore platform',
    category: 'Offshore',
  },
  {
    src: 'https://images.unsplash.com/photo-1664993101841-036f189719b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOaWdlcmlhbiUyMGpvbGxvZiUyMHJpY2UlMjBmb29kfGVufDF8fHx8MTc3MDM2NTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Nigerian cuisine',
    category: 'Cuisine',
  },
  {
    src: 'https://images.unsplash.com/photo-1702827482556-481adcd68f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY3Vpc2luZSUyMGRpc2hlcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MDM2NTUxNHww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'African dishes',
    category: 'Cuisine',
  },
  {
    src: 'https://images.unsplash.com/photo-1767785990437-dfe1fe516fe8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwY2F0ZXJpbmclMjBraXRjaGVuJTIwY2hlZnxlbnwxfHx8fDE3NzAzNjU1MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Professional kitchen',
    category: 'Facilities',
  },
  {
    src: 'https://images.unsplash.com/photo-1769638913840-2ca96d90e8a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMGJ1ZmZldCUyMGNhdGVyaW5nfGVufDF8fHx8MTc3MDM2NTUxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Event catering',
    category: 'Events',
  },
  {
    src: 'https://images.unsplash.com/photo-1767021922347-8a44324060c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZzaG9yZSUyMHdvcmtlcnMlMjBkaW5pbmclMjBmYWNpbGl0eXxlbnwxfHx8fDE3NzAzNjU1MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Offshore dining',
    category: 'Offshore',
  },
];

const categories = ['All', 'Offshore', 'Cuisine', 'Facilities', 'Events'];

export function Gallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredImages =
    selectedCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
            Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Our Work in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our offshore operations, diverse cuisines, and professional facilities serving clients across Nigeria.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <span className="text-sm bg-green-600 px-3 py-1 rounded-full">
                    {image.category}
                  </span>
                  <p className="mt-2 font-semibold">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}