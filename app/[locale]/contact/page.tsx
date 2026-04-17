import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import ContactForm from '@/components/sections/ContactForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return { title: `${t('title')} | ELMOGPS`, description: t('subtitle') }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'contact' })

  return (
    <main>
      <Navbar />
      <PageHero
        badge={t('badge')}
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <ContactForm />
      <Footer />
    </main>
  )
}
