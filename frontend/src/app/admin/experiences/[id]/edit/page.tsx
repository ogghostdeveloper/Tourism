"use client";

import * as React from "react";
import { use } from "react";
import { Loader2 } from "lucide-react";
import { getExperienceById, updateExperience } from "../../actions";
import { ExperienceForm } from "../../components/experience-form";

export default function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [experience, setExperience] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExperienceById(id);
        setExperience(data);
      } catch (error) {
        console.error("Failed to fetch experience", error);
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

  return (
    <ExperienceForm
      title="Edit Experience"
      initialData={experience}
      action={(formData) => updateExperience(id, null, formData)}
    />
  );
}
