import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr', 'ar', 'en', 'es'],
  defaultLocale: 'fr',
  localePrefix: 'always',
})
