"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "admin_session";

export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    // Mock authentication
    console.log("Login attempt:", email, password);
    if (email === "admin@blacktomato.com" && password === "bhutan2025") {
        console.log("Credentials valid, setting cookie...");
        (await cookies()).set(COOKIE_NAME, "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });
        console.log("Cookie set, returning success...");
        return { success: true };
    }

    console.log("Invalid credentials");
    return { error: "Invalid credentials" };
}

export async function logout() {
    (await cookies()).delete(COOKIE_NAME);
    redirect("/admin/login");
}

export async function isAuthenticated() {
    const hasCookie = (await cookies()).has(COOKIE_NAME);
    console.log("Checking auth:", hasCookie);
    return hasCookie;
}
