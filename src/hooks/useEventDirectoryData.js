
import { useState, useEffect } from 'react';
import { getEvents } from '@/lib/api';

export const useEventDirectoryData = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching event directory data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return { events, loading, error };
};
