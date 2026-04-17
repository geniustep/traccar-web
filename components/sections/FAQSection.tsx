'use client'

import { useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { Plus, Minus } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type FAQItem = { question: string; answer: string }

export default function FAQSection({ limit }: { limit?: number }) {
  const t = useTranslations('faq')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [open, setOpen] = useState<number | null>(null)

  const items = (t.raw('items') as FAQItem[]).slice(0, limit)

  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
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

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={cn(
                  'w-full flex items-center justify-between gap-4 p-5 text-start transition-colors',
                  open === i ? 'bg-electric-50' : 'hover:bg-slate-50',
                  isRTL && 'text-right flex-row-reverse'
                )}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-brand-primary text-sm leading-snug">
                  {item.question}
                </span>
                <div className={cn(
                  'shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors',
                  open === i ? 'bg-electric-500 text-white' : 'bg-slate-100 text-slate-400'
                )}>
                  {open === i
                    ? <Minus className="w-3.5 h-3.5" />
                    : <Plus className="w-3.5 h-3.5" />
                  }
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className={cn('px-5 pb-5 text-slate-500 text-sm leading-relaxed', isRTL && 'text-right')}>
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        {limit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center mt-10"
          >
            <Link
              href="/faq"
              className={cn(
                'inline-flex items-center gap-2 text-electric-600 hover:text-electric-700 font-semibold text-sm transition-colors',
                isRTL && 'flex-row-reverse'
              )}
            >
              {t('viewAll')} →
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
