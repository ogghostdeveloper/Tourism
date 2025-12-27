import { Hero } from "@/components/home/Hero";
import { CompanyIntro } from "./components/CompanyIntro";
import { ExperienceTypes } from "@/components/home/ExperienceTypes";
import { Destinations } from "@/components/home/Destinations";
import { Experiences } from "@/components/home/Experiences";
import { BestHotels } from "./components/BestHotels";
import { FeaturedItinerary } from "@/components/home/FeaturedItinerary";
import CallToAction from "@/components/shared/CallToAction";
import { getFeaturedTours } from "./tours/actions";
import { getBestHotels } from "./hotels/actions";
import { getFeaturedExperiences, getExperienceTypes } from "./experiences/actions";
import { getFeaturedDestinations } from "./destinations/actions";
import { LuxuryBridge } from "./components/LuxuryBridge";

export default async function Home() {
  const featuredTours = await getFeaturedTours();
  const bestHotels = await getBestHotels(6);
  const featuredExperiences = await getFeaturedExperiences(6);
  const featuredDestinations = await getFeaturedDestinations(6);
  const experienceTypes = await getExperienceTypes();

  return (
    <div className="flex flex-col min-h-screen">
      < Hero />
      <LuxuryBridge />
      <FeaturedItinerary itineraries={featuredTours.slice(0, 5)} />
      <ExperienceTypes experienceTypes={experienceTypes} />
      <Destinations destinations={featuredDestinations} />
      <Experiences experiences={featuredExperiences} />
      <CompanyIntro />
      <BestHotels hotels={bestHotels} />
      <CallToAction />
    </div>
  );
}
