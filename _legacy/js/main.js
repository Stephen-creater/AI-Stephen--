/**
 * Main JavaScript file for the personal website
 * Contains core functionality and initializations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile navigation
  initMobileNav();
  
  // Initialize copy buttons for project links
  initCopyButtons();
  
  // Add cursor style element
  addCursorStyles();
});

// Mobile navigation toggle
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

// Handle copy buttons for project links
function initCopyButtons() {
  document.querySelectorAll('.btn-copy').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const link = button.dataset.copyText || button.previousElementSibling?.href;
      
      if (link) {
        // Copy to clipboard
        navigator.clipboard.writeText(link).then(() => {
          // Show success message
          const originalText = button.textContent;
          button.textContent = '已复制!';
          
          // Reset button text after 2 seconds
          setTimeout(() => {
            button.textContent = originalText;
          }, 2000);
        }).catch(err => {
          console.error('复制失败:', err);
        });
      }
    });
  });
}

// Add custom cursor styles
function addCursorStyles() {
  // Create style element
  const style = document.createElement('style');
  
  // Set cursor styles
  style.textContent = `
    .cursor-follow {
      position: fixed;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: rgba(138, 43, 226, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.5);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s, background-color 0.3s, opacity 0.3s ease;
      opacity: 0;
      mix-blend-mode: screen;
      filter: blur(0.5px);
      box-shadow: 0 0 10px rgba(138, 43, 226, 0.7);
      will-change: transform;
    }
    
    .cursor-glow {
      position: fixed;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(138, 43, 226, 0.6) 0%, rgba(138, 43, 226, 0.2) 50%, rgba(138, 43, 226, 0) 70%);
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s, opacity 0.3s ease;
      opacity: 0;
      filter: blur(5px);
      will-change: transform;
      mix-blend-mode: screen;
    }
    
    .cursor-grow {
      width: 32px;
      height: 32px;
      background-color: rgba(158, 63, 246, 0.7);
      box-shadow: 0 0 15px rgba(158, 63, 246, 0.9);
    }
    
    .glow-grow {
      width: 80px;
      height: 80px;
      background: radial-gradient(circle, rgba(158, 63, 246, 0.8) 0%, rgba(158, 63, 246, 0.3) 50%, rgba(158, 63, 246, 0) 70%);
    }
    
    @media (max-width: 768px) {
      .cursor-follow, .cursor-glow {
        display: none;
      }
    }
  `;
  
  // Append to head
  document.head.appendChild(style);
}

// Toggle theme function (optional - for future use)
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('light-theme');
  
  // Save preference to localStorage
  const isDarkTheme = !body.classList.contains('light-theme');
  localStorage.setItem('dark-theme', isDarkTheme);
}

// Utility function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Add dynamic type effect to an element
function typeEffect(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Load and display project data
function loadProjects(container, category = null) {
  const projectsContainer = document.getElementById(container);
  if (!projectsContainer) return;
  
  // Sample project data - in a real app, this might come from an API or JSON file
  const projects = [
    {
      id: 'snake-game',
      title: '贪吃蛇',
      category: 'game',
      description: '经典的贪吃蛇游戏，使用JavaScript和Canvas实现。',
      image: 'assets/images/snake-game.jpg',
      link: '#'
    },
    {
      id: 'yanglegyang',
      title: '羊了个羊',
      category: 'game',
      description: '一款有挑战性的消除游戏，匹配相同图案以清除它们。',
      image: 'assets/images/yanglegyang.jpg',
      link: '#'
    },
    {
      id: 'airplane-game',
      title: '飞机大战',
      category: 'game',
      description: '经典的射击游戏，玩家控制飞机摧毁来袭的敌人。',
      image: 'assets/images/airplane-game.jpg',
      link: '#'
    },
    {
      id: 'schedule-tool',
      title: '提效日程',
      category: 'tool',
      description: '一款简洁的日程管理工具，帮助用户提高工作效率。',
      image: 'assets/images/schedule-tool.jpg',
      link: '#'
    },
    {
      id: 'frontend-ppt',
      title: '前端PPT',
      category: 'tool',
      description: '基于Web的演示文稿工具，专为前端开发者设计。',
      image: 'assets/images/frontend-ppt.jpg',
      link: '#'
    },
    {
      id: 'ai-assistant',
      title: '智能体助手',
      category: 'ai',
      description: '基于大语言模型的智能助手，可以完成各种任务。',
      image: 'assets/images/ai-assistant.jpg',
      link: '#'
    }
  ];
  
  // Filter projects by category if specified
  const filteredProjects = category 
    ? projects.filter(project => project.category === category)
    : projects;
  
  // Clear container
  projectsContainer.innerHTML = '';
  
  // Create project cards
  filteredProjects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'card project-card fade-in';
    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-actions">
          <a href="${project.link}" class="btn" target="_blank">查看项目</a>
          <button class="btn btn-copy" data-copy-text="${project.link}">复制链接</button>
          <button class="btn" data-modal="true" data-modal-type="project" data-modal-source="${project.id}">详情</button>
        </div>
      </div>
    `;
    
    projectsContainer.appendChild(projectCard);
  });
  
  // Initialize fade-in animation
  document.querySelectorAll('.fade-in').forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('visible');
    }
  });
  
  // Re-initialize copy buttons
  initCopyButtons();
} 