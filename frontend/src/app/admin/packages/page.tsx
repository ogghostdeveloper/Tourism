import { getAllPackages } from "@/lib/data/packages";
import { PackagesClient } from "@/components/admin/PackagesClient";

export default async function PackagesPage() {
  const packages = await getAllPackages();

  return <PackagesClient packages={packages} />;
}
