import { getTourBySlug, updateTourAction } from "../../actions";
import { notFound } from "next/navigation";
import { TourForm } from "../../components/tour-form";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function EditTourPage({ params }: PageProps) {
    const { slug } = await params;
    const tour = await getTourBySlug(slug);

    if (!tour) {
        notFound();
    }

    return (
        <TourForm
            initialData={tour}
            title={`Edit Tour: ${tour.title}`}
            action={(formData) => updateTourAction(tour._id!, null, formData)}
        />
    );
}
