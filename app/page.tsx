import ShopByCategory from "./components/ui/HomeSection/ShopBycategory";
import TopPicks from "./components/ui/HomeSection/TopPicks";
import TrendingNew from "./components/ui/HomeSection/TrendingNew";
import HomeJoggers from "./components/ui/HomeSection/HomeJoggers";
import DiscoverBrand from "./components/ui/HomeSection/DiscoverBrand";
import HomeMenWear from "./components/ui/HomeSection/HomeMenWear";
import HomeLogoDisplay from "./components/ui/HomeSection/HomeLogoDisplay";
import HeroVideo from "./components/ui/HomeSection/HeroVideo";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <div className="bg-white text-black">
      <HeroVideo />
      <div className="bg-[#f7f6f3]">
        <ShopByCategory />
        <div className="mt-2">
          <TopPicks />
        </div>
        <div className="mt-2">
          <TrendingNew />
        </div>
        <div className="mt-36">
          <HomeJoggers />
        </div>
        <div className="mt-5">
          <DiscoverBrand />
        </div>
        <div className="mt-8">
          <HomeMenWear />
        </div>
        <div className="mt-8">
          <HomeLogoDisplay />
        </div>
      </div>
    </div>
  );
}
