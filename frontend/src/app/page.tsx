import Slider from "./_components/Slider";
import HomeBanner from './_components/HomeBanner';
import CategoryBanner from './_components/CategoryBanner';
import TopProducts from './_components/NewProducts';
import { Testimonials } from "./_components/Testimonials";
import { getNewProducts } from "../lib/api";

export default async function Home() {
  const newProducts = await getNewProducts();

  return (
    <div>
      <Slider />
      <HomeBanner />
      <CategoryBanner/>
      <TopProducts products={newProducts.data} />
      <Testimonials />
    </div>
  );
}
