import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Check, CreditCard, Smartphone, BanknoteIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from './CartItem';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  const [paymentStep, setPaymentStep] = useState('cart'); // 'cart', 'payment', 'complete'
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showUpiQr, setShowUpiQr] = useState(false);
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
    setPaymentStep('payment');
  };

  const handlePaymentSelect = (value: string) => {
    setPaymentMethod(value);
  };

  const handlePayNow = () => {
    if (paymentMethod === 'upi') {
      setShowUpiQr(true);
    } else if (paymentMethod === 'card') {
      toast.loading('Processing payment...');
      setTimeout(() => {
        toast.success('Payment successful!');
        setPaymentStep('complete');
        setTimeout(() => {
          onClose();
          navigate('/');
        }, 2000);
      }, 2000);
    } else {
      toast.success('Order placed successfully!');
      setPaymentStep('complete');
      setTimeout(() => {
        onClose();
        navigate('/');
      }, 2000);
    }
  };

  const handleUpiComplete = () => {
    setShowUpiQr(false);
    toast.success('UPI payment successful!');
    setPaymentStep('complete');
    setTimeout(() => {
      onClose();
      navigate('/');
    }, 2000);
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

  const renderPaymentMethods = () => {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between py-4 border-b border-border">
          <h2 className="text-xl font-semibold">Payment Method</h2>
          <Button variant="ghost" size="icon" onClick={() => setPaymentStep('cart')}>
            <X size={20} />
          </Button>
        </div>
        
        <div className="py-6 flex-grow">
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={handlePaymentSelect} 
            className="space-y-4"
          >
            <div className={`flex items-center space-x-3 rounded-lg border p-4 ${paymentMethod === 'card' ? 'border-primary' : 'border-border'}`}>
              <RadioGroupItem value="card" id="card" />
              <label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                <CreditCard className="mr-3 text-muted-foreground" size={20} />
                <div>
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                </div>
              </label>
            </div>
            
            <div className={`flex items-center space-x-3 rounded-lg border p-4 ${paymentMethod === 'upi' ? 'border-primary' : 'border-border'}`}>
              <RadioGroupItem value="upi" id="upi" />
              <label htmlFor="upi" className="flex items-center cursor-pointer flex-1">
                <Smartphone className="mr-3 text-muted-foreground" size={20} />
                <div>
                  <p className="font-medium">UPI</p>
                  <p className="text-sm text-muted-foreground">Pay using any UPI app</p>
                </div>
              </label>
            </div>
            
            <div className={`flex items-center space-x-3 rounded-lg border p-4 ${paymentMethod === 'cod' ? 'border-primary' : 'border-border'}`}>
              <RadioGroupItem value="cod" id="cod" />
              <label htmlFor="cod" className="flex items-center cursor-pointer flex-1">
                <BanknoteIcon className="mr-3 text-muted-foreground" size={20} />
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                </div>
              </label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="border-t border-border pt-4 pb-4">
          <div className="flex justify-between pt-2 mb-4">
            <span className="font-medium">Total Amount</span>
            <span className="font-medium">{formattedPrice(total)}</span>
          </div>
          <Button className="w-full" size="lg" onClick={handlePayNow}>
            Pay Now
          </Button>
        </div>
      </div>
    );
  };

  const renderOrderComplete = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-medium mb-2">Payment Successful!</h3>
        <p className="text-muted-foreground text-center max-w-xs mb-6">
          Your order has been placed successfully. You will receive a confirmation shortly.
        </p>
        <Button onClick={onClose}>
          Continue Shopping
        </Button>
      </div>
    );
  };

  const renderUpiQrDialog = () => {
    return (
      <Dialog open={showUpiQr} onOpenChange={setShowUpiQr}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code to Pay</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center p-4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <img 
                src="/lovable-uploads/66006829-4b6e-4a18-8e38-21546adbaee9.png" 
                alt="UPI QR Code" 
                className="w-56 h-56 object-contain"
              />
            </div>
            <p className="text-center mb-4">
              Open any UPI app and scan this code to pay <strong>{formattedPrice(total)}</strong>
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setShowUpiQr(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpiComplete}>
                I've Completed Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (cartItems.length === 0 && paymentStep === 'cart') {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between py-4 border-b border-border">
          <div className="flex items-center">
            <ShoppingBag className="mr-2" size={20} />
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-sm rounded-full">
              0 items
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

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
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {paymentStep === 'cart' && (
        <>
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
              Proceed to Payment
            </Button>
          </div>
        </>
      )}

      {paymentStep === 'payment' && renderPaymentMethods()}
      {paymentStep === 'complete' && renderOrderComplete()}
      {renderUpiQrDialog()}
    </div>
  );
};
