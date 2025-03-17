import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { KitchenMap } from '@/components/maps/KitchenMap';
import { KitchenCard } from '@/components/ui/KitchenCard';
import { kitchens } from '@/utils/data';
import { MapPin, List, Grid, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { loadGoogleMapsApi } from '@/utils/loadGoogleMapsApi';

const NearbyKitchens = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedKitchen, setSelectedKitchen] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'map' | 'list'>('split');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadMaps = async () => {
      try {
        await loadGoogleMapsApi();
        setIsMapLoaded(true);
      } catch (error) {
        console.error(error);
        toast({
          title: "Map loading failed",
          description: "Could not load Google Maps. Please try again later.",
          variant: "destructive"
        });
      }
    };

    loadMaps();
  }, [toast]);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            toast({
              title: "Location access denied",
              description: "Please enable location services to see nearby kitchens.",
              variant: "destructive"
            });
            setUserLocation({ lat: 19.0760, lng: 72.8777 });
          }
        );
      } else {
        toast({
          title: "Geolocation not supported",
          description: "Your browser doesn't support geolocation.",
          variant: "destructive"
        });
        setUserLocation({ lat: 19.0760, lng: 72.8777 });
      }
    };

    getUserLocation();
  }, [toast]);

  const sortedKitchens = [...kitchens].sort((a, b) => {
    const distanceA = parseFloat(a.distance.replace(' km', ''));
    const distanceB = parseFloat(b.distance.replace(' km', ''));
    return distanceA - distanceB;
  });

  const handleKitchenSelect = (kitchen: any) => {
    setSelectedKitchen(kitchen.id);
    
    if (viewMode !== 'map') {
      const element = document.getElementById(`kitchen-card-${kitchen.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Link to="/kitchens" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
                <ArrowLeft size={16} className="mr-1" />
                Back to all kitchens
              </Link>
              <h1 className="text-3xl font-bold">Kitchens Near You</h1>
              <div className="flex items-center mt-2 text-muted-foreground">
                <MapPin size={16} className="mr-1" />
                <span>Showing kitchens near your location</span>
              </div>
            </div>
            
            <div className="flex">
              <Tabs defaultValue="split" className="w-[300px]" onValueChange={(value) => setViewMode(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="split">
                    <Grid size={16} className="mr-2" />
                    Split
                  </TabsTrigger>
                  <TabsTrigger value="map">
                    <MapPin size={16} className="mr-2" />
                    Map
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <List size={16} className="mr-2" />
                    List
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className={`
            grid gap-6
            ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}
            ${viewMode === 'list' ? 'max-w-2xl mx-auto' : ''}
          `}>
            {(viewMode === 'split' || viewMode === 'map') && (
              <div className={`${viewMode === 'split' ? 'lg:sticky lg:top-24 h-[500px]' : 'h-[70vh]'}`}>
                {isMapLoaded ? (
                  <KitchenMap 
                    kitchens={sortedKitchens}
                    userLocation={userLocation}
                    onKitchenSelect={handleKitchenSelect}
                  />
                ) : (
                  <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p>Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {(viewMode === 'split' || viewMode === 'list') && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium">Nearby Kitchens</h2>
                <div className="grid grid-cols-1 gap-6">
                  {sortedKitchens.map((kitchen) => (
                    <div 
                      key={kitchen.id} 
                      id={`kitchen-card-${kitchen.id}`}
                      className={`transition-all duration-300 ${selectedKitchen === kitchen.id ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    >
                      <KitchenCard
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
                        className="h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NearbyKitchens;
