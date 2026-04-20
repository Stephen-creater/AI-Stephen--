<script setup>
import { nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import SiteFooter from './components/SiteFooter.vue'

const route = useRoute()

watch(
  () => route.fullPath,
  async () => {
    await nextTick()

    if (route.hash) {
      const target = document.querySelector(route.hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    window.scrollTo(0, 0)
  }
)
</script>

<template>
  <div class="app-shell">
    <Navbar />
    <main class="page-frame">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
    <SiteFooter />
  </div>
</template>
