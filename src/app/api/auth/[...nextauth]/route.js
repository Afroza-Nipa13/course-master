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
          console.log("Attempting login with email:", credentials.email);
          
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
          console.log("Backend response:", data);
          
          // If login failed
          if (!res.ok || !data.success) {
            console.error("Login failed:", data.message);
            throw new Error(data.message || "Invalid credentials");
          }

          // Return user object in NextAuth format
          const user = {
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            image: data.user.profileImage || data.user.image,
            accessToken: data.accessToken, // Store backend token if provided
            ...data.user // Include all user data from backend
          };

          console.log("User authenticated:", { id: user.id, role: user.role });
          return user;
          
        } catch (error) {
          console.error("Authorize error:", error.message);
          throw new Error(error.message || "Login failed. Please try again.");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "student", // Default role for Google signups
        };
      }
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        
        // Store backend access token if available
        if (user.accessToken) {
          token.accessToken = user.accessToken;
        }
        
        // Store provider info
        if (account) {
          token.provider = account.provider;
          token.access_token = account.access_token;
        }
      }

      // Refresh token logic (if your backend supports it)
      // This is optional and depends on your backend implementation
      if (token.accessToken) {
        // You could add token refresh logic here
      }

      return token;
    },

    async session({ session, token }) {
      // Add token data to session
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.accessToken = token.accessToken; // For API calls to your backend
        session.provider = token.provider;
      }
      
      return session;
    },

    async signIn({ user, account, profile, email, credentials }) {
      // Additional checks before allowing sign in
      if (account.provider === "google") {
        // You might want to check if this Google user exists in your database
        // or create a new user record
        try {
          // Example: Check if user exists in your backend
          const res = await fetch(`${BACKEND}/users/check-google-user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              googleId: user.id,
              email: user.email,
              name: user.name,
              profileImage: user.image,
            }),
          });
          
          const data = await res.json();
          if (data.user) {
            user.role = data.user.role; // Update role from backend
            user.id = data.user._id; // Use your database ID
          }
        } catch (error) {
          console.log("Google sign-in check failed:", error);
          // Continue anyway - user will have default "student" role
        }
      }
      
      return true; // Allow sign in
    },

    async redirect({ url, baseUrl }) {
      // Handle redirects after sign in
      if (url.startsWith(baseUrl)) {
        return url;
      }
      
      // Default redirect to dashboard
      return `${baseUrl}/dashboard`;
    }
  },

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login", // Error code passed in query string as ?error=
    newUser: "/register", // Redirect new users to registration page
  },

  // Events for logging
  events: {
    async signIn({ user, account, isNewUser }) {
      console.log("User signed in:", { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        provider: account?.provider,
        isNewUser 
      });
    },
    async signOut({ token, session }) {
      console.log("User signed out:", { userId: token?.id });
    },
    async createUser({ user }) {
      console.log("New user created:", { userId: user.id, email: user.email });
    },
  },

  // Debug mode
  debug: process.env.NODE_ENV === "development",
  
  // Use secure cookies in production
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };