"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-LB", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    cart,
    branches,
    selectedBranch,
    setSelectedBranch,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  } = useStore();

  const handleWhatsAppOrder = () => {
    if (!selectedBranch || cart.length === 0) return;

    const orderLines = cart.map(
      (item) =>
        `- ${item.name}${item.selectedFlavor ? ` (${item.selectedFlavor})` : ""} x ${item.quantity} = ${formatPrice(item.price * item.quantity)} LBP`
    );

    const message = `*New Order - Shrimp Bucket*\n\n${orderLines.join("\n")}\n\n*Total: ${formatPrice(getCartTotal())} LBP*\n\n*Branch: ${selectedBranch.name}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/961${selectedBranch.phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    clearCart();
    setIsOpen(false);
  };

  const cartCount = getCartCount();

  return (
    <>
      {/* Floating Cart Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#ea580c] text-white shadow-lg transition-transform hover:scale-110"
        whileTap={{ scale: 0.9 }}
      >
        <ShoppingCart className="h-7 w-7" />
        {cartCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#1e3a8a] text-xs font-bold"
          >
            {cartCount}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-xl font-bold text-[#1e3a8a]">Your Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-gray-400">
                    <ShoppingCart className="mb-4 h-16 w-16" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.selectedFlavor}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                      >
                        <div className="mb-2 flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-[#1e3a8a]">
                              {item.name}
                            </h3>
                            {item.selectedFlavor && (
                              <p className="text-sm text-gray-500">
                                {item.selectedFlavor}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() =>
                              removeFromCart(item.id, item.selectedFlavor)
                            }
                            className="rounded-full p-1 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  item.quantity - 1,
                                  item.selectedFlavor
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1e3a8a] shadow-sm hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  item.quantity + 1,
                                  item.selectedFlavor
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1e3a8a] shadow-sm hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="font-bold text-[#ea580c]">
                            {formatPrice(item.price * item.quantity)} LBP
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t bg-gray-50 p-4">
                  {/* Branch Selection */}
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Select Branch
                    </label>
                    <Select
                      value={selectedBranch?.id || ""}
                      onValueChange={(value) => {
                        const branch = branches.find((b) => b.id === value);
                        setSelectedBranch(branch || null);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Total */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-700">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#ea580c]">
                      {formatPrice(getCartTotal())} LBP
                    </span>
                  </div>

                  {/* Order Button */}
                  <Button
                    onClick={handleWhatsAppOrder}
                    disabled={!selectedBranch}
                    className="w-full bg-green-600 py-6 text-lg hover:bg-green-700"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Order via WhatsApp
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
