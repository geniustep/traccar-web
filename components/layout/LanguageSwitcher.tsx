'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { motion, AnimatePresence } from 'motion/react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const localeConfig = {
  fr: { label: 'Français', flag: '🇫🇷', short: 'FR' },
  ar: { label: 'العربية', flag: '🇲🇦', short: 'AR' },
  en: { label: 'English', flag: '🇬🇧', short: 'EN' },
  es: { label: 'Español', flag: '🇪🇸', short: 'ES' },
} as const

type Locale = keyof typeof localeConfig

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
    setOpen(false)
  }

  const current = localeConfig[locale]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
          'text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10'
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{current.flag}</span>
        <span className="text-xs font-semibold">{current.short}</span>
        <ChevronDown
          className={cn('w-3 h-3 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full mt-2 end-0 w-44 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-brand-primary/95 backdrop-blur-xl z-50"
            role="listbox"
          >
            {routing.locales.map((loc) => {
              const config = localeConfig[loc as Locale]
              const isActive = loc === locale
              return (
                <button
                  key={loc}
                  onClick={() => handleChange(loc as Locale)}
                  role="option"
                  aria-selected={isActive}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                    isActive
                      ? 'bg-electric-500/20 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <span className="text-base">{config.flag}</span>
                  <span className="flex-1 text-start font-medium">{config.label}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-electric-400" />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
