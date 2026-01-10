import { TourForm } from "../components/tour-form";
import { createTourAction } from "../actions";
import { getAllCosts } from "@/lib/data/settings";

export default async function NewTourPage() {
    const costs = await getAllCosts();
    const initialGlobalCost = costs
        .filter((c: any) => c.isActive)
        .reduce((sum: number, c: any) => sum + (c.price || 0), 0);

    return (
        <TourForm
            title="Create New Tour"
            action={(formData) => createTourAction(null, formData)}
            initialGlobalCost={initialGlobalCost}
        />
    );
}
