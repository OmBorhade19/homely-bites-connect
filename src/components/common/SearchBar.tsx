
import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search for:', query);
    // Implement search functionality
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        placeholder="Search dishes or kitchens..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-9 pr-4 py-2 text-sm bg-muted/50 border-none rounded-full focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder-muted-foreground/70"
      />
      <button 
        type="submit" 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
      >
        <Search size={16} />
      </button>
    </form>
  );
};
