<script setup>
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const featuredWorks = [
  {
    title: 'Coze 智能体矩阵',
    label: 'AI 工具集合',
    description: 'AI 工具集合，38 个智能体作品',
    href: 'https://www.coze.cn/user/1484768162621659?access_entrance=share_my_link&bid=6fp998a2k4g09',
    detail: '38 个智能体作品',
  },
  {
    title: '支付宝创意奖项目',
    label: '产品化尝试',
    description: '想法到体验的落地尝试',
    href: 'https://tbox.alipay.com/pro/share/202502APHi9E00284100?platform=WebService',
    detail: '从概念到交互落地',
  },
  {
    title: 'AI 编程研究写作',
    label: '研究与表达',
    description: '模型能力与工作流的内容观察',
    href: 'https://3ovqoo2h83.app.yourware.so/',
    detail: '长期写作主题',
  },
]

let heroTimeline = null

onMounted(() => {
  const hero = document.querySelector('.home-hero')
  const identity = hero?.querySelector('.home-hero__identity')
  const sticker = hero?.querySelector('.home-hero__sticker')
  const title = hero?.querySelector('.home-hero__title')
  const summary = hero?.querySelector('.home-hero__summary')
  const microcopy = hero?.querySelector('.home-hero__microcopy')
  const actions = hero?.querySelector('.home-hero__actions')
  const preview = hero?.querySelector('.home-preview')

  if (!hero || !title || !summary || !actions || !preview) {
    return
  }

  heroTimeline = gsap.timeline({
    defaults: { ease: 'power2.out' },
    delay: 0.08,
  })

  heroTimeline.from(
    [identity, sticker],
    {
      y: 14,
      opacity: 0,
      stagger: 0.08,
      duration: 0.45,
    }
  )
  heroTimeline.from(
    title,
    {
      y: 26,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 0.7,
    },
    '-=0.18'
  )
  heroTimeline.from(
    [summary, microcopy],
    {
      y: 16,
      opacity: 0,
      stagger: 0.1,
      duration: 0.42,
    },
    '-=0.28'
  )
  heroTimeline.from(
    actions,
    {
      y: 14,
      opacity: 0,
      duration: 0.36,
    },
    '-=0.2'
  )
  heroTimeline.from(
    preview,
    {
      x: 26,
      y: 18,
      opacity: 0,
      rotate: 4,
      filter: 'blur(12px)',
      duration: 0.78,
    },
    '-=0.58'
  )
  heroTimeline.from(
    hero.querySelectorAll('.home-preview__list-item'),
    {
      y: 10,
      opacity: 0,
      stagger: 0.06,
      duration: 0.26,
    },
    '-=0.4'
  )
})

onUnmounted(() => {
  heroTimeline?.kill()
  heroTimeline = null
})
</script>

<template>
  <div class="home-page">
    <section class="home-hero">
      <div class="container">
        <div class="home-hero__layout">
          <div class="home-hero__copy">
            <div class="home-hero__identity">Stephen</div>
            <div class="sticker-note sticker-note--orange home-hero__sticker">hand-picked details</div>
            <h1 class="home-hero__title">
              把技术做成
              <span class="home-hero__title-accent">人能感受</span>
              的体验。
            </h1>
            <p class="home-hero__summary">
              做 AI 产品和前端设计，也写内容。
            </p>
            <p class="home-hero__microcopy">AI 产品 · 前端设计 · 内容表达</p>
            <div class="home-hero__actions">
              <a href="#featured" class="btn btn-primary">浏览作品 →</a>
              <a href="mailto:yaonanye1@gmail.com" class="home-text-link">发邮件</a>
            </div>
          </div>

          <a
            :href="featuredWorks[0].href"
            target="_blank"
            rel="noreferrer"
            class="home-preview"
          >
            <div class="home-preview__chrome">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="home-preview__body">
              <div class="home-preview__eyebrow">Selected preview</div>
              <h2 class="home-preview__title">{{ featuredWorks[0].title }}</h2>
              <p class="home-preview__text">
                {{ featuredWorks[0].description }}
              </p>
              <div class="home-preview__meta">
                <span>{{ featuredWorks[0].label }}</span>
                <span>{{ featuredWorks[0].detail }}</span>
              </div>
              <div class="home-preview__list">
                <div
                  v-for="work in featuredWorks"
                  :key="work.title"
                  class="home-preview__list-item"
                >
                  <strong>{{ work.title }}</strong>
                  <span>{{ work.label }}</span>
                </div>
              </div>
              <div class="home-preview__cta">查看这个方向 →</div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section id="featured" class="home-section">
      <div class="container">
        <div class="home-wide-section">
          <div class="home-section__rail">
            <span class="section-label">精选作品</span>
            <router-link to="/portfolio" class="section-link">查看全部 →</router-link>
          </div>

          <div class="home-section__body">
            <div class="section-line home-section__line"></div>
            <div class="work-list">
              <a
                v-for="work in featuredWorks"
                :key="work.title"
                :href="work.href"
                target="_blank"
                rel="noreferrer"
                class="work-item"
              >
                <div class="work-item__left">
                  <span class="work-item__label">{{ work.label }}</span>
                  <span class="work-item__name">{{ work.title }}</span>
                  <span class="work-item__desc">{{ work.description }}</span>
                </div>
                <div class="work-item__right">
                  <span class="work-item__detail">{{ work.detail }}</span>
                  <span class="work-item__arrow">→</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="home-section home-now">
      <div class="container">
        <div class="home-wide-section">
          <div class="home-section__rail">
            <span class="section-label">现在</span>
          </div>
          <div class="home-section__body">
            <div class="section-line home-section__line"></div>
            <p class="now-text">
              大三在读，全职投入开源项目。最近在重构这个网站，同时研究 AI 工具在真实工作流里的实际用法。
            </p>
            <p class="now-text">
              如果你也在做有意思的 AI 产品或者内容项目，欢迎聊聊。
            </p>
            <div class="now-links">
              <router-link to="/knowledge">个人知识库 →</router-link>
              <router-link to="/interests">兴趣与漫威 →</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="home-section home-contact">
      <div class="container">
        <div class="home-wide-section">
          <div class="home-section__rail">
            <span class="section-label">联系</span>
          </div>
          <div class="home-section__body">
            <div class="section-line home-section__line"></div>
            <p class="contact-cta">有想法？写邮件给我。</p>
            <a href="mailto:yaonanye1@gmail.com" class="contact-email">yaonanye1@gmail.com →</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
