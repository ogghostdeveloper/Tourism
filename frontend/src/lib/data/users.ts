import clientPromise from "../mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

const DB = process.env.MONGODB_DB || "bhutan_tourism";
const COLLECTION = "users";

const formatDoc = (doc: any) => {
    if (!doc) return null;
    return {
        ...doc,
        _id: doc._id.toString(),
    };
};

export const userSchema = z.object({
    email: z.string(),
    username: z.string(),
    role: z.enum(["admin", "guest"]),
    passwordHash: z.string().optional(),
    createdAt: z.date().optional(),
});
export type User = z.infer<typeof userSchema> & { _id: string };

export const getUserById = async (id: string): Promise<User | null> => {
    const client = await clientPromise;
    const db = client.db(DB);
    const collection = db.collection(COLLECTION);

    const doc = await collection.findOne({ _id: new ObjectId(id) });
    return formatDoc(doc);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const client = await clientPromise;
    const db = client.db(DB);
    const collection = db.collection(COLLECTION);

    const doc = await collection.findOne({ email });
    return formatDoc(doc);
};

export const createUser = async (userData: Omit<User, "_id" | "createdAt">): Promise<User> => {
    const client = await clientPromise;
    const db = client.db(DB);
    const collection = db.collection(COLLECTION);

    const newUser = {
        ...userData,
        createdAt: new Date(),
    };

    const result = await collection.insertOne(newUser);
    return formatDoc({ _id: result.insertedId, ...newUser }) as User;
};

export const updateUser = async (id: string, updateData: Partial<Omit<User, "_id" | "createdAt">>): Promise<User | null> => {
    const client = await clientPromise;
    const db = client.db(DB);
    const collection = db.collection(COLLECTION);

    const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: "after" }
    );

    return formatDoc(result?.value || null);
};

export const deleteUser = async (id: string): Promise<boolean> => {
    const client = await clientPromise;
    const db = client.db(DB);
    const collection = db.collection(COLLECTION);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
};

export const listUsers = async (): Promise<User[]> => {
    const client = await clientPromise;
    const db = client.db(DB);
    const collection = db.collection(COLLECTION);

    const docs = await collection.find({}).toArray();
    return docs.map(formatDoc) as User[];
};