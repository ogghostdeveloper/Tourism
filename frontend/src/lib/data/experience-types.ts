import clientPromise from "../mongodb";
import { ObjectId } from "mongodb";
import { ExperienceType } from "@/app/admin/experience-types/schema";

const DB = process.env.MONGODB_DB || "bhutan_tourism";
const COLLECTION = "experience_types";

const formatDoc = (doc: any) => {
    if (!doc) return null;
    return {
        ...doc,
        id: doc._id.toString(),
        _id: doc._id.toString(),
    };
};

export async function listExperienceTypes(page: number = 1, pageSize: number = 10) {
    const client = await clientPromise;
    const collection = client.db(DB).collection<ExperienceType>(COLLECTION);

    const totalItems = await collection.countDocuments();
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (page - 1) * pageSize;

    const items = await collection
        .find({})
        .sort({ displayOrder: 1, createdAt: -1 })
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
    };
}

export async function getExperienceTypeBySlug(slug: string) {
    const client = await clientPromise;
    const doc = await client.db(DB).collection<ExperienceType>(COLLECTION).findOne({ slug });
    return formatDoc(doc);
}

export async function getExperienceTypeById(id: string) {
    try {
        console.log('[getExperienceTypeById] Fetching with ID:', id);
        const client = await clientPromise;
        const doc = await client.db(DB).collection<ExperienceType>(COLLECTION).findOne({ _id: new ObjectId(id) } as any);
        console.log('[getExperienceTypeById] Found document:', doc ? 'YES' : 'NO');
        return formatDoc(doc);
    } catch (error) {
        console.error('[getExperienceTypeById] Error:', error, 'ID:', id);
        return null;
    }
}

export async function getAllExperienceTypes() {
    const client = await clientPromise;
    const items = await client.db(DB).collection<ExperienceType>(COLLECTION)
        .find({})
        .sort({ displayOrder: 1, title: 1 })
        .toArray();
    return items.map(formatDoc);
}

export async function createExperienceType(data: Partial<ExperienceType>) {
    const client = await clientPromise;
    const { _id, ...rest } = data;
    const doc = {
        ...rest,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const res = await client.db(DB).collection(COLLECTION).insertOne(doc as any);
    return res.insertedId;
}

export async function updateExperienceType(id: string, data: Partial<ExperienceType>) {
    const client = await clientPromise;
    return client.db(DB).collection(COLLECTION).updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                ...data,
                updatedAt: new Date().toISOString()
            }
        }
    );
}

export async function deleteExperienceType(id: string) {
    const client = await clientPromise;
    return client.db(DB).collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}
