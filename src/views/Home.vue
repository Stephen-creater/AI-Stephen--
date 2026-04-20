<script setup>
import { ref } from 'vue'

// Copy-to-clipboard state per button
const copiedStates = ref({})

async function copyLink(url, key) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url)
    } else {
      // Fallback for non-secure contexts
      const tempInput = document.createElement('input')
      tempInput.value = url
      tempInput.style.position = 'absolute'
      tempInput.style.left = '-9999px'
      document.body.appendChild(tempInput)
      tempInput.select()
      tempInput.setSelectionRange(0, 99999)
      document.execCommand('copy')
      document.body.removeChild(tempInput)
    }
    copiedStates.value[key] = true
    setTimeout(() => {
      copiedStates.value[key] = false
    }, 1200)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<template>
  <div class="home-page">

  <!-- Header -->
  
  
  <!-- Hero Section -->
  <section class="hero min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-black to-gray-900 text-center">
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMS41IDE1SDIuNVYxNkgxLjVWMTVaIiBmaWxsPSIjNkEwREFEIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')]"></div>
    <div class="container mx-auto px-4 z-10">
      <div class="max-w-4xl mx-auto backdrop-blur-sm bg-black bg-opacity-20 p-8 md:p-12 rounded-2xl border border-purple-light/15 shadow-xl">
        <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span class="text-purple-light tracking-tighter bg-gradient-to-r from-purple-light to-purple-dark bg-clip-text text-transparent">AI产品 Stephen</span>
        </h1>
        
        <div class="flex justify-center items-center mb-6">
          <div class="h-px w-24 bg-gradient-to-r from-transparent via-purple-light to-transparent"></div>
          <span class="mx-4 text-purple-light text-xl">✦</span>
          <div class="h-px w-24 bg-gradient-to-r from-purple-light via-purple-light to-transparent"></div>
        </div>
        
        <div class="flex justify-center mb-12">
          <div class="flex items-center space-x-6 bg-black bg-opacity-40 rounded-full px-8 py-3 backdrop-blur-sm border border-purple-light/20">
            <span class="text-lg text-gray-200 font-medium">前端开发者</span>
            <span class="text-purple-light text-xl">|</span>
            <span class="text-lg text-gray-200 font-medium">AI爱好者</span>
            <span class="text-purple-light text-xl">|</span>
            <span class="text-lg text-gray-200 font-medium">漫威迷</span>
          </div>
        </div>
        
        <div class="flex gap-8 justify-center">
          <a href="#featured" class="btn btn-primary px-10 py-4 text-lg font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/30 transform hover:-translate-y-1">探索作品</a>
          <router-link to="/contact" class="btn btn-dark px-10 py-4 text-lg font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/30 transform hover:-translate-y-1 border border-gray-600">和我联系</router-link>
        </div>
      </div>
    </div>
  </section>
  
  <!-- About Section -->
  <section id="about" class="py-24 bg-black bg-opacity-30">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div v-fade-in>
          <h2 class="text-4xl font-bold mb-6 glow-text">关于我</h2>
          <p class="text-gray-300 mb-6">
            我是一名充满激情的AI产品开发者，专注于创造具有视觉吸引力和高性能的数字体验。我结合技术专长和创意思维，构建既美观又实用的网站和智能体。
          </p>
          <p class="text-gray-300 mb-6">
            杭州电子科技大学大二在读，热爱探索新技术，特别是人工智能领域的创新应用。在空闲时间，我沉浸在漫威电影的宇宙中，从中汲取创意灵感。
          </p>
          <div class="grid grid-cols-2 gap-4 mt-8">
            <a href="#featured" class="btn btn-primary hover-effect py-3 flex items-center justify-center">
              <span>查看详细简历</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <router-link to="/contact" class="btn hover-effect py-3 flex items-center justify-center">
              <span>下载简历</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </router-link>
          </div>
        </div>
        <div v-fade-in class="relative">
          <div class="profile-card relative overflow-hidden rounded-2xl glow-border">
            <div class="profile-img-container overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="个人照片" 
                class="profile-image w-full object-cover transition-transform hover-zoom"
                loading="lazy"
              >
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <div class="flex items-end justify-between">
                <div>
                  <h3 class="text-xl font-bold text-white mb-1">前端开发者</h3>
                  <p class="text-gray-300 text-sm">热爱创造，专注体验</p>
                </div>
                <div class="bg-purple-dark bg-opacity-70 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <p class="text-purple-light font-semibold text-xs">Explore. Create. Share.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Featured Projects Section -->
  <section id="featured" class="py-24">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold mb-3 glow-text text-center">特色作品</h2>
      <p class="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
        这里展示了我最具代表性的几个项目，涵盖了不同技术领域和应用场景。
        <span class="block text-sm text-gray-400 mt-1">Showcase of my representative projects across different domains.</span>
      </p>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Project 1: Coze智能体平台个人主页 -->
        <div v-fade-in class="card project-card bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-300 transform hover:-translate-y-2">
          <div class="h-48 md:h-56 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Coze智能体平台个人主页" 
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              loading="lazy"
            >
          </div>
          <div class="p-4 md:p-5">
            <h3 class="text-xl font-bold mb-2">Coze智能体平台个人主页</h3>
            <p class="text-gray-400 mb-3 text-sm">我在Coze智能体平台上创建了38个不同的智能体作品，涵盖多种功能和应用场景，展示了我在AI智能体领域的创造力。</p>
            <div class="flex flex-wrap gap-1.5 mb-4">
              <span class="tag-pill">Coze</span>
              <span class="tag-pill">智能体开发</span>
              <span class="tag-pill">平台主页</span>
            </div>
            <a href="https://www.coze.cn/user/1484768162621659?access_entrance=share_my_link&bid=6fp998a2k4g09" target="_blank" class="visit-btn">
              访问作品
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <div class="flex justify-between items-center mt-4">
              <button class="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </button>
              <button class="text-gray-400 hover:text-white transition-colors share-btn relative" :title="copiedStates['coze'] ? '已复制!' : '复制链接'" @click="copyLink('https://www.coze.cn/user/1484768162621659?access_entrance=share_my_link&bid=6fp998a2k4g09', 'coze')">
                <span v-if="copiedStates['coze']" class="copy-tooltip" style="opacity:1">已复制!</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Project 2: 支付宝百宝箱创意奖作品 -->
        <div v-fade-in class="card project-card bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-300 transform hover:-translate-y-2">
          <div class="h-48 md:h-56 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
              alt="支付宝百宝箱创意奖作品" 
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              loading="lazy"
            >
          </div>
          <div class="p-4 md:p-5">
            <h3 class="text-xl font-bold mb-2">支付宝百宝箱创意奖作品</h3>
            <p class="text-gray-400 mb-3 text-sm">在支付宝百宝箱第五期智能体大赛中获得创意奖的作品，利用先进的AI技术创造了创新的用户体验与实用解决方案。</p>
            <div class="flex flex-wrap gap-1.5 mb-4">
              <span class="tag-pill">支付宝</span>
              <span class="tag-pill">获奖作品</span>
              <span class="tag-pill">AI应用</span>
            </div>
            <a href="https://tbox.alipay.com/pro/share/202502APHi9E00284100?platform=WebService" target="_blank" class="visit-btn">
              访问作品
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <div class="flex justify-between items-center mt-4">
              <button class="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </button>
              <button class="text-gray-400 hover:text-white transition-colors share-btn relative" :title="copiedStates['alipay'] ? '已复制!' : '复制链接'" @click="copyLink('https://tbox.alipay.com/pro/share/202502APHi9E00284100?platform=WebService', 'alipay')">
                <span v-if="copiedStates['alipay']" class="copy-tooltip" style="opacity:1">已复制!</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Project 3: Gemini 2.5 Pro登顶AI编程 -->
        <div v-fade-in class="card project-card bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-300 transform hover:-translate-y-2">
          <div class="h-48 md:h-56 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80" 
              alt="Gemini 2.5 Pro登顶AI编程" 
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              loading="lazy"
            >
          </div>
          <div class="p-4 md:p-5">
            <h3 class="text-xl font-bold mb-2">Gemini 2.5 Pro登顶AI编程</h3>
            <p class="text-gray-400 mb-3 text-sm">详细分析Gemini 2.5 Pro在AI编程领域的突破性进展和技术优势，探讨其对开发者工作流程的影响和未来应用前景。</p>
            <div class="flex flex-wrap gap-1.5 mb-4">
              <span class="tag-pill">Cursor</span>
              <span class="tag-pill">AI研究</span>
              <span class="tag-pill">技术分析</span>
            </div>
            <a href="https://3ovqoo2h83.app.yourware.so/" target="_blank" class="visit-btn">
              访问作品
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <div class="flex justify-between items-center mt-4">
              <button class="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </button>
              <button class="text-gray-400 hover:text-white transition-colors share-btn relative" :title="copiedStates['gemini'] ? '已复制!' : '复制链接'" @click="copyLink('https://3ovqoo2h83.app.yourware.so/', 'gemini')">
                <span v-if="copiedStates['gemini']" class="copy-tooltip" style="opacity:1">已复制!</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <router-link to="/portfolio" class="btn btn-primary">查看全部作品</router-link>
      </div>
    </div>
  </section>
  
  <!-- Interests Preview Section -->
  <section id="interests-preview" class="py-24 bg-black bg-opacity-30">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold mb-3 glow-text text-center">兴趣爱好</h2>
      <p class="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
        我喜欢漫威科幻电影，这里展示了我最喜欢的几部作品。
        <span class="block text-sm text-gray-400 mt-1">My favorite Marvel sci-fi movies.</span>
      </p>
      
      <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <!-- Movie Card: Infinity War -->
        <div v-fade-in>
          <div class="movie-card h-72" style="background-image: url('https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg')">
            <div class="movie-rating">
              <span class="star">★</span> 8.4/10
            </div>
            <div class="movie-card-content">
              <h3 class="text-lg font-bold mb-1">无限战争</h3>
              <p class="text-xs text-gray-300">Avengers: Infinity War (2018)</p>
              <div class="movie-info">
                <p class="text-xs text-gray-400">灭霸打了个响指。</p>
              </div>
              <button data-modal="true" data-modal-type="movie" data-modal-source="infinity-war">查看详情</button>
            </div>
          </div>
        </div>
        
        <!-- Movie Card: Endgame -->
        <div v-fade-in>
          <div class="movie-card h-72" style="background-image: url('https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg')">
            <div class="movie-rating">
              <span class="star">★</span> 8.4/10
            </div>
            <div class="movie-card-content">
              <h3 class="text-lg font-bold mb-1">终局之战</h3>
              <p class="text-xs text-gray-300">Avengers: Endgame (2019)</p>
              <div class="movie-info">
                <p class="text-xs text-gray-400">无论付出什么代价。</p>
              </div>
              <button data-modal="true" data-modal-type="movie" data-modal-source="endgame">查看详情</button>
            </div>
          </div>
        </div>
        
        <!-- Movie Card: Thor 4 -->
        <div v-fade-in>
          <div class="movie-card h-72" style="background-image: url('https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg')">
            <div class="movie-rating">
              <span class="star">★</span> 6.7/10
            </div>
            <div class="movie-card-content">
              <h3 class="text-lg font-bold mb-1">雷神4：爱与雷霆</h3>
              <p class="text-xs text-gray-300">Thor: Love and Thunder (2022)</p>
              <div class="movie-info">
                <p class="text-xs text-gray-400">为爱而战。</p>
              </div>
              <button data-modal="true" data-modal-type="movie" data-modal-source="thor-4">查看详情</button>
            </div>
          </div>
        </div>
        
        <!-- Movie Card: Ant-Man 3 -->
        <div v-fade-in>
          <div class="movie-card h-72" style="background-image: url('https://image.tmdb.org/t/p/w500/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg')">
            <div class="movie-rating">
              <span class="star">★</span> 6.1/10
            </div>
            <div class="movie-card-content">
              <h3 class="text-lg font-bold mb-1">蚁人3：量子狂潮</h3>
              <p class="text-xs text-gray-300">Ant-Man and the Wasp: Quantumania (2023)</p>
              <div class="movie-info">
                <p class="text-xs text-gray-400">征服量子领域。</p>
              </div>
              <button data-modal="true" data-modal-type="movie" data-modal-source="ant-man-3">查看详情</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <router-link to="/interests" class="btn btn-primary">探索更多</router-link>
      </div>
    </div>
  </section>
  
  <!-- Contact Preview Section -->
  <section id="contact-preview" class="py-24">
    <div class="container mx-auto px-4">
      <div v-fade-in class="max-w-3xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-6 glow-text">与我联系</h2>
        <p class="text-gray-300 mb-8">
          如果你对我的项目感兴趣，或者有任何问题想要交流，欢迎通过以下方式联系我。
          <span class="block text-sm text-gray-400 mt-1">Feel free to reach out if you're interested in my projects or have any questions.</span>
        </p>
        
        <div class="social-icons flex justify-center gap-8 mb-10">
          <!-- WeChat -->
          <div class="social-icon">
            <img src="https://s1.aigei.com/src/img/png/ef/efd714270fdd44f485156053901ecb51.png?imageMogr2/auto-orient/thumbnail/!282x282r/gravity/Center/crop/282x282/quality/85/%7CimageView2/2/w/282&e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:yyardQ4rSmgIHO-XT3Lk4yaLTwc=" alt="微信" />
            <div class="tooltip tooltip-bottom">
              <p class="text-white bg-gray-800 p-3 rounded-lg">微信号：thanoswillreturn</p>
            </div>
          </div>
          
          <!-- Twitter -->
          <div class="social-icon">
            <img src="https://cdn.pixabay.com/photo/2021/06/23/18/31/twitter-6359396_1280.png" alt="Twitter" />
            <div class="tooltip tooltip-bottom">
              <p class="text-white bg-gray-800 p-3 rounded-lg">请在x上搜索elon muskkkk</p>
            </div>
          </div>
          
          <!-- 即刻 -->
          <div class="social-icon">
            <img src="https://file.digitaling.com/eImg/logo/20190708/20190708143230_37718_320.jpg" alt="即刻" />
            <div class="tooltip tooltip-bottom">
              <p class="text-white bg-gray-800 p-3 rounded-lg">请在即刻上搜索Stephen-x</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Footer -->
  <footer class="bg-black bg-opacity-40 py-12">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">My<span class="text-purple-light">Tech</span>Universe</h3>
          <p class="text-gray-400">探索、创造与无限可能</p>
        </div>
        
        <div>
          <h4 class="text-lg font-medium mb-4">快速导航</h4>
          <ul class="space-y-2">
            <li><router-link to="/" class="text-gray-400 hover:text-white transition-colors">首页</router-link></li>
            <li><router-link to="/portfolio" class="text-gray-400 hover:text-white transition-colors">作品</router-link></li>
            <li><router-link to="/interests" class="text-gray-400 hover:text-white transition-colors">兴趣</router-link></li>
            <li><router-link to="/knowledge" class="text-gray-400 hover:text-white transition-colors">知识库</router-link></li>
            <li><router-link to="/contact" class="text-gray-400 hover:text-white transition-colors">联系我</router-link></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-lg font-medium mb-4">联系方式</h4>
          <ul class="space-y-2">
            <li class="text-gray-400">邮箱: yaonanye1@gmail.com</li>
            <li class="text-gray-400">微信: thanoswillreturn</li>
          </ul>
        </div>
      </div>
      
      <div class="mt-8 pt-8 border-t border-gray-800 text-center">
        <p class="text-gray-500 text-sm">
          &copy; 2025 MyTechUniverse. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  
  <!-- Scripts -->
  
  
  
  
  <!-- 电影详情模态框 -->
  <div id="modal" class="modal">
    <div id="modal-content" class="movie-modal">
      <button id="modal-close" class="modal-close">&times;</button>
      <!-- 模态框内容将由JavaScript动态加载 -->
    </div>
  </div>
  
  <!-- 添加分享功能的JavaScript代码 -->
  

  </div>
</template>

<style>

    /* 复制工具提示样式 */
    .copy-tooltip {
      position: absolute;
      background-color: rgba(138, 43, 226, 0.95);
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      z-index: 1010;
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      text-align: center;
      white-space: nowrap;
      top: -48px;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .copy-tooltip::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid rgba(138, 43, 226, 0.95);
    }
    
    /* 分享按钮样式 */
    .share-btn {
      cursor: pointer;
      position: relative;
      transition: all 0.2s ease;
    }
    
    .share-btn:hover {
      color: var(--purple-light);
      transform: scale(1.1);
    }
    
    .share-btn:active {
      transform: scale(0.95);
    }
    
    .project-card .share-btn::before {
      content: attr(title);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      padding: 4px 8px;
      border-radius: 4px;
      background-color: rgba(138, 43, 226, 0.9);
      color: white;
      font-size: 12px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: all 0.2s ease;
      visibility: hidden;
      z-index: 1005;
      margin-bottom: 10px;
    }
    
    .project-card .share-btn::after {
      content: '';
      position: absolute;
      bottom: calc(100% - 5px);
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      border-width: 5px 5px 0;
      border-style: solid;
      border-color: rgba(138, 43, 226, 0.9) transparent transparent;
      opacity: 0;
      transition: all 0.2s ease;
      visibility: hidden;
      z-index: 1005;
    }
    
    .project-card .share-btn:hover::before,
    .project-card .share-btn:hover::after {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      visibility: visible;
    }
    
    /* 当显示"已复制"提示时，隐藏悬浮提示 */
    .show-copied .share-btn::before,
    .show-copied .share-btn::after {
      opacity: 0 !important;
      visibility: hidden !important;
    }
    
    /* 增强访问作品链接样式 */
    .project-card a.text-purple-light {
      display: inline-flex;
      align-items: center;
      background-color: rgba(138, 43, 226, 0.1);
      border: 1px solid rgba(138, 43, 226, 0.2);
      border-radius: 20px;
      padding: 6px 14px;
      font-weight: 500;
      transition: all 0.3s ease;
      box-shadow: 0 0 8px rgba(138, 43, 226, 0.1);
    }
    
    .project-card a.text-purple-light:hover {
      background-color: rgba(138, 43, 226, 0.2);
      border-color: rgba(138, 43, 226, 0.4);
      box-shadow: 0 0 15px rgba(138, 43, 226, 0.2);
      transform: translateY(-2px);
    }
    
    .project-card a.text-purple-light svg {
      transition: transform 0.3s ease;
    }
    
    .project-card a.text-purple-light:hover svg {
      transform: translateX(3px);
    }
    
    /* 增强标签样式 */
    .project-card .text-xs.bg-gray-800.text-purple-light {
      background-color: rgba(106, 13, 173, 0.15);
      border: 1px solid rgba(138, 43, 226, 0.3);
      box-shadow: 0 0 8px rgba(138, 43, 226, 0.1);
      padding: 4px 10px;
      font-weight: 500;
      letter-spacing: 0.3px;
      transition: all 0.3s ease;
    }
    
    .project-card:hover .text-xs.bg-gray-800.text-purple-light {
      background-color: rgba(106, 13, 173, 0.25);
      box-shadow: 0 0 12px rgba(138, 43, 226, 0.2);
    }

    /* 图片中紫色标签样式 */
    .project-card .tag-pill {
      background-color: rgba(106, 13, 173, 0.2);
      border: 1px solid rgba(138, 43, 226, 0.4);
      color: #8A2BE2;
      padding: 3px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      display: inline-block;
      margin-right: 4px;
      margin-bottom: 4px;
      box-shadow: 0 0 8px rgba(138, 43, 226, 0.1);
      transition: all 0.3s ease;
    }

    .project-card .tag-pill:hover {
      background-color: rgba(106, 13, 173, 0.3);
      box-shadow: 0 0 12px rgba(138, 43, 226, 0.2);
    }

    /* 图片中访问作品按钮样式 */
    .project-card .visit-btn {
      background-color: rgba(106, 13, 173, 0.15);
      border: 1px solid rgba(138, 43, 226, 0.3);
      color: #8A2BE2;
      padding: 5px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      box-shadow: 0 0 8px rgba(138, 43, 226, 0.1);
      transition: all 0.3s ease;
    }

    .project-card .visit-btn:hover {
      background-color: rgba(106, 13, 173, 0.25);
      box-shadow: 0 0 15px rgba(138, 43, 226, 0.2);
      transform: translateY(-2px);
    }

    .project-card .visit-btn svg {
      margin-left: 5px;
      transition: transform 0.3s ease;
    }

    .project-card .visit-btn:hover svg {
      transform: translateX(3px);
    }

    /* 增强项目卡片悬停效果 */
    .project-card {
      transition: all 0.3s ease;
      border: 1px solid rgba(75, 85, 99, 0.3);
    }
    
    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(138, 43, 226, 0.2);
      border-color: rgba(138, 43, 226, 0.3);
    }
    
    /* 电影卡片样式增强 */
    .movie-card {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      background-size: cover;
      background-position: center;
      transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    
    /* 移除正常状态下的渐变遮罩 */
    .movie-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: transparent;
      opacity: 0;
      transition: opacity 0.4s ease, background 0.4s ease;
      z-index: 1;
    }
    
    .movie-card:hover {
      transform: scale(1.03);
      box-shadow: 0 14px 28px rgba(106, 13, 173, 0.3);
    }
    
    /* 悬停时添加均匀的深色遮罩 */
    .movie-card:hover::before {
      opacity: 1;
      background: rgba(0, 0, 0, 0.75);
    }
    
    /* 添加底部文字区域的专用背景 */
    .movie-card::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0) 100%);
      opacity: 0;
      transition: opacity 0.4s ease, height 0.4s ease;
      z-index: 2;
    }
    
    .movie-card:hover::after {
      opacity: 1;
      height: 70%;
    }
    
    /* 所有文字内容初始隐藏 */
    .movie-card-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.5rem;
      z-index: 3;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.4s ease, transform 0.4s ease;
      text-align: center;
    }
    
    /* 悬停时显示文字内容 */
    .movie-card:hover .movie-card-content {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* 评分样式 */
    .movie-rating {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background-color: transparent;
      color: #FFD700;
      padding: 0;
      border-radius: 0;
      font-weight: bold;
      z-index: 4;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      opacity: 0;
      transform: translateY(0);
      transition: opacity 0.3s ease;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    
    .movie-card:hover .movie-rating {
      opacity: 1;
    }
    
    .movie-rating .star {
      color: #FFD700;
      margin-right: 0.25rem;
    }
    
    /* 简化介绍文字样式 */
    .movie-info {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .movie-info p {
      color: rgba(255, 255, 255, 0.9) !important;
      font-size: 0.75rem !important;
      line-height: 1.4;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    
    /* 按钮样式 */
    .movie-card-content h3 {
      color: white;
      font-size: 1.25rem;
      margin-bottom: 0.25rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    
    .movie-card-content p {
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    
    .movie-card-content button {
      background-color: #6A0DAD;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: none;
      font-size: 0.85rem;
      margin-top: 0.75rem;
      transition: background-color 0.3s ease, transform 0.3s ease;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      font-weight: 500;
    }
    
    .movie-card-content button:hover {
      background-color: #8A2BE2;
      transform: translateY(-2px);
    }
    
    /* 电影详情弹窗样式 */
    .movie-modal {
      display: flex;
      flex-direction: row;
      width: 100%;
      max-width: 880px;
      background-color: #0A0C10;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
      transform: scale(0.9);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    .modal.open .movie-modal {
      transform: scale(1);
      opacity: 1;
    }
    
    .movie-modal-header {
      position: relative;
      background-color: transparent;
      display: flex;
      flex-direction: column;
      border-bottom: none;
      width: 35%;
      padding: 0;
    }
    
    .movie-modal-poster {
      width: 100%;
      height: 100%;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
      border-radius: 12px 0 0 12px;
    }
    
    .movie-modal-poster img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    
    .movie-modal-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      width: 65%;
      padding: 2rem;
    }
    
    .movie-modal-title {
      margin-bottom: 1.5rem;
    }
    
    .movie-modal-title h2 {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: white;
      line-height: 1.2;
    }
    
    .movie-modal-info {
      padding: 0;
    }
    
    .movie-modal-section {
      margin-bottom: 1.5rem;
    }
    
    .movie-modal-section h3 {
      color: #8A2BE2;
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .movie-modal-section p {
      color: #8A8D93;
      line-height: 1.6;
    }
    
    /* 添加电影引用样式 */
    .movie-modal-quote {
      font-style: italic;
      padding: 1rem;
      background-color: rgba(106, 13, 173, 0.1);
      border-left: 3px solid #8A2BE2;
      border-radius: 0 8px 8px 0;
      margin: 1rem 0;
    }
    
    /* 添加电影剧照画廊样式 */
    .movie-modal-gallery {
      display: flex;
      gap: 0.5rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
    }
    
    .movie-modal-gallery img {
      height: 80px;
      border-radius: 4px;
      opacity: 1;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .movie-modal-gallery img:hover {
      opacity: 1;
      transform: scale(1.05);
    }
    
    /* 添加模态框通用样式 */
    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background-color: rgba(255, 255, 255, 0.1);
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: white;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.3s ease;
      z-index: 10;
    }
    
    .modal-close:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .modal.open {
      opacity: 1;
      visibility: visible;
    }
    
    @media (max-width: 768px) {
      .movie-modal {
        flex-direction: column;
        max-width: 95%;
      }
      
      .movie-modal-header {
        width: 100%;
      }
      
      .movie-modal-poster {
        width: 100%;
        max-height: 300px;
        border-radius: 12px 12px 0 0;
      }
      
      .movie-modal-content {
        width: 100%;
      }
    }
  
</style>
