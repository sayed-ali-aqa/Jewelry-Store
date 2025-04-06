import Slider from "./_components/Slider";
import HomeBanner from './_components/HomeBanner';
import CategoryBanner from './_components/CategoryBanner';
import NewProducts from './_components/NewProducts';
import { Testimonials } from "./_components/Testimonials";

export default async function Home() {
  return (
    <div>
      <Slider />
      <HomeBanner />
      <CategoryBanner />
      <NewProducts />
      <Testimonials/>
    </div>
  );
}
