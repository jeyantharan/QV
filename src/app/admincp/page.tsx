'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Lock, User, CheckCircle2, XCircle, Plus, Image as ImageIcon } from 'lucide-react';

export default function AdminCP() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // ... existing states ...
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Dashboard form state
  const [contentTitle, setContentTitle] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedItems, setUploadedItems] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // UI States
  const [viewingItem, setViewingItem] = useState<any | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const auth = localStorage.getItem('admin');
    if (auth === '1') {
      setIsLoggedIn(true);
      fetchItems();
    }
    setIsLoading(false);
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      if (Array.isArray(data)) {
        setUploadedItems(data);
      }
    } catch (err) {
      console.error('Failed to fetch items:', err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'qvtrattoria' && password === 'krishQv2026@') {
      localStorage.setItem('admin', '1');
      setIsLoggedIn(true);
      fetchItems();
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    setIsLoggedIn(false);
    router.push('/');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setContentTitle('');
    setImagePreview(null);
    setEditingId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentTitle || !imagePreview) return;
    setIsSubmitting(true);

    try {
      if (editingId) {
        // Update existing item
        const res = await fetch(`/api/content/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: contentTitle, image: imagePreview }),
        });
        
        if (res.ok) {
          const updatedItem = await res.json();
          setUploadedItems(prev => prev.map(item => item._id === editingId ? updatedItem : item));
          resetForm();
        }
      } else {
        // Add new item
        const res = await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: contentTitle, image: imagePreview }),
        });

        if (res.ok) {
          const newItem = await res.json();
          setUploadedItems(prev => [newItem, ...prev]);
          resetForm();
        }
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to save content. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setContentTitle(item.title);
    setImagePreview(item.imageUrl);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setItemToDelete(id);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch(`/api/content/${itemToDelete}`, { method: 'DELETE' });
      if (res.ok) {
        setUploadedItems(prev => prev.filter(item => item._id !== itemToDelete));
        if (editingId === itemToDelete) {
          setEditingId(null);
          setContentTitle('');
          setImagePreview(null);
        }
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setItemToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 relative overflow-hidden">
      {/* View Modal */}
      <AnimatePresence>
        {viewingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setViewingItem(null)}
          >
            <div className="relative pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setViewingItem(null)}
                className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all border border-white/20"
              >
                <XCircle size={24} />
              </button>
              
              <div className="flex flex-col items-center">
                <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                  <img 
                    src={viewingItem.imageUrl} 
                    alt={viewingItem.title} 
                    className="max-w-full max-h-[80vh] block object-contain"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-playfair font-bold text-glow mb-1">{viewingItem.title}</h3>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest">Captured {new Date(viewingItem.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {itemToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="max-w-sm w-full glass p-8 rounded-3xl border border-white/10 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 border border-red-500/20">
                <XCircle size={32} />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-glow mb-2">Delete Content?</h3>
              <p className="text-neutral-400 mb-8 text-sm leading-relaxed">
                This action cannot be undone. The item will be removed from both your database and Cloudinary storage.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={confirmDelete}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98]"
                >
                  Yes, Delete Item
                </button>
                <button
                  onClick={() => setItemToDelete(null)}
                  className="w-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white font-medium py-3 rounded-xl transition-all border border-white/5"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--accent)]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--accent)]/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass p-8 rounded-2xl border border-white/10 max-w-md mx-auto"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--accent)]/20 text-[var(--accent)]">
                  <Lock size={32} />
                </div>
                <h1 className="text-3xl font-playfair font-bold text-glow mb-2">Admin Portal</h1>
                <p className="text-neutral-400">Access Restricted</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1 ml-1" htmlFor="username">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-[var(--accent)] transition-all"
                      placeholder="Username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1 ml-1" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-[var(--accent)] transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                  >
                    <XCircle size={16} />
                    <span>{error}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-black font-bold py-3 rounded-xl transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                >
                  Sign In
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full"
            >
              <div className="glass p-6 rounded-2xl border border-white/10 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center border border-[var(--accent)]/20 text-[var(--accent)]">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-playfair font-bold text-glow">Admin Dashboard</h1>
                    <p className="text-sm text-neutral-400">Manage site content and assets</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white py-2 px-5 rounded-xl border border-white/10 transition-all font-medium"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Form */}
                <div className="lg:col-span-5">
                  <div className="glass p-8 rounded-2xl border border-white/10 sticky top-32">
                    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                      <h2 className="text-xl font-medium flex items-center gap-2">
                        {editingId ? <Plus className="text-[var(--accent)] rotate-45" size={20} /> : <Plus size={20} className="text-[var(--accent)]" />}
                        {editingId ? 'Edit Content' : 'Add New Content'}
                      </h2>
                      {editingId && (
                        <button 
                          onClick={() => {
                            setEditingId(null);
                            setContentTitle('');
                            setImagePreview(null);
                          }}
                          className="text-xs text-red-400 hover:text-red-300 transition-colors"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2 ml-1" htmlFor="content-title">
                          Section Title
                        </label>
                        <input
                          id="content-title"
                          type="text"
                          value={contentTitle}
                          onChange={(e) => setContentTitle(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-[var(--accent)] transition-all placeholder:text-neutral-600"
                          placeholder="e.g. Summer Special Pasta"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2 ml-1">
                          Cover Image
                        </label>
                        <div 
                          className="relative border-2 border-dashed border-white/10 rounded-xl overflow-hidden text-center hover:border-[var(--accent)]/50 transition-colors cursor-pointer group min-h-[180px] flex items-center justify-center bg-black/20"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          <input
                            id="file-upload"
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          
                          {imagePreview ? (
                            <div className="absolute inset-0 w-full h-full group">
                              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ImageIcon className="text-white mb-2" size={28} />
                                <p className="text-white text-sm font-medium">Change Image</p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center p-8">
                              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <ImageIcon className="text-neutral-500 group-hover:text-[var(--accent)] transition-colors" size={24} />
                              </div>
                              <p className="text-sm font-medium">Select Image</p>
                              <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">PNG, JPG up to 5MB</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!contentTitle || !imagePreview || isSubmitting}
                        className="w-full bg-[var(--accent)] hover:bg-[var(--accent-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(224,175,69,0.3)] flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        ) : (
                          editingId ? <CheckCircle2 size={18} /> : <Plus size={18} />
                        )}
                        {isSubmitting ? 'Processing...' : (editingId ? 'Update content' : 'Publish Content')}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right Side: List */}
                <div className="lg:col-span-7">
                  <div className="glass p-8 rounded-2xl border border-white/10 h-[585px] flex flex-col">
                    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                      <h2 className="text-xl font-medium flex items-center gap-2">
                        <ImageIcon size={20} className="text-[var(--accent)]" />
                        Uploaded Gallery
                      </h2>
                      <span className="text-xs bg-white/5 py-1 px-3 rounded-full text-neutral-400 border border-white/5">
                        {uploadedItems.length} Items total
                      </span>
                    </div>

                    <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                      {uploadedItems.length > 0 ? (
                        uploadedItems.map((item) => (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={item._id}
                            className={`bg-white/5 border rounded-2xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 group hover:bg-white/[0.08] transition-all ${editingId === item._id ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]/50' : 'border-white/5 hover:border-white/10'}`}
                          >
                            <div className="w-full sm:w-20 h-32 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow min-w-0 w-full">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-2 sm:mb-0">
                                <h3 className="font-bold text-lg truncate group-hover:text-[var(--accent)] transition-colors">{item.title}</h3>
                                <p className="text-[10px] text-neutral-500 whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString()}</p>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-2 mt-3 w-full">
                                <button 
                                  onClick={() => setViewingItem(item)}
                                  className="flex-1 sm:flex-none text-center text-xs bg-white/5 hover:bg-[var(--accent)] hover:text-black py-2 px-3 rounded-lg transition-all border border-white/5 font-medium min-w-[70px]"
                                >
                                  View
                                </button>
                                <button 
                                  onClick={() => handleEdit(item)}
                                  className="flex-1 sm:flex-none text-center text-xs bg-white/5 hover:bg-white/10 py-2 px-3 rounded-lg transition-all border border-white/5 font-medium min-w-[70px]"
                                >
                                  Update
                                </button>
                                <button 
                                  onClick={() => handleDelete(item._id)}
                                  className="flex-1 sm:flex-none text-center text-xs bg-red-500/10 hover:bg-red-500 hover:text-white py-2 px-3 rounded-lg transition-all border border-red-500/20 font-medium min-w-[70px]"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-2xl">
                          <ImageIcon size={48} className="mx-auto text-neutral-700 mb-4" />
                          <p className="text-neutral-500">No content uploaded yet.</p>
                          <p className="text-xs text-neutral-600 mt-1">New things will appear here as you add them.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
