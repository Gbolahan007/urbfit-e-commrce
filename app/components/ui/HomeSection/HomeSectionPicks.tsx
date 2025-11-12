import { getHomePicks } from "@/app/_lib/data-service";
import HomeSectionPicksClient from "./HomeSectionPicksClient";
import Link from "next/link";

export default async function HomeSectionPicks() {
  const homePicks = await getHomePicks();

  return (
    <main className="lg:min-h-screen">
      <section className="w-full py-12">
        <div
          className="text-center font-bold 
        mb-8"
        >
          <p>Join us </p>
          <h2 className="text-3xl">@ URBFIT</h2>
        </div>
        <HomeSectionPicksClient homePicks={homePicks} />
        <div className="text-center mt-8 ">
          <Link href="#" className="text-sm font-semibold underline">
            Follow Us
          </Link>
        </div>
      </section>
    </main>
  );
}
