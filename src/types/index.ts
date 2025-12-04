import { type ReactNode } from "react";

export interface Database {
  public: {
    Tables: {
      items: {
        Row: Item;
        Insert: Omit<Item, "id" | "created_at">;
        Update: Partial<Omit<Item, "id" | "created_at">>;
      };
    };
  };
}

export type Item = {
  id: number;
  title: string;
  description?: string;
  created_at: string;
  image: string;
};

// Navbar
type NavbarMode = "home" | "order";
export interface NavbarProps {
  mode?: NavbarMode; // default: "home"
}

// Tab Component
type Tab = {
  label: string;
  content: ReactNode;
};
export interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
}

// About Section
export interface AboutSection {
  id: number;
  title: string;
  image: string;
  description: string;
}

// Product Section
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

// Mini Sidebar
export interface SidebarItemProps {
  icon: string;
  label: string;
}
// Input Order
export interface OverlayItem {
  id: number;
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
}
