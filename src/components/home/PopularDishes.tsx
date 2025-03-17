
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FoodCard } from '@/components/ui/FoodCard';
import { dishes } from '@/utils/data';

export const PopularDishes = () => {
  const popularDishes = dishes.filter(dish => dish.isFeatured).slice(0, 6);
  
  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <span className="text-primary text-sm font-medium">Most Loved</span>
            <h2 className="text-3xl font-bold mt-2">Popular Dishes</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Explore our most ordered dishes that keep our customers coming back for more.
            </p>
          </div>
          <Link to="/kitchens">
            <Button variant="link" className="text-primary p-0 flex items-center mt-4 md:mt-0">
              Browse all dishes
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDishes.map((dish) => (
            <FoodCard
              key={dish.id}
              id={dish.id}
              name={dish.name}
              image={dish.image}
              price={dish.price}
              kitchen={dish.kitchen}
              kitchenId={dish.kitchenId}
              isVegetarian={dish.isVegetarian}
              rating={dish.rating}
              isFeatured={dish.isFeatured}
              discount={dish.discount}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
