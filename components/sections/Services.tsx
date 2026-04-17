'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'motion/react'
import {
  MapPin, LayoutDashboard, History, Hexagon,
  Bell, Car, Package, BarChart3, ArrowRight
} from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const icons = [MapPin, LayoutDashboard, History, Hexagon, Bell, Car, Package, BarChart3]
const colors = [
  'from-electric-500/20 to-electric-600/5 border-electric-500/20',
  'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20',
  'from-blue-500/20 to-blue-600/5 border-blue-500/20',
  'from-violet-500/20 to-violet-600/5 border-violet-500/20',
  'from-electric-500/20 to-electric-600/5 border-electric-500/20',
  'from-teal-500/20 to-teal-600/5 border-teal-500/20',
  'from-sky-500/20 to-sky-600/5 border-sky-500/20',
  'from-indigo-500/20 to-indigo-600/5 border-indigo-500/20',
]
const iconColors = [
  'text-electric-400', 'text-cyan-400', 'text-blue-400', 'text-violet-400',
  'text-electric-400', 'text-teal-400', 'text-sky-400', 'text-indigo-400',
]

const serviceKeys = ['realtime', 'fleet', 'history', 'geofencing', 'alerts', 'driver', 'assets', 'reports'] as const

export default function Services() {
  const t = useTranslations('services')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="services">
      {/* Subtle background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-electric-200 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-light/50 to-white pointer-events-none" />

      <div className="container-custom relative z-10" ref={ref}>
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
          <h2 className={cn('text-3xl lg:text-4xl font-bold text-brand-primary mb-4', isRTL && 'text-right sm:text-center')}>
            {t('title')}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceKeys.map((key, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'group relative p-6 rounded-2xl border bg-gradient-to-br transition-all duration-300',
                  'hover:shadow-card-hover hover:-translate-y-1 cursor-pointer',
                  colors[i]
                )}
              >
                {/* Icon */}
                <div className={cn(
                  'w-11 h-11 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm',
                  'group-hover:scale-110 transition-transform duration-300'
                )}>
                  <Icon className={cn('w-5 h-5', iconColors[i])} />
                </div>

                {/* Content */}
                <h3 className={cn('text-base font-bold text-brand-primary mb-2', isRTL && 'text-right')}>
                  {t(`items.${key}.title`)}
                </h3>
                <p className={cn('text-slate-500 text-sm leading-relaxed', isRTL && 'text-right')}>
                  {t(`items.${key}.description`)}
                </p>

                {/* Hover arrow */}
                <div className={cn(
                  'mt-4 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300',
                  iconColors[i],
                  isRTL && 'flex-row-reverse'
                )}>
                  {t('learnMore')}
                  <ArrowRight className={cn('w-3.5 h-3.5 group-hover:translate-x-1 transition-transform', isRTL && 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0')} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className={cn(
              'group inline-flex items-center gap-2 bg-brand-primary hover:bg-navy-800 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg',
              isRTL && 'flex-row-reverse'
            )}
          >
            {t('viewAll')}
            <ArrowRight className={cn('w-4 h-4 group-hover:translate-x-1 transition-transform', isRTL && 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0')} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
