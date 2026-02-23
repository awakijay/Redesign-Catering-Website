import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  Image,
  LayoutDashboard,
  LogOut,
  Calendar,
  MessageSquare,
  Package,
  Plus,
  Send,
  Trash2,
  Users,
  Eye,
  CheckCircle2,
  XCircle,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AdminGalleryImage,
  AdminProduct,
  ChatMessage,
  SiteAnnouncement,
  UserRecord,
  defaultAnnouncements,
  defaultGalleryImages,
  defaultProducts,
  readLocalStorageArray,
} from '../data/adminContent';

interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  guests: string;
  message: string;
  submittedAt: string;
  status: string;
}
type AdminTab = 'overview' | 'quotes' | 'products' | 'gallery' | 'announcements' | 'chat';

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>(defaultProducts);
  const [galleryItems, setGalleryItems] = useState<AdminGalleryImage[]>(defaultGalleryImages);
  const [announcements, setAnnouncements] = useState<SiteAnnouncement[]>(defaultAnnouncements);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [newChatMessage, setNewChatMessage] = useState('');

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'Nigerian Cuisine',
    price: '',
    image: '',
    isNew: true,
  });

  const [newGallery, setNewGallery] = useState({
    src: '',
    alt: '',
    category: 'Events',
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'normal' as 'normal' | 'high',
  });


  useEffect(() => {
    setQuotes(readLocalStorageArray('quoteRequests', []));
    setProducts(readLocalStorageArray('adminProducts', defaultProducts));
    setGalleryItems(readLocalStorageArray('adminGalleryImages', defaultGalleryImages));
    setAnnouncements(readLocalStorageArray('siteAnnouncements', defaultAnnouncements));

    const accountUsers = readLocalStorageArray<UserRecord & { password?: string }>('users', []).map(
      ({ password: _password, ...user }) => user
    );
    setUsers(accountUsers);

    const savedMessages = readLocalStorageArray('chatMessages', []);
    setChatMessages(savedMessages);

    if (accountUsers.length > 0) {
      setSelectedEmail(accountUsers[0].email);
    }
  }, []);

  const persist = <T,>(key: string, value: T[]) => {
    localStorage.setItem(key, JSON.stringify(value));
  };


  const selectedUser = users.find((user) => user.email === selectedEmail);
  const conversation = useMemo(
    () => chatMessages.filter((message) => message.userEmail === selectedEmail),
    [chatMessages, selectedEmail]
  );


  const unreadUserMessages = chatMessages.filter((message) => message.sender === 'user').length;
  const quoteStats = {
    total: quotes.length,
    pending: quotes.filter((quote) => quote.status === 'pending').length,
    approved: quotes.filter((quote) => quote.status === 'approved').length,
    rejected: quotes.filter((quote) => quote.status === 'rejected').length,
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.hash = '';
    toast.success('Logged out successfully');
  };
  const updateQuoteStatus = (quoteId: string, newStatus: 'approved' | 'rejected') => {
    const updated = quotes.map((quote) =>
      quote.id === quoteId ? { ...quote, status: newStatus } : quote
    );
    persist('quoteRequests', updated);

    if (selectedQuote?.id === quoteId) {
      setSelectedQuote({ ...selectedQuote, status: newStatus });
    }
    toast.success(`Quote ${newStatus}`);
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price) {
      toast.error('Please complete required product fields');
      return;
    }
    const payload: AdminProduct = {
      id: Date.now().toString(),
      ...newProduct,
    };

    const updated = [payload, ...products];
    setProducts(updated);
    persist('adminProducts', updated);
    setNewProduct({
      name: '',
      description: '',
      category: 'Nigerian Cuisine',
      price: '',
      image: '',
      isNew: true,
    });
    toast.success('Product published to website');
  };

  const addGalleryItem = () => {
    if (!newGallery.src || !newGallery.alt) {
      toast.error('Image URL and caption are required');
      return;
    }

    const payload: AdminGalleryImage = {
      id: Date.now().toString(),
      ...newGallery,
    };

    const updated = [payload, ...galleryItems];
    setGalleryItems(updated);
    persist('adminGalleryImages', updated);
    setNewGallery({ src: '', alt: '', category: 'Events' });
    toast.success('Gallery image added');
  };


  const publishAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast.error('Announcement title and content are required');
      return;
    }

    const payload: SiteAnnouncement = {
      id: Date.now().toString(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      priority: newAnnouncement.priority,
      publishedAt: new Date().toISOString(),
    };

    const updated = [payload, ...announcements];
    setAnnouncements(updated);
    persist('siteAnnouncements', updated);
    setNewAnnouncement({ title: '', content: '', priority: 'normal' });
    toast.success('Announcement posted');
  };
  const sendAdminMessage = () => {
    if (!selectedUser || !newChatMessage.trim()) {
      return;
    }

    const payload: ChatMessage = {
      id: Date.now().toString(),
      userEmail: selectedUser.email,
      userName: selectedUser.name,
      sender: 'admin',
      message: newChatMessage.trim(),
      createdAt: new Date().toISOString(),
    };

    const updated = [...chatMessages, payload];
    setChatMessages(updated);
    persist('chatMessages', updated);
    setNewChatMessage('');
  }

  const navItems: { key: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'quotes', label: 'Quotes', icon: Calendar },
    { key: 'products', label: 'Products', icon: Package },
    { key: 'gallery', label: 'Gallery', icon: Image },
    { key: 'announcements', label: 'Updates', icon: Bell },
    { key: 'chat', label: 'User Chat', icon: MessageSquare },
  ];


  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-gradient-to-r from-green-600 to-blue-500 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Catering Admin Panel</h1>
            <p className="text-sm text-white">
              Manage products, gallery content, announcements and customer chat.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>


      </header>

      <div className=" mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[250px_1fr] lg:px-8 justify-between ">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </aside>

        <main className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mt-20">
          {activeTab === 'overview' && (
            <section className="space-y-6">
              <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-blue-500 text-white">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-6 lg:p-8">
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Admin summary</p>
                    <h2 className="mt-3 text-3xl font-bold">Beautiful and Standard Admin Experience</h2>
                    <p className="mt-3 text-sm text-slate-200">Quickly manage quote approvals, upload product/gallery content, and respond to registered users from one screen.</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80" alt="Catering admin dashboard" className="h-full w-full object-cover rounded-l-b-[20px]" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 px-6 mt-6">
                  {[
                    ['Quote Requests', quoteStats.total.toString(), 'from-violet-500 to-indigo-500'],
                    ['Pending Quotes', quoteStats.pending.toString(), 'from-amber-500 to-orange-500'],
                    ['Registered Users', users.length.toString(), 'from-emerald-500 to-green-500'],
                    ['Unread User Messages', unreadUserMessages.toString(), 'from-sky-500 to-cyan-500'],
                  ].map(([label, value, gradient]) => (
                    <div key={label} className={`rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700`}>
                      <p className="text-sm text-white/90">{label}</p>
                      <p className="mt-2 text-3xl font-bold">{value}</p>
                    </div>
                  ))}
                </div>


                <div className="rounded-2xl border border-slate-200 bg-white p-4 mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700">Recent Quotes (Quick Actions)</h3>
                    <button onClick={() => setActiveTab('quotes')} className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700">
                      Open Quotes Tab
                    </button>
                  </div>
                  {quotes.length === 0 ? (
                    <p className="text-sm text-slate-500">No quote requests yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {quotes.slice(0, 3).map((quote) => (
                        <div key={quote.id} className="flex bg-gradient-to-r from-green-600 to-blue-500 flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
                          <div>
                            <p className="font-semibold text-slate-900">{quote.name}</p>
                            <p className="text-xs text-slate-500">{quote.email} • {new Date(quote.date).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setSelectedQuote(quote)} className="rounded-md bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"><Eye className="h-4 w-4" /></button>
                            {quote.status === 'pending' && (
                              <>
                                <button onClick={() => updateQuoteStatus(quote.id, 'approved')} className="rounded-md bg-green-100 p-2 text-green-700 hover:bg-green-200"><CheckCircle2 className="h-4 w-4" /></button>
                                <button onClick={() => updateQuoteStatus(quote.id, 'rejected')} className="rounded-md bg-red-100 p-2 text-red-700 hover:bg-red-200"><XCircle className="h-4 w-4" /></button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                  )}
                </div>
                </div>
            </section>
          )}
          {activeTab === 'quotes' && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Quote Requests</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-yellow-50 p-4 border border-yellow-200"><p className="text-sm text-yellow-700">Pending</p><p className="text-2xl font-bold text-yellow-800">{quoteStats.pending}</p></div>
                <div className="rounded-xl bg-green-50 p-4 border border-green-200"><p className="text-sm text-green-700">Approved</p><p className="text-2xl font-bold text-green-800">{quoteStats.approved}</p></div>
                <div className="rounded-xl bg-red-50 p-4 border border-red-200"><p className="text-sm text-red-700">Rejected</p><p className="text-2xl font-bold text-red-800">{quoteStats.rejected}</p></div>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Client</th>
                      <th className="px-4 py-3">Event</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-500">No quote requests available yet.</td>
                      </tr>
                    ) : quotes.map((quote) => (
                      <tr key={quote.id} className="border-t border-slate-100">
                        <td className="px-4 py-3"><p className="font-medium text-slate-900">{quote.name}</p><p className="text-xs text-slate-500">{quote.email}</p></td>
                        <td className="px-4 py-3 text-slate-700">{quote.eventType}</td>
                        <td className="px-4 py-3 text-slate-700">{new Date(quote.date).toLocaleDateString()}</td>
                        <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${quote.status === 'approved' ? 'bg-green-100 text-green-700' : quote.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{quote.status}</span></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => setSelectedQuote(quote)} className="rounded-md bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"><Eye className="h-4 w-4" /></button>
                            {quote.status === 'pending' && (
                              <>
                                <button onClick={() => updateQuoteStatus(quote.id, 'approved')} className="rounded-md bg-green-100 p-2 text-green-700 hover:bg-green-200"><CheckCircle2 className="h-4 w-4" /></button>
                                <button onClick={() => updateQuoteStatus(quote.id, 'rejected')} className="rounded-md bg-red-100 p-2 text-red-700 hover:bg-red-200"><XCircle className="h-4 w-4" /></button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
          {activeTab === 'products' && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Website Products</h2>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <input
                    value={newProduct.name}
                    onChange={(event) =>
                      setNewProduct((old) => ({ ...old, name: event.target.value }))
                    }
                    placeholder="Product name"
                    className={inputClass}
                  />
                  <input
                    value={newProduct.price}
                    onChange={(event) =>
                      setNewProduct((old) => ({ ...old, price: event.target.value }))
                    }
                    placeholder="Price"
                    className={inputClass}
                  />
                  <input
                    value={newProduct.category}
                    onChange={(event) =>
                      setNewProduct((old) => ({ ...old, category: event.target.value }))
                    }
                    placeholder="Category"
                    className={inputClass}
                  />
                  <input
                    value={newProduct.image}
                    onChange={(event) =>
                      setNewProduct((old) => ({ ...old, image: event.target.value }))
                    }
                    placeholder="Image URL (optional)"
                    className={inputClass}
                  />
                  <textarea
                    value={newProduct.description}
                    onChange={(event) =>
                      setNewProduct((old) => ({ ...old, description: event.target.value }))
                    }
                    placeholder="Description"
                    rows={3}
                    className={`${inputClass} md:col-span-2`}
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={newProduct.isNew}
                      onChange={(event) =>
                        setNewProduct((old) => ({ ...old, isNew: event.target.checked }))
                      }
                    />
                    Mark as new
                  </label>
                  <button
                    onClick={addProduct}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Publish product
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-4"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{product.name}</p>
                      <p className="text-sm text-slate-500">
                        {product.category} • {product.price}
                      </p>
                      <p className="mt-1 text-sm text-slate-700">{product.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        const updated = products.filter((item) => item.id !== product.id);
                        setProducts(updated);
                        persist('adminProducts', updated);
                      }}
                      className="rounded-md p-2 text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}



          {activeTab === 'gallery' && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Gallery Manager</h2>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <input
                    value={newGallery.src}
                    onChange={(event) =>
                      setNewGallery((old) => ({ ...old, src: event.target.value }))
                    }
                    placeholder="Image URL"
                    className={inputClass}
                  />
                  <input
                    value={newGallery.alt}
                    onChange={(event) =>
                      setNewGallery((old) => ({ ...old, alt: event.target.value }))
                    }
                    placeholder="Caption"
                    className={inputClass}
                  />
                  <input
                    value={newGallery.category}
                    onChange={(event) =>
                      setNewGallery((old) => ({ ...old, category: event.target.value }))
                    }
                    placeholder="Category"
                    className={inputClass}
                  />
                </div>

                <button
                  onClick={addGalleryItem}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  Add gallery photo
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 rounded-xl border border-slate-200 p-4"
                  >

                    <div>
                      <p className="font-semibold text-slate-900">{item.alt}</p>
                      <p className="text-sm text-slate-500">{item.category}</p>
                      <p className="mt-1 break-all text-xs text-slate-400">{item.src}</p>
                    </div>
                    <button
                      onClick={() => {
                        const updated = galleryItems.filter((entry) => entry.id !== item.id);
                        setGalleryItems(updated);
                        persist('adminGalleryImages', updated);
                      }}
                      className="rounded-md p-2 text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'announcements' && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Customer Updates</h2>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="space-y-3">
                  <input
                    value={newAnnouncement.title}
                    onChange={(event) =>
                      setNewAnnouncement((old) => ({ ...old, title: event.target.value }))
                    }
                    placeholder="Announcement title"
                    className={inputClass}
                  />
                  <textarea
                    value={newAnnouncement.content}
                    onChange={(event) =>
                      setNewAnnouncement((old) => ({ ...old, content: event.target.value }))
                    }
                    placeholder="Announcement message"
                    rows={4}
                    className={inputClass}
                  />
                  <select
                    value={newAnnouncement.priority}
                    onChange={(event) =>
                      setNewAnnouncement((old) => ({
                        ...old,
                        priority: event.target.value as 'normal' | 'high',
                      }))
                    }
                    className={inputClass}
                  >
                    <option value="normal">Normal priority</option>
                    <option value="high">High priority</option>
                  </select>
                </div>

                <button
                  onClick={publishAnnouncement}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                  Publish update
                </button>
              </div>
              <div className="space-y-3">
                {announcements.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-4"
                  >

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        {item.priority === 'high' && (
                          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                            High
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{item.content}</p>
                    </div>
                    <button
                      onClick={() => {
                        const updated = announcements.filter((entry) => entry.id !== item.id);
                        setAnnouncements(updated);
                        persist('siteAnnouncements', updated);
                      }}
                      className="rounded-md p-2 text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'chat' && (
            <section className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900">Chat with Registered Users</h2>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">
                <div className="h-[430px] overflow-y-auto rounded-xl border border-slate-200 p-3">
                  {users.map((user) => {
                    const isSelected = selectedEmail === user.email;

                    return (
                      <button
                        key={user.email}
                        onClick={() => setSelectedEmail(user.email)}
                        className={`mb-2 w-full rounded-lg p-3 text-left transition ${isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs opacity-80">{user.email}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="flex h-[430px] flex-col rounded-xl border border-slate-200 p-4">
                  <div className="mb-4 flex items-center gap-2 text-sm text-slate-700">
                    <Users className="h-4 w-4" />
                    {selectedUser
                      ? `${selectedUser.name} (${selectedUser.email})`
                      : 'Select a user'}
                  </div>

                  <div className="flex-1 space-y-2 overflow-y-auto rounded-lg bg-slate-50 p-3">
                    {conversation.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`max-w-[82%] rounded-lg px-3 py-2 text-sm ${item.sender === 'admin'
                            ? 'ml-auto bg-blue-600 text-white'
                            : 'border border-slate-200 bg-white text-slate-700'
                          }`}
                      >
                        <p>{item.message}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <input
                      value={newChatMessage}
                      onChange={(event) => setNewChatMessage(event.target.value)}
                      className={inputClass}
                      placeholder="Reply to customer"
                    />
                    <button
                      onClick={sendAdminMessage}
                      className="rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-900">Quote Details</h3>
              <button onClick={() => setSelectedQuote(null)} className="rounded-md p-2 hover:bg-slate-100"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div><p className="text-xs text-slate-500">Client</p><p className="font-semibold">{selectedQuote.name}</p></div>
              <div><p className="text-xs text-slate-500">Email</p><p className="font-semibold">{selectedQuote.email}</p></div>
              <div><p className="text-xs text-slate-500">Phone</p><p className="font-semibold">{selectedQuote.phone}</p></div>
              <div><p className="text-xs text-slate-500">Date</p><p className="font-semibold">{new Date(selectedQuote.date).toLocaleDateString()}</p></div>
              <div><p className="text-xs text-slate-500">Guests</p><p className="font-semibold">{selectedQuote.guests}</p></div>
              <div><p className="text-xs text-slate-500">Status</p><p className="font-semibold capitalize">{selectedQuote.status}</p></div>
            </div>
            <div className="mt-4 rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Message</p>
              <p className="mt-1 text-sm text-slate-700">{selectedQuote.message || 'No message'}</p>
            </div>
            {selectedQuote.status === 'pending' && (
              <div className="mt-5 flex gap-3">
                <button onClick={() => updateQuoteStatus(selectedQuote.id, 'approved')} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">Accept Quote</button>
                <button onClick={() => updateQuoteStatus(selectedQuote.id, 'rejected')} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">Reject Quote</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
