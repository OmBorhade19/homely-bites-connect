
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { KitchenBadge } from '@/components/ui/KitchenBadge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Minus, Plus, Heart, ShoppingBag, Star, ArrowLeft } from 'lucide-react';
import { kitchens, dishes } from '@/utils/data';
import { FoodCard } from '@/components/ui/FoodCard';
import { toast } from 'sonner';

const DishDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dish, setDish] = useState<any>(null);
  const [kitchen, setKitchen] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarDishes, setSimilarDishes] = useState<any[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch dish details
    const dishData = dishes.find(d => d.id === id);
    if (dishData) {
      setDish(dishData);
      
      // Fetch kitchen details
      const kitchenData = kitchens.find(k => k.id === dishData.kitchenId);
      if (kitchenData) {
        setKitchen(kitchenData);
      }
      
      // Get similar dishes (same category, different dish)
      const similar = dishes
        .filter(d => d.category === dishData.category && d.id !== dishData.id)
        .slice(0, 4);
      setSimilarDishes(similar);
    }
    
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to your cart`);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-6">
          <div className="animate-pulse">
            <div className="h-64 bg-muted rounded-xl mb-6"></div>
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-8"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!dish || !kitchen) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Dish not found</h2>
          <p className="text-muted-foreground mb-6">The dish you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </Layout>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(dish.price);
  
  const discountedPrice = dish.discount ? dish.price - (dish.price * dish.discount / 100) : dish.price;
  const formattedDiscountedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(discountedPrice);

  return (
    <Layout>
      <div className="container mx-auto py-12 px-6">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Dish Image */}
          <div className="rounded-xl overflow-hidden">
            <img 
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Dish Details */}
          <div>
            <div className="flex items-start justify-between">
              <div>
                {dish.isVegetarian && (
                  <div className="mb-4">
                    <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm border border-green-100">
                      <div className="h-2 w-2 rounded-full bg-green-600" />
                      <span>Vegetarian</span>
                    </div>
                  </div>
                )}
                <h1 className="text-3xl font-bold">{dish.name}</h1>
                <div className="flex items-center mt-1">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-normal text-muted-foreground hover:text-primary"
                    onClick={() => navigate(`/kitchen/${kitchen.id}`)}
                  >
                    {kitchen.name}
                  </Button>
                </div>
              </div>
              
              <Button 
                variant={isFavorite ? "default" : "outline"}
                size="icon"
                className="rounded-full"
                onClick={handleFavoriteToggle}
              >
                <Heart size={18} className={isFavorite ? "fill-current" : ""} />
              </Button>
            </div>
            
            <div className="flex items-center mt-4 space-x-2">
              {dish.rating && (
                <div className="flex items-center">
                  <Star className="fill-current text-secondary mr-1" size={16} />
                  <span>{dish.rating}</span>
                </div>
              )}
              {dish.reviewCount && (
                <span className="text-muted-foreground">({dish.reviewCount} reviews)</span>
              )}
            </div>
            
            <div className="mt-6">
              <div className="flex items-center space-x-3">
                {dish.discount ? (
                  <>
                    <span className="text-2xl font-bold">{formattedDiscountedPrice}</span>
                    <span className="text-muted-foreground line-through">{formattedPrice}</span>
                    <KitchenBadge type="discount" value={dish.discount} />
                  </>
                ) : (
                  <span className="text-2xl font-bold">{formattedPrice}</span>
                )}
              </div>
              
              <div className="mt-8">
                <Tabs defaultValue="description">
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="animate-fade-in mt-4">
                    <p className="text-muted-foreground">
                      {dish.description || `Delicious ${dish.name} prepared with traditional recipes and fresh ingredients. A popular ${dish.isVegetarian ? 'vegetarian' : ''} dish from ${kitchen.name}, known for its rich flavors and authentic taste.`}
                    </p>
                  </TabsContent>
                  <TabsContent value="ingredients" className="animate-fade-in mt-4">
                    <p className="text-muted-foreground">
                      {dish.ingredients || "Fresh seasonal ingredients sourced from local markets. Our chefs use traditional spices and cooking techniques to ensure authentic flavors in every bite."}
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="text-xl w-8 text-center">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  
                  <Button 
                    size="lg"
                    className="px-8"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium">Delivery Information</h3>
                <p className="text-muted-foreground mt-2">
                  Estimated delivery time: {kitchen.deliveryTime}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Dishes */}
        {similarDishes.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarDishes.map((similarDish) => (
                <FoodCard
                  key={similarDish.id}
                  id={similarDish.id}
                  name={similarDish.name}
                  image={similarDish.image}
                  price={similarDish.price}
                  kitchen={similarDish.kitchen}
                  kitchenId={similarDish.kitchenId}
                  isVegetarian={similarDish.isVegetarian}
                  rating={similarDish.rating}
                  isFeatured={similarDish.isFeatured}
                  discount={similarDish.discount}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DishDetail;
