'use client'

import { useRef, useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/utils'

function AnimatedCounter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value * 10) / 10)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {value % 1 === 0 ? Math.round(count) : count.toFixed(1)}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const t = useTranslations('stats')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const statsData = [
    t.raw('items.clients') as { value: number; suffix: string; label: string },
    t.raw('items.vehicles') as { value: number; suffix: string; label: string },
    t.raw('items.uptime') as { value: number; suffix: string; label: string },
    t.raw('items.fuel') as { value: number; suffix: string; label: string },
    t.raw('items.countries') as { value: number; suffix: string; label: string },
    t.raw('items.support') as { value: number; suffix: string; label: string },
  ]

  return (
    <section className="bg-brand-primary py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-electric-500/5 blur-3xl" />

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            {t('title')}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'flex flex-col items-center text-center p-5 rounded-2xl',
                'bg-white/5 border border-white/8 hover:border-electric-500/30',
                'hover:bg-white/8 transition-all duration-300 group'
              )}
            >
              <div className="text-3xl lg:text-4xl font-bold text-white group-hover:text-gradient-blue transition-colors duration-300 tabular-nums">
                {inView ? (
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <div className={cn(
                'text-white/45 text-xs leading-tight mt-2',
                isRTL ? 'text-center' : 'text-center'
              )}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
