import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Dashboard from '@/pages/Dashboard';
import ArtistDirectory from '@/pages/ArtistDirectory';
import ArtistDetail from '@/pages/ArtistDetail';
import EventDirectory from '@/pages/EventDirectory';
import EventDetail from '@/pages/EventDetail';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

const AppLayout = () => (
  <div className="min-h-screen bg-slate-50">
    <Header />
    <main>
      <Outlet />
    </main>
    <Toaster />
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="artists" element={<ArtistDirectory />} />
        <Route path="artists/:slug" element={<ArtistDetail />} />
        <Route path="events" element={<EventDirectory />} />
        <Route path="events/:slug" element={<EventDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;