/**
 * v-fade-in directive
 * Replaces the legacy IntersectionObserver-based fade-in animation.
 * Works reliably with Vue's component lifecycle and SPA route transitions.
 *
 * Usage: <div v-fade-in>...</div>
 *        <div v-fade-in="{ delay: 200 }">...</div>
 */

const observerMap = new WeakMap()

export const vFadeIn = {
  mounted(el, binding) {
    const delay = binding.value?.delay || 0

    // Apply initial hidden state via class
    el.classList.add('fade-in')

    const reveal = (target) => {
      if (target.classList.contains('visible')) {
        return
      }

      if (delay > 0) {
        setTimeout(() => {
          target.classList.add('visible')
        }, delay)
      } else {
        target.classList.add('visible')
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            // Once visible, stop observing
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(el)
    observerMap.set(el, observer)

    // Elements already in the initial viewport can otherwise remain hidden
    // on route entry if the observer callback doesn't fire immediately.
    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0
      if (inViewport) {
        reveal(el)
        observer.unobserve(el)
      }
    })
  },

  unmounted(el) {
    const observer = observerMap.get(el)
    if (observer) {
      observer.unobserve(el)
      observer.disconnect()
      observerMap.delete(el)
    }
  },
}

/**
 * Also export a composable for programmatic use
 */
export function useFadeIn() {
  const initFadeInElements = (container = document) => {
    const elements = container.querySelectorAll('.fade-in:not(.observed)')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    elements.forEach((el) => {
      el.classList.add('observed')
      observer.observe(el)
    })

    return observer
  }

  return { initFadeInElements }
}
