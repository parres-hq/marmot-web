import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { getDirname, path } from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export default defineUserConfig({
  bundler: viteBundler(),
  base: process.env.NODE_ENV === 'production' ? '/marmot-web/' : '/',
  lang: 'en-US',
  title: 'Marmot',
  description: 'Decentralized group messaging that protects people by encrypting content and metadata.',
  // https://vuejs.press/reference/config.html#head
  head: [
    ['link', { rel: 'stylesheet', href: '/fonts/zilla-slab.css' }],
    ['link', { rel: 'stylesheet', href: '/fonts/jetbrains-mono.css' }],
  ],
  theme: defaultTheme({
    // https://ecosystem.vuejs.press/themes/default/config.html
    logo: '/images/logo.svg',
    logoDark: '/images/logo-light.svg',
    navbar: [
      {
        text: 'Protocol',
        link: '/',
      },
      {
        text: 'Development Kit',
        link: '/development-kit',
      },
      {
        text: 'Community',
        link: '/community',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/marmot-protocol',
      },
      {
        text: 'Donate',
        link: '/donate',
      },
      {
        text: 'Contact',
        link: '/contact',
      },
    ],
    colorMode: 'light',
    colorModeSwitch: false,
    lastUpdated: false,
    contributors: false,
  }),
  // https://ecosystem.vuejs.press/themes/default/extending.html
  alias: {
    '@theme/VPNavbar.vue': path.resolve(__dirname, './components/Navbar.vue'),
    '@theme/VPHome.vue': path.resolve(__dirname, './components/Home.vue'),
    '@theme/VPHomeHero.vue': path.resolve(__dirname, './components/HomeHero.vue'),
    '@theme/VPHomeFeatures.vue': path.resolve(__dirname, './components/HomeFeatures.vue'),
  },
})
