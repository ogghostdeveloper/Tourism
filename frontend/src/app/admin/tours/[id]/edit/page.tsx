import { getTourById, updateTourAction } from "../../actions";
import { notFound } from "next/navigation";
import { TourForm } from "../../components/tour-form";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditTourPage({ params }: PageProps) {
    const { id } = await params;
    const tour = await getTourById(id);

    if (!tour) {
        notFound();
    }

    const updateTourWithId = updateTourAction.bind(null, id, null);

    return (
        <TourForm
            initialData={tour}
            title={`Edit Tour: ${tour.title}`}
            action={updateTourWithId}
        />
    );
}
