
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Kitchen } from '@/utils/data';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface KitchenMapProps {
  kitchens: Kitchen[];
  userLocation?: { lat: number; lng: number } | null;
  onKitchenSelect?: (kitchen: Kitchen) => void;
}

export const KitchenMap: React.FC<KitchenMapProps> = ({ 
  kitchens, 
  userLocation, 
  onKitchenSelect 
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const { toast } = useToast();

  // Initialize Google Maps
  useEffect(() => {
    if (!mapRef.current) return;

    // Mumbai coordinates as default center
    const defaultCenter = { lat: 19.0760, lng: 72.8777 };
    const initialCenter = userLocation || defaultCenter;

    const mapInstance = new google.maps.Map(mapRef.current, {
      center: initialCenter,
      zoom: 12,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    setMap(mapInstance);
    setInfoWindow(new google.maps.InfoWindow());

    return () => {
      // Cleanup markers on unmount
      markers.forEach(marker => marker.setMap(null));
      if (userMarker) userMarker.setMap(null);
    };
  }, [mapRef]);

  // Add kitchen markers when map or kitchens change
  useEffect(() => {
    if (!map || !infoWindow) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    // Create kitchen markers with random coordinates around Mumbai for demo
    const mumbai = { lat: 19.0760, lng: 72.8777 };
    const newMarkers = kitchens.map((kitchen, index) => {
      // Simulate different locations around Mumbai
      // In a real app, you would use actual coordinates from your data
      const position = {
        lat: mumbai.lat + (Math.random() - 0.5) * 0.05,
        lng: mumbai.lng + (Math.random() - 0.5) * 0.05
      };

      const marker = new google.maps.Marker({
        position,
        map,
        title: kitchen.name,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        },
        animation: google.maps.Animation.DROP
      });

      // Create info window content
      const contentString = `
        <div style="padding: 8px; max-width: 200px;">
          <h3 style="font-weight: bold; margin-bottom: 4px;">${kitchen.name}</h3>
          <p style="margin: 4px 0;">${kitchen.cuisine} Cuisine</p>
          <p style="margin: 4px 0;">⭐ ${kitchen.rating} • ${kitchen.deliveryTime}</p>
        </div>
      `;

      // Add click event
      marker.addListener('click', () => {
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
        
        if (onKitchenSelect) {
          onKitchenSelect(kitchen);
        }
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Make sure all markers are visible on the map
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => bounds.extend(marker.getPosition()!));
      if (userLocation) bounds.extend(userLocation);
      map.fitBounds(bounds);
    }
  }, [map, kitchens, infoWindow]);

  // Update user location marker when userLocation changes
  useEffect(() => {
    if (!map || !userLocation) return;

    // Remove existing user marker
    if (userMarker) userMarker.setMap(null);

    // Create new user marker
    const newUserMarker = new google.maps.Marker({
      position: userLocation,
      map,
      title: 'Your Location',
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      },
      zIndex: 1000
    });

    setUserMarker(newUserMarker);

    // Center map on user location
    map.setCenter(userLocation);
  }, [map, userLocation]);

  // Center map on user location
  const centerOnUser = useCallback(() => {
    if (!map || !userLocation) {
      toast({
        title: "Location not available",
        description: "Please allow location access to use this feature.",
        variant: "destructive"
      });
      return;
    }

    map.setCenter(userLocation);
    map.setZoom(15);
  }, [map, userLocation, toast]);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg shadow-md"
        style={{ minHeight: '500px' }}
      />
      
      <div className="absolute bottom-4 right-4 z-10">
        <Button 
          variant="default" 
          size="sm"
          className="shadow-lg"
          onClick={centerOnUser}
        >
          <Navigation size={16} className="mr-2" />
          <span>Center on me</span>
        </Button>
      </div>
    </div>
  );
};
