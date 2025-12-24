"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil, Upload, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}

export function EditableText({
  value,
  onChange,
  className,
  placeholder,
  multiline = false,
  rows = 1,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (!multiline && inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing, multiline]);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (!isEditing) {
    return (
      <div
        className={cn(
          "group relative cursor-pointer hover:opacity-80 transition-opacity",
          className
        )}
        onClick={() => setIsEditing(true)}
      >
        {value || <span className="text-gray-500">{placeholder}</span>}
        <Pencil className="w-4 h-4 absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
      </div>
    );
  }

  const InputComponent = multiline ? "textarea" : "input";

  return (
    <div className="relative">
      <InputComponent
        ref={inputRef as any}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        className={cn(
          "w-full bg-white/10 text-white border-2 border-white/30 focus:border-white outline-none px-3 py-2 rounded",
          className
        )}
        placeholder={placeholder}
        rows={multiline ? rows : undefined}
      />
    </div>
  );
}

interface EditableImageProps {
  value: string;
  onChange: (value: string) => void;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function EditableImage({
  value,
  onChange,
  alt,
  className,
  containerClassName,
}: EditableImageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <div className={cn("relative group", containerClassName)}>
      <img src={value} alt={alt} className={className} />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-white text-black px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-200 transition-colors"
        >
          <Upload className="w-5 h-5" />
          Change Image
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-black rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Update Image URL</h3>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-black"
              placeholder="Enter image URL"
              autoFocus
            />
            {editValue && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={editValue}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = "";
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-black text-white px-4 py-2 rounded font-medium hover:bg-gray-800"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-black px-4 py-2 rounded font-medium hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface EditableGalleryProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function EditableGallery({ value, onChange }: EditableGalleryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<string[]>(value);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleUpdateImage = (index: number, url: string) => {
    const newGallery = [...editValue];
    newGallery[index] = url;
    setEditValue(newGallery);
    onChange(newGallery);
    setEditingIndex(null);
    setNewImageUrl("");
  };

  const handleRemoveImage = (index: number) => {
    const newGallery = editValue.filter((_, i) => i !== index);
    setEditValue(newGallery);
    onChange(newGallery);
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      const newGallery = [...editValue, newImageUrl.trim()];
      setEditValue(newGallery);
      onChange(newGallery);
      setNewImageUrl("");
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {editValue.map((img, index) => (
          <div
            key={index}
            className="aspect-[4/3] overflow-hidden bg-gray-900 relative group"
          >
            <img
              src={img}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setEditingIndex(index);
                  setNewImageUrl(img);
                }}
                className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleRemoveImage(index)}
                className="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        
        <button
          onClick={() => setIsEditing(true)}
          className="aspect-[4/3] border-2 border-dashed border-white/30 hover:border-white/60 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
        >
          <div className="text-center">
            <Plus className="w-8 h-8 mx-auto mb-2" />
            <span className="text-sm font-medium">Add Image</span>
          </div>
        </button>
      </div>

      {(isEditing || editingIndex !== null) && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-black rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              {editingIndex !== null ? "Update Image" : "Add Image"}
            </h3>
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-black"
              placeholder="Enter image URL"
              autoFocus
            />
            {newImageUrl && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={newImageUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = "";
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (editingIndex !== null) {
                    handleUpdateImage(editingIndex, newImageUrl);
                  } else {
                    handleAddImage();
                  }
                }}
                className="flex-1 bg-black text-white px-4 py-2 rounded font-medium hover:bg-gray-800"
              >
                {editingIndex !== null ? "Update" : "Add"}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingIndex(null);
                  setNewImageUrl("");
                }}
                className="flex-1 bg-gray-200 text-black px-4 py-2 rounded font-medium hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
