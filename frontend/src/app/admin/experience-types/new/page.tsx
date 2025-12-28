import { createExperienceType } from "../actions";
import { ExperienceTypeForm } from "../components/experience-type-form";

export default function NewExperienceTypePage() {
    return (
        <div className="p-8">
            <ExperienceTypeForm
                title="Add New Experience Type"
                action={createExperienceType}
            />
        </div>
    );
}
