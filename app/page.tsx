"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { StoreProvider } from "@/lib/store-context";
import { SplashScreen } from "@/components/splash-screen";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { MenuSection } from "@/components/menu-section";
import { AdminPanel } from "@/components/admin-panel";
import { Cart } from "@/components/cart";
import { Footer } from "@/components/footer";

function MainContent() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {!showSplash && (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <HeroSection />
            <div id="menu">
              <AdminPanel />
              <MenuSection />
            </div>
          </main>
          <Footer />
          <Cart />
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
