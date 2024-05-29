import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google";
import { fetchRedis } from "@/helpers/redis";

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id;
    //   } else {
    //     const dbUser = (await fetchRedis("get", `user:${token.id}`)) as
    //       | string
    //       | null;
    //     if (dbUser) {
    //       token.id = dbUser.id;
    //       token.name = dbUser.name;
    //       token.email = dbUser.email;
    //       token.picture = dbUser.image;
    //     }
    //   }
        const dbUserResult = (await fetchRedis("get", `user:${token.id}`)) as
          | string
          | null;

          if (!dbUserResult) {
            if (user) {
                token.id = user!.id
            }
            return token
          }

          const dbUser = JSON.parse(dbUserResult) as User

        //   console.log("dbUser", {
        //     id: dbUser.id,
        //   name: dbUser.name,
        //   email: dbUser.email,
        //   picture: dbUser.image
        //   })

        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    redirect() {
      return "/dashboard";
    },
  },
};
