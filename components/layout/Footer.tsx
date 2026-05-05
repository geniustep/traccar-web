'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Satellite, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SITE_PHONE_TEL, SITE_WHATSAPP_URL } from '@/lib/site-phone'

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  const isRTL = locale === 'ar'

  const footerSections = [
    {
      title: t('footer.links.company'),
      links: [
        { label: t('footer.company.about'), href: '/about' },
        { label: t('footer.company.careers'), href: '#' },
        { label: t('footer.company.press'), href: '#' },
        { label: t('footer.company.partners'), href: '#' },
      ],
    },
    {
      title: t('footer.links.services'),
      links: [
        { label: t('footer.services.tracking'), href: '/services' },
        { label: t('footer.services.fleet'), href: '/services' },
        { label: t('footer.services.alerts'), href: '/services' },
        { label: t('footer.services.reports'), href: '/services' },
      ],
    },
    {
      title: t('footer.links.support'),
      links: [
        { label: t('footer.support.docs'), href: '#' },
        { label: t('footer.support.contact'), href: '/contact' },
        { label: t('footer.support.faq'), href: '/faq' },
        { label: t('footer.support.status'), href: '#' },
      ],
    },
    {
      title: t('footer.links.legal'),
      links: [
        { label: t('footer.legal.privacy'), href: '#' },
        { label: t('footer.legal.terms'), href: '#' },
        { label: t('footer.legal.cookies'), href: '#' },
        { label: t('footer.legal.rgpd'), href: '#' },
      ],
    },
  ]

  return (
    <footer className="bg-brand-dark border-t border-white/5">
      {/* Main footer content */}
      <div className="container-custom py-16">
        <div className={cn('grid grid-cols-1 lg:grid-cols-5 gap-10', isRTL && 'text-right')}>
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric-500 to-cyan-400 flex items-center justify-center shadow-glow-blue">
                <Satellite className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                ELMO<span className="text-gradient">GPS</span>
              </span>
            </Link>

            <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>

            {/* Contact info */}
            <div className={cn('mt-6 space-y-3', isRTL && 'items-end')}>
              <a
                href={`tel:${SITE_PHONE_TEL}`}
                className={cn(
                  'flex items-center gap-3 text-white/50 hover:text-electric-400 text-sm transition-colors',
                  isRTL && 'flex-row-reverse justify-end'
                )}
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>{t('contact.info.phone')}</span>
              </a>
              <a
                href={`mailto:${t('contact.info.email')}`}
                className={cn(
                  'flex items-center gap-3 text-white/50 hover:text-electric-400 text-sm transition-colors',
                  isRTL && 'flex-row-reverse justify-end'
                )}
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>{t('contact.info.email')}</span>
              </a>
              <div
                className={cn(
                  'flex items-start gap-3 text-white/50 text-sm',
                  isRTL && 'flex-row-reverse justify-end'
                )}
              >
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{t('contact.info.address')}</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'mt-5 inline-flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 hover:border-green-500/40 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300',
                isRTL && 'flex-row-reverse'
              )}
            >
              <MessageCircle className="w-4 h-4" />
              {t('contact.info.whatsapp')}
            </a>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href as '/'}
                      className="text-white/45 hover:text-electric-400 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className={cn(
          'container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3',
          isRTL && 'flex-row-reverse'
        )}>
          <p className="text-white/30 text-xs">{t('footer.copyright')}</p>
          <p className="text-white/30 text-xs">{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  )
}
