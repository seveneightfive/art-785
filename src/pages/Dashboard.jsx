import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Star, Bookmark, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useDashboardData } from '@/hooks/useDashboardData';
import EventsTab from '@/components/dashboard/EventsTab';
import ReviewsTab from '@/components/dashboard/ReviewsTab';
import SavedPostsTab from '@/components/dashboard/SavedPostsTab';
function Dashboard() {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('events');
  const {
    upcomingEvents,
    followedArtists,
    myReviews,
    savedPosts
  } = useDashboardData();
  const handleAddNew = type => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };
  const handleEdit = (type, id) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };
  const handleDelete = (type, id) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };
  const tabs = [{
    id: 'events',
    label: 'Upcoming Events',
    icon: Calendar,
    count: upcomingEvents.length
  }, {
    id: 'artists',
    label: 'Following',
    icon: Users,
    count: followedArtists.length,
    path: '/artists'
  }, {
    id: 'reviews',
    label: 'My Reviews',
    icon: Star,
    count: myReviews.length
  }, {
    id: 'saved',
    label: 'Saved Posts',
    icon: Bookmark,
    count: savedPosts.length
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'events':
        return <EventsTab events={upcomingEvents} itemVariants={itemVariants} onEdit={handleEdit} onDelete={handleDelete} />;
      case 'reviews':
        return <ReviewsTab reviews={myReviews} itemVariants={itemVariants} onEdit={handleEdit} onDelete={handleDelete} />;
      case 'saved':
        return <SavedPostsTab savedPosts={savedPosts} itemVariants={itemVariants} onEdit={handleEdit} onDelete={handleDelete} />;
      default:
        return null;
    }
  };
  return <>
      <Helmet>
        <title>Personal Dashboard - EventHorizon</title>
        <meta name="description" content="Your personalized dashboard to track upcoming events, followed artists, venue reviews, and saved posts all in one place." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 uppercase tracking-wide">Local. Vocal.</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Find local events. Track your favorite artists. Share reviews and more.</p>
        </motion.div>
        
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="flex flex-wrap justify-center gap-4 mb-8">
            {tabs.map(tab => {
          const Icon = tab.icon;
          const commonClasses = "flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500";
          const activeClasses = "bg-slate-900 text-white shadow-lg";
          const inactiveClasses = "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900";
          if (tab.path) {
            return <Link key={tab.id} to={tab.path} className={`${commonClasses} ${inactiveClasses}`}>
                    <Icon className="w-5 h-5" />
                    <span className="font-sans">{tab.label}</span>
                    <span className="bg-slate-100 px-2 py-1 rounded-full text-xs">{tab.count}</span>
                  </Link>;
          }
          return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`${commonClasses} ${activeTab === tab.id ? activeClasses : inactiveClasses}`}>
                  <Icon className="w-5 h-5" />
                  <span className="font-sans">{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                    {tab.count}
                  </span>
                </button>;
        })}
        </motion.div>

        <motion.div key={activeTab} variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          <motion.div variants={itemVariants} className="flex justify-end">
            <Button onClick={() => handleAddNew(activeTab)} className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="w-5 h-5 mr-2" />
              <span className="font-sans">Add New</span>
            </Button>
          </motion.div>

          {renderActiveTab()}
        </motion.div>
      </div>
    </>;
}
export default Dashboard;