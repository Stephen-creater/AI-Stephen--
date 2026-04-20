<script setup>
import { onMounted, onUnmounted } from 'vue'

let knowledgeController = null
let knowledgeObserver = null

const copyIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10 20h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" />
  </svg>
`

const copiedIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>
`

async function copyText(text) {
  if (!text) return false
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {}
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    textarea.setSelectionRange(0, textarea.value.length)
    const copied = document.execCommand('copy')
    document.body.removeChild(textarea)
    return copied
  } catch {
    return false
  }
}

    // 改进UI元素样式
    function enhanceUIElements() {
      document.querySelectorAll('.knowledge-card a.text-purple-light').forEach(link => {
        link.classList.add('details-link');
        link.innerHTML = `
          <span>查看详情</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        `;
      });
      
      document.querySelectorAll('.knowledge-card .bg-gray-800.text-purple-light').forEach(tag => {
        tag.classList.add('feishu-tag');
        tag.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          飞书文档
        `;
      });
    }

    // 复制链接功能
    function setupCopyLinks() {
      const knowledgeCards = document.querySelectorAll('.knowledge-card');
      
      knowledgeCards.forEach(card => {
        const link = card.querySelector('a[target="_blank"]');
        const actionWrap = card.querySelector('.flex.justify-between.items-center');
        const tag = actionWrap?.querySelector('.bg-gray-800.text-purple-light');
        if (!link) return;
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-fingerprint';
        copyBtn.setAttribute('type', 'button');
        copyBtn.setAttribute('aria-label', '复制链接');
        copyBtn.setAttribute('title', '复制链接');
        copyBtn.innerHTML = copyIcon;
        link.classList.add('details-link');

        if (actionWrap) {
          const actionSection = document.createElement('div');
          actionSection.className = 'knowledge-action-stack';

          const actionBar = document.createElement('div');
          actionBar.className = 'card-action-bar';
          actionBar.appendChild(link);
          actionBar.appendChild(copyBtn);
          actionSection.appendChild(actionBar);

          if (tag) {
            actionSection.appendChild(tag);
          }

          actionWrap.replaceWith(actionSection);
        }
        
        // 添加点击事件
        copyBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          try {
            const url = link.getAttribute('href');
            const copied = await copyText(url);
            if (copied) {
              copyBtn.innerHTML = copiedIcon;
              copyBtn.classList.add('is-copied');
              setTimeout(() => {
                copyBtn.classList.remove('is-copied');
                copyBtn.innerHTML = copyIcon;
              }, 900);
            }
          } catch (err) {
            console.error('复制链接失败:', err);
          }
        }, { signal: knowledgeController.signal });
      });
    }
    
    // 滚动动画效果
    function setupScrollAnimations() {
      const cards = document.querySelectorAll('.knowledge-card');
      
      // 设置交错的动画效果
      knowledgeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 100); // 错开每张卡片的显示时间
          }
        });
      }, { threshold: 0.1 });
      
      cards.forEach(card => {
        card.classList.add('category-appear');
        knowledgeObserver.observe(card);
      });
    }
    
    // 确保卡片悬停动画效果
    function setupHoverEffects() {
      const cards = document.querySelectorAll('.knowledge-card');
      
      cards.forEach(card => {
        // 确保卡片有正确的定位
        if (getComputedStyle(card).position === 'static') {
          card.style.position = 'relative';
        }
        
        // 添加一个简单的hover class以便CSS选择器正确工作
        card.addEventListener('mouseenter', () => {
          card.classList.add('hover-active');
        }, { signal: knowledgeController.signal });
        
        card.addEventListener('mouseleave', () => {
          card.classList.remove('hover-active');
        }, { signal: knowledgeController.signal });
      });
    }
    
    // 页面加载完成后初始化
    onMounted(() => {
      knowledgeController = new AbortController();
      setupCopyLinks();
      setupScrollAnimations();
      setupHoverEffects();
      enhanceUIElements();
    });

    onUnmounted(() => {
      knowledgeController?.abort();
      knowledgeController = null;
      knowledgeObserver?.disconnect();
      knowledgeObserver = null;
    });
  
</script>

<template>
  <div class="knowledge-page">

    <!-- Header -->
    
    
    <!-- Knowledge Hero Section -->
    <section class="page-hero">
      <div class="container">
        <div class="page-hero__card page-hero__card--compact">
          <div class="page-hero__eyebrow">Curated archive</div>
          <h1 class="page-title" style="max-width: none;">
            个人<span class="accent-word">知识库</span>
          </h1>
          <p class="page-summary" style="margin-left: auto; margin-right: auto;">
            以下是我精心构建的个人知识体系，涵盖AI、写作、信息源等多个领域。全部开源分享，欢迎探索和学习。
          </p>
          <div class="sticker-note sticker-note--blue page-sticker">soft knowledge systems</div>
        </div>
      </div>
    </section>

      <!-- Knowledge Categories Section -->
  <section class="pb-24">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- AI 分类 -->
        <div class="knowledge-card p-6">
          <div class="flex items-center mb-4">
            <div class="p-3 rounded-full bg-purple-dark bg-opacity-30 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: var(--accent-orange);">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">AI</h3>
          </div>
          <p class="text-gray-400 mb-5 text-sm">人工智能领域的学习资源、最新进展和应用案例，涵盖大语言模型、机器学习等多个方向。</p>
          <div class="flex justify-between items-center">
            <a href="https://caednm4mxe5.feishu.cn/wiki/UTskwj6CJizP0ckxLnkcBI9wnwg?from=from_copylink" target="_blank" class="text-purple-light inline-flex items-center text-sm">
              查看详情
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- 写作之道 分类 -->
        <div class="knowledge-card p-6">
          <div class="flex items-center mb-4">
            <div class="p-3 rounded-full bg-purple-dark bg-opacity-30 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">The Way of Writing</h3>
          </div>
          <p class="text-gray-400 mb-5 text-sm">探索高效写作的方法论、技巧和工具，提升写作效率和质量的系统化指南。</p>
          <div class="flex justify-between items-center">
            <a href="https://caednm4mxe5.feishu.cn/wiki/WFuFwcKkfiZuHakeUmxcfqy2nKb?from=from_copylink" target="_blank" class="text-purple-light inline-flex items-center text-sm">
              查看详情
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- 高质量信息源 分类 -->
        <div class="knowledge-card p-6">
          <div class="flex items-center mb-4">
            <div class="p-3 rounded-full bg-purple-dark bg-opacity-30 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">High Quality Information Source</h3>
          </div>
          <p class="text-gray-400 mb-5 text-sm">精选的高质量信息源、学习渠道和知识平台，帮助获取高效、准确的专业信息。</p>
          <div class="flex justify-between items-center">
            <a href="https://caednm4mxe5.feishu.cn/wiki/Ntb7w2EiniYhPOk9ZWDcbmM8nOe?from=from_copylink" target="_blank" class="text-purple-light inline-flex items-center text-sm">
              查看详情
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- 组织平台 分类 -->
        <div class="knowledge-card p-6">
          <div class="flex items-center mb-4">
            <div class="p-3 rounded-full bg-purple-dark bg-opacity-30 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">Organization/Platform</h3>
          </div>
          <p class="text-gray-400 mb-5 text-sm">各领域重要组织和平台的资源整理，包括优质社区、研究机构和创新平台。</p>
          <div class="flex justify-between items-center">
            <a href="https://caednm4mxe5.feishu.cn/wiki/GfPrw3a0ViWzYmk6VP9ckbYcnne?from=from_copylink" target="_blank" class="text-purple-light inline-flex items-center text-sm">
              查看详情
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- 学科体系 分类 -->
        <div v-fade-in class="knowledge-card p-6">
          <div class="flex items-center mb-4">
            <div class="p-3 rounded-full bg-purple-dark bg-opacity-30 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">Discipline</h3>
          </div>
          <p class="text-gray-400 mb-5 text-sm">各学科核心知识体系和学习路径整理，帮助构建系统化、结构化的知识框架。</p>
          <div class="flex justify-between items-center">
            <a href="https://caednm4mxe5.feishu.cn/wiki/J5fZwXhnzieWtxkvf3nc08IAn2e?from=from_copylink" target="_blank" class="text-purple-light inline-flex items-center text-sm">
              查看详情
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
        
                <div v-fade-in class="knowledge-card p-6">
                    <div class="flex items-center mb-4">
                      <div class="p-3 rounded-full bg-purple-dark bg-opacity-30 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 class="text-xl font-bold">Personal Instructions</h3>
                    </div>
                    <p class="text-gray-400 mb-5 text-sm">个人生活、学习和工作方法的实践指南，包括效率提升、自我管理等实用技巧。</p>
                    <div class="flex justify-between items-center">
                      <a href="https://caednm4mxe5.feishu.cn/wiki/OIE8wu539itrcck1PFac9UeanHh?from=from_copylink" target="_blank" class="text-purple-light inline-flex items-center text-sm">
                        查看详情
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <!-- 投资理财 分类 -->
                  <div v-fade-in class="knowledge-card p-6">
                    <div class="flex items-center mb-4">
                      <div class="p-3 rounded-full bg-purple-dark bg-opacity-30 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 class="text-xl font-bold">Investment and Financial Management</h3>
                    </div>
                    <p class="text-gray-400 mb-5 text-sm">个人投资理财知识和实践策略，涵盖资产配置、市场分析和风险管理等多个维度。</p>
                    <div class="flex justify-between items-center">
                      <a href="https://caednm4mxe5.feishu.cn/wiki/ZVlOwLukeiyho6k2kNFcarLdn6c?from=from_copylink" target="_blank" class="text-purple-light inline-flex items-center text-sm">
                        查看详情
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <!-- 媒体账号 分类 -->
                  <div v-fade-in class="knowledge-card p-6">
                    <div class="flex items-center mb-4">
                      <div class="p-3 rounded-full bg-purple-dark bg-opacity-30 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <h3 class="text-xl font-bold">Media Account</h3>
                    </div>
                    <p class="text-gray-400 mb-5 text-sm">媒体账号运营和内容创作的经验与策略，包括平台选择、内容规划和用户增长等关键环节。</p>
                    <div class="flex justify-between items-center">
                      <a href="https://caednm4mxe5.feishu.cn/wiki/Ca2Ew5sq2iHRTakvdVvcLpJ0nKg?from=from_copylink" target="_blank" class="text-purple-light inline-flex items-center text-sm">
                        查看详情
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <!-- 创业 分类 -->
                  <div v-fade-in class="knowledge-card p-6">
                    <div class="flex items-center mb-4">
                      <div class="p-3 rounded-full bg-purple-dark bg-opacity-30 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 class="text-xl font-bold">Start a Business</h3>
                    </div>
                    <p class="text-gray-400 mb-5 text-sm">创业全流程指南和资源整理，从创意发现、产品开发到团队组建和融资策略的系统化知识。</p>
                    <div class="flex justify-between items-center">
                      <a href="https://caednm4mxe5.feishu.cn/wiki/VZaZwtwFii9naVkswcoc0Yz6nmh?from=from_copylink" target="_blank" class="text-purple-light inline-flex items-center text-sm">
                        查看详情
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <!-- 健康 分类 -->
                  <div v-fade-in class="knowledge-card p-6">
                    <div class="flex items-center mb-4">
                      <div class="p-3 rounded-full bg-purple-dark bg-opacity-30 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <h3 class="text-xl font-bold">Health</h3>
                    </div>
                    <p class="text-gray-400 mb-5 text-sm">健康生活与身心平衡的科学指南，包括饮食、运动、睡眠和心理健康等多个维度的实践方法。</p>
                    <div class="flex justify-between items-center">
                      <a href="https://caednm4mxe5.feishu.cn/wiki/DInkwZ3zLibDZuk87gicEqaCn7A?from=from_copylink" target="_blank" class="text-purple-light inline-flex items-center text-sm">
                        查看详情
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <!-- 大创 分类 -->
                  <div v-fade-in class="knowledge-card p-6">
                    <div class="flex items-center mb-4">
                      <div class="p-3 rounded-full bg-purple-dark bg-opacity-30 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                        </svg>
                      </div>
                      <h3 class="text-xl font-bold">大创</h3>
                    </div>
                    <p class="text-gray-400 mb-5 text-sm">大学生创新创业项目的规划、设计和实施指南，包含从选题到结项的全流程资料和实战经验。</p>
                    <div class="flex justify-between items-center">
                      <a href="https://caednm4mxe5.feishu.cn/wiki/JTzGwDYFSizzMBkHwIicIxktn5c?from=from_copylink" target="_blank" class="text-purple-light inline-flex items-center text-sm">
                        查看详情
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                </div>
              </div>
            </section>
  </div>
</template>

<style>

    /* 知识库卡片样式 */
    .knowledge-card {
      position: relative;
      border-radius: 12px;
      background-color: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
      overflow: hidden;
      transform: translateY(0); /* 确保初始状态定义 */
      will-change: transform; /* 优化性能 */
    }
    
    .knowledge-card:hover,
    .knowledge-card.hover-active {
      transform: translateY(-5px);
      box-shadow: 0 14px 28px rgba(20, 20, 19, 0.08);
      background-color: rgba(255, 252, 246, 0.96);
    }
    
    /* 知识库图标悬停效果 */
    .knowledge-card:hover .rounded-full,
    .knowledge-card.hover-active .rounded-full {
      background-color: rgba(217, 119, 87, 0.16);
      transform: scale(1.05);
    }
    
    .knowledge-card .rounded-full {
      transition: background-color 0.3s ease, transform 0.3s ease;
    }
    
    /* 查看详情链接样式优化 */
    .knowledge-card a.text-purple-light {
      display: inline-flex;
      align-items: center;
      font-weight: 500;
      padding: 6px 0;
      border-bottom: 1px solid transparent;
      transition: all 0.3s ease;
    }
    
    .knowledge-card a.text-purple-light:hover {
      border-bottom-color: rgba(217, 119, 87, 0.35);
      text-shadow: none;
      color: var(--accent-orange);
    }
    
    .knowledge-card a.text-purple-light svg {
      transition: transform 0.3s ease;
    }
    
    .knowledge-card a.text-purple-light:hover svg {
      transform: translateX(3px);
    }

    /* 查看详情链接增强样式 */
    .details-link {
      position: relative;
      display: inline-flex;
      align-items: center;
      padding: 0 !important;
      background-color: transparent;
      border-radius: 0;
      border: none !important;
      font-weight: 500;
      transition: all 0.3s ease !important;
      box-shadow: none;
      text-decoration: underline;
      text-underline-offset: 0.22em;
    }
    
    .details-link:hover {
      background-color: transparent;
      border-color: transparent !important;
      box-shadow: none;
      transform: none;
      color: var(--accent-orange);
    }
    
    .details-link span {
      z-index: 1;
    }
    
    /* 飞书文档标签样式优化 */
    .knowledge-card .bg-gray-800.text-purple-light {
      background-color: var(--bg-soft);
      border: 1px solid rgba(20, 20, 19, 0.06);
      padding: 4px 10px;
      border-radius: 4px;
      font-weight: 500;
      letter-spacing: 0.3px;
      box-shadow: none;
      transition: all 0.3s ease;
      color: var(--muted);
      font-family: var(--font-mono);
    }
    
    .knowledge-card:hover .bg-gray-800.text-purple-light {
      background-color: var(--bg-soft);
      box-shadow: none;
    }
    
    /* 飞书文档标签增强样式 */
    .feishu-tag {
      display: inline-flex;
      align-items: center;
      background-color: var(--bg-soft) !important;
      border: 1px solid rgba(20, 20, 19, 0.06) !important;
      padding: 4px 10px !important;
      border-radius: 4px !important;
      font-weight: 500 !important;
      letter-spacing: 0.3px;
      box-shadow: none;
      transition: all 0.3s ease;
      color: var(--muted) !important;
      font-family: var(--font-mono);
    }
    
    .knowledge-card:hover .feishu-tag {
      background-color: var(--bg-soft) !important;
      box-shadow: none;
    }
    
    .copy-fingerprint {
      position: relative;
      z-index: 10;
      color: var(--muted);
      align-self: center;
    }
    
    .copy-fingerprint:hover {
      color: var(--accent-orange);
    }

    .copy-fingerprint.is-copied {
      color: var(--accent-orange);
      transform: translateY(-1px);
    }

    .knowledge-action-stack .feishu-tag {
      width: fit-content;
    }

    .knowledge-action-stack .card-action-bar {
      margin-top: 0;
    }
    
    /* 动画效果 */
    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-8px);
      }
      100% {
        transform: translateY(0px);
      }
    }
    
    .float-animation {
      animation: float 6s ease-in-out infinite;
    }
    
    /* 分类卡片加载动画 */
    .category-appear {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .category-appear.visible {
      opacity: 1;
      transform: translateY(0);
    }
  
</style>
