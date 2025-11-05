<script setup lang="ts">
import VPHomeFeatures from '@theme/VPHomeFeatures.vue'
import VPHomeHero from '@theme/VPHomeHero.vue'
import Footer from './Footer.vue'
import { Content } from 'vuepress/client'
</script>

<template>
  <main class="vp-home">
    <VPHomeHero />
    <VPHomeFeatures />
    <!--
    <div vp-content>
      <Content />
    </div>
    -->
    <Footer />
  </main>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/variables' as *;

.vp-home {
  padding-top: var(--navbar-height);

  [vp-content] {
    margin: 0;
    padding: 0;
  }
}
</style>
