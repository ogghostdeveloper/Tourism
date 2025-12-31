import { notFound } from "next/navigation";
import { getExperienceTypeBySlug, updateExperienceType } from "../../actions";
import { ExperienceTypeForm } from "../../components/experience-type-form";

interface EditExperienceTypePageProps {
    params: Promise<{ slug: string }>;
}

export default async function EditExperienceTypePage({
    params,
}: EditExperienceTypePageProps) {
    const { slug } = await params;
    const experienceType = await getExperienceTypeBySlug(slug);

    if (!experienceType) {
        notFound();
    }

    // Bind the slug to the update action
    const updateActionWithSlug = updateExperienceType.bind(null, slug);

    return (
        <ExperienceTypeForm
            title={`Edit ${experienceType.title}`}
            initialData={experienceType}
            action={updateActionWithSlug}
        />
    );
}
