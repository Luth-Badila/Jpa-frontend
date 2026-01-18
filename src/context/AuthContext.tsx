import { createContext } from "react";
import { Session } from "@supabase/supabase-js";

export type AuthContextType = {
  session: Session | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
});