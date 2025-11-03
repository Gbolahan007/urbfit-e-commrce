import Link from "next/link";
import { getBrands } from "../_lib/data-service";
import { unstable_noStore } from "next/cache";

interface Brand {
  id: string;
  name: string;
  slug?: string;
  product_count?: number;
}

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function BrandsPage() {
  unstable_noStore();

  const brands: Brand[] = await getBrands();

  const groupedBrands = brands?.reduce((acc, brand) => {
    const firstLetter = brand.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {} as Record<string, Brand[]>);

  Object.keys(groupedBrands).forEach((letter) => {
    groupedBrands[letter].sort((a, b) => a.name.localeCompare(b.name));
  });

  const sortedLetters = Object.keys(groupedBrands).sort();

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Shop By Brand</h1>
        <p className="text-gray-700">
          Browse our collection of {brands.length} premium brands
        </p>
      </div>

      {/* Alphabet Navigation */}
      <div className="mb-8 pb-4 border-b sticky top-0 bg-white z-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {sortedLetters.map((letter) => (
            <a
              key={letter}
              href={`#${letter}`}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 font-semibold text-sm transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>
      </div>

      {/* Brand Groups */}
      <div className="space-y-12">
        {sortedLetters.map((letter) => (
          <div key={letter} id={letter} className="scroll-mt-20">
            {/* Letter Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-black">{letter}</h2>
              <div className="h-1 w-16 bg-black mt-2"></div>
            </div>

            {/* Brand Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {groupedBrands[letter].map((brand) => (
                <Link
                  key={brand.id}
                  href={`/brands/${
                    brand.slug || brand.name.toLowerCase().replace(/\s+/g, "-")
                  }`}
                  className="group"
                >
                  <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 bg-white h-full flex flex-col items-center justify-center text-center">
                    <h3 className="font-semibold text-lg group-hover:text-black-600 transition-colors">
                      {brand.name}
                    </h3>
                    {brand.product_count !== undefined && (
                      <p className="text-sm text-gray-600 mt-1">
                        ({brand.product_count})
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Back to Top */}
      <div className="mt-12 text-center">
        <a
          href="#"
          className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to Top
        </a>
      </div>
    </div>
  );
}
