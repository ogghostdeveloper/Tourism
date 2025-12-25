"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Save, Pencil, X, Upload } from "lucide-react";
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
import { getAboutContentAction, updateAboutContentAction } from "./actions";

import { AboutContent, MissionItem, SustainabilityItem, AboutSection } from "@/lib/data/about";

export default function AboutUsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // File upload states
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null);
  const [heroImageDragActive, setHeroImageDragActive] = useState(false);

  const [storyImageFile, setStoryImageFile] = useState<File | null>(null);
  const [storyImagePreview, setStoryImagePreview] = useState<string | null>(null);
  const [storyImageDragActive, setStoryImageDragActive] = useState(false);

  const [purposeImageFile, setPurposeImageFile] = useState<File | null>(null);
  const [purposeImagePreview, setPurposeImagePreview] = useState<string | null>(null);
  const [purposeImageDragActive, setPurposeImageDragActive] = useState(false);

  const [sustainableImageFile, setSustainableImageFile] = useState<File | null>(null);
  const [sustainableImagePreview, setSustainableImagePreview] = useState<string | null>(null);
  const [sustainableImageDragActive, setSustainableImageDragActive] = useState(false);

  const heroImageRef = React.useRef<HTMLInputElement>(null!);
  const storyImageRef = React.useRef<HTMLInputElement>(null!);
  const purposeImageRef = React.useRef<HTMLInputElement>(null!);
  const sustainableImageRef = React.useRef<HTMLInputElement>(null!);

  const [formData, setFormData] = useState<AboutContent>({
    hero: {
      title: "",
      subtitle: "",
      content: "",
      image: "",
    },
    story: {
      title: "",
      subtitle: "",
      content: "",
      image: "",
    },
    mission: {
      title: "",
      subtitle: "",
      image: "",
      items: [],
    },
    purpose: {
      title: "",
      subtitle: "",
      content: "",
      image: "",
    },
    sustainable: {
      title: "",
      subtitle: "",
      intro: "",
      image: "",
      items: [],
    },
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await getAboutContentAction();
        setFormData(data);
        // Set image previews from existing data
        setHeroImagePreview(data.hero.image);
        setStoryImagePreview(data.story.image);
        setPurposeImagePreview(data.purpose.image);
        setSustainableImagePreview(data.sustainable.image);
      } catch (error) {
        toast.error("Failed to load content");
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  // Image upload handlers
  const createImageHandlers = (
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
    setDragActive: React.Dispatch<React.SetStateAction<boolean>>,
    fileInputRef: React.RefObject<HTMLInputElement>
  ) => {
    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("image/")) {
          setFile(file);
          setPreview(URL.createObjectURL(file));
          if (fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.current.files = dataTransfer.files;
          }
        }
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.type.startsWith("image/")) {
          setFile(file);
          setPreview(URL.createObjectURL(file));
        }
      }
    };

    return { handleDrag, handleDrop, handleChange };
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      const formDataToSubmit = new FormData(event.currentTarget);

      // Add image files if selected
      if (heroImageFile) {
        formDataToSubmit.append("heroImage", heroImageFile);
      }
      if (storyImageFile) {
        formDataToSubmit.append("storyImage", storyImageFile);
      }
      if (purposeImageFile) {
        formDataToSubmit.append("purposeImage", purposeImageFile);
      }
      if (sustainableImageFile) {
        formDataToSubmit.append("sustainableImage", sustainableImageFile);
      }

      // Add existing images as fallback
      formDataToSubmit.append("existingHeroImage", formData.hero.image);
      formDataToSubmit.append("existingStoryImage", formData.story.image);
      formDataToSubmit.append("existingPurposeImage", formData.purpose.image);
      formDataToSubmit.append("existingSustainableImage", formData.sustainable.image);

      const result = await updateAboutContentAction(formDataToSubmit);
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
      subtitle: formData.story.subtitle,
      content: formData.story.content.split("\n\n").filter(p => p.trim()),
      image: formData.story.image,
      order: 1,
    };

    const purposeData = {
      id: "our-purpose",
      title: formData.purpose.title,
      subtitle: formData.purpose.subtitle,
      content: formData.purpose.content.split("\n\n").filter(p => p.trim()),
      image: formData.purpose.image,
      order: 2,
    };

    // Mock Why Bhutan items for display - this part stays static as per instructions
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
        <OurMission
          items={formData.mission.items}
          subtitle={formData.mission.subtitle}
        />
        <OurPurpose purpose={purposeData} />
        <SustainableTravel
          items={formData.sustainable.items}
          intro={formData.sustainable.intro}
          subtitle={formData.sustainable.subtitle}
        />
        <WhyBhutan items={whyBhutanData} />
      </div>
    );
  }

  // Edit Mode - Show the form
  const heroImageHandlers = createImageHandlers(setHeroImageFile, setHeroImagePreview, setHeroImageDragActive, heroImageRef);
  const storyImageHandlers = createImageHandlers(setStoryImageFile, setStoryImagePreview, setStoryImageDragActive, storyImageRef);
  const purposeImageHandlers = createImageHandlers(setPurposeImageFile, setPurposeImagePreview, setPurposeImageDragActive, purposeImageRef);
  const sustainableImageHandlers = createImageHandlers(setSustainableImageFile, setSustainableImagePreview, setSustainableImageDragActive, sustainableImageRef);

  return (
    <form onSubmit={handleSave} className="h-full flex-1 flex-col space-y-6 p-8 flex pb-20">
      {/* Hidden inputs for arrays */}
      <input type="hidden" name="missionItems" value={JSON.stringify(formData.mission.items)} />
      <input type="hidden" name="sustainableItems" value={JSON.stringify(formData.sustainable.items)} />

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
            type="button"
            variant="outline"
            onClick={() => setIsEditMode(false)}
            disabled={isSaving}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Title</Label>
                <Input
                  id="hero-title"
                  name="hero-title"
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
                  name="hero-subtitle"
                  value={formData.hero.subtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, subtitle: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-content">Description</Label>
              <Textarea
                id="hero-content"
                name="hero-content"
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
              <Label>Background Image</Label>
              <div
                className={`relative flex flex-col items-center justify-center border-2 border-dashed transition-colors ${heroImageDragActive
                  ? "border-primary bg-primary/10"
                  : "border-muted-foreground/25"
                  } ${heroImagePreview ? "h-auto p-2" : "h-32"}`}
                onDragEnter={heroImageHandlers.handleDrag}
                onDragLeave={heroImageHandlers.handleDrag}
                onDragOver={heroImageHandlers.handleDrag}
                onDrop={heroImageHandlers.handleDrop}
              >
                {heroImagePreview ? (
                  <div className="group relative aspect-video w-full overflow-hidden">
                    <img
                      src={heroImagePreview}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                    <label
                      htmlFor="hero-image-upload"
                      className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <div className="bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100">
                        Change Image
                      </div>
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="hero-image-upload"
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-center"
                  >
                    <div className="bg-secondary p-2 group-hover:bg-secondary/80">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-black">
                        PNG, JPG, JPEG up to 5MB
                      </p>
                    </div>
                  </label>
                )}
                <input
                  ref={heroImageRef}
                  id="hero-image-upload"
                  name="heroImage"
                  type="file"
                  className="hidden"
                  onChange={heroImageHandlers.handleChange}
                  accept="image/*"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Story */}
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="story-title">Title</Label>
                <Input
                  id="story-title"
                  name="story-title"
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
                <Label htmlFor="story-subtitle">Subtitle</Label>
                <Input
                  id="story-subtitle"
                  name="story-subtitle"
                  value={formData.story.subtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      story: { ...formData.story, subtitle: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="story-content">Narrative Content</Label>
              <Textarea
                id="story-content"
                name="story-content"
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
            <div className="space-y-2">
              <Label>Sidebar Image</Label>
              <div
                className={`relative flex flex-col items-center justify-center border-2 border-dashed transition-colors ${storyImageDragActive
                  ? "border-primary bg-primary/10"
                  : "border-muted-foreground/25"
                  } ${storyImagePreview ? "h-auto p-2" : "h-32"}`}
                onDragEnter={storyImageHandlers.handleDrag}
                onDragLeave={storyImageHandlers.handleDrag}
                onDragOver={storyImageHandlers.handleDrag}
                onDrop={storyImageHandlers.handleDrop}
              >
                {storyImagePreview ? (
                  <div className="group relative aspect-video w-full overflow-hidden">
                    <img
                      src={storyImagePreview}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                    <label
                      htmlFor="story-image-upload"
                      className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <div className="bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100">
                        Change Image
                      </div>
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="story-image-upload"
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-center"
                  >
                    <div className="bg-secondary p-2 group-hover:bg-secondary/80">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-black">
                        PNG, JPG, JPEG up to 5MB
                      </p>
                    </div>
                  </label>
                )}
                <input
                  ref={storyImageRef}
                  id="story-image-upload"
                  name="storyImage"
                  type="file"
                  className="hidden"
                  onChange={storyImageHandlers.handleChange}
                  accept="image/*"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Mission */}
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mission-title">Section Title</Label>
                <Input
                  id="mission-title"
                  name="mission-title"
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
                <Label htmlFor="mission-subtitle">Subtitle Label</Label>
                <Input
                  id="mission-subtitle"
                  name="mission-subtitle"
                  value={formData.mission.subtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mission: { ...formData.mission, subtitle: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <Label>Mission Items (Strategic Objectives)</Label>
              {formData.mission.items.map((item, index) => (
                <div key={item.id} className="p-4 border rounded-lg space-y-4 bg-gray-50/50">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-gray-400">ITEM #{index + 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 h-8"
                      onClick={() => {
                        const newItems = formData.mission.items.filter((_, i) => i !== index);
                        setFormData({
                          ...formData,
                          mission: { ...formData.mission, items: newItems }
                        });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`mission-item-title-${index}`}>Item Title</Label>
                    <Input
                      id={`mission-item-title-${index}`}
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [...formData.mission.items];
                        newItems[index].title = e.target.value;
                        setFormData({
                          ...formData,
                          mission: { ...formData.mission, items: newItems }
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`mission-item-content-${index}`}>Item Description</Label>
                    <Textarea
                      id={`mission-item-content-${index}`}
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...formData.mission.items];
                        newItems[index].description = e.target.value;
                        setFormData({
                          ...formData,
                          mission: { ...formData.mission, items: newItems }
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  const newItems = [...formData.mission.items, {
                    id: `mission-${Date.now()}`,
                    title: "New Mission Item",
                    description: "",
                    order: formData.mission.items.length + 1
                  }];
                  setFormData({
                    ...formData,
                    mission: { ...formData.mission, items: newItems }
                  });
                }}
              >
                + Add Mission Item
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Our Purpose */}
        <Card>
          <CardHeader>
            <CardTitle>Our Purpose</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purpose-title">Title</Label>
                <Input
                  id="purpose-title"
                  name="purpose-title"
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
                <Label htmlFor="purpose-subtitle">Subtitle</Label>
                <Input
                  id="purpose-subtitle"
                  name="purpose-subtitle"
                  value={formData.purpose.subtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      purpose: { ...formData.purpose, subtitle: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose-content">Purpose Statement</Label>
              <Textarea
                id="purpose-content"
                name="purpose-content"
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
            <div className="space-y-2">
              <Label>Purpose Image</Label>
              <div
                className={`relative flex flex-col items-center justify-center border-2 border-dashed transition-colors ${purposeImageDragActive
                  ? "border-primary bg-primary/10"
                  : "border-muted-foreground/25"
                  } ${purposeImagePreview ? "h-auto p-2" : "h-32"}`}
                onDragEnter={purposeImageHandlers.handleDrag}
                onDragLeave={purposeImageHandlers.handleDrag}
                onDragOver={purposeImageHandlers.handleDrag}
                onDrop={purposeImageHandlers.handleDrop}
              >
                {purposeImagePreview ? (
                  <div className="group relative aspect-video w-full overflow-hidden">
                    <img
                      src={purposeImagePreview}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                    <label
                      htmlFor="purpose-image-upload"
                      className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <div className="bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100">
                        Change Image
                      </div>
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="purpose-image-upload"
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-center"
                  >
                    <div className="bg-secondary p-2 group-hover:bg-secondary/80">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-black">
                        PNG, JPG, JPEG up to 5MB
                      </p>
                    </div>
                  </label>
                )}
                <input
                  ref={purposeImageRef}
                  id="purpose-image-upload"
                  name="purposeImage"
                  type="file"
                  className="hidden"
                  onChange={purposeImageHandlers.handleChange}
                  accept="image/*"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sustainable Travel */}
        <Card>
          <CardHeader>
            <CardTitle>Sustainable Travel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sustainable-title">Section Title</Label>
                <Input
                  id="sustainable-title"
                  name="sustainable-title"
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
                <Label htmlFor="sustainable-subtitle">Subtitle Label</Label>
                <Input
                  id="sustainable-subtitle"
                  name="sustainable-subtitle"
                  value={formData.sustainable.subtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sustainable: {
                        ...formData.sustainable,
                        subtitle: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sustainable-intro">Intro Paragraph</Label>
              <Textarea
                id="sustainable-intro"
                name="sustainable-intro"
                value={formData.sustainable.intro}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sustainable: {
                      ...formData.sustainable,
                      intro: e.target.value,
                    },
                  })
                }
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-4 mt-6">
              <Label>Sustainability items (Conservation Protocol)</Label>
              {formData.sustainable.items.map((item, index) => (
                <div key={item.id} className="p-4 border rounded-lg space-y-4 bg-gray-50/50">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-gray-400">PROTOCOL #{index + 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 h-8"
                      onClick={() => {
                        const newItems = formData.sustainable.items.filter((_, i) => i !== index);
                        setFormData({
                          ...formData,
                          sustainable: { ...formData.sustainable, items: newItems }
                        });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`sustain-item-title-${index}`}>Protocol Title</Label>
                    <Input
                      id={`sustain-item-title-${index}`}
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [...formData.sustainable.items];
                        newItems[index].title = e.target.value;
                        setFormData({
                          ...formData,
                          sustainable: { ...formData.sustainable, items: newItems }
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`sustain-item-content-${index}`}>Protocol Description</Label>
                    <Textarea
                      id={`sustain-item-content-${index}`}
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...formData.sustainable.items];
                        newItems[index].description = e.target.value;
                        setFormData({
                          ...formData,
                          sustainable: { ...formData.sustainable, items: newItems }
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  const newItems = [...formData.sustainable.items, {
                    id: `sustain-${Date.now()}`,
                    title: "New Protocol",
                    description: "",
                    order: formData.sustainable.items.length + 1
                  }];
                  setFormData({
                    ...formData,
                    sustainable: { ...formData.sustainable, items: newItems }
                  });
                }}
              >
                + Add Sustainability Protocol
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2 mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsEditMode(false)}
          disabled={isSaving}
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
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
    </form>
  );
}
