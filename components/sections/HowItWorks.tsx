'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'motion/react'
import { Cpu, Wifi, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const stepIcons = [Cpu, Wifi, TrendingUp]
const stepColors = ['text-electric-400', 'text-cyan-400', 'text-teal-400']
const stepBgs = ['bg-electric-500/10 border-electric-500/20', 'bg-cyan-500/10 border-cyan-500/20', 'bg-teal-500/10 border-teal-500/20']

const stepKeys = ['install', 'connect', 'optimize'] as const

export default function HowItWorks() {
  const t = useTranslations('howItWorks')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-electric-200 to-transparent" />

      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
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

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className={cn(
            'absolute top-12 hidden lg:block h-0.5 bg-gradient-to-r from-electric-200 via-cyan-200 to-teal-200',
            isRTL ? 'right-[calc(16.67%+1.5rem)] left-[calc(16.67%+1.5rem)]' : 'left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)]'
          )} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {stepKeys.map((key, i) => {
              const Icon = stepIcons[i]
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={cn('flex flex-col items-center text-center', isRTL && 'items-center')}
                >
                  {/* Step circle */}
                  <div className="relative mb-6">
                    <div className={cn(
                      'w-24 h-24 rounded-full border-2 flex items-center justify-center',
                      stepBgs[i]
                    )}>
                      <Icon className={cn('w-9 h-9', stepColors[i])} />
                    </div>
                    {/* Step number */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-primary border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs font-bold leading-none">{i + 1}</span>
                    </div>
                  </div>

                  {/* Step number display */}
                  <div className={cn('text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r', {
                    'from-electric-200 to-electric-100': i === 0,
                    'from-cyan-200 to-cyan-100': i === 1,
                    'from-teal-200 to-teal-100': i === 2,
                  })}>
                    {t(`steps.${key}.number`)}
                  </div>

                  <h3 className="text-xl font-bold text-brand-primary mb-3">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                    {t(`steps.${key}.description`)}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
