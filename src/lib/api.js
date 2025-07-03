import { supabase } from '@/lib/customSupabaseClient';

export const getArtists = async () => {
  const { data, error } = await supabase
    .from('Artists')
    .select('*, events(*)')
    .order('name');

  if (error) throw new Error(error.message);
  return data;
};

export const getArtistBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('Artists')
    .select('*, reviews(*), events(*)')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(error.message);
  }

  if (data) {
    data.events = data.events || [];

    try {
      data.contact = data.contact ? JSON.parse(data.contact) : {};
    } catch (e) {
      console.error('Failed to parse contact JSON:', e);
      data.contact = {};
    }

    try {
      data.gallery = data.gallery ? JSON.parse(data.gallery) : [];
    } catch (e) {
      console.error('Failed to parse gallery JSON:', e);
      data.gallery = [];
    }

    try {
      data.youtubeLinks = data.youtube_links ? JSON.parse(data.youtube_links) : [];
    } catch (e) {
      console.error('Failed to parse youtube_links JSON:', e);
      data.youtubeLinks = [];
    }
  }

  return data;
};

export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select(`
      id,
      title,
      slug,
      description,
      type,
      tags,
      venue,
      hero_image,
      start_date,
      end_date,
      start_time,
      end_time
    `)
    .order('start_date');

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data.map(event => {
    let parsedTags = [];

    if (typeof event.tags === 'string') {
      try {
        const tags = JSON.parse(event.tags);
        if (Array.isArray(tags)) {
          parsedTags = tags;
        }
      } catch (e) {
        console.error(`Failed to parse tags for event ${event.id}, treating as empty:`, e);
      }
    } else if (Array.isArray(event.tags)) {
      parsedTags = event.tags;
    }

    return {
      ...event,
      tags: parsedTags,
    };
  });
};

export const getEventBySlug = async (slug) => {
  const { data: eventData, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single();

  if (eventError) throw new Error(eventError.message);

  if (eventData && eventData.artist_ids) {
    const { data: artistsData, error: artistsError } = await supabase
      .from('Artists')
      .select('*')
      .eq('id', eventData.artist_ids);

    if (artistsError) {
      console.error('Error fetching artists for event:', artistsError);
      eventData.artists = [];
    } else {
      eventData.artists = artistsData;
    }
  } else {
    eventData.artists = [];
  }

  return eventData;
};

export const addReview = async (reviewData) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([reviewData])
    .select();

  if (error) throw new Error(error.message);
  return data;
};
