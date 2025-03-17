
import React from 'react';
import { Link } from 'react-router-dom';
import { KitchenBadge } from './KitchenBadge';
import { cn } from '@/lib/utils';

export interface FoodCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  kitchen: string;
  kitchenId: string;
  isVegetarian?: boolean;
  rating?: number;
  isFeatured?: boolean;
  discount?: number;
  className?: string;
}

export const FoodCard = ({
  id,
  name,
  image,
  price,
  kitchen,
  kitchenId,
  isVegetarian,
  rating,
  isFeatured,
  discount,
  className
}: FoodCardProps) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);

  const discountedPrice = discount ? price - (price * discount / 100) : price;
  const formattedDiscountedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(discountedPrice);

  return (
    <div 
      className={cn(
        "overflow-hidden rounded-xl elegant-shadow animate-fade-in bg-white dark:bg-card",
        className
      )}
    >
      <Link to={`/dish/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {isVegetarian && (
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-green-500">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
            )}
            {isFeatured && <KitchenBadge type="trending" />}
          </div>
          {discount && (
            <div className="absolute top-3 right-3">
              <KitchenBadge type="discount" value={discount} />
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/dish/${id}`}>
          <h3 className="font-medium text-base">{name}</h3>
        </Link>
        <Link to={`/kitchen/${kitchenId}`} className="block">
          <p className="text-muted-foreground text-sm mt-1 hover:text-primary transition-colors">{kitchen}</p>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            {discount ? (
              <>
                <span className="font-medium">{formattedDiscountedPrice}</span>
                <span className="text-muted-foreground text-sm line-through">{formattedPrice}</span>
              </>
            ) : (
              <span className="font-medium">{formattedPrice}</span>
            )}
          </div>
          {rating && <KitchenBadge type="rating" value={rating} />}
        </div>
      </div>
    </div>
  );
};
