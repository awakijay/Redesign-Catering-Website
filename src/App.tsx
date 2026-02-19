import { About } from './components/About';
import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './components/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Menu } from './components/Menu';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Profile } from './components/Profile';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Check if admin is authenticated
    const adminToken = localStorage.getItem('adminToken');
    setIsAdminAuthenticated(!!adminToken);

    // Simple hash-based routing
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'profile') {
        setCurrentPage('profile');
      } else if (hash === 'admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Admin pages (no header/footer)
  if (currentPage === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <>
          <AdminLogin onLoginSuccess={() => setIsAdminAuthenticated(true)} />
          <Toaster />
        </>
      );
    }
    return (
      <>
        <AdminDashboard />
        <Toaster />
      </>
    );
  }

  // Regular pages (with header/footer)
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Header />
        {currentPage === 'profile' ? (
          <div className="pt-20">
            <Profile />
          </div>
        ) : (
          <main>
            <Hero />
            <Services />
            <About />
            <Menu />
            <Gallery />
            <Testimonials />
            <Contact />
          </main>
        )}
        <Footer />
        <Toaster />
      </div>
    </AuthProvider>
  );
}