import Hero from '@/components/HeroSection'
import LargePromotional from '@/components/LargePromotional'
import MarketingSection from '@/components/MarketingSection'
import FinancePromotional from '@/components/FinancePromotional'
import TestimonialSlider from '@/components/TestimonialSlider'



const page = () => {
  return (
    <section>
        <Hero/>
        <MarketingSection/>
        <LargePromotional />
        <FinancePromotional/>
        <TestimonialSlider/>
      
    </section>
  )
}

export default page