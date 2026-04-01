"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { initialMenuItems, initialBranches, type MenuItem, type Branch } from "./menu-data";

interface CartItem extends MenuItem {
  quantity: number;
  selectedFlavor?: string;
}

interface StoreContextType {
  menuItems: MenuItem[];
  branches: Branch[];
  cart: CartItem[];
  isAdmin: boolean;
  showAdminModal: boolean;
  selectedBranch: Branch | null;
  setShowAdminModal: (value: boolean) => void;
  addToCart: (item: MenuItem, flavor?: string) => void;
  removeFromCart: (itemId: string, flavor?: string) => void;
  updateCartQuantity: (itemId: string, quantity: number, flavor?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  setIsAdmin: (value: boolean) => void;
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  deleteMenuItem: (id: string) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  addBranch: (branch: Omit<Branch, "id">) => void;
  deleteBranch: (id: string) => void;
  updateBranch: (id: string, updates: Partial<Branch>) => void;
  setSelectedBranch: (branch: Branch | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(initialBranches[0]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedMenu = localStorage.getItem("shrimpBucket_menu");
    const savedBranches = localStorage.getItem("shrimpBucket_branches");
    const savedCart = localStorage.getItem("shrimpBucket_cart");
    
    if (savedMenu) setMenuItems(JSON.parse(savedMenu));
    if (savedBranches) {
      const parsed = JSON.parse(savedBranches);
      setBranches(parsed);
      setSelectedBranch(parsed[0] || null);
    }
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem("shrimpBucket_menu", JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem("shrimpBucket_branches", JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    localStorage.setItem("shrimpBucket_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: MenuItem, flavor?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.selectedFlavor === flavor
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { ...item, quantity: 1, selectedFlavor: flavor }];
    });
  };

  const removeFromCart = (itemId: string, flavor?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === itemId && item.selectedFlavor === flavor))
    );
  };

  const updateCartQuantity = (itemId: string, quantity: number, flavor?: string) => {
    if (quantity <= 0) {
      removeFromCart(itemId, flavor);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId && item.selectedFlavor === flavor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getCartCount = () =>
    cart.reduce((count, item) => count + item.quantity, 0);

  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems((prev) => [...prev, newItem]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const addBranch = (branch: Omit<Branch, "id">) => {
    const newBranch: Branch = {
      ...branch,
      id: Date.now().toString(),
    };
    setBranches((prev) => [...prev, newBranch]);
  };

  const deleteBranch = (id: string) => {
    setBranches((prev) => prev.filter((branch) => branch.id !== id));
    if (selectedBranch?.id === id) {
      setSelectedBranch(branches.find((b) => b.id !== id) || null);
    }
  };

  const updateBranch = (id: string, updates: Partial<Branch>) => {
    setBranches((prev) =>
      prev.map((branch) => (branch.id === id ? { ...branch, ...updates } : branch))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        menuItems,
        branches,
        cart,
        isAdmin,
        showAdminModal,
        selectedBranch,
        setShowAdminModal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        setIsAdmin,
        addMenuItem,
        deleteMenuItem,
        updateMenuItem,
        addBranch,
        deleteBranch,
        updateBranch,
        setSelectedBranch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
