"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Instagram, Facebook, Clock } from "lucide-react";
import { useStore } from "@/lib/store-context";
import Image from "next/image";

export function Footer() {
  const { branches } = useStore();

  return (
    <footer className="border-t border-[#2a3b6e] bg-[#0a1628] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-20 w-20 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5913589154329595183_y%20%281%29-isZJfax9T5LlIRANzVXwGmeNmHAQEI.jpg"
                  alt="Shrimp Bucket Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              Experience the freshest seafood, prepared with passion and served with love.
              Dine-in, Delivery, or Takeaway - we bring the ocean to your table.
            </p>
          </motion.div>

          {/* Branches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="mb-4 text-lg font-semibold">Our Branches</h4>
            <div className="space-y-4">
              {branches.map((branch) => (
                <div key={branch.id}>
                  <h5 className="font-medium text-[#ff6b35]">{branch.name}</h5>
                  <p className="mt-1 flex items-center gap-2 text-sm text-gray-300">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    {branch.address}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-gray-300">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    +961 {branch.phone}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="mb-4 text-lg font-semibold">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/shrimpbucket.lb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/shrimpbucket"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-6">
              <h5 className="mb-2 flex items-center gap-2 font-medium">
                <Clock className="h-4 w-4" />
                Opening Hours
              </h5>
              <p className="text-sm text-gray-300">Daily: 12:00 PM - 12:00 AM</p>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          <p>
            {"© "}{new Date().getFullYear()} Shrimp Bucket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
