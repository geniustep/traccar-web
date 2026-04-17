'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'motion/react'
import { Target, Monitor, Bell, Lock, Smartphone, Plug } from 'lucide-react'
import { cn } from '@/lib/utils'

const featureKeys = ['precision', 'dashboard', 'alerts', 'security', 'mobile', 'integration'] as const
const icons = [Target, Monitor, Bell, Lock, Smartphone, Plug]

export default function Features() {
  const t = useTranslations('features')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding bg-brand-primary relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-electric-900/20 via-transparent to-cyan-900/10" />

      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={cn(isRTL && 'order-2')}
          >
            <span className="inline-flex items-center gap-2 bg-electric-500/10 border border-electric-500/20 text-electric-400 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5">
              {t('badge')}
            </span>
            <h2 className={cn('text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight', isRTL && 'text-right')}>
              {t('title')}
            </h2>
            <p className={cn('text-white/55 text-lg leading-relaxed mb-10', isRTL && 'text-right')}>
              {t('subtitle')}
            </p>

            {/* Feature list */}
            <div className="space-y-5">
              {featureKeys.map((key, i) => {
                const Icon = icons[i]
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                    className={cn(
                      'flex items-start gap-4 p-4 rounded-xl bg-white/4 border border-white/6 hover:border-electric-500/20 hover:bg-white/6 transition-all duration-300',
                      isRTL && 'flex-row-reverse text-right'
                    )}
                  >
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-electric-500/15 border border-electric-500/20 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-electric-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">
                        {t(`items.${key}.title`)}
                      </h3>
                      <p className="text-white/45 text-sm leading-relaxed">
                        {t(`items.${key}.description`)}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={cn('relative', isRTL && 'order-1')}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Central glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-electric-500/10 blur-2xl animate-pulse" />
              </div>

              {/* Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full border border-electric-500/10 animate-[spin_30s_linear_infinite]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-52 h-52 rounded-full border border-cyan-400/15 animate-[spin_20s_linear_infinite_reverse]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border border-electric-500/20" />
              </div>

              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-electric-500 to-cyan-400 flex items-center justify-center shadow-glow-blue">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Orbiting feature icons */}
              {featureKeys.map((key, i) => {
                const angle = (i / featureKeys.length) * 2 * Math.PI - Math.PI / 2
                const radius = 130
                const x = 50 + (radius / 180) * 100 * Math.cos(angle)
                const y = 50 + (radius / 180) * 100 * Math.sin(angle)
                const Icon = icons[i]

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.4, type: 'spring' }}
                    className="absolute w-11 h-11 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="w-full h-full rounded-xl glass border border-electric-500/20 flex items-center justify-center hover:border-electric-400/40 hover:scale-110 transition-all duration-300 cursor-default group">
                      <Icon className="w-5 h-5 text-electric-400 group-hover:text-cyan-300 transition-colors" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
