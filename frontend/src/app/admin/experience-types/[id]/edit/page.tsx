import { notFound } from "next/navigation";
import { getExperienceTypeBySlug, updateExperienceType } from "../../actions";
import { ExperienceTypeForm } from "../../components/experience-type-form";

interface EditExperienceTypePageProps {
    params: Promise<{ id: string }>;
}

export default async function EditExperienceTypePage({
    params,
}: EditExperienceTypePageProps) {
    const { id: slug } = await params;
    const experienceType = await getExperienceTypeBySlug(slug);

    if (!experienceType) {
        notFound();
    }

    // Bind the slug to the update action
    const updateActionWithSlug = updateExperienceType.bind(null, slug);

    return (
        <div className="p-8">
            <ExperienceTypeForm
                title={`Edit ${experienceType.title}`}
                initialData={experienceType}
                action={updateActionWithSlug}
            />
        </div>
    );
}
