import { getExperiences } from "./actions";
import { ExperiencesClient } from "./components/ExperiencesClient";
import { ExperiencesHeader } from "./components/ExperiencesHeader";

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Cinematic Header Section */}
      <ExperiencesHeader />

      <ExperiencesClient initialExperiences={experiences} />
    </div>
  );
}
