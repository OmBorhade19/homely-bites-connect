
import React, { useState } from 'react';
import { MapPin, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search for:', searchQuery, 'in location:', location);
    // Implement search functionality
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <img 
          src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2071&auto=format&fit=crop" 
          alt="Indian Food" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 pt-16 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Home Food Delivery
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Authentic <span className="text-primary">Home-Cooked</span> Indian Food, Delivered
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto text-balance">
            Connect with local home chefs and cloud kitchens for delicious homely meals made with love and authentic flavors
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="glass-panel rounded-full p-2 flex flex-col md:flex-row shadow-lg overflow-hidden">
              <div className="flex items-center flex-1 px-4 py-2 md:py-0">
                <MapPin className="text-primary mr-2" size={20} />
                <input
                  type="text"
                  placeholder="Your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none placeholder-muted-foreground/70"
                />
              </div>
              
              <div className="h-px md:w-px my-2 md:my-0 mx-0 md:mx-2 bg-border" />
              
              <div className="flex items-center flex-1 px-4 py-2 md:py-0">
                <Search className="text-primary mr-2" size={20} />
                <input
                  type="text"
                  placeholder="Search for dishes or kitchens"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none placeholder-muted-foreground/70"
                />
              </div>
              
              <Button type="submit" className="w-full md:w-auto rounded-full">
                <span className="mr-2">Find Food</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </form>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto text-center animate-fade-in">
            {[
              { count: '500+', label: 'Home Chefs' },
              { count: '1000+', label: 'Dishes' },
              { count: '25+', label: 'Cuisines' },
              { count: '50k+', label: 'Happy Customers' },
            ].map((item, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold font-serif">{item.count}</span>
                <span className="text-sm md:text-base text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 -left-12 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute top-2/3 -right-12 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
    </div>
  );
};
