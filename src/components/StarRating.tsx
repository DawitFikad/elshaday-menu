import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  max = 5, 
  size = 16, 
  interactive = false,
  onRate,
  className 
}) => {
  return (
    <div className={cn("flex items-center space-x-0.5", className)}>
      {[...Array(max)].map((_, i) => {
        const isFilled = i < Math.floor(rating);
        const starElement = (
          <Star 
            size={size} 
            className={cn(
              "transition-colors",
              isFilled ? "text-amber-400 fill-amber-400" : "text-slate-300 fill-slate-300"
            )}
          />
        );

        if (interactive) {
          return (
            <button
              key={i}
              type="button"
              onClick={() => onRate?.(i + 1)}
              className="hover:scale-110 active:scale-95 cursor-pointer transition-transform"
            >
              {starElement}
            </button>
          );
        }

        return (
          <div key={i} className="cursor-default">
            {starElement}
          </div>
        );
      })}
      {rating > 0 && !interactive && (
        <span className="ml-2 text-xs font-medium text-slate-500">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};
