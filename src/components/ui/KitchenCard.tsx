
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import { KitchenBadge } from './KitchenBadge';
import { cn } from '@/lib/utils';

export interface KitchenCardProps {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  isVegetarian?: boolean;
  trending?: boolean;
  discount?: number;
  isNew?: boolean;
  className?: string;
}

export const KitchenCard = ({
  id,
  name,
  image,
  cuisine,
  rating,
  deliveryTime,
  distance,
  isVegetarian,
  trending,
  discount,
  isNew,
  className
}: KitchenCardProps) => {
  return (
    <Link 
      to={`/kitchen/${id}`}
      className={cn(
        "block overflow-hidden rounded-xl hover-scale elegant-shadow animate-fade-in",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {isVegetarian && <KitchenBadge type="vegetarian" />}
          {trending && <KitchenBadge type="trending" />}
          {isNew && <KitchenBadge type="new" />}
        </div>
        {discount && (
          <div className="absolute top-3 right-3">
            <KitchenBadge type="discount" value={discount} />
          </div>
        )}
      </div>
      <div className="p-4 bg-white dark:bg-card">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg">{name}</h3>
          <KitchenBadge type="rating" value={rating} />
        </div>
        <p className="text-muted-foreground text-sm mt-1">{cuisine}</p>
        <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{distance}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
