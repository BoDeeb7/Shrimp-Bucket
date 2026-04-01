"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ADMIN_PASSWORD = "ShrimpDD20Bucket26";

export function AdminModal({ isOpen, onClose, onSuccess }: AdminModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setPassword("");
      setError(false);
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1e3a8a]/10">
                <Lock className="h-8 w-8 text-[#1e3a8a]" />
              </div>
              <h2 className="text-xl font-bold text-[#1e3a8a]">Admin Access</h2>
              <p className="mt-1 text-center text-sm text-gray-500">
                Enter the admin password to continue
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`mb-4 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 text-center text-sm text-red-500"
                >
                  Incorrect password. Please try again.
                </motion.p>
              )}
              <Button
                type="submit"
                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90"
              >
                Unlock Admin Panel
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
