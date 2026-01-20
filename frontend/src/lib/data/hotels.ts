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

const getHotelLookupPipeline = (match: any = {}) => [
    { $match: match },
    {
        $addFields: {
            destinationObjectId: {
                $cond: {
                    if: { $regexMatch: { input: { $ifNull: ["$destinationId", { $ifNull: ["$destinationSlug", ""] }] }, regex: /^[0-9a-fA-F]{24}$/ } },
                    then: { $toObjectId: { $ifNull: ["$destinationId", "$destinationSlug"] } },
                    else: null
                }
            }
        }
    },
    {
        $lookup: {
            from: "destinations",
            localField: "destinationObjectId",
            foreignField: "_id",
            as: "destinationDoc"
        }
    },
    {
        $addFields: {
            resolvedDestinationName: {
                $cond: {
                    if: { $gt: [{ $size: "$destinationDoc" }, 0] },
                    then: { $arrayElemAt: ["$destinationDoc.name", 0] },
                    else: "$destinationSlug"
                }
            },
            resolvedDestinationSlug: {
                $cond: {
                    if: { $gt: [{ $size: "$destinationDoc" }, 0] },
                    then: { $arrayElemAt: ["$destinationDoc.slug", 0] },
                    else: "$destinationSlug"
                }
            },
            destinationId: {
                $cond: {
                    if: { $gt: [{ $size: "$destinationDoc" }, 0] },
                    then: { $toString: { $arrayElemAt: ["$destinationDoc._id", 0] } },
                    else: "$destinationId"
                }
            }
        }
    },
    {
        $project: {
            destinationDoc: 0,
            destinationObjectId: 0
        }
    }
];

export async function listHotels(page: number = 1, pageSize: number = 10, search?: string) {
    const client = await clientPromise;
    const collection = client.db(DB).collection(COLLECTION);

    const match: any = {};
    if (search) {
        match.name = { $regex: search, $options: "i" };
    }

    const totalItems = await collection.countDocuments(match);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (page - 1) * pageSize;

    const pipeline = [
        ...getHotelLookupPipeline(match),
        { $sort: { priority: -1, name: 1 } as const },
        { $skip: skip },
        { $limit: pageSize }
    ];

    const items = await collection.aggregate(pipeline).toArray();

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
    try {
        const client = await clientPromise;
        const collection = client.db(DB).collection(COLLECTION);
        const items = await collection.aggregate(getHotelLookupPipeline({ _id: new ObjectId(id) })).toArray();
        return formatDoc(items[0]);
    } catch (e) {
        return null;
    }
}

export async function getHotelBySlug(slug: string) {
    const client = await clientPromise;
    const collection = client.db(DB).collection(COLLECTION);
    const items = await collection.aggregate(getHotelLookupPipeline({ slug })).toArray();
    return formatDoc(items[0]);
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

export async function deleteHotel(id: string) {
    const client = await clientPromise;
    return client.db(DB).collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

export async function getAllHotels() {
    const client = await clientPromise;
    const collection = client.db(DB).collection(COLLECTION);
    const items = await collection.aggregate(getHotelLookupPipeline()).toArray();
    return items.map(formatDoc);
}

export async function getHotelsByDestination(slug: string) {
    const client = await clientPromise;
    const collection = client.db(DB).collection(COLLECTION);
    const items = await collection.aggregate(getHotelLookupPipeline({ destinationSlug: slug })).toArray();
    return items.map(formatDoc);
}

