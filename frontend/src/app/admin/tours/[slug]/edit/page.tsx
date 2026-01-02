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

    const updateTourWithId = updateTourAction.bind(null, String(tour._id), null);

    return (
        <TourForm
            initialData={tour}
            title={`Edit Tour: ${tour.title}`}
            action={updateTourWithId}
        />
    );
}
