//@ts-nocheck
import NextAuth, {
  DefaultSession,
  Account as NextAuthAccount,
} from "next-auth";
import type { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT as NextAuthJWT } from "next-auth/jwt";
import axios from "axios";

const spotifyScopes =
  "user-read-email user-read-private playlist-read-private user-library-read user-top-read";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    error?: string;
  }
  interface Account extends NextAuthAccount {
    expires_at: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
    user?: Session["user"];
  }
}

const CLIENT_ID = process.env.SPOTIFY_ID;
const CLIENT_SECRET = process.env.SPOTIFY_SECRET;

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64"
    );
    const { data } = await axios.post(
      SPOTIFY_REFRESH_TOKEN_URL,
      {
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      },
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: CLIENT_ID!,
      clientSecret: CLIENT_SECRET!,
      authorization: `https://accounts.spotify.com/authorize?scope=${spotifyScopes}`,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
          user,
        };
      }
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }
      const newToken = await refreshAccessToken(token);
      return newToken;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
