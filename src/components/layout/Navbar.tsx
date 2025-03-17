
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, ShoppingBag, Menu, X, Heart, User } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchBar } from '@/components/common/SearchBar';
import { Cart } from '@/components/cart/Cart';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = useState(0);

  // For demo purposes, set a sample cart count
  useEffect(() => {
    setCartItemCount(3);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Links for navigation
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Kitchens', path: '/kitchens' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-8 transition-all duration-300 ${
        isScrolled 
          ? 'glass-panel shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xl">H</span>
            </span>
            <span className="font-serif font-semibold text-xl md:text-2xl">Homely<span className="text-primary">Bites</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base smooth-transition ${
                  location.pathname === link.path
                    ? 'font-medium text-primary'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Location Selector (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-1 text-sm text-foreground/80 hover:text-primary smooth-transition">
              <MapPin size={16} />
              <span>Mumbai</span>
            </button>
            
            {/* Search */}
            <div className="hidden lg:block w-44">
              <SearchBar />
            </div>
            
            {/* User Profile */}
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <User size={20} />
            </Button>
            
            {/* Favorites */}
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Heart size={20} />
            </Button>
            
            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon"
              className="relative hover:text-primary"
              onClick={toggleCart}
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-4 lg:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="relative hover:text-primary"
              onClick={toggleCart}
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96 py-12">
                <div className="flex flex-col h-full">
                  <div className="flex flex-col space-y-6 flex-grow">
                    <div className="flex flex-col space-y-4">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          className={`text-lg smooth-transition ${
                            location.pathname === link.path
                              ? 'font-medium text-primary'
                              : 'text-foreground/80 hover:text-primary'
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <SearchBar />
                    </div>
                    
                    <div className="mt-6 flex items-center space-x-2">
                      <MapPin size={16} />
                      <span className="text-muted-foreground">Mumbai</span>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <div className="flex space-x-4">
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <User size={20} />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <Heart size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Cart Sidebar */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <Cart onClose={() => setIsCartOpen(false)} />
        </SheetContent>
      </Sheet>
    </header>
  );
};
