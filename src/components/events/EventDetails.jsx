import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, DollarSign, Tag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const EventDetails = ({ event }) => {
    const formatDateTime = (date, time) => {
        return `${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${time}`;
    };

    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
            <Card className="bg-white shadow-lg border-slate-100 sticky top-24">
                <CardHeader>
                    <CardTitle className="text-3xl uppercase tracking-wide">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                        <Calendar className="w-5 h-5 text-slate-500 mt-1" />
                        <div>
                            <p className="font-semibold text-slate-800">Start</p>
                            <p className="text-slate-600">{formatDateTime(event.startDate, event.startTime)}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Calendar className="w-5 h-5 text-slate-500 mt-1" />
                        <div>
                            <p className="font-semibold text-slate-800">End</p>
                            <p className="text-slate-600">{formatDateTime(event.endDate, event.endTime)}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-slate-500 mt-1" />
                        <div>
                            <p className="font-semibold text-slate-800">{event.venue.name}</p>
                            <p className="text-slate-600">{event.venue.location}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                        <DollarSign className="w-5 h-5 text-slate-500 mt-1" />
                        <div>
                            <p className="font-semibold text-slate-800">Cost</p>
                            <p className="text-slate-600">{typeof event.cost === 'number' ? `$${event.cost}` : event.cost}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                        <Tag className="w-5 h-5 text-slate-500 mt-1" />
                        <div>
                            <p className="font-semibold text-slate-800">Tags</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {event.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default EventDetails;