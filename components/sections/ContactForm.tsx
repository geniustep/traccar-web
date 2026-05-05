'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'motion/react'
import { Send, Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SITE_PHONE_TEL, SITE_WHATSAPP_URL } from '@/lib/site-phone'

export default function ContactForm() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      })
      if (!res.ok) throw new Error('request_failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setStatus((s) => (s === 'error' ? 'idle' : s))
  }

  const inputClass = cn(
    'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-brand-primary placeholder-slate-300',
    'focus:outline-none focus:ring-2 focus:ring-electric-400 focus:border-transparent transition-all text-sm',
    isRTL && 'text-right'
  )

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={cn('lg:col-span-2 space-y-6', isRTL && 'order-2 text-right')}
          >
            <div>
              <span className="inline-flex items-center gap-2 bg-electric-50 border border-electric-100 text-electric-600 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4">
                {t('badge')}
              </span>
              <h2 className="text-3xl font-bold text-brand-primary mb-3">{t('title')}</h2>
              <p className="text-slate-500 leading-relaxed">{t('subtitle')}</p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {[
                { icon: Phone, value: t('info.phone'), href: `tel:${SITE_PHONE_TEL}` },
                { icon: Mail, value: t('info.email'), href: `mailto:${t('info.email')}` },
                { icon: MapPin, value: t('info.address'), href: '#' },
                { icon: Clock, value: t('info.hours'), href: '#' },
              ].map(({ icon: Icon, value, href }) => (
                <a
                  key={value}
                  href={href}
                  className={cn(
                    'flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-electric-200 hover:shadow-sm transition-all group',
                    isRTL && 'flex-row-reverse'
                  )}
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-electric-50 flex items-center justify-center group-hover:bg-electric-100 transition-colors">
                    <Icon className="w-4 h-4 text-electric-500" />
                  </div>
                  <span className="text-slate-600 text-sm leading-relaxed">{value}</span>
                </a>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-100 hover:bg-green-100 transition-all',
                isRTL && 'flex-row-reverse text-right'
              )}
            >
              <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-semibold text-green-700 text-sm">{t('info.whatsapp')}</div>
                <div className="text-green-500 text-xs">Réponse rapide garantie</div>
              </div>
            </a>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={cn('lg:col-span-3', isRTL && 'order-1')}
          >
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-primary mb-2">
                    {t('form.success')}
                  </h3>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={cn('block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide', isRTL && 'text-right')}>
                        {t('form.name')}
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t('form.namePlaceholder')}
                        className={inputClass}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    </div>
                    <div>
                      <label className={cn('block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide', isRTL && 'text-right')}>
                        {t('form.email')}
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t('form.emailPlaceholder')}
                        className={inputClass}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={cn('block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide', isRTL && 'text-right')}>
                        {t('form.phone')}
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={t('form.phonePlaceholder')}
                        className={inputClass}
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className={cn('block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide', isRTL && 'text-right')}>
                        {t('form.company')}
                      </label>
                      <input
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder={t('form.companyPlaceholder')}
                        className={inputClass}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={cn('block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide', isRTL && 'text-right')}>
                      {t('form.message')}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t('form.messagePlaceholder')}
                      className={cn(inputClass, 'resize-none')}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>

                  {status === 'error' && (
                    <p
                      role="alert"
                      className={cn('text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3', isRTL && 'text-right')}
                    >
                      {t('form.error')}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 bg-gradient-to-r from-electric-500 to-cyan-500',
                      'hover:from-electric-400 hover:to-cyan-400 text-white font-semibold py-3.5 rounded-xl',
                      'shadow-glow-blue hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-70',
                      isRTL && 'flex-row-reverse'
                    )}
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t('form.submitting')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t('form.submit')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
