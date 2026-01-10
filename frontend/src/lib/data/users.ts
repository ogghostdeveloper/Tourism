
import clientPromise from "../mongodb";
import { ObjectId } from "mongodb";

// MongoDB setup
const DB = process.env.MONGODB_DB || "bhutan_tourism";
const COLLECTION = "users";

const formatDoc = (doc: any) => {
    if (!doc) return null;
    const { passwordHash, ...safeDoc } = doc; // Never return password hash to client
    return {
        ...safeDoc,
        id: doc._id.toString(),
        _id: doc._id.toString(),
    };
};

export async function listUsers(page: number = 1, pageSize: number = 10, search?: string) {
    const client = await clientPromise;
    const collection = client.db(DB).collection(COLLECTION);

    const match: any = {};
    if (search) {
        match.$or = [
            { username: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }

    const totalItems = await collection.countDocuments(match);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (page - 1) * pageSize;

    const items = await collection
        .find(match)
        .sort({ username: 1 })
        .skip(skip)
        .limit(pageSize)
        .toArray();

    return {
        items: items.map(formatDoc),
        page,
        page_size: pageSize,
        total_pages: totalPages,
        has_next: page < totalPages,
        has_prev: page > 1,
        total_items: totalItems
    };
}

export async function getUserById(id: string) {
    try {
        const client = await clientPromise;
        const collection = client.db(DB).collection(COLLECTION);
        const doc = await collection.findOne({ _id: new ObjectId(id) });
        return formatDoc(doc);
    } catch (e) {
        return null;
    }
}

export async function getUserByEmail(email: string) {
    const client = await clientPromise;
    const collection = client.db(DB).collection(COLLECTION);
    const doc = await collection.findOne({ email });
    return doc; // Return full doc for auth checks (including passwordHash)
}

export async function createUser(data: any) {
    const client = await clientPromise;
    const doc = {
        ...data,
        role: data.role || "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const res = await client.db(DB).collection(COLLECTION).insertOne(doc as any);
    return res.insertedId;
}

export async function updateUser(id: string, data: any) {
    const client = await clientPromise;
    const { id: _, _id: __, ...updateData } = data;

    // Only update fields provided
    const setQuery: any = {
        ...updateData,
        updatedAt: new Date().toISOString()
    };

    return client.db(DB).collection(COLLECTION).updateOne(
        { _id: new ObjectId(id) },
        { $set: setQuery }
    );
}

export async function deleteUser(id: string) {
    const client = await clientPromise;
    return client.db(DB).collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}