'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'motion/react'
import { Award, Clock, Wifi, Shield, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function TrustBar() {
  const t = useTranslations('trust')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const badges = [
    { icon: Award, key: 'certified' },
    { icon: Clock, key: 'support' },
    { icon: Wifi, key: 'uptime' },
    { icon: Shield, key: 'secure' },
    { icon: Zap, key: 'realtime' },
  ] as const

  return (
    <section className="py-12 bg-white border-b border-slate-100 relative z-10" ref={ref}>
      <div className="container-custom">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-slate-400 text-xs font-semibold uppercase tracking-widest mb-6"
        >
          {t('title')}
        </motion.p>

        <div className={cn(
          'flex flex-wrap items-center justify-center gap-6 md:gap-10',
          isRTL && 'flex-row-reverse'
        )}>
          {badges.map(({ icon: Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={cn(
                'flex items-center gap-2.5 text-slate-500',
                isRTL && 'flex-row-reverse'
              )}
            >
              <div className="w-8 h-8 rounded-lg bg-electric-50 border border-electric-100 flex items-center justify-center">
                <Icon className="w-4 h-4 text-electric-500" />
              </div>
              <span className="text-sm font-medium">{t(`badges.${key}`)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
