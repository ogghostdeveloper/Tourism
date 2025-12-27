export enum RequestStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    ARCHIVED = "archived",
}

export interface TourRequest {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    destination?: string;
    travelDate: string;
    travelers: string;
    message: string;
    tourId?: string; // Optional: If they selected a specific package
    tourName?: string; // Optional: Denormalized name for easier display
    status: RequestStatus;
    createdAt: string;
    updatedAt: string;
}
