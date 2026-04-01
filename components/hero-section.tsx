"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#0a1628]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_#ff6b35_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_#ff6b35_0%,_transparent_40%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-block rounded-full bg-[#ff6b35]/20 px-4 py-2 text-sm font-medium text-[#ff6b35]"
            >
              Fresh Seafood Daily
            </motion.span>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              <span className="text-balance">Deep From</span>
              <br />
              <span className="text-[#ff6b35]">The Sea</span>
            </h1>

            <p className="mb-8 max-w-md text-lg leading-relaxed text-gray-300">
              Experience the finest seafood buckets, grilled delicacies, and signature dishes.
              Dine-in, Delivery, or Takeaway.
            </p>

            <motion.button
              onClick={scrollToMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-[#ff6b35] px-8 py-4 font-semibold text-white shadow-lg transition-colors hover:bg-[#ff6b35]/90"
            >
              Explore Our Menu
            </motion.button>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="relative aspect-square overflow-hidden rounded-2xl shadow-xl"
              >
                <Image
                  src="/images/hero-shrimp-1.jpg"
                  alt="Shrimp Bucket"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative mt-8 aspect-square overflow-hidden rounded-2xl shadow-xl"
              >
                <Image
                  src="/images/hero-shrimp-2.jpg"
                  alt="Crispy Fried Shrimp"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative -mt-8 aspect-square overflow-hidden rounded-2xl shadow-xl"
              >
                <Image
                  src="/images/hero-shrimp-3.jpg"
                  alt="Seafood Platter"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="relative aspect-square overflow-hidden rounded-2xl shadow-xl"
              >
                <Image
                  src="/images/hero-shrimp-4.jpg"
                  alt="Cajun Shrimp Boil"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={scrollToMenu}
            className="flex flex-col items-center text-white/50 transition-colors hover:text-white"
          >
            <span className="mb-2 text-sm">Scroll to menu</span>
            <ChevronDown className="h-6 w-6" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
