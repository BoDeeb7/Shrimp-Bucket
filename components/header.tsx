"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useStore } from "@/lib/store-context";
import { AdminModal } from "./admin-modal";

export function Header() {
  const clickCountRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isAdmin, setIsAdmin, showAdminModal, setShowAdminModal } = useStore();

  const handleLogoClick = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    clickCountRef.current += 1;

    if (clickCountRef.current >= 7) {
      setShowAdminModal(true);
      clickCountRef.current = 0;
    } else {
      // Reset count after 3 seconds of no clicks
      timeoutRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 3000);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#2a3b6e] bg-[#0a1628]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <motion.button
            onClick={handleLogoClick}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 focus:outline-none cursor-pointer"
            type="button"
          >
            <div className="relative h-14 w-14 overflow-hidden md:h-16 md:w-16">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5913589154329595183_y%20%281%29-isZJfax9T5LlIRANzVXwGmeNmHAQEI.jpg"
                alt="Shrimp Bucket Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white md:text-2xl">Shrimp Bucket</h1>
              <p className="text-sm text-[#ff6b35]">Deep From The Sea</p>
            </div>
          </motion.button>

          <div className="flex items-center gap-4">
            {isAdmin && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-full bg-[#ff6b35] px-3 py-1 text-xs font-medium text-white"
              >
                Admin Mode
              </motion.span>
            )}
          </div>
        </div>
      </header>

      <AdminModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSuccess={() => {
          setIsAdmin(true);
          setShowAdminModal(false);
        }}
      />
    </>
  );
}
