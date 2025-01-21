import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      ID: string;
      ADMIN: boolean;
    };
  }
}
