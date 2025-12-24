import {
  getAboutContent,
  getHeroData,
  getOurStoryData,
  getMissionItems,
  getOurPurposeData,
  getSustainabilityItems,
  getWhyBhutanItems,
} from "./actions";
import { AboutHero } from "./components/AboutHero";
import { OurStory } from "./components/OurStory";
import { OurMission } from "./components/OurMission";
import { OurPurpose } from "./components/OurPurpose";
import { SustainableTravel } from "./components/SustainableTravel";
import { WhyBhutan } from "./components/WhyBhutan";
import CallToAction from "@/components/shared/CallToAction";

export default async function AboutPage() {
  // Fetch the main about content that matches admin structure
  const aboutContent = await getAboutContent();

  // Transform simple data to component props format
  const heroProps = {
    title: aboutContent.hero.title.toUpperCase(),
    subtitle: aboutContent.hero.subtitle,
    description: aboutContent.hero.content,
    backgroundImage: aboutContent.hero.image,
  };

  const storyProps = {
    id: "our-story",
    title: aboutContent.story.title,
    subtitle: "Our Story",
    content: aboutContent.story.content.split("\n\n").filter((p: string) => p.trim()),
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=2940&auto=format&fit=crop",
    order: 1,
  };

  const missionProps = [
    {
      id: "mission-1",
      title: aboutContent.mission.title,
      description: aboutContent.mission.content,
      order: 1,
    }
  ];

  const purposeProps = {
    id: "our-purpose",
    title: aboutContent.purpose.title,
    subtitle: "Our Purpose",
    content: aboutContent.purpose.content.split("\n\n").filter((p: string) => p.trim()),
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop",
    order: 2,
  };

  const sustainabilityProps = [
    {
      id: "sustainability-1",
      title: aboutContent.sustainable.title,
      description: aboutContent.sustainable.content,
      order: 1,
    }
  ];

  // Fetch additional structured data for Why Bhutan section
  const whyBhutan = await getWhyBhutanItems();

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <AboutHero hero={heroProps} />
      <div className="relative">
        <OurStory story={storyProps} />
        <OurMission items={missionProps} />
        <OurPurpose purpose={purposeProps} />
        <SustainableTravel items={sustainabilityProps} />
        <WhyBhutan items={whyBhutan} />
      </div>
      <CallToAction />
    </main>
  );
}
