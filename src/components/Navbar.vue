<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

const links = [
  { name: '首页', path: '/' },
  { name: '作品', path: '/portfolio' },
  { name: '知识库', path: '/knowledge' },
  { name: '兴趣', path: '/interests' },
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
  <header class="site-header">
    <div class="container site-header__inner">
      <router-link to="/" class="site-brand">
        <span class="site-brand__wordmark">
          <span class="site-brand__my">My</span>TechUniverse
        </span>
        <span class="site-brand__tag">warm build</span>
      </router-link>

      <nav class="site-nav">
        <ul>
          <li v-for="link in links" :key="link.path">
            <router-link
              :to="link.path"
              class="site-nav__link"
              :class="{ active: route.path === link.path }"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </nav>

      <button
        id="nav-toggle"
        class="site-nav__toggle"
        @click="toggleMobileMenu"
        aria-label="Toggle navigation"
      >
        <span class="site-nav__toggle-line"></span>
        <span class="site-nav__toggle-line"></span>
        <span class="site-nav__toggle-line"></span>
      </button>

      <div
        id="nav-menu"
        v-if="mobileMenuOpen"
        class="mobile-drawer"
        @click.self="closeMobileMenu"
      >
        <nav>
          <ul>
            <li v-for="link in links" :key="link.path">
              <router-link
                :to="link.path"
                class="site-nav__link"
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
