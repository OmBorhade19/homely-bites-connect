
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { KitchenBadge } from '@/components/ui/KitchenBadge';
import { FoodCard } from '@/components/ui/FoodCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Clock, MapPin, Phone, Mail, Share2, Heart } from 'lucide-react';
import { kitchens, dishes } from '@/utils/data';
import { toast } from 'sonner';

const KitchenDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [kitchen, setKitchen] = useState<any>(null);
  const [kitchenDishes, setKitchenDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('menu');
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch kitchen details
    const kitchenData = kitchens.find(k => k.id === id);
    if (kitchenData) {
      setKitchen(kitchenData);
      
      // Fetch dishes for this kitchen
      const kitchenDishesData = dishes.filter(d => d.kitchenId === id);
      setKitchenDishes(kitchenDishesData);
    }
    
    setLoading(false);
  }, [id]);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    // Implement share functionality
    toast.success('Share link copied to clipboard');
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-6">
          <div className="animate-pulse">
            <div className="h-64 bg-muted rounded-xl mb-6"></div>
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-64 bg-muted rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!kitchen) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Kitchen not found</h2>
          <p className="text-muted-foreground mb-6">The kitchen you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </Layout>
    );
  }

  // Create categories of dishes
  const categories = [...new Set(kitchenDishes.map(dish => dish.category))];

  const menuItems = categories.map(category => {
    const categoryDishes = kitchenDishes.filter(dish => dish.category === category);
    return {
      category,
      dishes: categoryDishes
    };
  });

  return (
    <Layout>
      <div className="container mx-auto py-12 px-6">
        {/* Kitchen Header */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="aspect-[5/2] overflow-hidden">
            <img 
              src={kitchen.image}
              alt={kitchen.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex justify-between items-end">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {kitchen.isVegetarian && <KitchenBadge type="vegetarian" className="bg-white/90 text-green-700" />}
                  {kitchen.trending && <KitchenBadge type="trending" className="bg-white/90 text-orange-700" />}
                  {kitchen.isNew && <KitchenBadge type="new" className="bg-white/90 text-blue-700" />}
                </div>
                <h1 className="text-3xl font-bold">{kitchen.name}</h1>
                <p className="text-white/90 mt-1">{kitchen.cuisine}</p>
                
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center">
                    <Star className="text-secondary fill-secondary mr-1" size={16} />
                    <span>{kitchen.rating}</span>
                    <span className="text-white/70 ml-1">(120+)</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1" size={16} />
                    <span>{kitchen.deliveryTime}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1" size={16} />
                    <span>{kitchen.distance}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="secondary" 
                  size="icon"
                  className="rounded-full"
                  onClick={handleShare}
                >
                  <Share2 size={18} />
                </Button>
                <Button 
                  variant={isFavorite ? "default" : "secondary"}
                  size="icon"
                  className="rounded-full"
                  onClick={handleFavoriteToggle}
                >
                  <Heart size={18} className={isFavorite ? "fill-current" : ""} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="menu" className="mb-10" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu" className="animate-fade-in">
            {/* Menu Categories */}
            {menuItems.map((item, index) => (
              <div key={index} className="mb-10">
                <h2 className="text-2xl font-semibold mb-6">{item.category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {item.dishes.map((dish) => (
                    <FoodCard
                      key={dish.id}
                      id={dish.id}
                      name={dish.name}
                      image={dish.image}
                      price={dish.price}
                      kitchen={kitchen.name}
                      kitchenId={kitchen.id}
                      isVegetarian={dish.isVegetarian}
                      rating={dish.rating}
                      isFeatured={dish.isFeatured}
                      discount={dish.discount}
                    />
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="about" className="animate-fade-in">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold mb-4">About {kitchen.name}</h2>
              <p className="text-muted-foreground mb-6">
                {kitchen.description || `${kitchen.name} specializes in authentic ${kitchen.cuisine} cuisine, prepared with love and traditional recipes. We focus on using fresh, high-quality ingredients to deliver the most authentic flavors to your doorstep.`}
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-muted-foreground" />
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2 text-muted-foreground" />
                      <span>contact@{kitchen.name.toLowerCase().replace(/\s/g, '')}.com</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Working Hours</h3>
                  <p className="text-muted-foreground">Monday to Sunday: 10:00 AM - 10:00 PM</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Service Areas</h3>
                  <p className="text-muted-foreground">We deliver to all locations within 5 km radius</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="animate-fade-in">
            <div className="text-center py-10">
              <h2 className="text-2xl font-semibold mb-4">Reviews Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're currently collecting reviews for {kitchen.name}. Check back soon to see what other customers have to say.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default KitchenDetail;
