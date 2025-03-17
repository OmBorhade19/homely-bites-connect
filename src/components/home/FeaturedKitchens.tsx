
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KitchenCard } from '@/components/ui/KitchenCard';
import { kitchens } from '@/utils/data';

export const FeaturedKitchens = () => {
  const featuredKitchens = kitchens.slice(0, 4);
  
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <span className="text-primary text-sm font-medium">Featured</span>
            <h2 className="text-3xl font-bold mt-2">Popular Kitchens</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Discover our community of home chefs and local kitchens creating authentic Indian food with love and passion.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            <Link to="/nearby-kitchens">
              <Button variant="outline" className="flex items-center">
                <MapPin size={16} className="mr-2" />
                View Map
              </Button>
            </Link>
            <Link to="/kitchens">
              <Button variant="link" className="text-primary p-0 flex items-center">
                View all kitchens
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredKitchens.map((kitchen) => (
            <KitchenCard
              key={kitchen.id}
              id={kitchen.id}
              name={kitchen.name}
              image={kitchen.image}
              cuisine={kitchen.cuisine}
              rating={kitchen.rating}
              deliveryTime={kitchen.deliveryTime}
              distance={kitchen.distance}
              isVegetarian={kitchen.isVegetarian}
              trending={kitchen.trending}
              discount={kitchen.discount}
              isNew={kitchen.isNew}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
