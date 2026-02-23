import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo, useState } from 'react';
import {
  AdminProduct,
  SiteAnnouncement,
  defaultAnnouncements,
  defaultProducts,
  readLocalStorageArray,
} from '../data/adminContent';

export function Menu() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [products, setProducts] = useState<AdminProduct[]>(defaultProducts);
  const [announcements, setAnnouncements] = useState<SiteAnnouncement[]>(defaultAnnouncements);

  useEffect(() => {
    setProducts(readLocalStorageArray('adminProducts', defaultProducts));
    setAnnouncements(readLocalStorageArray('siteAnnouncements', defaultAnnouncements));
  }, []);

  const groupedProducts = useMemo(() => {
    return products.reduce<Record<string, AdminProduct[]>>((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});
  }, [products]);

  const categories = Object.keys(groupedProducts);
  const newestAnnouncement = [...announcements].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )[0];

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {newestAnnouncement && (
          <div className=" mb-8 rounded-2xl bg-blue-50 border border-blue-100 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 mb-2">
              New updates
            </p>
            <h3 className="text-xl font-bold text-gray-900">{newestAnnouncement.title}</h3>
            <p className="text-sm text-gray-700 mt-2">{newestAnnouncement.content}</p>
          </div>
        )}

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Our Menu</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">Fresh Products & Event Packages</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our selection of authentic Nigerian, African, and intercontinental dishes
            crafted for your events and offshore operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-green-600">{category}</h3>
              <ul className="space-y-5">
                {groupedProducts[category].map((item) => (
                  <li key={item.id}>
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <span className="text-sm font-semibold text-green-700"> {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                        minimumFractionDigits: 0,
                      }).format(Number(item.price))}</span>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    {item.isNew && (
                      <span className="inline-flex mt-2 bg-emerald-600 text-green-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
