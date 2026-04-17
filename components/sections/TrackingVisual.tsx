'use client'

import { useRef, useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'motion/react'
import { MapPin, Navigation, Bell, FileText, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const featureKeys = ['live', 'history', 'alerts', 'reports'] as const
const featureIcons = [MapPin, Navigation, Bell, FileText]

const VEHICLES = [
  { id: 'V1', x: 25, y: 40, speed: 72, status: 'En route', color: '#22d3ee' },
  { id: 'V2', x: 60, y: 25, speed: 0, status: 'Arrêt', color: '#f59e0b' },
  { id: 'V3', x: 75, y: 65, speed: 55, status: 'En route', color: '#10b981' },
]

export default function TrackingVisual() {
  const t = useTranslations('tracking')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeVehicle, setActiveVehicle] = useState(0)
  const [vehiclePositions, setVehiclePositions] = useState(VEHICLES)

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setActiveVehicle((prev) => (prev + 1) % VEHICLES.length)
      setVehiclePositions((prev) =>
        prev.map((v, i) => ({
          ...v,
          x: i === 0 ? Math.min(85, v.x + (Math.random() - 0.3) * 3) :
             i === 2 ? Math.min(90, v.x + (Math.random() - 0.4) * 2) : v.x,
          y: i === 0 ? Math.max(15, Math.min(85, v.y + (Math.random() - 0.5) * 2)) :
             i === 2 ? Math.max(15, Math.min(80, v.y + (Math.random() - 0.6) * 2)) : v.y,
        }))
      )
    }, 2500)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <section className="section-padding bg-brand-primary relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 map-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 via-transparent to-brand-dark/30" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-electric-500/10 border border-electric-500/20 text-electric-400 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4">
            <Zap className="w-3 h-3" />
            {t('badge')}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Map Visual */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={cn('relative aspect-[4/3] rounded-2xl overflow-hidden', isRTL && 'order-2')}
          >
            {/* Map container */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-brand-dark">
              {/* Grid */}
              <div className="absolute inset-0 map-grid opacity-50" />

              {/* Route SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="r1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="r2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Routes */}
                <motion.path
                  d="M 30 180 C 80 140, 140 120, 200 100 C 260 80, 320 90, 350 60"
                  fill="none" stroke="url(#r1)" strokeWidth="2" strokeDasharray="8 5"
                  initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                  transition={{ delay: 0.8, duration: 2.5, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M 250 100 C 280 140, 290 180, 320 220"
                  fill="none" stroke="url(#r2)" strokeWidth="2" strokeDasharray="6 4"
                  initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                  transition={{ delay: 1.2, duration: 2, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M 60 80 C 100 100, 130 130, 100 170"
                  fill="none" stroke="rgba(251,191,36,0.4)" strokeWidth="2" strokeDasharray="6 4"
                  initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                  transition={{ delay: 1.5, duration: 1.5, ease: 'easeInOut' }}
                />
              </svg>

              {/* Vehicle markers */}
              {vehiclePositions.map((v, i) => (
                <motion.div
                  key={v.id}
                  animate={{ left: `${v.x}%`, top: `${v.y}%` }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setActiveVehicle(i)}
                >
                  <div className="relative">
                    {activeVehicle === i && (
                      <>
                        <div className="absolute inset-0 w-8 h-8 -translate-x-1/4 -translate-y-1/4 rounded-full border-2 border-current animate-ping opacity-50" style={{ color: v.color }} />
                        <div className="absolute inset-0 w-6 h-6 translate-x-0 translate-y-0 rounded-full border border-current opacity-30" style={{ color: v.color }} />
                      </>
                    )}
                    <div
                      className="relative w-5 h-5 rounded-full border-2 border-white/50 flex items-center justify-center"
                      style={{ backgroundColor: v.color }}
                    >
                      <Navigation className="w-2.5 h-2.5 text-white" />
                    </div>
                    {/* Tooltip */}
                    {activeVehicle === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-6 -top-2 bg-brand-dark/90 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1.5 whitespace-nowrap z-10"
                      >
                        <div className="text-white text-xs font-bold">{v.id}</div>
                        <div className="text-white/50 text-xs">{v.speed > 0 ? `${v.speed} km/h` : t('status')}</div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Live indicator */}
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-brand-dark/70 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500 live-dot" />
                <span className="text-white text-xs font-bold">{t('liveLabel')}</span>
                <span className="text-white/40 text-xs">• {vehiclePositions.length} {t('vehiclesOnline')}</span>
              </div>

              {/* Speed info card */}
              <motion.div
                key={activeVehicle}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-3 left-3 right-3 glass rounded-xl p-3"
              >
                <div className={cn('flex items-center justify-between', isRTL && 'flex-row-reverse')}>
                  <div className={isRTL ? 'text-right' : ''}>
                    <div className="text-white/50 text-xs">{t('speed')}</div>
                    <div className="text-xl font-bold" style={{ color: vehiclePositions[activeVehicle].color }}>
                      {vehiclePositions[activeVehicle].speed} km/h
                    </div>
                  </div>
                  <div className={cn('text-center', isRTL && 'text-center')}>
                    <div className="text-white/50 text-xs">{t('status')}</div>
                    <div className="text-white text-sm font-semibold">
                      {vehiclePositions[activeVehicle].speed > 0 ? t('enRoute') : vehiclePositions[activeVehicle].status}
                    </div>
                  </div>
                  <div className={isRTL ? 'text-left' : 'text-right'}>
                    <div className="text-white/50 text-xs">ID</div>
                    <div className="text-white text-sm font-bold">{vehiclePositions[activeVehicle].id}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature list */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={cn('space-y-4', isRTL && 'order-1')}
          >
            {featureKeys.map((key, i) => {
              const Icon = featureIcons[i]
              const isActive = activeVehicle % featureKeys.length === i
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  onClick={() => setActiveVehicle(i % VEHICLES.length)}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300',
                    isActive
                      ? 'bg-electric-500/15 border border-electric-500/30'
                      : 'bg-white/4 border border-white/6 hover:border-white/15',
                    isRTL && 'flex-row-reverse text-right'
                  )}
                >
                  <div className={cn(
                    'shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
                    isActive ? 'bg-electric-500 shadow-glow-blue' : 'bg-white/8'
                  )}>
                    <Icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-white/50')} />
                  </div>
                  <div>
                    <div className={cn('text-sm font-semibold', isActive ? 'text-white' : 'text-white/60')}>
                      {t(`features.${key}`)}
                    </div>
                  </div>
                  {isActive && (
                    <div className={cn('ms-auto shrink-0 w-2 h-2 rounded-full bg-electric-400 live-dot')} />
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
