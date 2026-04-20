<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'

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

onMounted(() => {
  const header = document.querySelector('.site-header')
  const brand = header?.querySelector('.site-brand')
  const navLinks = header?.querySelectorAll('.site-nav__link')

  if (!header || !brand || !navLinks?.length) {
    return
  }

  const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })

  timeline.from(header, {
    y: -18,
    opacity: 0,
    filter: 'blur(10px)',
    duration: 0.55,
  })
  timeline.from(
    brand,
    {
      y: -10,
      opacity: 0,
      duration: 0.4,
    },
    '-=0.22'
  )
  timeline.from(
    navLinks,
    {
      y: -10,
      opacity: 0,
      stagger: 0.06,
      duration: 0.32,
    },
    '-=0.18'
  )
})
</script>

<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <router-link to="/" class="site-brand">
        <span class="site-brand__wordmark">
          Stephen<span class="site-brand__dot">·</span><span class="site-brand__my">叶耀楠</span>
        </span>
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
