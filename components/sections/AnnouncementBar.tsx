'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'motion/react'
import { X, Zap } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export default function AnnouncementBar() {
  const t = useTranslations('announcement')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const [visible, setVisible] = useState(true)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-electric-600 via-electric-500 to-cyan-500 overflow-hidden"
        >
          <div className={cn(
            'container-custom py-2 flex items-center justify-between gap-4',
            isRTL && 'flex-row-reverse'
          )}>
            <div className={cn('flex items-center gap-2 text-white text-xs sm:text-sm font-medium flex-1 justify-center', isRTL && 'flex-row-reverse')}>
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t('text')}</span>
              <Link
                href="/contact"
                className="underline underline-offset-2 hover:no-underline font-semibold whitespace-nowrap"
              >
                {t('cta')}
              </Link>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="shrink-0 text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
