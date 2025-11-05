<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <Footer />
    </template>
  </ParentLayout>
</template>
