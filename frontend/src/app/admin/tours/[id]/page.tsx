import { TourForm } from "../components/TourForm";
import { Button } from "@/components/ui/button";
import { AnimatedArrowLeft } from "@/components/ui/animated-arrow-left";
import Link from "next/link";
import { getTourById } from "../actions";
import { notFound } from "next/navigation";

interface EditTourPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditTourPage({ params }: EditTourPageProps) {
    const { id } = await params;
    const tour = await getTourById(id);

    if (!tour) {
        notFound();
    }

    return (
        <div className="flex-1 max-w-5xl mx-auto space-y-6 p-8 pt-6">
            <div className="flex flex-col gap-2">
                <Link href="/admin/tours">
                    <Button variant="outline" className="text-black group">
                        <AnimatedArrowLeft className="mr-2 h-4 w-4" />
                        Back to Tours
                    </Button>
                </Link>
                <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 serif italic">
                    Edit Expedition
                </h2>
                <p className="text-neutral-500 text-sm">
                    Modify the details or itinerary of <strong>{tour.title}</strong>.
                </p>
            </div>

            <div className="bg-neutral-50/30 rounded-xl p-1">
                <TourForm initialData={tour} />
            </div>
        </div>
    );
}
