import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import { getUserByEmail } from "./lib/data/users";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

// Custom error classes for better error handling
class UserNotFoundError extends CredentialsSignin {
    code = "user_not_found";
}

class InvalidPasswordError extends CredentialsSignin {
    code = "invalid_password";
}

class AccountSetupIncompleteError extends CredentialsSignin {
    code = "account_setup_incomplete";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.password) {
                    console.error("[Auth] Missing password");
                    return null;
                }

                // Accept either email or username
                const identifier = credentials.email || credentials.username;
                if (!identifier) {
                    console.error("[Auth] Missing email or username");
                    return null;
                }

                try {
                    console.log(`[Auth] Attempting login with: ${identifier}`);
                    const user = await getUserByEmail(identifier as string);

                    if (!user) {
                        console.error(`[Auth] User not found: ${identifier}`);
                        throw new UserNotFoundError();
                    }

                    if (!user.passwordHash) {
                        console.error(`[Auth] User has no password hash: ${identifier}`);
                        throw new AccountSetupIncompleteError();
                    }

                    const passwordMatch = await bcrypt.compare(
                        credentials.password as string,
                        user.passwordHash
                    );

                    if (!passwordMatch) {
                        console.error(`[Auth] Password mismatch for: ${identifier}`);
                        throw new InvalidPasswordError();
                    }

                    console.log(`[Auth] Login successful for: ${identifier}`);
                    return {
                        id: user._id.toString(),
                        name: user.username,
                        email: user.email,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("[Auth] Error during authorization:", error);
                    // Re-throw CredentialsSignin errors so NextAuth can handle them properly
                    if (error instanceof CredentialsSignin) {
                        throw error;
                    }
                    // For any other errors, throw a generic error
                    throw new Error("AuthorizationError");
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");
            const isAdmin = (auth?.user as any)?.role === "admin";

            if (isOnAdmin) {
                if (isLoggedIn && isAdmin) return true;
                return false; // Redirect unauthenticated or non-admin users to login
            }
            return true;
        },
    },
});
