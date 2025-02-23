import Slider from "./_components/Slider";
import HomeBanner from './_components/HomeBanner'
import CategoryBanner from './_components/CategoryBanner'
import TopProducts from './_components/TopProducts'

export default function Home() {
  return (
    <div>
      <Slider />

      <HomeBanner />

      <CategoryBanner />

      <TopProducts />
    </div>
  );
}
