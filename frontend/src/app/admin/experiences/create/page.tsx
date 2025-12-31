"use client";

import { createExperience } from "../actions";
import { ExperienceForm } from "../components/experience-form";

export default function CreateExperiencePage() {
  return (
    <ExperienceForm
      title="Create New Experience"
      action={(formData) => createExperience(null, formData)}
    />
  );
}
