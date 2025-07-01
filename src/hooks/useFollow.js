import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

export const useFollow = (artistId) => {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkFollowingStatus = useCallback(async () => {
    if (!user || !artistId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_followed_artists')
        .select('*')
        .eq('user_id', user.id)
        .eq('artist_id', artistId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        throw error;
      }

      setIsFollowing(!!data);
    } catch (error) {
      console.error('Error checking follow status:', error);
    } finally {
      setLoading(false);
    }
  }, [user, artistId]);

  useEffect(() => {
    checkFollowingStatus();
  }, [checkFollowingStatus]);

  const toggleFollow = async () => {
    if (!user) {
      // Or redirect to login
      console.log('User must be logged in to follow artists');
      return;
    }

    if (isFollowing) {
      // Unfollow
      const { error } = await supabase
        .from('user_followed_artists')
        .delete()
        .match({ user_id: user.id, artist_id: artistId });
      
      if (error) {
        console.error('Error unfollowing artist:', error);
      } else {
        setIsFollowing(false);
      }
    } else {
      // Follow
      const { error } = await supabase
        .from('user_followed_artists')
        .insert({ user_id: user.id, artist_id: artistId });
      
      if (error) {
        console.error('Error following artist:', error);
      } else {
        setIsFollowing(true);
      }
    }
  };

  return { isFollowing, toggleFollow, loading };
};