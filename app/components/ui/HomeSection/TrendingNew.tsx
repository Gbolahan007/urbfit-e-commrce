import { getTrendingNew } from "@/app/_lib/data-service";
import HomeTrendingNewClient from "./HomeTrendingNewClient";

export const revalidate = 300;

export default async function TrendingNew() {
  const trendingItems = await getTrendingNew();

  return <HomeTrendingNewClient trendingItems={trendingItems} />;
}
