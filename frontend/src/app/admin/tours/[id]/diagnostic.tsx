import { notFound } from "next/navigation";

interface DiagnosticPageProps {
    params: Promise<{ id: string }>;
}

export default async function DiagnosticPage({ params }: DiagnosticPageProps) {
    const { id } = await params;

    console.log("==================");
    console.log("[DIAGNOSTIC] Raw ID from params:", id);
    console.log("[DIAGNOSTIC] ID length:", id.length);
    console.log("[DIAGNOSTIC] ID type:", typeof id);
    console.log("[DIAGNOSTIC] Is valid hex?", /^[0-9a-fA-F]{24}$/.test(id));
    console.log("==================");

    // Actually try to query with this ID
    const { getTourById } = await import("../../actions");
    const tour = await getTourById(id);

    console.log("[DIAGNOSTIC] Query result:", tour ? "FOUND" : "NULL");

    if (!tour) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Diagnostic Info</h1>
                <p className="mb-2"><strong>Received ID:</strong> {id}</p>
                <p className="mb-2"><strong>ID Length:</strong> {id.length}</p>
                <p className="mb-2"><strong>Valid Hex:</strong> {/^[0-9a-fA-F]{24}$/.test(id) ? "YES" : "NO"}</p>
                <p className="mb-2"><strong>Query Result:</strong> NULL</p>
                <p className="mt-4 text-red-500">Document not found in database!</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Diagnostic Info - SUCCESS!</h1>
            <p className="mb-2"><strong>Received ID:</strong> {id}</p>
            <p className="mb-2"><strong>ID Length:</strong> {id.length}</p>
            <p className="mb-2"><strong>Valid Hex:</strong> {/^[0-9a-fA-F]{24}$/.test(id) ? "YES" : "NO"}</p>
            <p className="mb-2"><strong>Query Result:</strong> FOUND</p>
            <p className="mb-2"><strong>Tour Title:</strong> {tour.title}</p>
            <pre className="mt-4 bg-gray-100 p-4 overflow-auto">
                {JSON.stringify(tour, null, 2)}
            </pre>
        </div>
    );
}
