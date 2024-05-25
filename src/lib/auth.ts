import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        GoogleProvider({
            clientId: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            } else {
                const dbUser = await db.get(`user:${token.id}`) as User | null;
                if (dbUser) {
                    token.id = dbUser.id;
                    token.name = dbUser.name;
                    token.email = dbUser.email;
                    token.picture = dbUser.image;
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
            }
            return session
        },
        redirect() {
            return '/dashboard'
        }
    }
}