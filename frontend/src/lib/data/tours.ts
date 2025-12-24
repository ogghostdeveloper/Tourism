import clientPromise from "../mongodb";
import { ObjectId } from "mongodb";
import { Tour } from "@/app/(website)/tours/schema";

const DB = process.env.MONGODB_DB || "bhutan_tourism";
const COLLECTION = "tours";

const formatDoc = (doc: any) => {
    if (!doc) return null;
    return {
        ...doc,
        id: doc._id.toString(),
        _id: doc._id.toString(),
    };
};

export async function listTours(page: number = 1, pageSize: number = 10) {
    const client = await clientPromise;
    const collection = client.db(DB).collection<Tour>(COLLECTION);

    const totalItems = await collection.countDocuments();
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (page - 1) * pageSize;

    const items = await collection
        .find({})
        .sort({ title: 1 })
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

export async function getTourBySlug(slug: string) {
    const client = await clientPromise;
    const doc = await client.db(DB).collection<Tour>(COLLECTION).findOne({ slug });
    return formatDoc(doc);
}

export async function getTourById(id: string) {
    const client = await clientPromise;
    const doc = await client.db(DB).collection<Tour>(COLLECTION).findOne({ _id: new ObjectId(id) });
    return formatDoc(doc);
}

export async function getAllTours() {
    const client = await clientPromise;
    const items = await client.db(DB).collection<Tour>(COLLECTION)
        .find({})
        .sort({ title: 1 })
        .toArray();
    return items.map(formatDoc);
}

export async function createTour(data: any) {
    const client = await clientPromise;
    const doc = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const res = await client.db(DB).collection(COLLECTION).insertOne(doc as any);
    return res.insertedId;
}

export async function updateTour(id: string, data: any) {
    const client = await clientPromise;
    const { id: _, _id: __, ...updateData } = data;
    return client.db(DB).collection(COLLECTION).updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                ...updateData,
                updatedAt: new Date().toISOString()
            }
        }
    );
}

export async function deleteTour(id: string) {
    const client = await clientPromise;
    return client.db(DB).collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}
