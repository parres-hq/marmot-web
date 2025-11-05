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

const heroText = computed(() => frontmatter.value.heroText || siteLocale.value.title)
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
    <HomeHeroImage />

    <p v-if="heroText" class="vp-hero-description">
      {{ heroText }}
    </p>

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
  </header>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/variables' as *;

.vp-hero {
  text-align: center;
  background: var(--mm-ground-50);
  padding-top: 2rem;
}

.vp-hero-image {
  display: block;
  max-width: 100%;
  max-height: 207px;
  margin: 0 auto 1.5rem;

  @media (max-width: $MQMobileNarrow) {
    max-height: 138px;
    margin: 0 auto 1rem;
  }
}

.vp-hero-description {
  --spacing: 1.5rem;
  margin: var(--spacing) auto;
  padding: 0 var(--spacing);

  @media (max-width: $MQMobileNarrow) {
    --spacing: 1rem;
  }
}

.vp-hero-description {
  font-size: 1.16rem;
  line-height: 1.21;
  max-width: 30rem;
  color: var(--mm-ground-800);

  @media (max-width: $MQMobileNarrow) {
    font-size: 1.2rem;
  }
}

.vp-hero-actions {
  display: flex;
  gap: 1rem;
  background: url('/images/bg-ground.svg');
  background-size: 41rem;

  @media (max-width: $MQMobileNarrow) {
    justify-content: center;
    padding-bottom: 5rem;
    background-size: 45rem;
    background-position-y: bottom;
  }
  @media (min-width: ($MQMobileNarrow + 1)) {
    justify-content: end;
    border-top: var(--mm-border);
    background-size: 50rem;
  }
}

.vp-hero-action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-accent);
  font-size: 1.2rem;
  transition: background-color border-color color var(--vp-t-color);
  text-wrap: nowrap;

  @media (max-width: $MQMobileNarrow) {
    width: 100%;
    padding: 1rem;
  }
  @media (min-width: ($MQMobileNarrow + 1)) {
    flex: 0 0 25%;
    padding: 2rem 1.5rem;
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
