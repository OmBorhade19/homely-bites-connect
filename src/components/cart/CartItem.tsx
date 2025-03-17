
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({
  id,
  name,
  price,
  image,
  quantity,
  onIncrement,
  onDecrement,
  onRemove
}: CartItemProps) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);

  const totalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price * quantity);

  return (
    <div className="flex items-start py-4 border-b border-border last:border-0">
      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h4 className="font-medium text-base">{name}</h4>
        <p className="text-muted-foreground text-sm">{formattedPrice}</p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-1">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => onDecrement(id)}
              disabled={quantity <= 1}
            >
              <Minus size={14} />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => onIncrement(id)}
            >
              <Plus size={14} />
            </Button>
          </div>
          
          <div className="flex items-center">
            <span className="font-medium mr-3">{totalPrice}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(id)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
