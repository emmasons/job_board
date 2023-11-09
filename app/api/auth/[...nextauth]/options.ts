import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { env } from "@/lib/env";
import { db } from "@/lib/db";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {
        console.log("Github Profile", profile);
        let userRole = "Github User";
        if (profile?.email == env.ADMIN_EMAIL) {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile: GoogleProfile) {
        console.log("Google Profile", profile);
        let userRole = "Google User";

        return {
          ...profile,
          role: userRole,
          id: profile.sub,
        };
      },
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await db.user.findUnique({
            where: { email: credentials?.email },
          });

          if (foundUser) {
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password,
            );

            if (match) {
              delete foundUser.password;
              foundUser["role"] = "Unverified Email";
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        // store the user id from MongoDB to session
        const sessionUser = await db.user.findUnique({
          where: { email: session.user.email },
        });
        session.user.id = sessionUser?.id;
      }
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        // check if user already exists
        const userExists = await db.user.findUnique({
          where: { email: profile.email },
        });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await db.user.create({
            data: {
              email: profile.email,
              name: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture,
            },
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
};
