
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { KitchenCard } from '@/components/ui/KitchenCard';
import { SearchBar } from '@/components/common/SearchBar';
import { kitchens } from '@/utils/data';
import { Filter, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

const Kitchens = () => {
  const [allKitchens, setAllKitchens] = useState(kitchens);
  const [filteredKitchens, setFilteredKitchens] = useState(kitchens);
  const [filters, setFilters] = useState({
    vegetarian: false,
    trending: false,
    new: false,
    hasDiscount: false
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...allKitchens];
    
    if (filters.vegetarian) {
      result = result.filter(kitchen => kitchen.isVegetarian);
    }
    
    if (filters.trending) {
      result = result.filter(kitchen => kitchen.trending);
    }
    
    if (filters.new) {
      result = result.filter(kitchen => kitchen.isNew);
    }
    
    if (filters.hasDiscount) {
      result = result.filter(kitchen => kitchen.discount && kitchen.discount > 0);
    }
    
    setFilteredKitchens(result);
  }, [filters, allKitchens]);

  const cuisines = [...new Set(kitchens.map(k => k.cuisine))];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">Kitchens Near You</h1>
          <p className="text-muted-foreground max-w-3xl">
            Discover authentic home-cooked Indian food from local chefs and cloud kitchens
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4">
            <div className="w-full sm:max-w-md">
              <SearchBar />
            </div>
            
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Filter size={16} />
                    <span>Filters</span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Kitchen Filters</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuCheckboxItem
                      checked={filters.vegetarian}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, vegetarian: checked === true }))
                      }
                    >
                      Pure Vegetarian
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.trending}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, trending: checked === true }))
                      }
                    >
                      Trending
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.new}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, new: checked === true }))
                      }
                    >
                      Newly Added
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.hasDiscount}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, hasDiscount: checked === true }))
                      }
                    >
                      Offers Available
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <span>Cuisine</span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Select Cuisine</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {cuisines.map((cuisine) => (
                      <DropdownMenuCheckboxItem key={cuisine}>
                        {cuisine}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <span>Sort</span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuCheckboxItem>
                      Rating (High to Low)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Delivery Time (Fast to Slow)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Distance (Near to Far)
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              
              let label = '';
              switch (key) {
                case 'vegetarian': label = 'Pure Vegetarian'; break;
                case 'trending': label = 'Trending'; break;
                case 'new': label = 'Newly Added'; break;
                case 'hasDiscount': label = 'Offers Available'; break;
                default: label = key;
              }
              
              return (
                <div key={key} className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  <span>{label}</span>
                  <button 
                    onClick={() => setFilters(prev => ({ ...prev, [key]: false }))}
                    className="ml-1 hover:bg-primary/10 rounded-full h-4 w-4 inline-flex items-center justify-center"
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredKitchens.map((kitchen) => (
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
        
        {filteredKitchens.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No kitchens found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search criteria
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setFilters({
                vegetarian: false,
                trending: false,
                new: false,
                hasDiscount: false
              })}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Kitchens;
