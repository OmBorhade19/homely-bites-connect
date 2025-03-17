
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KitchenBadgeProps {
  type: 'rating' | 'vegetarian' | 'trending' | 'new' | 'discount';
  value?: string | number;
  className?: string;
}

export const KitchenBadge = ({ type, value, className }: KitchenBadgeProps) => {
  const getStyles = () => {
    switch (type) {
      case 'rating':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'vegetarian':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'trending':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'new':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'discount':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getContent = () => {
    switch (type) {
      case 'rating':
        return (
          <div className="flex items-center space-x-1">
            <Star className="fill-current" size={12} />
            <span>{value}</span>
          </div>
        );
      case 'vegetarian':
        return 'Pure Veg';
      case 'trending':
        return 'Trending';
      case 'new':
        return 'New';
      case 'discount':
        return value ? `${value}% OFF` : 'Offer';
      default:
        return value || '';
    }
  };

  return (
    <div 
      className={cn(
        'px-2 py-0.5 text-xs font-medium rounded-full border whitespace-nowrap flex items-center justify-center',
        getStyles(),
        className
      )}
    >
      {getContent()}
    </div>
  );
};
