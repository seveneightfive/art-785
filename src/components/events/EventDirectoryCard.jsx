
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart, CheckSquare, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const EventDirectoryCard = ({ event }) => {
    const { toast } = useToast();

    const handleActionClick = (action) => {
        toast({
            title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
        });
    };

    const handleShare = (platform) => {
        toast({
            title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
        });
    };

    const eventDate = event.startDate || event.start_date;
    const formattedDate = eventDate 
        ? new Date(eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : 'Date TBD';
        
    const venueName = event.venue?.name || 'Venue TBD';

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-100 h-full flex flex-col"
        >
            <Link to={`/events/${event.slug}`} className="block">
                <div className="relative">
                    <img  className="w-full h-48 object-cover" alt={event.title} src="https://images.unsplash.com/photo-1562765722-751e6f76ac82" />
                    <div className="absolute top-3 left-3">
                        {event.type && <Badge className="bg-white/90 text-slate-900 font-bold">{event.type}</Badge>}
                    </div>
                </div>
            </Link>
            <div className="p-5 flex-grow flex flex-col">
                <Link to={`/events/${event.slug}`} className="block">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                        {event.title}
                    </h3>
                </Link>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{venueName}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(event.tags) && event.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                </div>
                <div className="mt-auto flex justify-between items-center pt-4 border-t">
                    <div className="flex gap-2">
                        <Button onClick={() => handleActionClick('Like')} variant="ghost" size="icon" className="text-slate-500 hover:text-pink-500 hover:bg-pink-50">
                            <Heart className="w-5 h-5" />
                        </Button>
                        <Button onClick={() => handleActionClick('RSVP')} variant="ghost" size="icon" className="text-slate-500 hover:text-emerald-500 hover:bg-emerald-50">
                            <CheckSquare className="w-5 h-5" />
                        </Button>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100">
                                <Share2 className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleShare('Social Media')}>Social Media</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare('Text Message')}>Text Message</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare('Email')}>Email</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </motion.div>
    );
};

export default EventDirectoryCard;
