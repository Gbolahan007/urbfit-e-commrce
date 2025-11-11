import { getHomePicks } from "@/app/_lib/data-service";
import HomeSectionPicksClient from "./HomeSectionPicksClient";

export default async function HomeSectionPicks() {
  const homePicks = await getHomePicks();

  return (
    <main className="min-h-screen">
      <section className="w-full py-12">
        <h2 className="text-center text-3xl font-bold mb-8">@URBFIT</h2>
        <HomeSectionPicksClient homePicks={homePicks} />
        <div className="text-center mt-8">
          <p className="text-sm font-semibold">Follow Us</p>
        </div>
      </section>
    </main>
  );
}
