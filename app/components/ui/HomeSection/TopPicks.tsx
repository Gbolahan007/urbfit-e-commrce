import { getTopPicks } from "@/app/_lib/data-service";
import HomeTopPicksClient from "./HomeTopPicksClient";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function TopPicks() {
  const topPicks = await getTopPicks();
  return <HomeTopPicksClient topPicks={topPicks} />;
}
