import Hero from '@/components/HeroSection'
import LargePromotional from '@/components/LargePromotional'
import MarketingSection from '@/components/MarketingSection'
import FinancePromotional from '../../components/FinancePromotional'



const page = () => {
  return (
    <section>
        <Hero/>
        <MarketingSection/>
        <LargePromotional />
        <FinancePromotional/>
      
    </section>
  )
}

export default page