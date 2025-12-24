import clientPromise from "../mongodb";
import { ObjectId } from "mongodb";

// MongoDB setup
const DB = process.env.MONGODB_DB || "bhutan_tourism";
const COLLECTION = "hotels";

const formatDoc = (doc: any) => {
    if (!doc) return null;
    return {
        ...doc,
        id: doc._id.toString(),
        _id: doc._id.toString(),
    };
};

export async function listHotels(page: number = 1, pageSize: number = 10) {
    const client = await clientPromise;
    const collection = client.db(DB).collection(COLLECTION);

    const totalItems = await collection.countDocuments();
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (page - 1) * pageSize;

    const items = await collection
        .find({})
        .sort({ name: 1 })
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

export async function getHotelById(id: string) {
    const client = await clientPromise;
    const doc = await client.db(DB).collection(COLLECTION).findOne({ _id: new ObjectId(id) });
    return formatDoc(doc);
}

export async function createHotel(data: any) {
    const client = await clientPromise;
    const doc = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const res = await client.db(DB).collection(COLLECTION).insertOne(doc as any);
    return res.insertedId;
}

export async function updateHotel(id: string, data: any) {
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

export async function deleteHotel(id: string) {
    const client = await clientPromise;
    return client.db(DB).collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

export async function getAllHotels() {
    const client = await clientPromise;
    const items = await client.db(DB).collection(COLLECTION)
        .find({})
        .sort({ name: 1 })
        .toArray();
    return items.map(formatDoc);
}

