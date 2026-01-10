import clientPromise from "../mongodb";
import { ObjectId } from "mongodb";
import { Destination } from "@/app/admin/destinations/schema";

const DB = process.env.MONGODB_DB || "bhutan_tourism";
const COLLECTION = "destinations";

const formatDoc = (doc: any) => {
    if (!doc) return null;
    return {
        ...doc,
        _id: doc._id.toString(),
    };
};

export async function listDestinations(page: number = 1, pageSize: number = 10, search?: string, region?: string) {
    const client = await clientPromise;
    const collection = client.db(DB).collection<Destination>(COLLECTION);

    const query: any = {};
    if (search) {
        query.name = { $regex: search, $options: "i" };
    }
    if (region) {
        query.region = { $in: region.split(",") };
    }

    const totalItems = await collection.countDocuments(query);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (page - 1) * pageSize;

    const items = await collection
        .find(query)
        .sort({ priority: 1, name: 1 })
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

export async function getAllDestinations() {
    const client = await clientPromise;
    const items = await client.db(DB).collection<Destination>(COLLECTION)
        .find({})
        .sort({ priority: 1, name: 1 })
        .toArray();
    return items.map(formatDoc);
}

export async function getDestinationBySlug(slug: string) {
    const client = await clientPromise;
    const doc = await client.db(DB).collection<Destination>(COLLECTION).findOne({ slug });
    return formatDoc(doc);
}

export async function getDestinationById(id: string) {
    try {
        const client = await clientPromise;
        const doc = await client.db(DB).collection<Destination>(COLLECTION).findOne({ _id: new ObjectId(id) } as any);
        return formatDoc(doc);
    } catch (error) {
        return null;
    }
}

export async function createDestination(data: Partial<Destination>) {
    const client = await clientPromise;
    const doc = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const res = await client.db(DB).collection(COLLECTION).insertOne(doc as any);
    return res.insertedId;
}

export async function updateDestination(id: string, data: Partial<Destination>) {
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

export async function deleteDestination(id: string) {
    const client = await clientPromise;
    return client.db(DB).collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}
export async function getRegionsForDropdown() {
    const client = await clientPromise;
    const regions = await client.db(DB).collection(COLLECTION).distinct("region");
    return regions.map(region => ({ title: region, value: region }));
}
