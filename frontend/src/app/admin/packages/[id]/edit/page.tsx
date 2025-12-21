"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PackageFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const isNew = id === "new";
  const [isLoading, setIsLoading] = useState(false);

  // Mock initial data for edit mode
  const [formData, setFormData] = useState({
    name: isNew ? "" : "Cultural Immersion",
    slug: isNew ? "" : "cultural-immersion",
    description: isNew
      ? ""
      : "Dive deep into Bhutan's rich cultural heritage...",
    price: isNew ? "" : "From $4,500 pp",
    duration: isNew ? "" : "7 Days",
    highlights: isNew ? [""] : ["Festival attendance", "Monastery visits"],
  });

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData({ ...formData, highlights: newHighlights });
  };

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, ""] });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData({ ...formData, highlights: newHighlights });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert("Package saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/packages">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-light text-black">
            {isNew ? "Create Package" : "Edit Package"}
          </h1>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className={cn(
            "bg-black text-white text-sm font-medium uppercase tracking-wider hover:bg-gray-900",
            isLoading && "opacity-70 cursor-not-allowed"
          )}
        >
          {isLoading ? "Saving..." : "Save Changes"}
          {!isLoading && <Save className="w-4 h-4 ml-2" />}
        </Button>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs font-bold uppercase tracking-widest text-gray-500"
              >
                Package Name
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border-b border-gray-200 border-0 border-b-2 px-0"
                placeholder="e.g. Cultural Immersion"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="slug"
                className="text-xs font-bold uppercase tracking-widest text-gray-500"
              >
                Slug
              </Label>
              <Input
                id="slug"
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="border-b border-gray-200 border-0 border-b-2 px-0"
                placeholder="e.g. cultural-immersion"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label
                htmlFor="price"
                className="text-xs font-bold uppercase tracking-widest text-gray-500"
              >
                Price
              </Label>
              <Input
                id="price"
                type="text"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="border-b border-gray-200 border-0 border-b-2 px-0"
                placeholder="e.g. From $4,500 pp"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="duration"
                className="text-xs font-bold uppercase tracking-widest text-gray-500"
              >
                Duration
              </Label>
              <Input
                id="duration"
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="border-b border-gray-200 border-0 border-b-2 px-0"
                placeholder="e.g. 7 Days"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-xs font-bold uppercase tracking-widest text-gray-500"
            >
              Description
            </Label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black transition-colors resize-none"
              placeholder="Enter package description..."
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Highlights
              </Label>
              <Button
                onClick={addHighlight}
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs font-medium text-black hover:text-gray-600"
              >
                <Plus className="w-3 h-3 mr-1" /> Add Highlight
              </Button>
            </div>
            <div className="space-y-3">
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={highlight}
                    onChange={(e) =>
                      handleHighlightChange(index, e.target.value)
                    }
                    className="flex-1 border-b border-gray-200 border-0 border-b-2 px-0"
                    placeholder="Enter highlight..."
                  />
                  <Button
                    onClick={() => removeHighlight(index)}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
