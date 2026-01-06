import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db';
import { users } from '@/schema/auth';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';

const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check for default admin credentials from environment
        const defaultEmail = process.env.DEFAULT_EMAIL;
        const defaultPassword = process.env.DEFAULT_PASSWORD;

        if (credentials.email === defaultEmail && credentials.password === defaultPassword) {
          return {
            id: '1',
            email: defaultEmail,
            name: 'ChalkBoard Admin',
            role: 'admin',
          };
        }

        // Check database for user
        const user = await db.select()
          .from(users)
          .where(eq(users.email, credentials.email as string))
          .limit(1);

        if (user.length === 0) {
          return null;
        }

        const dbUser = user[0];
        if (!dbUser.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          dbUser.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: dbUser.id.toString(),
          email: dbUser.email,
          name: dbUser.name || 'ChalkBoard User',
          role: dbUser.role || 'staff',
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/id/auth/signin',
  },
};

export default NextAuth(authOptions);

// Helper function for server-side authentication
export const auth = () => getServerSession(authOptions);

declare module 'next-auth' {
  interface User {
    role?: string;
  }
  
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      role?: string;
    };
  }
} 