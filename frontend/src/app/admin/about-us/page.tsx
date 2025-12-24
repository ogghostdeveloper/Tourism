"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Save, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AboutHero } from "@/app/(website)/about-us/components/AboutHero";
import { OurStory } from "@/app/(website)/about-us/components/OurStory";
import { OurMission } from "@/app/(website)/about-us/components/OurMission";
import { OurPurpose } from "@/app/(website)/about-us/components/OurPurpose";
import { SustainableTravel } from "@/app/(website)/about-us/components/SustainableTravel";
import { WhyBhutan } from "@/app/(website)/about-us/components/WhyBhutan";
import { getAboutContent, updateAboutContent } from "./actions";

export default function AboutUsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    hero: {
      title: "",
      subtitle: "",
      content: "",
      image: "",
    },
    story: {
      title: "",
      content: "",
    },
    mission: {
      title: "",
      content: "",
    },
    purpose: {
      title: "",
      content: "",
    },
    sustainable: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await getAboutContent();
        setFormData(data);
      } catch (error) {
        toast.error("Failed to load content");
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updateAboutContent(formData);
      if (result.success) {
        toast.success(result.message);
        setIsEditMode(false);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // View Mode - Show the actual About Us page
  if (!isEditMode) {
    // Transform simple data to component props format
    const heroData = {
      title: formData.hero.title.toUpperCase(),
      subtitle: formData.hero.subtitle,
      description: formData.hero.content,
      backgroundImage: formData.hero.image,
    };

    const storyData = {
      id: "our-story",
      title: formData.story.title,
      subtitle: "Our Story",
      content: formData.story.content.split("\n\n").filter(p => p.trim()),
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=2940&auto=format&fit=crop",
      order: 1,
    };

    const missionData = [
      {
        id: "mission-1",
        title: formData.mission.title,
        description: formData.mission.content,
        order: 1,
      }
    ];

    const purposeData = {
      id: "our-purpose",
      title: formData.purpose.title,
      subtitle: "Our Purpose",
      content: formData.purpose.content.split("\n\n").filter(p => p.trim()),
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=2940&auto=format&fit=crop",
      order: 2,
    };

    const sustainabilityData = [
      {
        id: "sustainability-1",
        title: formData.sustainable.title,
        description: formData.sustainable.content,
        order: 1,
      }
    ];

    // Mock Why Bhutan items for display
    const whyBhutanData = [
      {
        id: "gross-national-happiness",
        title: "Gross National Happiness",
        icon: "smile" as const,
        description: "Bhutan measures progress through Gross National Happiness rather than GDP.",
        order: 1,
      },
      {
        id: "pristine-nature",
        title: "Pristine Nature",
        icon: "mountain" as const,
        description: "72% forest coverage and pristine landscapes.",
        order: 2,
      },
      {
        id: "living-culture",
        title: "Living Culture",
        icon: "heart" as const,
        description: "Culture that's alive in daily life.",
        order: 3,
      },
      {
        id: "spiritual-heritage",
        title: "Spiritual Heritage",
        icon: "sparkles" as const,
        description: "Buddhism permeates every aspect of life.",
        order: 4,
      },
      {
        id: "sustainable-development",
        title: "Sustainable Development",
        icon: "leaf" as const,
        description: "Balancing modernization with tradition.",
        order: 5,
      },
      {
        id: "exclusive-access",
        title: "Exclusive Access",
        icon: "key" as const,
        description: "High-value tourism means fewer crowds.",
        order: 6,
      },
    ];

    return (
      <div className="flex flex-col min-h-screen relative">
        {/* Fixed Edit Button */}
        <Button
          onClick={() => setIsEditMode(true)}
          className="fixed top-24 right-8 z-50 bg-black text-white hover:bg-gray-800 shadow-lg rounded-full w-12 h-12 p-0 flex items-center justify-center transition-transform hover:scale-110"
        >
          <Pencil className="w-5 h-5" />
        </Button>

        <AboutHero hero={heroData} />
        <OurStory story={storyData} />
        <OurMission items={missionData} />
        <OurPurpose purpose={purposeData} />
        <SustainableTravel items={sustainabilityData} />
        <WhyBhutan items={whyBhutanData} />
      </div>
    );
  }

  // Edit Mode - Show the form
  return (
    <div className="h-full flex-1 flex-col space-y-6 p-8 flex">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-black">
            Edit About Us Content
          </h2>
          <p className="text-gray-600">
            Update the content for all about us sections
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsEditMode(false)}
            disabled={isSaving}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={formData.hero.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Input
                id="hero-subtitle"
                value={formData.hero.subtitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, subtitle: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-content">Content</Label>
              <Textarea
                id="hero-content"
                value={formData.hero.content}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, content: e.target.value },
                  })
                }
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-image">Image URL</Label>
              <Input
                id="hero-image"
                value={formData.hero.image}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, image: e.target.value },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Our Story */}
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="story-title">Title</Label>
              <Input
                id="story-title"
                value={formData.story.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    story: { ...formData.story, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="story-content">Content</Label>
              <Textarea
                id="story-content"
                value={formData.story.content}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    story: { ...formData.story, content: e.target.value },
                  })
                }
                className="min-h-[150px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Our Mission */}
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mission-title">Title</Label>
              <Input
                id="mission-title"
                value={formData.mission.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mission: { ...formData.mission, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mission-content">Content</Label>
              <Textarea
                id="mission-content"
                value={formData.mission.content}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mission: { ...formData.mission, content: e.target.value },
                  })
                }
                className="min-h-[150px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Our Purpose */}
        <Card>
          <CardHeader>
            <CardTitle>Our Purpose</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="purpose-title">Title</Label>
              <Input
                id="purpose-title"
                value={formData.purpose.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purpose: { ...formData.purpose, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose-content">Content</Label>
              <Textarea
                id="purpose-content"
                value={formData.purpose.content}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purpose: { ...formData.purpose, content: e.target.value },
                  })
                }
                className="min-h-[150px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sustainable Travel */}
        <Card>
          <CardHeader>
            <CardTitle>Sustainable Travel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sustainable-title">Title</Label>
              <Input
                id="sustainable-title"
                value={formData.sustainable.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sustainable: {
                      ...formData.sustainable,
                      title: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sustainable-content">Content</Label>
              <Textarea
                id="sustainable-content"
                value={formData.sustainable.content}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sustainable: {
                      ...formData.sustainable,
                      content: e.target.value,
                    },
                  })
                }
                className="min-h-[150px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => setIsEditMode(false)}
          disabled={isSaving}
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
