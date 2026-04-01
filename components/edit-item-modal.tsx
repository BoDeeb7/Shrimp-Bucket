"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/store-context";
import { categories, type MenuItem } from "@/lib/menu-data";

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
}

export function EditItemModal({ isOpen, onClose, item }: EditItemModalProps) {
  const { addMenuItem, updateMenuItem } = useStore();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: categories[0],
    flavors: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category: item.category,
        flavors: item.flavors?.join(", ") || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: categories[0],
        flavors: "",
      });
    }
  }, [item, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const flavors = formData.flavors
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const menuItemData = {
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price) || 0,
      category: formData.category,
      flavors: flavors.length > 0 ? flavors : undefined,
    };

    if (item) {
      updateMenuItem(item.id, menuItemData);
    } else {
      addMenuItem(menuItemData);
    }
    onClose();
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
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="mb-6 text-xl font-bold text-[#1e3a8a]">
              {item ? "Edit Menu Item" : "Add New Menu Item"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Price (LBP)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="flavors">Flavors (comma-separated)</Label>
                <Input
                  id="flavors"
                  value={formData.flavors}
                  onChange={(e) =>
                    setFormData({ ...formData, flavors: e.target.value })
                  }
                  placeholder="e.g., Creamy Lemon, Cajun, Curry"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90"
              >
                {item ? "Save Changes" : "Add Item"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
