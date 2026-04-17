'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Satellite } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import AnnouncementBar from '@/components/sections/AnnouncementBar'
import { cn } from '@/lib/utils'

type NavbarProps = {
  /** Home page: announcement strip above the nav row inside the same fixed header */
  showAnnouncement?: boolean
}

export default function Navbar({ showAnnouncement = false }: NavbarProps) {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [announcementVisible, setAnnouncementVisible] = useState(true)
  const isRTL = locale === 'ar'

  const mobileMenuTop =
    showAnnouncement && announcementVisible ? 'top-28' : 'top-16'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/solutions', label: t('solutions') },
    { href: '/about', label: t('about') },
    { href: '/faq', label: t('faq') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {showAnnouncement && (
          <AnnouncementBar onVisibilityChange={setAnnouncementVisible} />
        )}
        <div
          className={cn(
            'transition-all duration-500',
            scrolled
              ? 'bg-brand-primary/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5'
              : 'bg-transparent'
          )}
        >
          <div className="container-custom">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-500 to-cyan-400 flex items-center justify-center shadow-glow-blue group-hover:scale-110 transition-transform duration-300">
                  <Satellite className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 live-dot" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                ELMO<span className="text-gradient">GPS</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className={cn('hidden md:flex items-center gap-1', isRTL && 'flex-row-reverse')}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === link.href
                      ? 'text-white bg-white/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className={cn('hidden md:flex items-center gap-3', isRTL && 'flex-row-reverse')}>
              <LanguageSwitcher />
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-electric-500 to-cyan-500 hover:from-electric-400 hover:to-cyan-400 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-glow-blue transition-all duration-300 hover:scale-105 hover:shadow-glow-cyan"
              >
                {t('getDemo')}
              </Link>
            </div>

            {/* Mobile toggle */}
            <div className="flex md:hidden items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={t('menu')}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={cn('fixed inset-x-0 z-40 md:hidden', mobileMenuTop)}
          >
            <div className="bg-brand-primary/98 backdrop-blur-xl border-b border-white/10 shadow-2xl">
              <nav className="container-custom py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all',
                        pathname === link.href
                          ? 'text-white bg-electric-500/20 border border-electric-500/30'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-2 pb-1"
                >
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-electric-500 to-cyan-500 text-white font-semibold text-sm px-5 py-3 rounded-xl w-full"
                  >
                    {t('getDemo')}
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
