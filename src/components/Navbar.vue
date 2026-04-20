<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

const links = [
  { name: '首页', path: '/' },
  { name: '作品', path: '/portfolio' },
  { name: '兴趣', path: '/interests' },
  { name: '知识库', path: '/knowledge' },
  { name: '联系我', path: '/contact' },
]

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

watch(
  () => route.fullPath,
  () => {
    closeMobileMenu()
  }
)
</script>

<template>
  <header class="fixed w-full z-50">
    <div class="container mx-auto flex justify-between items-center py-6 px-4">
      <router-link to="/" class="text-2xl font-bold glow-text text-white">
        <span style="color: #8A2BE2;">My</span>TechUniverse
      </router-link>

      <nav class="hidden md:block">
        <ul class="flex space-x-8">
          <li v-for="link in links" :key="link.path">
            <router-link
              :to="link.path"
              class="nav-link"
              :class="{ active: route.path === link.path }"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </nav>

      <button
        id="nav-toggle"
        class="md:hidden flex flex-col justify-center items-center w-8 h-8"
        @click="toggleMobileMenu"
      >
        <span class="bg-white block w-6 h-0.5 mb-1"></span>
        <span class="bg-white block w-6 h-0.5 mb-1"></span>
        <span class="bg-white block w-6 h-0.5"></span>
      </button>

      <div
        id="nav-menu"
        class="fixed inset-0 bg-dark bg-opacity-95 z-50 flex flex-col justify-center items-center transition-transform duration-300 md:hidden"
        :class="{ 'translate-x-full': !mobileMenuOpen }"
        @click.self="closeMobileMenu"
      >
        <nav class="text-center">
          <ul class="space-y-6">
            <li v-for="link in links" :key="link.path">
              <router-link
                :to="link.path"
                class="text-2xl nav-link"
                :class="{ active: route.path === link.path }"
                @click="closeMobileMenu"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<style>
.nav-link {
  color: #9CA3AF;
  font-weight: 500;
  transition: color 150ms ease;
}

.nav-link:hover,
.nav-link.active,
.nav-link.router-link-active {
  color: #FFFFFF;
}
</style>
