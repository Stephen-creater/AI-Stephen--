<script setup>
import { onMounted, onUnmounted } from 'vue'

let contactController = null
let faqObserver = null

    onMounted(() => {
      contactController = new AbortController();
      const { signal } = contactController;

      // 复制功能
      const copyButtons = document.querySelectorAll('.copy-btn');
      copyButtons.forEach(btn => {
        btn.addEventListener('click', handleCopyClick, { signal });
      });
      
      // 提取复制处理函数，以避免重复绑定可能导致的多次触发
      function handleCopyClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const textToCopy = this.getAttribute('data-copy');
        const tooltip = this.nextElementSibling;
        
        // 如果已经有显示中的提示，先隐藏
        if (tooltip.style.opacity !== '0') {
          tooltip.style.opacity = '0';
        }
        
        // 修复复制功能
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = textToCopy;
        tempTextarea.style.position = 'absolute';
        tempTextarea.style.left = '-9999px';
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        
        try {
          document.execCommand('copy');
          // 显示提示
          tooltip.style.opacity = '1';
          
          // 1秒后隐藏提示（改为1秒）
          setTimeout(() => {
            tooltip.style.opacity = '0';
          }, 1000);
          
          console.log('成功复制:', textToCopy);
        } catch (err) {
          console.error('复制失败:', err);
          // 回退到原来的剪贴板API
          if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(function() {
              tooltip.style.opacity = '1';
              setTimeout(() => {
                tooltip.style.opacity = '0';
              }, 1000); // 改为1秒
            }).catch(function(err) {
              console.error('无法复制文本: ', err);
              alert('复制失败，请手动复制文本');
            });
          } else {
            alert('您的浏览器不支持自动复制，请手动复制文本');
          }
        }
        
        document.body.removeChild(tempTextarea);
      }
      
      // FAQ 展开/收起功能
      const faqQuestions = document.querySelectorAll('.faq-question');
      
      faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
          // 切换当前问题的打开状态
          const isOpen = question.classList.toggle('open');
          const answer = question.nextElementSibling;
          
          if (isOpen) {
            answer.classList.add('open');
          } else {
            answer.classList.remove('open');
          }
        }, { signal });
      });
      
      // FAQ 渐入动画
      const faqElements = document.querySelectorAll('.faq-appear');
      const faqObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      faqObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // 添加延迟以实现顺序显示效果
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 100);
            faqObserver.unobserve(entry.target);
          }
        });
      }, faqObserverOptions);
      
      faqElements.forEach(el => {
        faqObserver.observe(el);
      });
    });

    onUnmounted(() => {
      contactController?.abort();
      contactController = null;
      faqObserver?.disconnect();
      faqObserver = null;
    });
  
</script>

<template>
  <div class="contact-page">

  <!-- Header -->
  
  
  <!-- Hero Section -->
  <section class="page-hero">
    <div class="container">
      <div class="page-hero__card page-hero__card--compact">
        <div class="page-hero__eyebrow">Say hello</div>
        <h1 class="page-title" style="max-width: none;">
          <span class="text-purple-light">联系</span>我
        </h1>
        <p class="page-summary" style="margin-left: auto; margin-right: auto;">
          有项目合作、技术交流或其他问题？请随时联系我，我会尽快回复。
        </p>
        <div class="sticker-note sticker-note--orange page-sticker">notes welcome</div>
      </div>
    </div>
  </section>
  
  <!-- Contact Section -->
  <section class="pb-10 relative z-10">
    <div class="container mx-auto px-4">
      <div class="contact-section">
        <div class="contact-grid contact-grid--single">
          <div class="contact-info-col contact-info-col--centered">
            <div class="contact-header">
              <h2 class="text-xl font-bold">联系方式</h2>
            </div>
            
            <!-- Email -->
            <div class="contact-method relative">
              <div class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="contact-method__content">
                <h3 class="text-base font-medium">电子邮箱</h3>
                <p class="text-gray-400 text-sm" id="emailText">yaonanye1@gmail.com</p>
              </div>
              <button class="copy-btn p-2" data-copy="yaonanye1@gmail.com" aria-label="复制邮箱地址">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <div class="copy-tooltip">已复制!</div>
              <a href="mailto:yaonanye1@gmail.com" class="absolute inset-0" aria-label="发送邮件"></a>
            </div>
            
            <!-- Phone -->
            <div class="contact-method relative">
              <div class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="contact-method__content">
                <h3 class="text-base font-medium">手机号码</h3>
                <p class="text-gray-400 text-sm" id="phoneText">+86 151 6822 4355</p>
              </div>
              <button class="copy-btn p-2" data-copy="+86 151 6822 4355" aria-label="复制手机号码">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <div class="copy-tooltip">已复制!</div>
            </div>
            
            <!-- WeChat -->
            <div class="contact-method">
              <div class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div class="contact-method__content">
                <h3 class="text-base font-medium">微信</h3>
                <p class="text-gray-400 text-sm" id="wechatText">thanoswillreturn</p>
              </div>
              <button class="copy-btn p-2" data-copy="thanoswillreturn" aria-label="复制微信号">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <div class="copy-tooltip">已复制!</div>
            </div>
            
            <!-- QR Code -->
            <div class="contact-qr">
              <div class="text-center">
                <p class="text-gray-400 mb-2 text-sm">扫描下方二维码添加</p>
                <div class="qr-container mx-auto">
                  <img src="/assets/images/wechat.jpg" alt="微信二维码" class="w-full h-full object-contain">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- FAQ Section -->
  <section class="py-16 relative z-10">
    <div class="container mx-auto px-4">
      <div v-fade-in class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 text-center">常见问题</h2>
        
        <div class="faq-container">
          <!-- FAQ Item 1 -->
          <div class="faq-item faq-appear">
            <div class="faq-question">
              <span>你提供哪些类型的服务？</span>
              <div class="faq-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div class="faq-answer">
              <p>我提供前端开发、Coze Agent 定制、模型微调以及AI相关的开发服务。无论是个人项目还是企业需求，我都能提供专业的解决方案。</p>
            </div>
          </div>
          
          <!-- FAQ Item 2 -->
          <div class="faq-item faq-appear">
            <div class="faq-question">
              <span>如何开始一个合作项目？</span>
              <div class="faq-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div class="faq-answer">
              <p>合作过程通常从需求沟通开始，你可以通过微信或者邮件联系我，描述你的项目需求和预期目标。之后我们会安排详细的讨论，确定项目范围、时间线和预算等细节。</p>
            </div>
          </div>
          
          <!-- FAQ Item 3 -->
          <div class="faq-item faq-appear">
            <div class="faq-question">
              <span>你的开发周期通常是多久？</span>
              <div class="faq-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div class="faq-answer">
              <p>开发周期取决于项目的复杂度和规模。一个简单的智能体可能需要1-2天，而一个功能完善的网页或游戏可能需要1-3周。在项目开始前，我会提供详细的时间预估。</p>
            </div>
          </div>
          
          <!-- FAQ Item 4 -->
          <div class="faq-item faq-appear">
            <div class="faq-question">
              <span>你的收费标准是什么？</span>
              <div class="faq-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div class="faq-answer">
              <p>我的收费方式根据项目类型有所不同。我可以按项目整体报价，也可以按小时计费。具体费用取决于项目复杂度、所需技术、开发周期等因素。在开始合作前，我会提供详细的报价方案，确保价格透明合理。</p>
            </div>
          </div>
          
          <!-- FAQ Item 5 -->
          <div class="faq-item faq-appear">
            <div class="faq-question">
              <span>项目开发过程中如何沟通进度？</span>
              <div class="faq-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div class="faq-answer">
              <p>我采用敏捷开发方法，通常会安排每周进度会议，及时向客户汇报项目状态和里程碑完成情况。我也会使用项目管理工具（如飞书知识库等）来跟踪任务，客户可以随时查看项目进展。此外，我保持畅通的沟通渠道，可以通过邮件、电话或即时通讯工具及时响应客户的问题和反馈。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  </div>
</template>

<style>

    /* 联系方式卡片 */
    .contact-method {
      display: grid;
      grid-template-columns: 48px minmax(0, 1fr) 28px;
      align-items: center;
      gap: 0.9rem;
      width: 100%;
      max-width: 420px;
      margin-bottom: 1.15rem;
      padding: 0.9rem 0;
      border-bottom: 1px solid rgba(20, 20, 19, 0.08);
      transition: color 0.3s ease, transform 0.3s ease;
    }
    
    .contact-method:hover {
      transform: translateY(-2px);
      box-shadow: none;
    }
    
    .contact-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: rgba(106, 13, 173, 0.3);
      border-radius: 12px;
      margin-right: 1rem;
      transition: all 0.3s ease;
    }
    
    .contact-method:hover .contact-icon {
      background-color: rgba(217, 119, 87, 0.18);
      transform: scale(1.05);
    }

    .contact-method__content {
      min-width: 0;
      display: grid;
      gap: 0.1rem;
    }
    
    /* 复制成功提示 */
    .copy-tooltip {
      position: absolute;
      background-color: #8A2BE2;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      white-space: nowrap;
      z-index: 10;
    }
    
    /* 复制按钮样式调整 */
    .copy-btn {
      cursor: pointer;
      color: rgba(255, 255, 255, 0.6);
      transition: all 0.3s ease;
      position: relative;
      z-index: 5;
    }
    
    .copy-btn:hover {
      color: var(--accent-orange);
    }
    
    /* 二维码容器 */
    .qr-container {
      border: 2px solid rgba(138, 43, 226, 0.3);
      padding: 8px;
      border-radius: 12px;
      background-color: white;
      width: 140px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(106, 13, 173, 0.2);
    }
    
    /* 联系页面布局调整 */
    .contact-section {
      max-width: 820px;
      margin: 0 auto;
      background-color: rgba(255, 252, 246, 0.78);
      border: 1px solid rgba(20, 20, 19, 0.08);
      border-radius: 18px;
      overflow: hidden;
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .contact-grid--single {
      grid-template-columns: minmax(0, 1fr);
      justify-content: center;
    }
    
    @media (max-width: 768px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
    
    .contact-header {
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 1.5rem;
    }
    
    .contact-info-col {
      padding: 2rem;
    }

    .contact-info-col--centered {
      max-width: 460px;
      margin: 0 auto;
      width: 100%;
    }

    .contact-qr {
      display: flex;
      justify-content: center;
      margin-top: 1.8rem;
    }
    
    /* 精简页面元素间距 */
    .space-y-6 > :not([hidden]) ~ :not([hidden]) {
      --tw-space-y-reverse: 0;
      margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
      margin-bottom: calc(1rem * var(--tw-space-y-reverse));
    }
    
    /* FAQ样式 */
    .faq-container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .faq-item {
      background-color: rgba(10, 12, 16, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 1rem;
      transition: all 0.3s ease;
    }
    
    .faq-item:hover {
      background-color: rgba(20, 24, 30, 0.7);
      border-color: rgba(217, 119, 87, 0.22);
      box-shadow: 0 10px 28px rgba(217, 119, 87, 0.12);
    }
    
    .faq-question {
      color: #fff;
      padding: 1.25rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      font-size: 1.125rem;
      position: relative;
    }
    
    .faq-answer {
      color: #b7b7b7;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s ease, padding 0.3s ease;
      border-top: 0px solid rgba(255, 255, 255, 0.05);
      line-height: 1.7;
    }
    
    .faq-answer.open {
      max-height: 500px;
      padding: 0 1.25rem 1.25rem 1.25rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .faq-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.4s ease;
      color: var(--accent-orange);
      height: 24px;
      width: 24px;
    }
    
    .faq-question.open .faq-icon {
      transform: rotate(180deg);
    }
    
    /* 渐入动画 */
    .faq-appear {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .faq-appear.visible {
      opacity: 1;
      transform: translateY(0);
    }
  
</style>
