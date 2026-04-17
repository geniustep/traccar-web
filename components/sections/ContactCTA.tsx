'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'motion/react'
import { ArrowRight, Phone, MessageCircle } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export default function ContactCTA() {
  const t = useTranslations('contact.cta')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 relative overflow-hidden bg-brand-primary" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-electric-500/10 blur-3xl" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-electric-500/50 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={cn('max-w-3xl mx-auto text-center', isRTL && 'text-center')}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            {t('title')}
          </h2>
          <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {t('subtitle')}
          </p>

          <div className={cn('flex flex-col sm:flex-row items-center justify-center gap-4', isRTL && 'flex-row-reverse')}>
            <Link
              href="/contact"
              className={cn(
                'group inline-flex items-center gap-2 bg-gradient-to-r from-electric-500 to-cyan-500',
                'hover:from-electric-400 hover:to-cyan-400 text-white font-bold px-8 py-4 rounded-xl',
                'shadow-glow-blue hover:shadow-glow-cyan transition-all duration-300 hover:scale-105 text-lg',
                isRTL && 'flex-row-reverse'
              )}
            >
              {t('primary')}
              <ArrowRight className={cn('w-5 h-5 group-hover:translate-x-1 transition-transform', isRTL && 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0')} />
            </Link>

            <a
              href="https://wa.me/212500000000"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group inline-flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20',
                'border border-green-500/30 hover:border-green-500/50 text-green-400 hover:text-green-300',
                'font-semibold px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105',
                isRTL && 'flex-row-reverse'
              )}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>

            <a
              href="tel:+212500000000"
              className={cn(
                'group inline-flex items-center gap-2 bg-white/5 hover:bg-white/10',
                'border border-white/10 hover:border-white/20 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300',
                isRTL && 'flex-row-reverse'
              )}
            >
              <Phone className="w-5 h-5 text-electric-400" />
              {t('secondary')}
            </a>
          </div>

          {/* Trust micro-badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={cn('mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3', isRTL && 'flex-row-reverse')}
          >
            {['✓ Démo gratuite', '✓ Sans engagement', '✓ Support inclus', '✓ Installation rapide'].map((badge) => (
              <span key={badge} className="text-white/35 text-sm font-medium">
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
