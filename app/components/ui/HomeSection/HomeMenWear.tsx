import Image from "next/image";
import Link from "next/link";

export default function HomeMenWear() {
  return (
    <div>
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
        <Link
          href="/collection/men"
          className="block w-full h-full group cursor-pointer"
        >
          <div className="relative w-full h-full ">
            <Image
              src="/Menswear.webp"
              alt="Premium Joggers Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 hidden sm:block"
              priority
              sizes="100vw"
            />
            <Image
              src="/menwear-mobile.webp"
              alt="Premium Joggers Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 sm:hidden"
              priority
              sizes="100vw"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
