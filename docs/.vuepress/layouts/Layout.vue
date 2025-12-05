<script setup lang="ts">
import VPFadeSlideYTransition from '@theme/VPFadeSlideYTransition.vue'
import VPHome from '@theme/VPHome.vue'
import VPNavbar from '@theme/VPNavbar.vue'
import VPPage from '@theme/VPPage.vue'
import VPSidebar from '@theme/VPSidebar.vue'
import Footer from '../components/Footer.vue'
import { useData } from '@theme/useData'
import { useScrollPromise } from '@theme/useScrollPromise'
import { useSidebarItems } from '@theme/useSidebarItems'
import type { Slot } from '@vuepress/helper/client'
import { computed, ref } from 'vue'
import { onContentUpdated } from 'vuepress/client'

defineSlots<{
  'navbar'?: Slot
  'navbar-before'?: Slot
  'navbar-after'?: Slot
  'sidebar'?: Slot
  'sidebar-top'?: Slot
  'sidebar-bottom'?: Slot
  'page'?: Slot
  'page-top'?: Slot
  'page-bottom'?: Slot
  'page-content-top'?: Slot
  'page-content-bottom'?: Slot
}>()

const { frontmatter, page, themeLocale } = useData()

// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar ?? themeLocale.value.navbar ?? true,
)

// sidebar
const sidebarItems = useSidebarItems()
const isSidebarOpen = ref(false)
const toggleSidebar = (to?: boolean): void => {
  isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value
}
const touchStart = { x: 0, y: 0 }
const onTouchStart = (e: TouchEvent): void => {
  touchStart.x = e.changedTouches[0].clientX
  touchStart.y = e.changedTouches[0].clientY
}
const onTouchEnd = (e: TouchEvent): void => {
  const dx = e.changedTouches[0].clientX - touchStart.x
  const dy = e.changedTouches[0].clientY - touchStart.y
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    if (dx > 0 && touchStart.x <= 80) {
      toggleSidebar(true)
    } else {
      toggleSidebar(false)
    }
  }
}

// external-link-icon
const enableExternalLinkIcon = computed(
  () =>
    frontmatter.value.externalLinkIcon ??
    themeLocale.value.externalLinkIcon ??
    true,
)

// classes
const containerClass = computed(() => [
  {
    'no-navbar': !shouldShowNavbar.value,
    'no-sidebar': !sidebarItems.value.length,
    'sidebar-open': isSidebarOpen.value,
    'external-link-icon': enableExternalLinkIcon.value,
  },
  frontmatter.value.pageClass,
])

// close sidebar when content changes
onContentUpdated(() => {
  toggleSidebar(false)
})

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending
</script>

<template>
  <div
    class="vp-theme-container"
    :class="containerClass"
    vp-container
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <slot name="navbar">
      <VPNavbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar">
        <template #before>
          <slot name="navbar-before" />
        </template>
        <template #after>
          <slot name="navbar-after" />
        </template>
      </VPNavbar>
    </slot>

    <div class="mm-container" id="mm-page-wrap">
      <div class="vp-sidebar-mask" @click="toggleSidebar(false)" />
      <slot name="sidebar">
        <VPSidebar>
          <template #top>
            <slot name="sidebar-top" />
          </template>
          <template #bottom>
            <slot name="sidebar-bottom" />
          </template>
        </VPSidebar>
      </slot>
      <slot name="page">
        <VPFadeSlideYTransition
          @before-enter="onBeforeEnter"
          @before-leave="onBeforeLeave"
        >
          <VPHome v-if="frontmatter.home" />
          <VPPage v-else :key="page.path">
            <template #top>
              <slot name="page-top" />
            </template>
            <template #content-top>
              <slot name="page-content-top" />
            </template>
            <template #content-bottom>
              <slot name="page-content-bottom" />
            </template>
            <template #bottom>
              <slot name="page-bottom" />
            </template>
          </VPPage>
        </VPFadeSlideYTransition>
      </slot>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/variables' as *;

#mm-page-wrap {
  flex-grow: 1;
  position: relative;
}
.vp-navbar .mm-container,
[vp-content] .mm-container,
#mm-footer-wrap .mm-container,
.vp-theme-container:not(.no-sidebar) .mm-container {
  max-width: $MQMax;
  margin: 0 auto;
  padding-left: var(--navbar-padding-h);
  padding-right: var(--navbar-padding-h);
}
.vp-page {
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  [vp-content] {
    flex-grow: 1;
    padding: 1.5rem;
  }
}
.vp-site-logo {
  height: 1.5rem;
  @media (max-width: $MQMobileNarrow) {
    height: 1rem;
  }
}
.vp-site-name,
.vp-navbar-item .external-link::after {
  display: none;
}

.vp-sidebar-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;

  display: none;

  width: 100vw;
  height: 100vh;
}

.vp-sidebar {
  @media (max-width: $MQMobile) {
    min-height: 100dvh;
  }
  @media (min-width: ($MQMobile + 1)) {
    position: absolute;
    border-inline-end: none;
  }

  .vp-sidebar-item.active:not(p.vp-sidebar-heading) {
    border-inline-start-color: transparent;
  }
}

.vp-sidebar-mask {
  border-inline-end: none;
  @media (min-width: ($MQMobile + 1)) {
    transition: none;
    inset-inline-start: unset;
  }
}

.vp-theme-container {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  // navbar is disabled
  &.no-navbar {
    .vp-sidebar {
      top: 0;

      @media (max-width: $MQMobile) {
        padding-top: 0;
      }
    }

    .vp-page {
      padding-top: 0;
    }

    // adjust heading margin and padding;
    [vp-content] {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-top: 1.5rem;
        padding-top: 0;
      }
    }
  }

  &.no-sidebar {
    // hide sidebar
    .vp-sidebar {
      display: none;

      // show sidebar on mobile because it has navbar links
      @media (max-width: $MQMobile) {
        display: block;
      }
    }

    .vp-page {
      padding-inline-start: 0;
    }
  }

  &.sidebar-open {
    .vp-toggle-sidebar-button .icon span:nth-child(1) {
      transform: rotate(45deg) translate3d(6.5px, 6.5px, 0);
    }
    @media (max-width: $MQMobile) {
      // show sidebar
      .vp-sidebar {
        transform: translateX(0);
      }

      // show sidebar mask
      .vp-sidebar-mask {
        display: block;
      }
    }
  }
}
</style>
