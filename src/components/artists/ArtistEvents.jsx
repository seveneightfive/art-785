import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Heart, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ArtistEvents = ({ events }) => {
    const { toast } = useToast();

    const handleActionClick = (action, title) => {
        toast({
            title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
        });
    };

    const getVenueName = (venue) => {
        if (!venue) return "TBA";
        try {
            const venueObj = typeof venue === 'string' ? JSON.parse(venue) : venue;
            return venueObj.name || "TBA";
        } catch (error) {
            console.error("Failed to parse venue JSON:", error);
            return "TBA";
        }
    }
    
    const getStartDate = (event) => {
        if (!event || !event.start_date) return "Date TBC";
        return new Date(event.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    }

    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
            <Card className="bg-white shadow-lg border-slate-100">
                <CardHeader>
                    <CardTitle className="text-3xl uppercase tracking-wide">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                    {events && events.length > 0 ? (
                        <div className="space-y-6">
                            {events.map(event => (
                                <div key={event.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                                    <div className="flex-grow">
                                        <Link to={`/events/${event.slug}`}>
                                            <h4 className="text-xl font-bold text-slate-800 hover:underline">{event.title}</h4>
                                        </Link>
                                        <div className="flex items-center gap-2 text-slate-500 mt-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{getStartDate(event)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500 mt-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{getVenueName(event.venue)}</span>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 flex items-center gap-2">
                                        <Button onClick={() => handleActionClick('like', event.title)} variant="outline" size="icon">
                                            <Heart className="w-5 h-5" />
                                        </Button>
                                        <Button onClick={() => handleActionClick('RSVP', event.title)} variant="outline" size="icon">
                                            <CheckSquare className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500">No upcoming events scheduled.</p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ArtistEvents;