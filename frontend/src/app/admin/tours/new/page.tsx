import { TourForm } from "../components/TourForm";
import { Button } from "@/components/ui/button";
import { AnimatedArrowLeft } from "@/components/ui/animated-arrow-left";
import Link from "next/link";

export default function NewTourPage() {
    return (
        <div className="flex-1 max-w-5xl mx-auto space-y-6 p-8 pt-6">
            <div className="flex flex-col gap-2">
                <Link href="/admin/tours">
                    <Button variant="outline" className="text-black group">
                        <AnimatedArrowLeft className="mr-2 h-4 w-4" />
                        Back to Tours
                    </Button>
                </Link>
                <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 serif italic">
                    Create New Expedition
                </h2>
                <p className="text-neutral-500 text-sm">
                    Design a new curated travel experience for your clients.
                </p>
            </div>

            <div className="bg-neutral-50/30 rounded-xl p-1">
                <TourForm />
            </div>
        </div>
    );
}
