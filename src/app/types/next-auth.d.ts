// src/types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      role?: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    role?: string;
  }
}
