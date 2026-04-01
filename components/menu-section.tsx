"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, ArrowLeft, X } from "lucide-react";
import { useStore } from "@/lib/store-context";
import { categories, type MenuItem } from "@/lib/menu-data";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditItemModal } from "./edit-item-modal";
import Image from "next/image";

const categoryImages: Record<string, string> = {
  "Buckets": "/images/items/buckets.jpg",
  "Family Buckets": "/images/items/family.jpg",
  "Starters": "/images/items/starters.jpg",
  "Salads": "/images/items/salads.jpg",
  "Grilled Meals": "/images/items/grilled.jpg",
  "Fried Meals": "/images/items/fried.jpg",
  "Sandwiches": "/images/items/sandwiches.jpg",
  "Burgers": "/images/items/burgers.jpg",
  "Noodles": "/images/items/noodles.jpg",
  "Rice": "/images/items/rice.jpg",
  "Kids Meals": "/images/items/kids.jpg",
  "Dessert": "/images/items/dessert.jpg",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-LB", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function CategoryCard({ 
  category, 
  onClick,
  itemCount 
}: { 
  category: string; 
  onClick: () => void;
  itemCount: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#1a2b5e] shadow-lg transition-all hover:shadow-xl"
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={categoryImages[category] || "/images/items/buckets.jpg"}
          alt={category}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold uppercase text-white">{category}</h3>
        <p className="text-sm text-[#ff6b35]">{itemCount} items</p>
      </div>
    </motion.button>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const { addToCart, isAdmin, deleteMenuItem } = useStore();
  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>(
    item.flavors?.[0]
  );
  const [showEditModal, setShowEditModal] = useState(false);

  const handleAddToCart = () => {
    addToCart(item, selectedFlavor);
  };

  // Generate item image based on category
  const itemImage = categoryImages[item.category] || "/images/items/buckets.jpg";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#2a3b6e] bg-[#1a2b5e] shadow-lg transition-all hover:shadow-xl"
      >
        {/* Item Image */}
        <div className="relative h-36 overflow-hidden">
          <Image
            src={itemImage}
            alt={item.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b5e] via-transparent to-transparent" />
          
          {isAdmin && (
            <div className="absolute right-2 top-2 flex gap-1">
              <button
                onClick={() => setShowEditModal(true)}
                className="rounded-full bg-[#1a2b5e] p-2 text-white hover:bg-[#2a3b6e]"
              >
                <Pencil className="h-3 w-3" />
              </button>
              <button
                onClick={() => deleteMenuItem(item.id)}
                className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="mb-3 flex-1">
            <h3 className="font-semibold text-white">{item.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-400 line-clamp-2">{item.description}</p>
          </div>

          {item.flavors && item.flavors.length > 0 && (
            <div className="mb-3">
              <Select value={selectedFlavor} onValueChange={setSelectedFlavor}>
                <SelectTrigger className="h-9 border-[#2a3b6e] bg-[#0a1628] text-sm text-white">
                  <SelectValue placeholder="Select flavor" />
                </SelectTrigger>
                <SelectContent className="border-[#2a3b6e] bg-[#1a2b5e]">
                  {item.flavors.map((flavor) => (
                    <SelectItem key={flavor} value={flavor} className="text-white hover:bg-[#2a3b6e]">
                      {flavor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-[#ff6b35]">
              {formatPrice(item.price)} LBP
            </span>
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="bg-[#ff6b35] text-white hover:bg-[#ff6b35]/90"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </motion.div>

      <EditItemModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        item={item}
      />
    </>
  );
}

export function MenuSection() {
  const { menuItems, isAdmin } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const categoryCounts = categories.reduce(
    (acc, category) => {
      acc[category] = menuItems.filter((item) => item.category === category).length;
      return acc;
    },
    {} as Record<string, number>
  );

  const categoryItems = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory)
    : [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          // Categories Grid
          <motion.div
            key="categories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <h2 className="text-3xl font-bold uppercase text-white md:text-4xl">
                Our <span className="text-[#ff6b35]">Menu</span>
              </h2>
              <p className="mt-2 text-gray-400">Select a category to explore</p>
            </motion.div>

            {/* Admin Add Button */}
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#ff6b35] text-white hover:bg-[#ff6b35]/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Item
                </Button>
              </motion.div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category}
                  category={category}
                  itemCount={categoryCounts[category] || 0}
                  onClick={() => setSelectedCategory(category)}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          // Category Items
          <motion.div
            key="items"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Back Button and Category Title */}
            <div className="mb-8 flex items-center gap-4">
              <motion.button
                onClick={() => setSelectedCategory(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full bg-[#1a2b5e] px-4 py-2 text-white transition-colors hover:bg-[#2a3b6e]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </motion.button>
              <h2 className="text-2xl font-bold uppercase text-white md:text-3xl">
                {selectedCategory}
              </h2>
            </div>

            {/* Admin Add Button */}
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#ff6b35] text-white hover:bg-[#ff6b35]/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Item
                </Button>
              </motion.div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <EditItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        item={null}
      />
    </section>
  );
}
