import { Hero } from "@/components/home/Hero";
import { CompanyIntro } from "./components/CompanyIntro";
import { ExperienceTypes } from "@/components/home/ExperienceTypes";
import { Destinations } from "@/components/home/Destinations";
import { Experiences } from "@/components/home/Experiences";
import { BestHotels } from "./components/BestHotels";
import { FeaturedItinerary } from "@/components/home/FeaturedItinerary";
import CallToAction from "@/components/shared/CallToAction";
import { getFeaturedTour } from "./tours/actions";
import { getBestHotels } from "./actions";

export default async function Home() {
  const featuredTour = await getFeaturedTour();
  const bestHotels = await getBestHotels(6);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CompanyIntro />
      <FeaturedItinerary itinerary={featuredTour} />
      <ExperienceTypes />
      <Destinations />
      <Experiences />
      <BestHotels hotels={bestHotels} />
      <CallToAction />
    </div>
  );
}
