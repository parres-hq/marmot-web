<script setup lang="ts">
import VPAutoLink from '@theme/VPAutoLink.vue'
import { useDarkMode } from '@theme/useDarkMode'
import { useData } from '@theme/useData'
import type { FunctionalComponent } from 'vue'
import { computed, h } from 'vue'
import { ClientOnly, withBase } from 'vuepress/client'
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js'

const { frontmatter, siteLocale } = useData<DefaultThemeHomePageFrontmatter>()
const isDarkMode = useDarkMode()

const heroText = computed(() => {
  if (frontmatter.value.heroText === null) {
    return null
  }

  return (
    frontmatter.value.heroText ||
    siteLocale.value.title
  )
})
const tagline = computed(() => {
  if (frontmatter.value.tagline === null) {
    return null
  }

  return (
    frontmatter.value.tagline ||
    siteLocale.value.description
  )
})
const taglineHtml = computed(() => frontmatter.value.taglineHtml)
const heroImage = computed(() => {
  if (isDarkMode.value && frontmatter.value.heroImageDark !== undefined) {
    return frontmatter.value.heroImageDark
  }
  return frontmatter.value.heroImage
})
const heroAlt = computed(() => siteLocale.value.title,)

const actions = computed(() => {
  if (!Array.isArray(frontmatter.value.actions)) {
    return []
  }

  return frontmatter.value.actions.map(({ type = 'primary', ...rest }) => ({
    type,
    ...rest,
  }))
})

const HomeHeroImage: FunctionalComponent = () => {
  if (!heroImage.value) return null

  const img = h('img', {
    class: 'vp-hero-image',
    src: withBase(heroImage.value),
    alt: heroAlt.value,
  })

  if (frontmatter.value.heroImageDark === undefined) {
    return img
  }

  // wrap hero image with <ClientOnly> to avoid ssr-mismatch
  // when using a different hero image in dark mode
  return h(ClientOnly, () => img)
}
</script>

<template>
  <header class="vp-hero">
    <div class="mm-container">
      <HomeHeroImage />
      <div class="mm-hero-content">
        <h1 v-if="heroText" id="main-title">
          {{ heroText }}
        </h1>

        <div v-if="taglineHtml" class="vp-hero-description" v-html="tagline"/>
        <div v-else class="vp-hero-description" v-text="tagline" />

        <div v-if="actions.length" class="vp-hero-actions">
          <VPAutoLink
            v-for="action in actions"
            :key="action.text"
            class="vp-hero-action-button"
            :class="[action.type]"
            :config="action"
          >
            <template #after>
              <img
                src="/images/arrow-right.svg"
                alt="→"
                style="margin-left: 0.5rem; width: 1em; height: 1em;">
            </template>
          </VPAutoLink>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/variables' as *;

.vp-hero {
  color: var(--mm-header-text);
  background: var(--mm-header-bg);
  transition: color var(--vp-t-color), background-color var(--vp-t-color);
  padding: 1.5rem var(--navbar-padding-h) 2.5rem;

  @media (min-width: ($MQMobile + 1)) {
    padding: 3rem var(--navbar-padding-h) 4rem;
  }

  .mm-container {
    display: flex;
    align-items: center;
    max-width: 39rem;
    margin: 0 auto;
    gap: 3rem;

    @media (max-width: $MQMobile) {
      flex-direction: column;
      gap: 1rem;
    }
  }

  #main-title {
    margin-top: 0;
  }
}

.vp-hero-image {
  display: block;
  max-width: 100%;
  height: calc(69px * 4);

  @media (max-width: $MQMobileNarrow) {
    height: calc(69px * 2);
    margin: 0 auto;
  }
  @media (min-width: ($MQMobileNarrow + 1)) and (max-width: $MQMobile) {
    height: calc(69px * 3);
  }
}

.vp-hero-description {
  font-size: 1.16rem;
  line-height: 1.21;
  max-width: 21em;
  margin: 0 auto 1.5rem;

  @media (max-width: $MQMobileNarrow) {
    font-size: 1.2rem;
  }
  @media (min-width: ($MQMobileNarrow + 1)) and (max-width: $MQMobile) {
    text-align: center;
  }

  p {
    margin: .5rem 0;

    span:nth-child(1) {
      color: var(--mm-lilac-500);
    }

    span:nth-child(2) {
      color: var(--mm-marine-500);
    }

    span:nth-child(3) {
      color: var(--mm-moss-500);
    }
  }
}

.vp-hero-actions {
  @media (min-width: ($MQMobileNarrow + 1)) and (max-width: $MQMobile) {
    text-align: center;
  }
}

.vp-hero-action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  padding: 0.5em 1.5em;
  border: 2px solid var(--vp-c-accent-bg);

  background-color: var(--vp-c-bg);
  color: var(--vp-c-accent);

  font-size: 1.2rem;

  transition: background-color border-color color var(--vp-t-color);

  @media (max-width: $MQMobileNarrow) {
    font-size: 1rem;
    width: 100%;
  }

  &:hover {
    background-color: var(--vp-c-accent-hover);
    color: var(--vp-c-accent-text);
  }

  &.primary {
    background-color: var(--vp-c-accent-bg);
    color: var(--vp-c-accent-text);

    &:hover {
      border-color: var(--vp-c-accent-hover);
      background-color: var(--vp-c-accent-hover);
    }
  }
}
</style>
