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
import { getAllDestinations } from "@/lib/data";
import { getExperienceBySlug, updateExperience } from "../../actions";

export default function EditExperiencePage({
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
  const [selectedDestinations, setSelectedDestinations] = React.useState<string[]>([]);
  const [destinationOptions, setDestinationOptions] = React.useState<MultiSelectOption[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [galleryFiles, setGalleryFiles] = React.useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = React.useState<string[]>([]);
  const [existingGallery, setExistingGallery] = React.useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const galleryInputRef = React.useRef<HTMLInputElement>(null);
  const iconRef = React.useRef<AnimatedArrowLeftHandle>(null);

  // Form fields
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [destinations, experience] = await Promise.all([
          getAllDestinations(),
          getExperienceBySlug(id),
        ]);

        setDestinationOptions(
          destinations.map((dest) => ({
            value: dest.slug,
            label: dest.name,
          }))
        );

        if (experience) {
          setTitle(experience.title);
          setSlug(experience.slug);
          setCategory(experience.category);
          setDescription(experience.description);
          setDuration(experience.duration || "");
          setDifficulty(experience.difficulty || "");
          setPreviewUrl(experience.image);

          if (experience.coordinates) {
            setLatitude(experience.coordinates[0].toString());
            setLongitude(experience.coordinates[1].toString());
          }

          // Set existing gallery
          if (experience.gallery && experience.gallery.length > 0) {
            setExistingGallery(experience.gallery);
            setGalleryPreviews(experience.gallery);
          }

          // Set selected destinations
          if (experience.destinations) {
            setSelectedDestinations(experience.destinations);
          } else if (experience.destinationSlug) {
            setSelectedDestinations([experience.destinationSlug]);
          }
        }
      } catch (error) {
        toast.error("Failed to fetch experience data");
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

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => file.type.startsWith("image/"));
      setGalleryFiles(prev => [...prev, ...files]);
      
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setGalleryPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeGalleryImage = (index: number) => {
    // Check if it's an existing image or new file
    if (index < existingGallery.length) {
      // Remove from existing gallery
      setExistingGallery(prev => prev.filter((_, i) => i !== index));
    } else {
      // Remove from new files
      const fileIndex = index - existingGallery.length;
      setGalleryFiles(prev => prev.filter((_, i) => i !== fileIndex));
    }
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form (Edit): handleSubmit triggered");
    const formData = new FormData(event.currentTarget);

    // Add selected destinations to formData
    formData.set("destinations", JSON.stringify(selectedDestinations));
    console.log("Form (Edit): Destinations added", selectedDestinations);

    // Add existing gallery URLs
    formData.set("existingGallery", JSON.stringify(existingGallery));
    
    // Add new gallery images
    galleryFiles.forEach((file) => {
      formData.append(`gallery`, file);
    });

    try {
      console.log("Form (Edit): Calling updateExperience action...");
      const result = await updateExperience(id, null, formData);
      console.log("Form (Edit): Action result received", result);

      if (result.success) {
        toast.success(result.message);
        router.push("/admin/experiences");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Form (Edit): Action error", error);
      toast.error("An error occurred while updating experience");
    }
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
        <Link href="/admin/experiences" className="mb-4">
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
          Edit Experience
        </h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-black">Title *</Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="Enter experience title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-black">Slug *</Label>
              <Input
                id="slug"
                name="slug"
                required
                placeholder="experience-slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="text-black"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-black">Category *</Label>
              <Input
                id="category"
                name="category"
                required
                placeholder="e.g., Adventure, Culture"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-black">Duration</Label>
              <Input
                id="duration"
                name="duration"
                placeholder="e.g., 5 Hours, Full Day"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="text-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty" className="text-black">Difficulty</Label>
            <select
              id="difficulty"
              name="difficulty"
              className="flex h-9 w-full border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 text-black"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Challenging">Challenging</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-black">Description *</Label>
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Describe the experience..."
              className="min-h-[200px] resize-none text-black"
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="border p-4 space-y-4">
            <h3 className="font-semibold text-black">Destinations</h3>
            <div className="space-y-2">
              <Label className="text-black">Select Destinations</Label>
              <MultiSelect
                options={destinationOptions}
                selected={selectedDestinations}
                onChange={setSelectedDestinations}
                placeholder="Select destinations..."
              />
              <p className="text-xs text-black">
                Choose destinations where this experience is available
              </p>
            </div>
          </div>

          <div className="border p-4 space-y-4">
            <h3 className="font-semibold text-black">Coordinates</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude" className="text-black">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  placeholder="27.4728"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="text-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude" className="text-black">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="any"
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

          <div className="space-y-2">
            <Label className="text-black">Gallery Images (3 images recommended)</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 p-4">
              <input
                ref={galleryInputRef}
                id="gallery-upload"
                type="file"
                className="hidden"
                onChange={handleGalleryChange}
                accept="image/*"
                multiple
              />
              
              {galleryPreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {galleryPreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="w-full bg-secondary hover:bg-secondary/80 text-black py-3 px-4 rounded text-sm font-medium flex items-center justify-center gap-2"
              >
                <Upload className="h-4 w-4" />
                {galleryPreviews.length > 0 ? 'Add More Images' : 'Upload Gallery Images'}
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Upload 3 images for the Visual Journey section
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/admin/experiences">
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
                "Update Experience"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
