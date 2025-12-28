import { ObjectId } from "mongodb";
import clientPromise from "../mongodb";
import { RequestStatus, TourRequest } from "@/app/admin/tour-requests/types";

const DB = process.env.MONGODB_DB || "bhutan_tourism";
const COLLECTION = "tour_requests";

function formatDoc(doc: any): TourRequest {
    if (!doc) return doc;
    return {
        ...doc,
        _id: doc._id.toString(),
    };
}

export const tourRequestDb = {
    async getAllTourRequests(page = 1, limit = 10, status?: RequestStatus) {
        const client = await clientPromise;
        const db = client.db(DB);
        const skip = (page - 1) * limit;

        const query: any = {};
        if (status) {
            query.status = status;
        }

        const [items, total] = await Promise.all([
            db
                .collection(COLLECTION)
                .find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .toArray(),
            db.collection(COLLECTION).countDocuments(query),
        ]);

        return {
            items: items.map(formatDoc),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    },

    async getTourRequestById(id: string) {
        const client = await clientPromise;
        const db = client.db(DB);
        const doc = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
        return doc ? formatDoc(doc) : null;
    },

    async createTourRequest(data: Omit<TourRequest, "_id" | "createdAt" | "updatedAt" | "status">) {
        const client = await clientPromise;
        const db = client.db(DB);
        const now = new Date().toISOString();

        const doc = {
            ...data,
            status: RequestStatus.PENDING,
            createdAt: now,
            updatedAt: now,
        };

        const result = await db.collection(COLLECTION).insertOne(doc);
        return { ...doc, _id: result.insertedId.toString() };
    },

    async updateTourRequestStatus(id: string, status: RequestStatus) {
        const client = await clientPromise;
        const db = client.db(DB);
        const result = await db.collection(COLLECTION).updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    status,
                    updatedAt: new Date().toISOString()
                }
            }
        );
        return result.modifiedCount > 0;
    },

    async deleteTourRequest(id: string) {
        const client = await clientPromise;
        const db = client.db(DB);
        const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    }
};
