"use client";

import * as React from "react";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedArrowLeft } from "@/components/ui/animated-arrow-left";
import type { AnimatedArrowLeftHandle } from "@/components/ui/animated-arrow-left";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DZONGKHAGS, DZONGKHAG_REGIONS } from "@/constants/dzongkhags";
import { generateSlug } from "@/utils/slugGenerator";
import { getDestinationBySlug, updateDestination } from "../../actions";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function EditDestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: paramsSlug } = use(params);
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const iconRef = React.useRef<AnimatedArrowLeftHandle>(null);

  // Form fields
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  /* const [highlights, setHighlights] = React.useState("");
  const [topExperienceSlug, setTopExperienceSlug] = React.useState(""); */

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const destination = await getDestinationBySlug(paramsSlug);

        if (destination) {
          setName(destination.name);
          setSlug(destination.slug);
          setRegion(destination.region);
          setDescription(destination.description);
          /* setHighlights(destination.highlights ? destination.highlights.join("\n") : "");
          setTopExperienceSlug(destination.topExperienceSlug || ""); */
          setPreviewUrl(destination.image);

          if (destination.coordinates) {
            setLatitude(destination.coordinates[0].toString());
            setLongitude(destination.coordinates[1].toString());
          }


        }
      } catch (error) {
        toast.error("Failed to fetch destination data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [paramsSlug]);



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className="rounded-none" asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-black bg-white"
                  >
                    {name
                      ? DZONGKHAGS.find((framework) => framework === name) || name
                      : "Select a Dzongkhag..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Search dzongkhag..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No dzongkhag found.</CommandEmpty>
                      <CommandGroup>
                        {DZONGKHAGS.map((dzongkhag) => (
                          <CommandItem
                            key={dzongkhag}
                            value={dzongkhag}
                            onSelect={(currentValue) => {
                              setName(dzongkhag);
                              setSlug(generateSlug(dzongkhag));
                              setRegion(DZONGKHAG_REGIONS[dzongkhag] || "");
                              setOpen(false);
                            }}
                          >
                            {dzongkhag}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                name === dzongkhag ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <input type="hidden" name="name" value={name} />
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
              readOnly
              onChange={(e) => setRegion(e.target.value)}
              className="text-black bg-gray-100"
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

          <ImageUpload
            required={!previewUrl}
            defaultPreview={previewUrl}
            onFileSelect={(file) => {
              if (file) setPreviewUrl(URL.createObjectURL(file));
              else setPreviewUrl(null);
            }}
          />

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
