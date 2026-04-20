/**
 * Simplified animations for the personal website - minimalist style
 */

window.initAnimations = function() {
  // Intersection Observer for fade-in animations
  const fadeElements = document.querySelectorAll('.fade-in:not(.observed)');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  fadeElements.forEach(element => {
    element.classList.add('observed');
    fadeObserver.observe(element);
  });
  
  // 简化的首页初始化
  initSimpleHero();
};

document.addEventListener('DOMContentLoaded', () => {
  window.initAnimations();
  
  // 简化的首页初始化
  initSimpleHero();
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        history.pushState(null, null, targetId);
      }
    });
  });

  // Active navigation based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');
  
  function setActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', setActiveNavLink);
  setActiveNavLink();
});

// 简化的首页初始化函数
function initSimpleHero() {
  // 简单的渐入效果，无需复杂的字符动画
  const heroContent = document.querySelector('.hero .max-w-3xl');
  if (heroContent) {
      setTimeout(() => {
      heroContent.classList.add('visible');
    }, 100);
  }
  
  // 给宣传文案添加简单延迟显示
  const heroDescription = document.querySelector('.hero p.text-xl');
  if (heroDescription) {
    heroDescription.style.transitionDelay = '0.3s';
  }
  
  // 给按钮添加简单延迟显示
  const heroButtons = document.querySelector('.hero .flex');
  if (heroButtons) {
    heroButtons.style.transitionDelay = '0.5s';
  }
} 