"use client";

import { TourForm } from "../components/tour-form";
import { createTourAction } from "../actions";

export default function NewTourPage() {
    return (
        <TourForm
            title="Create New Tour"
            action={(formData) => createTourAction(null, formData)}
        />
    );
}
