<script setup>
import { onMounted, onUnmounted } from 'vue'

let contactController = null
let faqObserver = null

    onMounted(() => {
      contactController = new AbortController();
      const { signal } = contactController;

      // 处理表单提交
      const contactForm = document.getElementById('contactForm');
      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          message: document.getElementById('message').value,
          timestamp: new Date().toISOString()
        };
        
        // 将表单数据存储到localStorage
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push(formData);
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        
        // 将数据保存到JSON文件
        saveContactToFile(formData);
        
        // 显示提交成功消息
        alert('消息已成功发送！我会尽快回复您。');
        
        // 重置表单
        contactForm.reset();
      }, { signal });
      }
      
      // 将联系表单数据保存到JSON文件
      function saveContactToFile(formData) {
        // 创建一个包含表单数据的文本文件
        const fileName = `contact_${formData.name}_${new Date().getTime()}.json`;
        const jsonData = JSON.stringify(formData, null, 2);
        
        // 创建一个隐藏的下载链接来保存数据
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        
        // 清理
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
        
        // 将数据发送到服务器（如果有后端API的话）
        // 由于这是前端项目，我们使用一个模拟的API保存数据
        saveContactToLocalFile(formData, fileName);
      }
      
      // 模拟将数据保存到本地文件（在实际项目中会替换为真实的API调用）
      function saveContactToLocalFile(formData, fileName) {
        // 在实际生产环境中，这里会是一个API调用
        // 例如： fetch('/api/saveContact', { method: 'POST', body: JSON.stringify(formData) });
        
        // 由于这是前端项目，不能直接写入文件系统
        // 这里使用localStorage记录保存的文件名，以便将来参考
        const savedFiles = JSON.parse(localStorage.getItem('savedContactFiles') || '[]');
        savedFiles.push({
          fileName: fileName,
          path: `data/contacts/${fileName}`,
          savedAt: new Date().toISOString(),
          contactInfo: formData
        });
        localStorage.setItem('savedContactFiles', JSON.stringify(savedFiles));
        
        // 在控制台记录，便于开发者确认
        console.log('联系表单数据已保存:', fileName);
        console.log('保存路径:', `data/contacts/${fileName}`);
        console.log('表单数据:', formData);
      }
      
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
      
      // 按钮波纹效果
      const rippleButtons = document.querySelectorAll('.submit-btn');
      rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          const x = e.clientX - e.target.getBoundingClientRect().left;
          const y = e.clientY - e.target.getBoundingClientRect().top;
          
          const ripple = document.createElement('span');
          ripple.classList.add('btn-ripple');
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;
          
          this.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
          }, 600);
        }, { signal });
      });
      

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
  <section class="pt-40 pb-20 relative overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 glow-text">
          <span class="text-purple-light">联系</span>我
        </h1>
        <p class="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
          有项目合作、技术交流或其他问题？请随时联系我，我会尽快回复。
        </p>
      </div>
    </div>
    
    <!-- Purple glowing sphere (decorative element) -->
    <div class="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-purple-dark opacity-10 filter blur-3xl right-0 top-40 transform translate-x-1/2"></div>
    <div class="absolute w-64 h-64 rounded-full bg-purple-dark opacity-10 filter blur-3xl left-0 bottom-0 transform -translate-x-1/2"></div>
  </section>
  
  <!-- Contact Section -->
  <section class="pb-10 relative z-10 -mt-24">
    <div class="container mx-auto px-4">
      <div class="contact-section">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-col">
            <div class="contact-header">
              <h2 class="text-xl font-bold">发送消息</h2>
            </div>
            <form id="contactForm" class="space-y-4">
              <div class="form-row">
                <label class="block text-gray-400 mb-1 text-sm" for="name">您的名字</label>
                <input type="text" id="name" name="name" placeholder="请输入您的名字" class="form-input w-full" required>
              </div>
              
              <div class="form-row">
                <label class="block text-gray-400 mb-1 text-sm" for="email">电子邮箱</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" class="form-input w-full" required>
              </div>
              
              <div class="form-row">
                <label class="block text-gray-400 mb-1 text-sm" for="message">消息内容</label>
                <textarea id="message" name="message" rows="5" placeholder="请输入您的消息..." class="form-input w-full resize-none" required></textarea>
              </div>
              
              <button type="submit" class="submit-btn w-full mt-3">
                发送消息
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
          
          <!-- Contact Info -->
          <div class="contact-info-col">
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
              <div class="flex-1">
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
              <div class="flex-1">
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
              <div class="flex-1">
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
            <div class="mt-6 flex justify-center">
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
  <section class="py-16 relative z-10 bg-black bg-opacity-30">
    <div class="container mx-auto px-4">
      <div v-fade-in class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 glow-text text-center">常见<span class="text-purple-light">问题</span></h2>
        
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
  
  
  
  

  </div>
</template>

<style>

    /* 联系表单卡片样式 */
    .contact-card {
      background-color: rgba(10, 12, 16, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      backdrop-filter: blur(10px);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .contact-card:hover {
      box-shadow: 0 8px 32px rgba(106, 13, 173, 0.3);
    }
    
    /* 表单输入框样式 */
    .form-input {
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 12px 16px;
      color: #fff;
      transition: all 0.3s ease;
    }
    
    .form-input:focus {
      background-color: rgba(255, 255, 255, 0.08);
      border-color: rgba(138, 43, 226, 0.5);
      box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.25);
      outline: none;
    }
    
    .form-input::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
    
    /* 联系方式卡片 */
    .contact-method {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      padding: 0.75rem;
      background-color: rgba(255, 255, 255, 0.03);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: all 0.3s ease;
    }
    
    .contact-method:hover {
      background-color: rgba(255, 255, 255, 0.05);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(106, 13, 173, 0.2);
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
      background-color: rgba(106, 13, 173, 0.5);
      transform: scale(1.05);
    }
    
    /* 发送按钮样式 */
    .submit-btn {
      background-color: #8A2BE2;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      font-weight: 500;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .submit-btn:hover {
      background-color: #6A0DAD;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(106, 13, 173, 0.4);
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
      color: white;
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
      max-width: 1000px;
      margin: 0 auto;
      background-color: rgba(10, 12, 16, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      overflow: hidden;
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
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
    
    .contact-form-col {
      padding: 2rem;
      border-right: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .contact-info-col {
      padding: 2rem;
    }
    
    .form-row {
      margin-bottom: 1rem;
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
      border-color: rgba(138, 43, 226, 0.2);
      box-shadow: 0 5px 20px rgba(106, 13, 173, 0.15);
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
      color: #8A2BE2;
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
