import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useFollow } from '@/hooks/useFollow';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const ArtistHero = ({ artist }) => {
    const { toast } = useToast();
    const { user } = useAuth();
    const { isFollowing, toggleFollow } = useFollow(artist.id);

    const handleFollow = () => {
        if(!user) {
             toast({
                variant: "destructive",
                title: "Please log in to follow artists",
            });
            return;
        }
        toggleFollow();
        toast({
            title: isFollowing ? `Unfollowed ${artist.name}` : `You are now following ${artist.name}!`,
            description: isFollowing ? "" : "You'll be notified about their upcoming events.",
        });
    };

    return (
        <motion.div 
            className="relative h-[60vh] min-h-[400px] w-full text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <img  
                className="absolute inset-0 w-full h-full object-cover"
                alt={`Hero image for ${artist.name}`}
             src={artist.hero_image || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10">
                <motion.h1 
                    className="text-5xl md:text-7xl font-bold uppercase tracking-wider"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {artist.name}
                </motion.h1>
                <motion.div 
                    className="flex items-center gap-6 mt-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="flex items-center gap-2">
                        <Users className="w-6 h-6" />
                        <span className="text-xl font-semibold">{(artist.fans || 0).toLocaleString()} Fans</span>
                    </div>
                    <Button onClick={handleFollow} size="lg" className="bg-white text-slate-900 hover:bg-slate-200 font-bold flex items-center gap-2">
                        <Heart className={`w-5 h-5 transition-all duration-300 ${isFollowing ? 'text-red-500 fill-current' : ''}`} />
                        {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ArtistHero;