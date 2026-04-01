"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showHello, setShowHello] = useState(false);

  useEffect(() => {
    const helloTimer = setTimeout(() => setShowHello(true), 500);
    const completeTimer = setTimeout(() => onComplete(), 2500);
    
    return () => {
      clearTimeout(helloTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a1628]"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative h-40 w-40 md:h-52 md:w-52"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5913589154329595183_y%20%281%29-isZJfax9T5LlIRANzVXwGmeNmHAQEI.jpg"
          alt="Shrimp Bucket Logo"
          width={200}
          height={200}
          className="object-contain"
          priority
        />
      </motion.div>

      <AnimatePresence>
        {showHello && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 flex items-center gap-3"
          >
            <span className="text-3xl font-semibold text-white md:text-4xl">Hello</span>
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              className="text-4xl md:text-5xl"
            >
              {"👋"}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
