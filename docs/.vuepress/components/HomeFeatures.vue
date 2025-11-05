<script setup lang="ts">
import { useData } from '@theme/useData'
import { computed } from 'vue'
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js'

const { frontmatter } = useData<DefaultThemeHomePageFrontmatter>()

const features = computed(() => frontmatter.value.features ?? [])
</script>

<template>
  <div v-if="features.length" class="vp-features">
    <div v-for="feature in features" :key="feature.title" class="vp-feature">
      <h2><span>{{ feature.title }}</span></h2>
      <p>{{ feature.details }}</p>
    </div>
  </div>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/variables' as *;

.vp-features {
  border-top: var(--mm-border);
}

.vp-feature {
  display: flex;
  border-bottom: var(--mm-border);

  &:nth-child(1) h2 {
    color: var(--mm-moss);
    background: var(--mm-moss-pale);
  }
  &:nth-child(2) h2 {
    color: var(--mm-lilac);
    background: var(--mm-lilac-pale);
  }
  &:nth-child(3) h2 {
    color: var(--mm-marine);
    background: var(--mm-marine-pale);
  }
  &:nth-child(4) h2 {
    color: var(--mm-pumpkin);
    background: var(--mm-pumpkin-pale);
  }
  &:nth-child(5) h2 {
    color: var(--mm-berry);
    background: var(--mm-berry-pale);
  }

  @media (max-width: $MQMobileNarrow) {
    flex-direction: column;
  }
  @media (min-width: ($MQMobileNarrow + 1)) {
    &:nth-child(2n) h2 {
      order: 1;
      border-inline-start: var(--mm-border);
    }
    &:nth-child(2n-1) h2 {
      border-inline-end: var(--mm-border);
      text-align: right;
    }
  }

  h2 {
    margin: 0;
    line-height: 1.2;
    font-weight: 700;
    border-bottom: none;

    @media (max-width: $MQMobileNarrow) {
      font-size: 1.5rem;
      border-bottom: var(--mm-border);
      padding: 3rem 1rem 1rem;
    }
    @media (min-width: ($MQMobileNarrow + 1)) {
      flex: 0 0 25%;
      font-size: 1.4rem;
      padding: 1.5rem;

      span {
        display: inline-block;
        max-width: 11rem;
      }
    }
  }

  p {
    margin: 0;

    @media (max-width: $MQMobileNarrow) {
      padding: 1rem 1rem 2rem;
    }
    @media (min-width: ($MQMobileNarrow + 1)) {
      padding: 1.5rem;
    }
  }
}
</style>
