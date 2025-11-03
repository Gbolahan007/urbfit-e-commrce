import Image from "next/image";
import Link from "next/link";

export default function HomeJoggers() {
  return (
    <div>
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
        <Link
          href="/trousers"
          className="block w-full h-full group cursor-pointer"
        >
          <div className="relative w-full h-full">
            <Image
              src="/homejoggers.webp"
              alt="Premium Joggers Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="100vw"
            />

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

            {/* Hero Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 sm:px-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                Premium Joggers
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-2xl opacity-90 drop-shadow-lg">
                Comfort meets style in our exclusive collection
              </p>
              <div className="bg-white text-black px-8 py-3 sm:px-10 sm:py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                Shop Trousers
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex justify-center items-center py-3">
        <h1 className="text-xl sm:text-3xl">NEW SEASON, NEW STYLES. YOU IN</h1>
      </div>
    </div>
  );
}
