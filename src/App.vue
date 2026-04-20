<script setup>
import { nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

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
  <div>
    <Navbar />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>
