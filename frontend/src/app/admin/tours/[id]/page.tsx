"use client";

import * as React from "react";
import { use } from "react";
import { Loader2 } from "lucide-react";
import { TourForm } from "../components/tour-form";
import { getTourById, updateTourAction } from "../actions";
import { notFound } from "next/navigation";

interface EditTourPageProps {
    params: Promise<{ id: string }>;
}

export default function EditTourPage({ params }: EditTourPageProps) {
    const { id } = use(params);
    const [tour, setTour] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTourById(id);
                if (data) {
                    setTour(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Failed to fetch tour", err);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (error || !tour) {
        notFound();
    }

    return (
        <TourForm
            initialData={tour}
            title="Edit Tour"
            action={(formData) => updateTourAction(id, null, formData)}
        />
    );
}
