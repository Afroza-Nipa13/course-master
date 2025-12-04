// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL; 

// export const authOptions = {
//   session: {
//     strategy: "jwt",
//   },

//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         const res = await fetch(`${BACKEND}/users/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: credentials.email,
//             password: credentials.password,
//           }),
//         });

//         const data = await res.json();

//         if (!res.ok) {
//           // login failed
//           return null;
//         }

//         const userRes = await fetch(
//           `${BACKEND}/user?email=${credentials.email}`
//         );

//         const userData = await userRes.json();

//         if (!userData) return null;

//         return {
//           id: userData._id,
//           name: userData.name,
//           email: userData.email,
//         };
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.user = user;
//       return token;
//     },

//     async session({ session, token }) {
//       session.user = token.user;
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// export const GET = NextAuth(authOptions);
// export const POST = NextAuth(authOptions);

// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL; 

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Call your backend login endpoint
          const res = await fetch(`${BACKEND}/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();
          
          // If login failed
          if (!res.ok || !data.success) {
            console.error("Login failed:", data.message);
            return null;
          }

          // Return user object in NextAuth format
          return {
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role
          };
          
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Add user data to token when user logs in
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      // Add token data to session
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },

    // Optional: Redirect after sign in
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login", // Error code passed in query string as ?error=
  },

  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };