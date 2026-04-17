import { setRequestLocale } from 'next-intl/server'
import AnnouncementBar from '@/components/sections/AnnouncementBar'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import Services from '@/components/sections/Services'
import Stats from '@/components/sections/Stats'
import Features from '@/components/sections/Features'
import HowItWorks from '@/components/sections/HowItWorks'
import TrackingVisual from '@/components/sections/TrackingVisual'
import Industries from '@/components/sections/Industries'
import Testimonials from '@/components/sections/Testimonials'
import FAQSection from '@/components/sections/FAQSection'
import ContactCTA from '@/components/sections/ContactCTA'
import Footer from '@/components/layout/Footer'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <Stats />
      <Features />
      <HowItWorks />
      <TrackingVisual />
      <Industries />
      <Testimonials />
      <FAQSection limit={4} />
      <ContactCTA />
      <Footer />
    </main>
  )
}
