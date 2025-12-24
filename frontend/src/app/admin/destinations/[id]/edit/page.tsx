"use client";

import * as React from "react";
import { use } from "react";
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
import { getDestinationBySlug, updateDestination } from "../../actions";

export default function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [selectedExperiences, setSelectedExperiences] = React.useState<string[]>([]);
  const [selectedHotels, setSelectedHotels] = React.useState<string[]>([]);
  const [experienceOptions, setExperienceOptions] = React.useState<MultiSelectOption[]>([]);
  const [hotelOptions, setHotelOptions] = React.useState<MultiSelectOption[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const iconRef = React.useRef<AnimatedArrowLeftHandle>(null);

  // Form fields
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const [highlights, setHighlights] = React.useState("");
  const [topExperienceSlug, setTopExperienceSlug] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [experiences, hotels, destination] = await Promise.all([
          getAllExperiences(),
          getAllHotels(),
          getDestinationBySlug(id),
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

        if (destination) {
          setName(destination.name);
          setSlug(destination.slug);
          setRegion(destination.region);
          setDescription(destination.description);
          setHighlights(destination.highlights ? destination.highlights.join("\n") : "");
          setTopExperienceSlug(destination.topExperienceSlug || "");
          setPreviewUrl(destination.image);

          if (destination.coordinates) {
            setLatitude(destination.coordinates[0].toString());
            setLongitude(destination.coordinates[1].toString());
          }

          setSelectedExperiences(destination.experiences || []);
          setSelectedHotels(destination.hotels || []);
        }
      } catch (error) {
        toast.error("Failed to fetch destination data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

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

    startTransition(async () => {
      try {
        formData.set("highlights", highlights);
        formData.set("experiences", JSON.stringify(selectedExperiences));
        formData.set("hotels", JSON.stringify(selectedHotels));
        formData.set("topExperienceSlug", topExperienceSlug);

        const result = await updateDestination(slug, null, formData);

        if (result.success) {
          toast.success("Destination updated successfully");
          router.push("/admin/destinations");
        } else {
          toast.error(result.message || "Failed to update destination");
        }
      } catch (error) {
        toast.error("Failed to update destination");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex-1 max-w-7xl mx-auto space-y-4 p-8 pt-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

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
          Edit Destination
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
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
              value={region}
              onChange={(e) => setRegion(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
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
                  value={topExperienceSlug}
                  onChange={(e) => setTopExperienceSlug(e.target.value)}
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
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
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
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
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
                  Updating...
                </>
              ) : (
                "Update Destination"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
