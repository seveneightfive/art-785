import React from 'react';
import { Star, Edit3, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ReviewCard = ({ review, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 group border border-slate-100 h-full flex flex-col">
      <div className="flex gap-4 mb-4">
        <img  className="w-24 h-24 object-cover rounded-xl flex-shrink-0" alt={`${review.title} photo`} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-slate-900 transition-colors">
            {review.title}
          </h3>
          <p className="text-slate-500 font-medium mb-2 font-sans">{review.type}</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-slate-600 leading-relaxed mb-4 font-sans flex-grow">
        "{review.review}"
      </p>
      <div className="flex justify-between items-center">
        <span className="text-slate-400 text-sm font-sans">
          {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit('review', review.id)} className="text-slate-500 hover:text-slate-900 hover:bg-slate-100">
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete('review', review.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
