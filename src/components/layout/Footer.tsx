
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/30 pt-16 pb-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">H</span>
              </span>
              <span className="font-serif font-semibold text-xl">Homely<span className="text-primary">Bites</span></span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              Connecting you to authentic, home-cooked Indian meals 
              made with love by local chefs and home kitchens.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-base mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/kitchens" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Browse Kitchens
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/become-a-chef" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Become a Chef
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-medium text-base mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-medium text-base mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={16} className="mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">support@homelybites.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={16} className="mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">+91 98765 43210</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-white dark:bg-black border border-input rounded-l-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-primary text-white px-3 py-2 rounded-r-md text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} HomelyBites. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
