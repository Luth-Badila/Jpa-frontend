import { type ReactNode } from "react";

export type Item = {
  id: number;
  title: string;
  description?: string;
  created_at: string;
  image: string;
};

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
