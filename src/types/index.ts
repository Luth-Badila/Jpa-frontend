export type Item = {
  id: number;
  title: string;
  description?: string;
  created_at: string;
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

