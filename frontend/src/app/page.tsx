import Slider from "./_components/Slider";
import HomeBanner from './_components/HomeBanner'
import CategoryBanner from './_components/CategoryBanner'
import TopProducts from './_components/TopProducts'
import { Reviews } from "./_components/Reviews";

export default function Home() {
  return (
    <div>
      <Slider />

      <HomeBanner />

      <CategoryBanner />

      <TopProducts />

      <Reviews />
    </div>
  );
}
