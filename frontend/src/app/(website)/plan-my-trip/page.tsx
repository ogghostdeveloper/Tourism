import { getPlanMyTripData } from "./actions";
import PlanMyTripClient from "./components/PlanMyTripClient";

export default async function PlanMyTripPage() {
    const data = await getPlanMyTripData();

    return (
        <PlanMyTripClient
            packages={data.packages}
            destinations={data.destinations}
            experiences={data.experiences}
        />
    );
}
