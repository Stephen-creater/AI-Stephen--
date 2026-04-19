/**
 * Modal functionality for the personal website
 * Handles opening/closing modals and loading content dynamically
 */

class Modal {
  constructor() {
    this.modalContainer = document.getElementById('modal');
    this.modalContent = document.getElementById('modal-content');
    this.modalClose = document.getElementById('modal-close');
    this.isOpen = false;
    
    // Initialize if modal exists in DOM
    if (this.modalContainer) {
      this.init();
    } else {
      this.createModal();
    }
  }
  
  createModal() {
    // Create modal elements if they don't exist
    this.modalContainer = document.createElement('div');
    this.modalContainer.id = 'modal';
    this.modalContainer.className = 'modal';
    
    this.modalContent = document.createElement('div');
    this.modalContent.id = 'modal-content';
    this.modalContent.className = 'modal-content';
    
    this.modalClose = document.createElement('button');
    this.modalClose.id = 'modal-close';
    this.modalClose.className = 'modal-close';
    this.modalClose.innerHTML = '&times;';
    
    this.modalContent.appendChild(this.modalClose);
    this.modalContainer.appendChild(this.modalContent);
    document.body.appendChild(this.modalContainer);
    
    this.init();
  }
  
  init() {
    // Close button event
    this.modalClose.addEventListener('click', () => {
      this.close();
    });
    
    // Close on background click
    this.modalContainer.addEventListener('click', (e) => {
      if (e.target === this.modalContainer) {
        this.close();
      }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Set up click listeners for modal triggers
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-modal]');
      if (trigger) {
        e.preventDefault();
        const modalId = trigger.dataset.modal;
        const modalContent = document.getElementById(modalId);
        
        if (modalContent) {
          // Clone the content and show in modal
          this.open(modalContent.cloneNode(true));
        } else {
          // If content isn't pre-loaded, check for data attributes
          const type = trigger.dataset.modalType;
          const source = trigger.dataset.modalSource;
          
          if (type === 'movie' && source) {
            this.loadMovieDetails(source);
          } else if (type === 'project' && source) {
            this.loadProjectDetails(source);
          } else {
            // Generic content loading
            this.loadContent(trigger.href || source);
          }
        }
      }
    });
  }
  
  open(content) {
    if (typeof content === 'string') {
      this.modalContent.innerHTML = `
        <button id="modal-close" class="modal-close">&times;</button>
        <div class="modal-body">${content}</div>
      `;
      // Re-assign the close button since we replaced it
      this.modalClose = document.getElementById('modal-close');
      this.modalClose.addEventListener('click', () => this.close());
    } else if (content instanceof HTMLElement) {
      // Clear previous content
      while (this.modalContent.firstChild) {
        if (this.modalContent.firstChild === this.modalClose) {
          this.modalContent.firstChild.nextSibling && 
            this.modalContent.removeChild(this.modalContent.firstChild.nextSibling);
        } else {
          this.modalContent.removeChild(this.modalContent.firstChild);
        }
      }
      
      this.modalContent.appendChild(content);
    }
    
    // Show the modal
    this.modalContainer.classList.add('open');
    this.isOpen = true;
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.modalContainer.classList.remove('open');
    this.isOpen = false;
    
    // Allow body scrolling again
    document.body.style.overflow = '';
  }
  
  loadMovieDetails(movieId) {
    // This would be replaced with actual API call in production
    // For demo, we use predefined movie data
    const movies = {
      'guardians': {
        title: '银河护卫队',
        englishTitle: 'Guardians of the Galaxy',
        year: '2014',
        director: 'James Gunn',
        poster: 'https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
        description: '彼得·奎尔和一群外星囚犯组成了一支不太可能的英雄团队，他们必须保护一个具有巨大力量的神秘球体免受强大的威胁。',
        quote: '"我们是银河护卫队！" - 星爵',
        rating: '8.0/10',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/ko4N6wWp0UYlMmsVyfIfLyRAZtP.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/i34ijHY5hr52uYcKZ48wq7K6yUs.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/mZSAu5acXueGC4Z3S5iLSWx8AEp.jpg'
        ]
      },
      'avengers': {
        title: '复仇者联盟',
        englishTitle: 'The Avengers',
        year: '2012',
        director: 'Joss Whedon',
        poster: 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
        description: '当地球面临前所未有的威胁时，尼克·弗瑞和神盾局的特工将地球最强大的英雄们聚集在一起，组成复仇者联盟。',
        quote: '"如果我们不能保护地球，我们一定会为它复仇。" - 钢铁侠',
        rating: '8.1/10',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/9XAt3insTWL3jDADvWkO5IJAOM8.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/gHLs7Fy3DzLmLsD4lmfqL55KGcl.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/pqHltWKiECNh5j1MO1zU7X3j54a.jpg'
        ]
      },
      'infinity-war': {
        title: '复仇者联盟：无限战争',
        englishTitle: 'Avengers: Infinity War',
        year: '2018',
        director: 'Anthony & Joe Russo',
        poster: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
        description: '灭霸的目标是收集所有的无限宝石，拥有不可思议的力量，并使用它们实现他扭曲的意志。复仇者联盟和他们的盟友必须准备为宇宙牺牲一切。',
        quote: '"你们猜怎么着，我就是天命。" - 灭霸',
        rating: '8.4/10',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/nMnsSfNqMRJ5KujWMOnCS82Xklz.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/sbpTzyKkBedre1CjExJMNawEbHB.jpg'
        ]
      },
      // 新增电影信息
      'endgame': {
        title: '复仇者联盟：终局之战',
        englishTitle: 'Avengers: Endgame',
        year: '2019',
        director: 'Anthony & Joe Russo',
        poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
        description: '在灭霸消灭了宇宙一半的生命后，剩余的复仇者们必须找到一种方法来挽回他们失去的朋友和恢复宇宙的平衡。',
        quote: '"无论要付出什么代价。" - 美国队长',
        rating: '8.4/10',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/h9q0ozwMWy7CK5U7FSZsMVtbsCQ.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/1qjS1enn14Bey78GnF0q4xWGXCm.jpg'
        ]
      },
      'doctor-strange': {
        title: '奇异博士',
        englishTitle: 'Doctor Strange',
        year: '2016',
        director: 'Scott Derrickson',
        poster: 'https://image.tmdb.org/t/p/w500/xf8PbyQcR5ucXErmZNzdKR0s8ya.jpg',
        description: '一位外科医生史蒂芬·斯特兰奇在一次车祸后失去了对双手的使用能力，他寻找治愈的方法，最终发现了神秘的魔法世界和多元宇宙的存在。',
        quote: '"我来谈判的。" - 奇异博士',
        rating: '7.5/10',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/7qI7HPrw3hD2toqYQ62vOdkLx3I.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/tqX1kakpqHNMFOeYbT4XZgudn7x.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/3zvZ699gMW2RhWc0GisIukzq0Ls.jpg'
        ]
      },
      'black-panther': {
        title: '黑豹',
        englishTitle: 'Black Panther',
        year: '2018',
        director: 'Ryan Coogler',
        poster: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
        description: '在父亲死后，特查拉回到了与世隔绝但技术先进的非洲国家瓦坎达，成为新国王。但是，一个强大的老敌人重新出现，特查拉的勇气作为国王和黑豹都受到了考验。',
        quote: '"瓦坎达万岁！" - 特查拉',
        rating: '7.3/10',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/AlFqBwJnokrp9zWTXOUv7uhkaeq.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/g48QjOQSy6PUMGPoKm8BZYyLEAw.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/mjVIlewPMlmTR6PCggsasmaMcac.jpg'
        ]
      },
      'thor-4': {
        title: '雷神4：爱与雷霆',
        englishTitle: 'Thor: Love and Thunder',
        year: '2022',
        director: 'Taika Waititi',
        poster: 'https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
        description: '雷神索尔在寻找内心的平静时，被卷入了一场银河系冲突，这使他不得不与自己的老朋友——"银河护卫队"联手。与此同时，戈尔神屠开始消灭众神，而简·福斯特竟然成为了女雷神，手持雷神之锤与索尔并肩作战。',
        quote: '"为爱而战。"',
        rating: '6.7/10',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/M2S9lDvj7LBKaXowSwq1e73upz.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/vUggnBQepscpXRPenvixY9pMp5.jpg'
        ]
      },
      'ant-man-3': {
        title: '蚁人3：量子狂潮',
        englishTitle: 'Ant-Man and the Wasp: Quantumania',
        year: '2023',
        director: 'Peyton Reed',
        poster: 'https://image.tmdb.org/t/p/w500/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg',
        description: '斯科特·朗和霍普·凡·戴恩与女巫阿加莎·哈克尼斯一起踏上了一段危险旅程，以揭开量子领域的秘密。当他们来到了这个奇异世界，他们发现了征服者康——一个时间旅行者，他被困在量子领域并试图逃脱。',
        quote: '"征服量子领域。"',
        rating: '6.1/10',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/yr16bxr1luCMKPAHbRbrcwnXRbW.jpg',
          'https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/m8JTwHFwX7I7JY5fPe4SjqejWag.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/jJiAJ05XSa81OtTVfmTEx5lFvf5.jpg'
        ]
      }
    };
    
    const movie = movies[movieId];
    
    if (movie) {
      const content = `
        <div class="movie-modal">
          <button id="modal-close" class="modal-close">&times;</button>
          <div class="movie-modal-header">
            <div class="movie-modal-poster">
              <img src="${movie.poster}" alt="${movie.title}">
            </div>
          </div>
          <div class="movie-modal-content">
            <div class="movie-modal-title">
              <h2>${movie.title}</h2>
              <p class="text-gray-400">${movie.englishTitle} (${movie.year})</p>
              <p class="text-gray-400 mt-2">导演: ${movie.director}</p>
              <div class="flex items-center mt-3">
                <span class="star text-yellow-400 mr-1">★</span>
                <span class="text-yellow-400 font-bold">${movie.rating}</span>
              </div>
            </div>
            <div class="movie-modal-info">
              <div class="movie-modal-section">
                <h3>剧情简介</h3>
                <p>${movie.description}</p>
              </div>
              <div class="movie-modal-section">
                <h3>经典台词</h3>
                <div class="movie-modal-quote">
                  <p>${movie.quote}</p>
                </div>
              </div>
              ${movie.images && movie.images.length ? `
              <div class="movie-modal-section">
                <h3>剧照</h3>
                <div class="movie-modal-gallery">
                  ${movie.images.map(img => `<img src="${img}" alt="${movie.title} 剧照" loading="lazy">`).join('')}
                </div>
              </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
      
      this.open(content);
    } else {
      this.open(`<p>影片信息不可用</p>`);
    }
  }
  
  loadProjectDetails(projectId) {
    // Similar to loadMovieDetails but for projects
    const projects = {
      'snake-game': {
        title: '贪吃蛇',
        description: '经典的贪吃蛇游戏，使用JavaScript和Canvas实现。特点包括多种难度级别和计分系统。',
        image: 'assets/images/snake-game.jpg',
        technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
        link: '#'
      },
      'yanglegyang': {
        title: '羊了个羊',
        description: '一款有挑战性的消除游戏，玩家需要匹配相同的图案以清除它们。',
        image: 'assets/images/yanglegyang.jpg',
        technologies: ['React', 'Redux', 'GSAP Animation'],
        link: '#'
      },
      'airplane-game': {
        title: '飞机大战',
        description: '经典的射击游戏，玩家控制飞机摧毁来袭的敌人。',
        image: 'assets/images/airplane-game.jpg',
        technologies: ['JavaScript', 'HTML5 Canvas', 'WebAudio API'],
        link: '#'
      }
    };
    
    const project = projects[projectId];
    
    if (project) {
      const content = `
        <button id="modal-close" class="modal-close">&times;</button>
        <div class="project-detail">
          <div class="project-image">
            <img src="${project.image}" alt="${project.title}" />
          </div>
          <div class="project-info">
            <h2 class="glow-text">${project.title}</h2>
            <p class="project-description">${project.description}</p>
            <div class="project-technologies">
              <h4>使用技术:</h4>
              <ul>
                ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
              </ul>
            </div>
            <div class="project-actions">
              <a href="${project.link}" class="btn btn-primary" target="_blank">查看项目</a>
            </div>
          </div>
        </div>
      `;
      
      this.open(content);
    } else {
      this.open(`<p>项目信息不可用</p>`);
    }
  }
  
  loadContent(url) {
    // This could be an AJAX request in a real application
    this.open(`<p>Loading content from ${url}...</p>`);
    
    // Simulate loading with setTimeout
    setTimeout(() => {
      this.open(`<p>Content loaded from ${url}</p>`);
    }, 1000);
  }
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.appModal = new Modal();
}); 