'use client'

import { useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

type Testimonial = {
  name: string
  role: string
  company: string
  content: string
  rating: number
}

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [current, setCurrent] = useState(0)
  const items = t.raw('items') as Testimonial[]

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length)
  const next = () => setCurrent((c) => (c + 1) % items.length)

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-electric-100 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-light/30 to-white pointer-events-none" />

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
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-primary mb-4">
            {t('title')}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Testimonial cards - Desktop: grid, Mobile: carousel */}
        <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'relative p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300',
                isRTL && 'text-right'
              )}
            >
              <Quote className={cn('w-8 h-8 text-electric-100 mb-4', isRTL && 'ms-auto')} />
              {/* Stars */}
              <div className={cn('flex gap-0.5 mb-3', isRTL && 'flex-row-reverse justify-end')}>
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-4">
                &ldquo;{item.content}&rdquo;
              </p>
              <div className={cn('flex items-center gap-3 pt-4 border-t border-slate-100', isRTL && 'flex-row-reverse')}>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric-500 to-cyan-400 flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold">{item.name[0]}</span>
                </div>
                <div>
                  <div className="text-brand-primary font-semibold text-sm">{item.name}</div>
                  <div className="text-slate-400 text-xs">{item.role} · {item.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: isRTL ? -60 : 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 60 : -60 }}
                transition={{ duration: 0.35 }}
                className={cn(
                  'p-6 bg-white border border-slate-100 shadow-sm rounded-2xl',
                  isRTL && 'text-right'
                )}
              >
                <Quote className={cn('w-8 h-8 text-electric-100 mb-4', isRTL && 'ms-auto')} />
                <div className={cn('flex gap-0.5 mb-3', isRTL && 'flex-row-reverse justify-end')}>
                  {Array.from({ length: items[current].rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  &ldquo;{items[current].content}&rdquo;
                </p>
                <div className={cn('flex items-center gap-3 pt-4 border-t border-slate-100', isRTL && 'flex-row-reverse')}>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric-500 to-cyan-400 flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold">{items[current].name[0]}</span>
                  </div>
                  <div>
                    <div className="text-brand-primary font-semibold text-sm">{items[current].name}</div>
                    <div className="text-slate-400 text-xs">{items[current].role} · {items[current].company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className={cn('flex items-center justify-between mt-5', isRTL && 'flex-row-reverse')}>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    'rounded-full transition-all duration-300',
                    i === current ? 'w-6 h-2 bg-electric-500' : 'w-2 h-2 bg-slate-200 hover:bg-slate-300'
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full border border-slate-200 hover:border-electric-300 hover:bg-electric-50 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className={cn('w-4 h-4 text-slate-400', isRTL && 'rotate-180')} />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full border border-slate-200 hover:border-electric-300 hover:bg-electric-50 flex items-center justify-center transition-colors"
              >
                <ChevronRight className={cn('w-4 h-4 text-slate-400', isRTL && 'rotate-180')} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
