"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedArrowLeft } from "@/components/ui/animated-arrow-left";
import type { AnimatedArrowLeftHandle } from "@/components/ui/animated-arrow-left";

export default function CreateHotelPage() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [amenities, setAmenities] = React.useState<string[]>([]);
  const [amenityInput, setAmenityInput] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const iconRef = React.useRef<AnimatedArrowLeftHandle>(null);

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

  const addAmenity = () => {
    if (amenityInput.trim() && !amenities.includes(amenityInput.trim())) {
      setAmenities([...amenities, amenityInput.trim()]);
      setAmenityInput("");
    }
  };

  const removeAmenity = (amenityToRemove: string) => {
    setAmenities(amenities.filter((a) => a !== amenityToRemove));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Add amenities to formData
    formData.set("amenities", JSON.stringify(amenities));

    startTransition(async () => {
      try {
        // TODO: Replace with actual API call
        // const result = await createHotel(formData);
        
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        toast.success("Hotel created successfully");
        router.push("/admin/hotels");
      } catch (error) {
        toast.error("Failed to create hotel");
      }
    });
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto space-y-4 p-8 pt-6">
      <div className="flex flex-col gap-2">
        <Link href="/admin/hotels" className="mb-4">
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
          Create New Hotel
        </h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-black">Hotel Name *</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Enter hotel name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-black">Location *</Label>
              <Input
                id="location"
                name="location"
                required
                placeholder="e.g., Thimphu, Paro"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rating" className="text-black">Rating *</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                required
                placeholder="4.5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rooms" className="text-black">Number of Rooms *</Label>
              <Input
                id="rooms"
                name="rooms"
                type="number"
                min="1"
                required
                placeholder="50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceRange" className="text-black">Price Range *</Label>
              <Input
                id="priceRange"
                name="priceRange"
                required
                placeholder="$$$"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-black">Description *</Label>
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Describe the hotel..."
              className="min-h-[200px] resize-none"
              rows={8}
            />
          </div>

          <div className="border p-4 space-y-4">
            <h3 className="font-semibold text-black">Amenities</h3>
            <div className="space-y-2">
              <Label className="text-black">Add Amenities</Label>
              <div className="flex gap-2">
                <Input
                  value={amenityInput}
                  onChange={(e) => setAmenityInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addAmenity();
                    }
                  }}
                  placeholder="e.g., WiFi, Spa, Restaurant"
                />
                <Button type="button" onClick={addAmenity}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 text-sm"
                  >
                    {amenity}
                    <button
                      type="button"
                      onClick={() => removeAmenity(amenity)}
                      className="hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border p-4 space-y-4">
            <h3 className="font-semibold text-black">Coordinates (Optional)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude" className="text-black">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  placeholder="27.4728"
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
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-black">Cover Image *</Label>
            <div
              className={`relative flex flex-col items-center justify-center border-2 border-dashed transition-colors ${
                dragActive
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
                    <p className="text-xs text-muted-foreground">
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
            <Link href="/admin/hotels">
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
                "Create Hotel"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
