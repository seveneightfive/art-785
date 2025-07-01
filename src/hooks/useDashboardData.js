
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

export const useDashboardData = () => {
  const [data, setData] = useState({
    upcomingEvents: [],
    followedArtists: [],
    myReviews: [],
    savedPosts: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, artistsRes] = await Promise.all([
            supabase.from('events').select('*').order('start_date', { ascending: true }).limit(4),
            supabase.from('Artists').select('*').order('fans', { ascending: false }).limit(4)
        ]);

        if (eventsRes.error) throw eventsRes.error;
        if (artistsRes.error) throw artistsRes.error;

        setData({
          upcomingEvents: eventsRes.data || [],
          followedArtists: artistsRes.data || [],
          myReviews: [], 
          savedPosts: [],
        });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ...data, loading, error };
};
