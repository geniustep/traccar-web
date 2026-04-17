'use client'

import { motion } from 'motion/react'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  badge?: string
  title: string
  subtitle: string
}

export default function PageHero({ badge, title, subtitle }: PageHeroProps) {
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
    <section className="relative pt-32 pb-20 bg-brand-primary overflow-hidden">
      <div className="absolute inset-0 map-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-electric-900/10 via-transparent to-brand-primary" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-electric-500/8 blur-3xl" />

      <div className="container-custom relative z-10 text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 bg-electric-500/10 border border-electric-500/20 text-electric-400 text-xs font-semibold px-3.5 py-1.5 rounded-full">
              {badge}
            </span>
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn('text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight', isRTL && 'text-center')}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white/55 text-lg leading-relaxed max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
