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

const getExperienceLookupPipeline = (match: any = {}) => [
    { $match: match },
    {
        $addFields: {
            categoryObjectId: {
                $cond: {
                    if: { $regexMatch: { input: { $ifNull: ["$category", ""] }, regex: /^[0-9a-fA-F]{24}$/ } },
                    then: { $toObjectId: "$category" },
                    else: null
                }
            },
            destinationObjectIds: {
                $map: {
                    input: { $ifNull: ["$destinations", []] },
                    as: "dest",
                    in: {
                        $cond: {
                            if: { $regexMatch: { input: "$$dest", regex: /^[0-9a-fA-F]{24}$/ } },
                            then: { $toObjectId: "$$dest" },
                            else: null
                        }
                    }
                }
            }
        }
    },
    {
        $lookup: {
            from: "experience-types",
            localField: "categoryObjectId",
            foreignField: "_id",
            as: "categoryDoc"
        }
    },
    {
        $lookup: {
            from: "destinations",
            localField: "destinationObjectIds",
            foreignField: "_id",
            as: "destinationDocs"
        }
    },
    {
        $addFields: {
            category: {
                $cond: {
                    if: { $gt: [{ $size: "$categoryDoc" }, 0] },
                    then: { $arrayElemAt: ["$categoryDoc.title", 0] },
                    else: "$category"
                }
            },
            categoryId: {
                $cond: {
                    if: { $gt: [{ $size: "$categoryDoc" }, 0] },
                    then: { $toString: { $arrayElemAt: ["$categoryDoc._id", 0] } },
                    else: "$category"
                }
            },
            // Keep destinations as slugs/names for website but providing IDs too
            resolvedDestinations: {
                $cond: {
                    if: { $gt: [{ $size: "$destinationDocs" }, 0] },
                    then: "$destinationDocs.slug",
                    else: "$destinations"
                }
            },
            destinationIds: {
                $cond: {
                    if: { $gt: [{ $size: "$destinationDocs" }, 0] },
                    then: { $map: { input: "$destinationDocs", as: "d", in: { $toString: "$$d._id" } } },
                    else: "$destinations"
                }
            }
        }
    },
    {
        $project: {
            categoryDoc: 0,
            destinationDocs: 0,
            categoryObjectId: 0,
            destinationObjectIds: 0
        }
    }
];

export async function listExperiences(page: number = 1, pageSize: number = 10) {
    const client = await clientPromise;
    const collection = client.db(DB).collection<Experience>(COLLECTION);

    const totalItems = await collection.countDocuments();
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (page - 1) * pageSize;

    const pipeline = [
        ...getExperienceLookupPipeline(),
        { $sort: { createdAt: -1 } as const },
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

export async function getExperienceBySlug(slug: string) {
    const client = await clientPromise;
    const collection = client.db(DB).collection<Experience>(COLLECTION);
    const items = await collection.aggregate(getExperienceLookupPipeline({ slug })).toArray();
    return formatDoc(items[0]);
}

export async function getExperienceById(id: string) {
    const client = await clientPromise;
    const collection = client.db(DB).collection<Experience>(COLLECTION);
    const items = await collection.aggregate(getExperienceLookupPipeline({ _id: new ObjectId(id) })).toArray();
    return formatDoc(items[0]);
}

export async function getAllExperiences() {
    const client = await clientPromise;
    const collection = client.db(DB).collection<Experience>(COLLECTION);
    const pipeline = [
        ...getExperienceLookupPipeline(),
        { $sort: { title: 1 } as const }
    ];
    const items = await collection.aggregate(pipeline).toArray();
    return items.map(formatDoc);
}

export async function createExperience(data: Partial<Experience>) {
    const client = await clientPromise;
    const { _id, ...rest } = data;
    const doc = {
        ...rest,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    try {
        const res = await client.db(DB).collection(COLLECTION).insertOne(doc as any);
        return res.insertedId;
    } catch (error) {
        return null;
    }
}

export async function updateExperience(id: string, data: Partial<Experience>) {
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

export async function deleteExperience(id: string) {
    const client = await clientPromise;
    return client.db(DB).collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

export async function getCategoriesForDropdown() {
    const client = await clientPromise;
    const categories = await client.db(DB).collection(COLLECTION).distinct("category");
    return categories.map(cat => ({ title: cat, value: cat }));
}

export async function getExperiencesByDestination(slug: string) {
    const client = await clientPromise;
    const items = await client.db(DB).collection<Experience>(COLLECTION).find({ destinationSlug: slug }).toArray();
    return items.map(formatDoc);
}
