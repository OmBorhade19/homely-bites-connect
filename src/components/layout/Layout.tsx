
import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toaster } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 overflow-hidden">
        {children}
      </main>
      <Footer />
      <Toaster position="top-right" closeButton richColors />
    </div>
  );
};
