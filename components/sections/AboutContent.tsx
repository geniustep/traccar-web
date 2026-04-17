'use client'

import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'motion/react'
import { Target, Eye, Lightbulb, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const values = [
  { icon: Target, label: 'Précision', desc: 'Chaque donnée, chaque trajet, chaque alerte — avec une précision sans compromis.' },
  { icon: Lightbulb, label: 'Innovation', desc: 'Toujours à la pointe de la technologie GPS pour offrir le meilleur à nos clients.' },
  { icon: Users, label: 'Service', desc: 'Un support humain, disponible 24/7, réactif et véritablement à votre écoute.' },
  { icon: Eye, label: 'Transparence', desc: 'Tarification claire, données sécurisées, aucune surprise — une relation de confiance totale.' },
]

const team = [
  { name: 'Ahmed El Moussaoui', role: 'CEO & Fondateur', initial: 'A' },
  { name: 'Sara Benali', role: 'CTO', initial: 'S' },
  { name: 'Youssef Kadiri', role: 'Directeur Commercial', initial: 'Y' },
  { name: 'Nora Hassani', role: 'Responsable Support', initial: 'N' },
]

export default function AboutContent() {
  const t = useTranslations('pages.about')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref}>
      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className={cn('p-8 rounded-2xl bg-gradient-to-br from-electric-50 to-cyan-50/50 border border-electric-100', isRTL && 'text-right')}
            >
              <div className="w-12 h-12 rounded-xl bg-electric-100 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-electric-600" />
              </div>
              <h3 className="text-2xl font-bold text-brand-primary mb-3">{t('mission')}</h3>
              <p className="text-slate-600 leading-relaxed">{t('missionText')}</p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              className={cn('p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-brand-light/30 border border-slate-100', isRTL && 'text-right')}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-brand-primary mb-3">{t('vision')}</h3>
              <p className="text-slate-600 leading-relaxed">{t('visionText')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className={cn('text-2xl font-bold text-brand-primary mb-10 text-center')}
          >
            {t('values')}
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={cn(
                    'p-6 rounded-2xl bg-white border border-slate-100 text-center hover:shadow-md transition-shadow',
                    isRTL && 'text-center'
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-electric-50 mx-auto flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-electric-500" />
                  </div>
                  <h4 className="font-bold text-brand-primary mb-2">{v.label}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{v.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-brand-primary mb-3">{t('team')}</h2>
            <p className="text-slate-500">{t('teamSubtitle')}</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-electric-500 to-cyan-400 flex items-center justify-center mx-auto mb-3 text-xl font-bold text-white shadow-glow-blue">
                  {member.initial}
                </div>
                <div className="font-semibold text-brand-primary text-sm">{member.name}</div>
                <div className="text-slate-400 text-xs mt-0.5">{member.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
