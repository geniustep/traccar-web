'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'motion/react'
import { ArrowRight, Play, Shield, Zap, Globe2, Clock } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const PING_POINTS = [
  { x: '20%', y: '35%', delay: 0 },
  { x: '55%', y: '20%', delay: 0.8 },
  { x: '75%', y: '55%', delay: 1.6 },
  { x: '35%', y: '65%', delay: 2.4 },
]

const ROUTE_COORDS = 'M 80 280 C 120 220, 180 200, 240 160 C 300 120, 360 140, 420 100'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const isRTL = locale === 'ar'

  const stats = [
    { icon: Shield, value: t('stat1.value'), label: t('stat1.label') },
    { icon: Zap, value: t('stat2.value'), label: t('stat2.label') },
    { icon: Globe2, value: t('stat3.value'), label: t('stat3.label') },
    { icon: Clock, value: t('stat4.value'), label: t('stat4.label') },
  ]

  return (
    <section className="relative min-h-screen bg-brand-primary overflow-hidden flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 map-grid opacity-100" />
        <div className="absolute inset-0 bg-hero-gradient" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-electric-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-400/8 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10 pt-36 pb-20">
        <div className={cn('grid lg:grid-cols-2 gap-12 lg:gap-16 items-center', isRTL && 'lg:grid-cols-2')}>

          {/* Left: Content */}
          <div className={cn('space-y-8', isRTL && 'order-2 lg:order-2')}>

            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2"
            >
              <span className="flex items-center gap-2 bg-electric-500/10 border border-electric-500/20 text-electric-400 text-xs font-semibold px-3.5 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-400 live-dot" />
                {t('badge')}
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-2">
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
              >
                {t('headline1')}
              </motion.h1>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
              >
                <span className="text-gradient-blue">{t('headline2')}</span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white/90 leading-[1.1] tracking-tight"
              >
                {t('headline3')}
              </motion.h1>
            </div>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="text-white/60 text-lg leading-relaxed max-w-xl"
            >
              {t('subheadline')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className={cn('flex flex-wrap gap-4', isRTL && 'flex-row-reverse')}
            >
              <Link
                href="/contact"
                className={cn(
                  'group inline-flex items-center gap-2 bg-gradient-to-r from-electric-500 to-cyan-500',
                  'hover:from-electric-400 hover:to-cyan-400 text-white font-semibold px-6 py-3.5 rounded-xl',
                  'shadow-glow-blue hover:shadow-glow-cyan transition-all duration-300 hover:scale-105',
                  isRTL && 'flex-row-reverse'
                )}
              >
                {t('cta1')}
                <ArrowRight className={cn('w-4 h-4 group-hover:translate-x-1 transition-transform', isRTL && 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0')} />
              </Link>
              <Link
                href="/solutions"
                className={cn(
                  'group inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10',
                  'hover:border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-300',
                  isRTL && 'flex-row-reverse'
                )}
              >
                <Play className="w-4 h-4 text-electric-400" />
                {t('cta2')}
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
              className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className={cn(
                    'flex flex-col items-center text-center p-3 rounded-xl bg-white/5 border border-white/8',
                    isRTL && 'items-center'
                  )}
                >
                  <Icon className="w-4 h-4 text-electric-400 mb-1.5" />
                  <div className="text-xl font-bold text-white">{value}</div>
                  <div className="text-white/40 text-xs leading-tight mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Tracking Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: isRTL ? -40 : 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
            className={cn('relative', isRTL && 'order-1 lg:order-1')}
          >
            <div className="relative aspect-[4/3] max-w-lg mx-auto">
              {/* Main dashboard card */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-navy-900/90 to-brand-dark border border-white/10 shadow-2xl overflow-hidden">

                {/* Map background */}
                <div className="absolute inset-0 map-grid opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />

                {/* Header bar */}
                <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-3 bg-brand-dark/40 backdrop-blur-sm border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-electric-400 live-dot" />
                    <span className="text-white/80 text-xs font-semibold">{t('liveTracking')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 live-dot" />
                    <span className="text-green-400 text-xs font-medium">8 {t('activeVehicles')}</span>
                  </div>
                </div>

                {/* Route path SVG */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 500 340"
                  preserveAspectRatio="xMidYMid slice"
                >
                  {/* Animated route */}
                  <motion.path
                    d={ROUTE_COORDS}
                    fill="none"
                    stroke="url(#routeGrad)"
                    strokeWidth="2.5"
                    strokeDasharray="8 4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 2.5, ease: 'easeInOut' }}
                  />
                  <defs>
                    <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* Second route */}
                  <motion.path
                    d="M 350 200 C 370 160, 400 140, 430 100"
                    fill="none"
                    stroke="rgba(34,211,238,0.4)"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.5, duration: 2, ease: 'easeInOut' }}
                  />
                </svg>

                {/* Ping points */}
                {PING_POINTS.map((point, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: point.x, top: point.y }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2 + point.delay, duration: 0.4 }}
                  >
                    <div className="relative w-3 h-3 -translate-x-1/2 -translate-y-1/2">
                      <div className="absolute inset-0 rounded-full bg-electric-400 animate-ping opacity-75" style={{ animationDelay: `${point.delay}s` }} />
                      <div className="relative w-3 h-3 rounded-full bg-electric-400 border-2 border-white/30" />
                    </div>
                  </motion.div>
                ))}

                {/* Vehicle cards */}
                <div className="absolute bottom-4 inset-x-4 grid grid-cols-2 gap-2">
                  {[0, 1].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8 + i * 0.15 }}
                      className="glass rounded-xl p-2.5"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className={cn('w-2 h-2 rounded-full', i === 0 ? 'bg-green-400' : 'bg-electric-400')} />
                        <span className="text-white/90 text-xs font-semibold truncate">
                          {i === 0 ? t('vehicleLabels.0') : t('vehicleLabels.1')}
                        </span>
                      </div>
                      <div className="text-electric-400 text-xs font-medium">
                        {i === 0 ? '68 km/h' : '0 km/h'}
                      </div>
                      <div className="text-white/40 text-xs truncate">
                        {i === 0 ? t('vehicleStatuses.0') : t('vehicleStatuses.3')}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating speed card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.2, duration: 0.5 }}
                className={cn(
                  'absolute -left-8 top-1/3 glass rounded-xl p-3 shadow-xl',
                  isRTL && '-right-8 left-auto'
                )}
              >
                <div className="text-white/50 text-xs mb-0.5">{t('stat3.label')}</div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-green-400 text-xs font-medium">↑ Uptime</div>
              </motion.div>

              {/* Floating alert card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.5, duration: 0.5 }}
                className={cn(
                  'absolute -right-8 bottom-1/3 glass rounded-xl p-3 shadow-xl',
                  isRTL && '-left-8 right-auto'
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-3.5 h-3.5 text-electric-400" />
                  <span className="text-white/60 text-xs">Alerte active</span>
                </div>
                <div className="text-white text-sm font-semibold">Zone franchie</div>
                <div className="text-electric-400 text-xs">Il y a 2 min</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
