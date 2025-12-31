import { notFound } from "next/navigation";
import { getExperienceTypeBySlug } from "../actions";
import { ExperienceTypeForm } from "../components/experience-type-form";

interface ExperienceTypeViewPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ExperienceTypeViewPage({
    params,
}: ExperienceTypeViewPageProps) {
    const { slug } = await params;
    const experienceType = await getExperienceTypeBySlug(slug);

    if (!experienceType) {
        notFound();
    }

    return (
        <ExperienceTypeForm
            title={`${experienceType.title}`}
            initialData={experienceType}
            isReadOnly={true}
        />
    );
}
