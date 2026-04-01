"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Pencil, Trash2, MapPin, Phone, LogOut, Building2 } from "lucide-react";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Branch } from "@/lib/menu-data";

interface EditBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  branch: Branch | null;
}

function EditBranchModal({ isOpen, onClose, branch }: EditBranchModalProps) {
  const { addBranch, updateBranch } = useStore();
  const [formData, setFormData] = useState({
    name: branch?.name || "",
    address: branch?.address || "",
    phone: branch?.phone || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (branch) {
      updateBranch(branch.id, formData);
    } else {
      addBranch(formData);
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
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="mb-6 text-xl font-bold text-[#1e3a8a]">
              {branch ? "Edit Branch" : "Add New Branch"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="branchName">Branch Name</Label>
                <Input
                  id="branchName"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone (without country code)</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="81818784"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90"
              >
                {branch ? "Save Changes" : "Add Branch"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AdminPanel() {
  const { isAdmin, setIsAdmin, branches, deleteBranch } = useStore();
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  if (!isAdmin) return null;

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mb-8 max-w-7xl px-4 md:px-6"
      >
        <div className="rounded-2xl border-2 border-[#ea580c]/20 bg-[#ea580c]/5 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1e3a8a]">Admin Panel</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAdmin(false)}
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Exit Admin
            </Button>
          </div>

          {/* Branches Management */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-[#1e3a8a]">
                <Building2 className="h-5 w-5" />
                Branches
              </h3>
              <Button
                size="sm"
                onClick={() => {
                  setEditingBranch(null);
                  setShowBranchModal(true);
                }}
                className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90"
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Branch
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {branches.map((branch) => (
                <motion.div
                  key={branch.id}
                  layout
                  className="group relative rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => {
                        setEditingBranch(branch);
                        setShowBranchModal(true);
                      }}
                      className="rounded-full bg-[#1e3a8a] p-2 text-white hover:bg-[#1e3a8a]/80"
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => deleteBranch(branch.id)}
                      className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>

                  <h4 className="font-semibold text-[#1e3a8a]">{branch.name}</h4>
                  <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-3 w-3" />
                    {branch.address}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                    <Phone className="h-3 w-3" />
                    +961 {branch.phone}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <EditBranchModal
        isOpen={showBranchModal}
        onClose={() => {
          setShowBranchModal(false);
          setEditingBranch(null);
        }}
        branch={editingBranch}
      />
    </>
  );
}
