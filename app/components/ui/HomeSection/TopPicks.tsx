import { getTopPicks } from "@/app/_lib/data-service";
import HomeTopPicksClient from "./HomeTopPicksClient";
import { unstable_noStore } from "next/cache";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function TopPicks() {
  unstable_noStore();
  const topPicks = await getTopPicks();
  return <HomeTopPicksClient topPicks={topPicks} />;
}
