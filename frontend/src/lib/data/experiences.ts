import clientPromise from "../mongodb";
import { ObjectId } from "mongodb";
import { Experience } from "@/app/admin/experiences/schema";

const DB = process.env.MONGODB_DB || "bhutan_tourism";
const COLLECTION = "experiences";

const formatDoc = (doc: any) => {
    if (!doc) return null;
    return {
        ...doc,
        _id: doc._id.toString(),
    };
};

export async function listExperiences(page: number = 1, pageSize: number = 10) {
    const client = await clientPromise;
    const collection = client.db(DB).collection<Experience>(COLLECTION);

    const totalItems = await collection.countDocuments();
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (page - 1) * pageSize;

    const items = await collection
        .find({})
        .sort({ createdAt: -1 })
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

export async function getExperienceBySlug(slug: string) {
    const client = await clientPromise;
    const doc = await client.db(DB).collection<Experience>(COLLECTION).findOne({ slug });
    return formatDoc(doc);
}

export async function getExperienceById(id: string) {
    const client = await clientPromise;
    const doc = await client.db(DB).collection<Experience>(COLLECTION).findOne({ _id: new ObjectId(id) as any });
    return formatDoc(doc);
}

export async function getAllExperiences() {
    const client = await clientPromise;
    const items = await client.db(DB).collection<Experience>(COLLECTION)
        .find({})
        .sort({ title: 1 })
        .toArray();
    return items.map(formatDoc);
}

export async function createExperience(data: Partial<Experience>) {
    console.log("DB Layer: createExperience called");
    const client = await clientPromise;
    const { _id, ...rest } = data;
    const doc = {
        ...rest,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    try {
        const res = await client.db(DB).collection(COLLECTION).insertOne(doc as any);
        console.log("DB Layer: insertOne success, ID:", res.insertedId);
        return res.insertedId;
    } catch (error) {
        console.error("DB Layer: insertOne failed:", error);
        throw error;
    }
}

export async function updateExperience(slug: string, data: Partial<Experience>) {
    const client = await clientPromise;
    return client.db(DB).collection(COLLECTION).updateOne(
        { slug },
        {
            $set: {
                ...data,
                updatedAt: new Date().toISOString()
            }
        }
    );
}

export async function deleteExperience(slug: string) {
    const client = await clientPromise;
    return client.db(DB).collection(COLLECTION).deleteOne({ slug });
}

export async function getCategoriesForDropdown() {
    const client = await clientPromise;
    const categories = await client.db(DB).collection(COLLECTION).distinct("category");
    return categories.map(cat => ({ title: cat, value: cat }));
}
