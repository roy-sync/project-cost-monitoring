import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import axios from "./axios";
import { JWT } from "next-auth/jwt";
import axios from "axios";
import axiosInstance from "@/axios/axiosInstance";

interface JWTProp {
  token: JWT;
  user: any;
  account: any;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      credentials: {
        empID: {
          label: "Employee ID",
          type: "text",
        },
        empKey: { label: "Employee Key", type: "password" },
      },
      authorize: async (credentials, req) => {
        const { emp_id, emp_key } = credentials as any;

        try {
          // const res = await axios.get(
          //   `https://syntactics.bitrix24.com/rest/${emp_id}/${emp_key}/profile.json`
          // );

          const authToken = process.env.AUTH_TOKEN;
          const requestHeaders = {
            'Content-Type': 'application/json',
            'Authorization': authToken,
          };
          const params = { 'emp_id': emp_id, 'emp_key': emp_key }

          const res = await axios.post(
            `https://syntactics.bitrix24.com/rest/${emp_id}/${emp_key}/profile.json`,
            params,
            { headers: requestHeaders }
          );
  
          if (res.status === 401) {
            return Promise.resolve({ error: "Invalid credentials" });
          } else {
            const { result } = res.data;
            return Promise.resolve(result);
          }
        } catch (error) {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async jwt({ token, user }: JWTProp) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as { ID: string; ADMIN: boolean };
      return session;
    },
  },
};
