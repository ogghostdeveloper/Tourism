"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import type { MultiSelectOption } from "@/components/ui/multi-select";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedArrowLeft } from "@/components/ui/animated-arrow-left";
import type { AnimatedArrowLeftHandle } from "@/components/ui/animated-arrow-left";
import { getAllExperiences } from "@/app/admin/experiences/actions";
import { getAllHotels } from "@/app/admin/hotels/actions";
import { createDestination } from "../actions";

export default function CreateDestinationPage() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [selectedExperiences, setSelectedExperiences] = React.useState<string[]>([]);
  const [selectedHotels, setSelectedHotels] = React.useState<string[]>([]);
  const [experienceOptions, setExperienceOptions] = React.useState<MultiSelectOption[]>([]);
  const [hotelOptions, setHotelOptions] = React.useState<MultiSelectOption[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const iconRef = React.useRef<AnimatedArrowLeftHandle>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [experiences, hotels] = await Promise.all([
          getAllExperiences(),
          getAllHotels(),
        ]);

        setExperienceOptions(
          experiences.map((exp) => ({
            value: exp.slug,
            label: exp.title,
          }))
        );

        setHotelOptions(
          hotels.map((hotel) => ({
            value: hotel.id,
            label: hotel.name,
          }))
        );
      } catch (error) {
        toast.error("Failed to fetch experiences and hotels");
      }
    };
    fetchData();
  }, []);

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
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
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
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Add selected experiences and hotels to formData
    formData.set("experiences", JSON.stringify(selectedExperiences));
    formData.set("hotels", JSON.stringify(selectedHotels));

    const highlightsLabel = event.currentTarget.querySelector('textarea[name="highlights"]') as HTMLTextAreaElement;
    if (highlightsLabel) {
      formData.set("highlights", highlightsLabel.value);
    }

    startTransition(async () => {
      try {
        const result = await createDestination(null, formData);

        if (result.success) {
          toast.success("Destination created successfully");
          router.push("/admin/destinations");
        } else {
          toast.error(result.message || "Failed to create destination");
        }
      } catch (error) {
        toast.error("Failed to create destination");
      }
    });
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto space-y-4 p-8 pt-6">
      <div className="flex flex-col gap-2">
        <Link href="/admin/destinations" className="mb-4">
          <Button
            variant="outline"
            onMouseEnter={() => iconRef.current?.startAnimation()}
            onMouseLeave={() => iconRef.current?.stopAnimation()}
            className="text-black"
          >
            <AnimatedArrowLeft ref={iconRef} className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <h2 className="text-2xl font-semibold tracking-tight text-black">
          Create New Destination
        </h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-black">Name *</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Enter destination name"
                className="text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-black">Slug *</Label>
              <Input
                id="slug"
                name="slug"
                required
                placeholder="destination-slug"
                className="text-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="region" className="text-black">Region *</Label>
            <Input
              id="region"
              name="region"
              required
              placeholder="e.g., Western Bhutan"
              className="text-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-black">Description *</Label>
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Describe the destination..."
              className="min-h-[150px] resize-none text-black"
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="highlights" className="text-black">Highlights (One per line) *</Label>
            <Textarea
              id="highlights"
              name="highlights"
              required
              placeholder="Enter highlights, one per line..."
              className="min-h-[150px] resize-none text-black"
              rows={5}
            />
          </div>

          <div className="border p-4 space-y-4">
            <h3 className="font-semibold text-black">Experiences</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-black">Select Experiences</Label>
                <MultiSelect
                  options={experienceOptions}
                  selected={selectedExperiences}
                  onChange={setSelectedExperiences}
                  placeholder="Select experiences..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topExperienceSlug" className="text-black">Top Experience (Key Highlight)</Label>
                <select
                  id="topExperienceSlug"
                  name="topExperienceSlug"
                  className="w-full h-10 px-3 bg-white border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-black text-black"
                >
                  <option value="">Select top experience...</option>
                  {experienceOptions
                    .filter(opt => selectedExperiences.includes(opt.value))
                    .map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <p className="text-xs text-black">
              Choose experiences available at this destination and pick one as the primary highlight.
            </p>
          </div>

          <div className="border p-4 space-y-4">
            <h3 className="font-semibold text-black">Hotels</h3>
            <div className="space-y-2">
              <Label className="text-black">Select Hotels</Label>
              <MultiSelect
                options={hotelOptions}
                selected={selectedHotels}
                onChange={setSelectedHotels}
                placeholder="Select hotels..."
              />
              <p className="text-xs text-black">
                Choose hotels located in this destination
              </p>
            </div>
          </div>

          <div className="border p-4 space-y-4">
            <h3 className="font-semibold text-black">Coordinates</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude" className="text-black">Latitude *</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  required
                  placeholder="27.4728"
                  className="text-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude" className="text-black">Longitude *</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  required
                  placeholder="89.6393"
                  className="text-black"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-black">Cover Image *</Label>
            <div
              className={`relative flex flex-col items-center justify-center border-2 border-dashed transition-colors ${dragActive
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/25"
                } ${previewUrl ? "h-auto p-2" : "h-32"}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {previewUrl ? (
                <div className="group relative aspect-video w-full overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                  <label
                    htmlFor="image-upload"
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <div className="bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100">
                      Change Image
                    </div>
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-center"
                >
                  <div className="bg-secondary p-2 group-hover:bg-secondary/80">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-black">
                      PNG, JPG, JPEG up to 5MB
                    </p>
                  </div>
                </label>
              )}
              <input
                ref={fileInputRef}
                id="image-upload"
                name="image"
                type="file"
                className="hidden"
                onChange={handleChange}
                accept="image/*"
                required={!previewUrl}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/admin/destinations">
              <Button variant="outline" type="button" className="text-black">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Destination"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
