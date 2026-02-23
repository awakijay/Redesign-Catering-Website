import { motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  Clock,
  FileText,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
} from 'lucide-react';
import { useAuth } from './AuthContext';
import {
  ChatMessage,
  SiteAnnouncement,
  defaultAnnouncements,
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

const cardClass = 'rounded-2xl bg-white p-6 sm:p-8 shadow-xl';

export function Profile() {
  const { user, logout } = useAuth();
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [announcements, setAnnouncements] =
    useState<SiteAnnouncement[]>(defaultAnnouncements);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const allQuotes = JSON.parse(localStorage.getItem('quoteRequests') || '[]');
    const userQuotes = allQuotes.filter(
      (quote: QuoteRequest) => quote.email === user?.email
    );
    setQuoteRequests(userQuotes);

    setAnnouncements(readLocalStorageArray('siteAnnouncements', defaultAnnouncements));

    const allMessages = readLocalStorageArray<ChatMessage>('chatMessages', []);
    const conversation = allMessages.filter(
      (message) => message.userEmail === user?.email
    );
    setChatMessages(conversation);
  }, [user]);

  const sortedAnnouncements = useMemo(
    () =>
      [...announcements].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      ),
    [announcements]
  );

  const handleLogout = () => {
    logout();
    window.location.hash = '';
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userEmail: user.email,
      userName: user.name,
      sender: 'user',
      message: newMessage.trim(),
      createdAt: new Date().toISOString(),
    };

    const existingMessages = readLocalStorageArray<ChatMessage>('chatMessages', []);
    const updatedMessages = [...existingMessages, message];
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    setChatMessages(updatedMessages.filter((item) => item.userEmail === user.email));
    setNewMessage('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'offshore':
        return 'Offshore Catering';
      case 'facility':
        return 'Facility Management';
      case 'event':
        return 'Event Catering';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${cardClass} mb-10`}
        >
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-blue-500 text-2xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
                <p className="text-gray-600">Manage your requests and stay updated.</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </motion.button>
          </div>

          {/* Profile Info Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Name', value: user?.name || 'Guest User', icon: User },
              { label: 'Email', value: user?.email || 'No email', icon: Mail },
              { label: 'Phone', value: user?.phone || 'No phone', icon: Phone },
              { label: 'Location', value: user?.location || 'Not provided', icon: MapPin },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-4 rounded-xl bg-gray-50 p-6">
                  <div className="rounded-full bg-gradient-to-br from-green-600 to-blue-500 p-2">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <p className="font-semibold text-gray-900">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Updates & Chat Section */}
        <div className="my-12 grid grid-cols-1 gap-6 lg:grid-cols-3 mt-16 mb-16">

          {/* Latest Updates */}
          <section className="lg:col-span-2 rounded-2xl bg-white p-6 sm:p-8 shadow-xl flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Latest Updates
            </h2>
            <p className="mb-6 text-gray-600">
              Announcements and new product updates from admin.
            </p>

            {/* Scrollable Announcement List */}
            <div className="h-[400px] overflow-y-auto space-y-4 pr-3 border-t pt-4 scroll-smooth">
              {sortedAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-gray-900">
                      {announcement.title}
                    </h3>

                    {announcement.priority === "high" && (
                      <span className="whitespace-nowrap rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        High Priority
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm text-gray-600">
                    {announcement.content}
                  </p>

                  <p className="mt-3 text-xs text-gray-400">
                    {new Date(announcement.publishedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Chat Section */}
          <section className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl flex flex-col">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
              <MessageSquare className="h-5 w-5" />
              Chat with Admin
            </h2>

            {/* Scrollable Chat Messages */}
            <div className="flex-1 h-[300px] overflow-y-auto space-y-3 rounded-lg bg-gray-50 p-4 scroll-smooth">
              {chatMessages.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No conversation yet. Ask about products, bookings, or custom packages.
                </p>
              ) : (
                chatMessages.map((chat) => (
                  <div
                    key={chat.id}
                    className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${chat.sender === "user"
                        ? "ml-auto bg-blue-600 text-white"
                        : "border border-gray-200 bg-white text-gray-700"
                      }`}
                  >
                    <p>{chat.message}</p>
                    <p
                      className={`mt-1 text-[10px] ${chat.sender === "user"
                          ? "text-blue-100"
                          : "text-gray-400"
                        }`}
                    >
                      {new Date(chat.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Chat Input */}
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={3}
              className="mt-4 w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Type your message to admin"
            />
            <button
              onClick={handleSendMessage}
              className="mt-3 w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Send message
            </button>
          </section>

        </div>

        {/* Quote Requests */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cardClass}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Quote Requests</h2>
              <p className="text-gray-600">Track and manage your catering requests.</p>
            </div>
            <div className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-800">
              {quoteRequests.length} Request{quoteRequests.length !== 1 ? 's' : ''}
            </div>
          </div>

          {quoteRequests.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">No requests yet</h3>
              <p className="mb-6 text-gray-600">
                Start by submitting a quote request for your event.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.location.hash = '';
                  setTimeout(() => {
                    const element = document.getElementById('contact');
                    if (!element) return;
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }, 100);
                }}
                className="rounded-full bg-gradient-to-r from-green-600 to-blue-500 px-8 py-3 font-semibold text-white transition-shadow hover:shadow-lg"
              >
                Request a Quote
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              {quoteRequests.map((quote, index) => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-gray-200 p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="mb-1 text-lg font-bold text-gray-900">
                        {getEventTypeLabel(quote.eventType)}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(quote.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{quote.guests} guests</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                        quote.status
                      )}`}
                    >
                      {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                    </span>
                  </div>

                  {quote.message && (
                    <div className="mb-4 rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-700">{quote.message}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>
                      Submitted {new Date(quote.submittedAt).toLocaleDateString()} at{' '}
                      {new Date(quote.submittedAt).toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}