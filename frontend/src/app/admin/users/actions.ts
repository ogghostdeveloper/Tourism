
"use server";

import { revalidatePath } from "next/cache";
import { createUser, updateUser, deleteUser, getUserByEmail } from "@/lib/data/users";
import { userSchema } from "./schema";
import bcrypt from "bcryptjs";

export async function createUserAction(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    const validatedFields = userSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Validation failed: " + validatedFields.error.issues.map(e => e.message).join(", "),
        };
    }

    const { username, email, role, password } = validatedFields.data;

    // Check if user exists
    const existing = await getUserByEmail(email);
    if (existing) {
        return { success: false, message: "A user with this email already exists." };
    }

    if (!password || password.length === 0) {
        return { success: false, message: "Password is required for new users." };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    try {
        await createUser({
            username,
            email,
            role,
            passwordHash,
        });

        revalidatePath("/admin/users");
        return { success: true, message: "User created successfully" };
    } catch (error) {
        return { success: false, message: "Failed to create user" };
    }
}

export async function updateUserAction(id: string, prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    const validatedFields = userSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Validation failed: " + validatedFields.error.issues.map(e => e.message).join(", "),
        };
    }

    const { username, email, role, password } = validatedFields.data;

    const updateData: any = {
        username,
        email,
        role,
    };

    // Only update password if provided
    if (password && password.length > 0) {
        updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    try {
        await updateUser(id, updateData);
        revalidatePath("/admin/users");
        return { success: true, message: "User updated successfully" };
    } catch (error) {
        return { success: false, message: "Failed to update user" };
    }
}

export async function deleteUserAction(id: string) {
    try {
        await deleteUser(id);
        revalidatePath("/admin/users");
        return { success: true, message: "User deleted successfully" };
    } catch (error) {
        return { success: false, message: "Failed to delete user" };
    }
}
