
import React, { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { FeaturedKitchens } from '@/components/home/FeaturedKitchens';
import { PopularDishes } from '@/components/home/PopularDishes';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      <FeaturedKitchens />
      <PopularDishes />
    </Layout>
  );
};

export default Index;
