import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { Account, Profile, Session } from "next-auth";
import { env } from "@/lib/env";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { AdapterUser } from "next-auth/adapters";
import { User as NextAuthUser } from "next-auth";

interface CustomSessionCallbackData {
  session: Session;
  token: JWT;
}

type CustomJwtCallbackData = {
  token: JWT;
  user: Session["user"] | null;
};

type CustomNextAuthUser = NextAuthUser & {
  isVerified: boolean;
};

type CustomGoogleProfile = GoogleProfile & {
  emailVerified: Date | null;
};

type CustomGithubProfile = GithubProfile & {
  emailVerified: Date | null;
};

export const options = {
  providers: [
    GitHubProvider({
      profile(profile: CustomGithubProfile) {
        let userRole = "Github User";
        if (profile?.email == env.ADMIN_EMAIL) {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
          isVerified: true,
          id: profile.id.toString(),
        };
      },
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile: CustomGoogleProfile) {
        let userRole = "Google User";

        return {
          ...profile,
          role: userRole,
          id: profile.sub,
          isVerified: true,
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
          if (!credentials) {
            return null;
          }
          const foundUser = await db.user.findUnique({
            where: { email: credentials?.email },
          });

          if (foundUser) {
            if (foundUser.password !== null) {
              const match = await bcrypt.compare(
                credentials.password,
                foundUser.password,
              );

              if (match) {
                const { password, ...userWithoutPassword } = foundUser;
                return userWithoutPassword;
              }
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
    async jwt({ token, user }: CustomJwtCallbackData) {
      if (user) token.isVerified = user.isVerified;
      return token;
    },
    async session({ session }: CustomSessionCallbackData) {
      if (session?.user) {
        // store the user id from MongoDB to session
        const sessionUser = await db.user.findUnique({
          where: { email: session.user.email as string },
          include: { profile: true },
        });
        session.user.id = sessionUser?.id as string;
        session.user.firstName = sessionUser?.profile?.firstName as string;
        session.user.lastName = sessionUser?.profile?.lastName as string;
      }
      return session;
    },
    signIn: async (params: {
      user: AdapterUser | CustomNextAuthUser;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, any>;
    }): Promise<string | true> => {
      if (params.user.isVerified) {
        return true;
      } else {
        return `/auth/unverified-email?u=${params.user.id}`;
      }
    },
  },
};
