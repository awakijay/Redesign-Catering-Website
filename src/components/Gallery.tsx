import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useMemo, useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AdminGalleryImage, defaultGalleryImages, readLocalStorageArray } from '../data/adminContent';

export function Gallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [galleryImages, setGalleryImages] = useState<AdminGalleryImage[]>(defaultGalleryImages);

  useEffect(() => {
    setGalleryImages(readLocalStorageArray('adminGalleryImages', defaultGalleryImages));
  }, []);

  const categories = useMemo(() => {
    const categorySet = new Set(galleryImages.map((img) => img.category));
    return ['All', ...Array.from(categorySet)];
  }, [galleryImages]);

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
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Gallery</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">Latest Event & Product Photos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our gallery is managed directly by the admin team, so customers always see up-to-date service highlights.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
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
                  <span className="text-sm bg-green-600 px-3 py-1 rounded-full">{image.category}</span>
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
