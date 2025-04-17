
import React, { useState } from 'react';
import { ShoppingBag, X, RotateCcw, CreditCard, Banknote, QrCode, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from './CartItem';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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

type PaymentMethod = 'cod' | 'upi' | 'card' | '';

interface CartProps {
  onClose: () => void;
}

export const Cart = ({ onClose }: CartProps) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('');
  const [isUPIDialogOpen, setIsUPIDialogOpen] = useState(false);
  
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

  const handleResetCart = () => {
    setCartItems(initialCartItems);
    toast.success('Cart has been reset to default items');
  };

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = () => {
    setIsCheckoutDialogOpen(true);
  };

  const handlePaymentSelection = (value: string) => {
    setPaymentMethod(value as PaymentMethod);
  };

  const handleProceedPayment = () => {
    if (paymentMethod === 'upi') {
      setIsCheckoutDialogOpen(false);
      setIsUPIDialogOpen(true);
    } else if (paymentMethod === 'cod') {
      setIsCheckoutDialogOpen(false);
      toast.success('Your order has been placed successfully!');
      onClose();
    } else if (paymentMethod === 'card') {
      setIsCheckoutDialogOpen(false);
      toast.info('Credit/Debit card payment option will be available soon.');
    }
  };

  const deliveryFee = 49;
  const packagingFee = 15;
  const subtotal = calculateTotal();
  const total = subtotal + deliveryFee + packagingFee;

  if (cartItems.length === 0) {
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
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between py-4 border-b border-border">
          <div className="flex items-center">
            <ShoppingBag className="mr-2" size={20} />
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-sm rounded-full">
              {cartItems.length} items
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleResetCart} title="Reset cart">
              <RotateCcw size={18} />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
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
            Checkout
          </Button>
        </div>
      </div>

      {/* Checkout Dialog with Payment Options */}
      <Dialog open={isCheckoutDialogOpen} onOpenChange={setIsCheckoutDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Payment Method</DialogTitle>
            <DialogDescription>
              Select your preferred payment method to complete your order.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <RadioGroup value={paymentMethod} onValueChange={handlePaymentSelection} className="space-y-3">
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="cod" id="cod" />
                <label htmlFor="cod" className="flex items-center cursor-pointer w-full">
                  <Banknote className="mr-2" size={20} />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-muted-foreground">Pay with cash when your order arrives</p>
                  </div>
                </label>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="upi" id="upi" />
                <label htmlFor="upi" className="flex items-center cursor-pointer w-full">
                  <QrCode className="mr-2" size={20} />
                  <div>
                    <p className="font-medium">UPI</p>
                    <p className="text-sm text-muted-foreground">Pay using any UPI app (Google Pay, PhonePe, etc.)</p>
                  </div>
                </label>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="card" id="card" />
                <label htmlFor="card" className="flex items-center cursor-pointer w-full">
                  <CreditCard className="mr-2" size={20} />
                  <div>
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="outline" onClick={() => setIsCheckoutDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleProceedPayment} disabled={!paymentMethod}>Proceed</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* UPI QR Code Dialog */}
      <Dialog open={isUPIDialogOpen} onOpenChange={setIsUPIDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Scan to Pay via UPI</DialogTitle>
            <DialogDescription>
              Use any UPI app to scan this QR code and complete your payment
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center py-4">
            <div className="border border-border p-2 rounded-md mb-4">
              <img 
                src="public/lovable-uploads/45aac2a1-8438-4285-8ccb-4aeb665cee9d.png" 
                alt="UPI QR Code" 
                className="w-60 h-60 object-contain"
              />
            </div>
            <p className="text-sm text-center font-medium">Amount: {formattedPrice(total)}</p>
            <p className="text-xs text-center text-muted-foreground mt-1">Scan with any UPI app like Google Pay, PhonePe, Paytm</p>
          </div>
          
          <div className="flex flex-col gap-2 mt-2">
            <Button onClick={() => {
              setIsUPIDialogOpen(false);
              toast.success('Payment successful! Your order has been placed.');
              onClose();
            }}>
              I've Completed the Payment
            </Button>
            <Button variant="outline" onClick={() => setIsUPIDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
