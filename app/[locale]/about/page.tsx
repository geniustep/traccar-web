import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import AboutContent from '@/components/sections/AboutContent'
import Stats from '@/components/sections/Stats'
import ContactCTA from '@/components/sections/ContactCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.about' })
  return { title: `${t('title')} | ELMOGPS`, description: t('subtitle') }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'pages.about' })

  return (
    <main>
      <Navbar />
      <PageHero
        badge={t('title')}
        title={t('hero')}
        subtitle={t('subtitle')}
      />
      <AboutContent />
      <Stats />
      <ContactCTA />
      <Footer />
    </main>
  )
}
