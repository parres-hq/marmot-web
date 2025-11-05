<script setup lang="ts">
import VPAutoLink from '@theme/VPAutoLink.vue'
import { useData } from '@theme/useData'
import type { FunctionalComponent } from 'vue'
import { computed, ref, h } from 'vue'
import { ClientOnly, RouteLink, withBase } from 'vuepress/client'
import { useNavbarConfig } from '@theme/useNavbarConfig'
import { useNavbarRepo } from '@theme/useNavbarRepo'

const navbarConfig = useNavbarConfig()
const navbarRepo = useNavbarRepo()

const navfootLinks = computed(() => [
  ...navbarConfig.value,
  ...navbarRepo.value,
])

const { routeLocale, siteLocale, themeLocale } = useData()

const navfootBrandLink = computed(
  () => themeLocale.value.home || routeLocale.value,
)
const navfootBrandTitle = computed(() => siteLocale.value.title)
const navfootBrandLogo = computed(() => {
  if (themeLocale.value.logoDark !== undefined) {
    return themeLocale.value.logoDark
  }
  return themeLocale.value.logo
})
const navfootBrandLogoAlt = computed(
  () => themeLocale.value.logoAlt ?? navfootBrandTitle.value,
)
const NavfootBrandLogo: FunctionalComponent = () => {
  if (!navfootBrandLogo.value) return null
  const img = h('img', {
    class: 'vp-site-logo',
    src: withBase(navfootBrandLogo.value),
    alt: navfootBrandLogoAlt.value,
  })
  if (themeLocale.value.logoDark === undefined) {
    return img
  }
  // wrap brand logo with <ClientOnly> to avoid ssr-mismatch
  // when using a different brand logo in dark mode
  return h(ClientOnly, () => img)
}
</script>

<template>
  <div class="mm-footer">
    <nav
      v-if="navfootLinks.length"
      class="navfoot-items"
    >
      <div v-for="item in navfootLinks" :key="item.text" class="navfoot-item">
        <VPAutoLink :config="item" />
      </div>
    </nav>
    <div class="bottom">
      <div class="copyright">
        <span>©2025 Internet Privacy Foundation. </span>
        <span>All rights reserved.</span>
      </div>
      <RouteLink :to="navfootBrandLink">
        <NavfootBrandLogo />
      </RouteLink>
    </div>
  </div>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/variables' as *;

.mm-footer {
  background: var(--mm-gray-50);
  color: var(--mm-gray-600);
}

.mm-footer:before {
  content: '';
  display: block;
  width: 100%;
  background: url('/images/bg-ground.svg');
  border-top: var(--mm-border);
  border-bottom: var(--mm-border);

  @media (max-width: $MQMobileNarrow) {
    justify-content: center;
    height: 5rem;
    background-size: 45rem;
    background-position-y: bottom;
  }
  @media (min-width: ($MQMobileNarrow + 1)) {
    justify-content: end;
    background-size: 50rem;
    height: 5.5rem;
  }
}

.vp-home .mm-footer:before {
  border-top: none;
}

.navfoot-items {
  display: flex;
  flex-direction: column;
  gap: .75rem;
  padding: 3rem var(--navbar-padding-h) 1rem;
}

.navfoot-item {
  .auto-link {
    color: var(--mm-gray-800);
    &:hover,
    &.route-link-active {
      color: var(--mm-gray-900);
    }
    &.external-link::after  {
      display: none;
    }
  }
}

.bottom {
  display: flex;
  justify-content: space-between;
  padding: 1rem var(--navbar-padding-h) 3rem;
  gap: 1rem;

  @media (max-width: $MQNarrow) {
    flex-direction: column;
    padding-bottom: 2rem;

    .copyright {
      order: 1;
    }
  }

  @media (min-width: ($MQNarrow + 1)) {
    align-items: center;
  }
}

.copyright span:last-child {
  white-space: nowrap;
}
</style>
