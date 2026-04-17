'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'motion/react'
import {
  Truck, Package, Car, GraduationCap,
  Building2, Shield, HardHat, Users
} from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const industryKeys = ['logistics', 'delivery', 'rental', 'school', 'corporate', 'security', 'construction', 'field'] as const
const icons = [Truck, Package, Car, GraduationCap, Building2, Shield, HardHat, Users]
const gradients = [
  'from-blue-600 to-blue-800',
  'from-electric-500 to-electric-700',
  'from-violet-600 to-violet-800',
  'from-amber-500 to-amber-700',
  'from-slate-600 to-slate-800',
  'from-red-600 to-red-800',
  'from-orange-600 to-orange-800',
  'from-teal-600 to-teal-800',
]

export default function Industries() {
  const t = useTranslations('industries')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-electric-50 border border-electric-100 text-electric-600 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-primary mb-4">
            {t('title')}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Industry cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industryKeys.map((key, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'group relative overflow-hidden rounded-2xl bg-white border border-slate-100',
                  'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer'
                )}
              >
                {/* Gradient header */}
                <div className={cn('h-20 bg-gradient-to-br flex items-center px-5', gradients[i])}>
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className={cn('p-5', isRTL && 'text-right')}>
                  <h3 className="text-base font-bold text-brand-primary mb-2">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {t(`items.${key}.description`)}
                  </p>
                </div>

                {/* Hover gradient overlay */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none',
                  gradients[i]
                )} />
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/solutions"
            className={cn(
              'group inline-flex items-center gap-2 bg-brand-primary hover:bg-navy-800 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg',
              isRTL && 'flex-row-reverse'
            )}
          >
            {t('badge')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
