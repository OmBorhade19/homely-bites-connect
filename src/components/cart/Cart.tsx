
import React, { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from './CartItem';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Sample cart items data
const initialCartItems = [
  {
    id: 'dish1',
    name: 'Butter Chicken',
    price: 299,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop',
    quantity: 1
  },
  {
    id: 'dish2',
    name: 'Paneer Tikka',
    price: 249,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2070&auto=format&fit=crop',
    quantity: 2
  },
  {
    id: 'dish3',
    name: 'Vegetable Biryani',
    price: 199,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop',
    quantity: 1
  }
];

interface CartProps {
  onClose: () => void;
}

export const Cart = ({ onClose }: CartProps) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate();
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleIncrement = (id: string) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    // Implement checkout logic
    toast.success('Proceeding to checkout...');
    onClose();
    navigate('/checkout');
  };

  const deliveryFee = 49;
  const packagingFee = 15;
  const subtotal = calculateTotal();
  const total = subtotal + deliveryFee + packagingFee;

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between py-4 border-b border-border">
        <div className="flex items-center">
          <ShoppingBag className="mr-2" size={20} />
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-sm rounded-full">
            {cartItems.length} items
          </span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow py-10">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <ShoppingBag size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground text-center max-w-xs">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button className="mt-6" onClick={onClose}>
            Start Ordering
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto py-2">
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <div className="border-t border-border pt-4 pb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formattedPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>{formattedPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Packaging Fee</span>
                <span>{formattedPrice(packagingFee)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border mt-2">
                <span className="font-medium">Total</span>
                <span className="font-medium">{formattedPrice(total)}</span>
              </div>
            </div>
            <Button className="w-full mt-4" size="lg" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
