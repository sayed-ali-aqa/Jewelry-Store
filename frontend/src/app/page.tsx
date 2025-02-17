import Slider from "@/components/Slider";
import HomeBanner from '@/components/HomeBanner'
import CategoryBanner from '@/components/CategoryBanner'

export default function Home() {
  return (
    <div className="">
      <Slider />

      <HomeBanner />

      <CategoryBanner />
    </div>
  );
}
