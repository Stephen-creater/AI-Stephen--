<script setup>
import { onMounted, onUnmounted } from 'vue'

let interestsController = null
const preloadedImageUrls = new Set()

function optimizeGalleryImage(url) {
  if (!url) return url

  return url
    .replace('/w1000_and_h563_face/', '/w533_and_h300_face/')
    .replace('/w1066_and_h600_bestv2/', '/w533_and_h300_bestv2/')
}

function preloadImage(url) {
  if (!url || preloadedImageUrls.has(url)) return

  const image = new Image()
  image.decoding = 'async'
  image.src = url
  preloadedImageUrls.add(url)
}

function preloadMovieAssets(movieId) {
  const movie = movieData[movieId]
  if (!movie) return

  preloadImage(movie.poster)
  movie.images?.slice(0, 3).forEach((img) => preloadImage(optimizeGalleryImage(img)))
}

    // 电影详情数据
    const movieData = {
      'iron-man': {
        title: '钢铁侠',
        englishTitle: 'Iron Man',
        year: '2008',
        director: 'Jon Favreau',
        poster: 'https://www.themoviedb.org/t/p/w1280/jOCNOwURzzkOBCpmJKg4Fay4F0L.jpg',
        rating: '7.9/10',
        description: '亿万富翁托尼·斯塔克在阿富汗被绑架后，创造了一套高科技盔甲来逃脱。回国后，他完善了这套装备并用它来打击罪犯和恐怖主义。这部电影标志着漫威电影宇宙的开端，塑造了一个复杂而魅力十足的超级英雄形象。',
        quote: '"我就是钢铁侠。"',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/h9q0ozwMWy7CK5U7FSZsMVtbsCQ.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/nnY3Lac8YGW1Q0Nrqj4H9zlXGps.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/mVjkQx4lUgoJYcXObFUjd3nstJp.jpg',
          
        ]
      },
      'guardians': {
        title: '银河护卫队',
        englishTitle: 'Guardians of the Galaxy',
        year: '2014',
        director: 'James Gunn',
        poster: 'https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
        rating: '8.0/10',
        description: '一群性格各异的亡命之徒意外获得一个强大的球体，然后必须团结起来阻止星际恶棍罗南摧毁星系。彼得·奎尔、卡魔拉、德拉克斯、火箭浣熊和格鲁特组成了这个不拘一格的超级英雄团队。',
        quote: '"我是格鲁特。"',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/ko4N6wWp0UYlMmsVyfIfLyRAZtP.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/i34ijHY5hr52uYcKZ48wq7K6yUs.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/mZSAu5acXueGC4Z3S5iLSWx8AEp.jpg',
          
        ]
      },
      'avengers': {
        title: '复仇者联盟',
        englishTitle: 'The Avengers',
        year: '2012',
        director: 'Joss Whedon',
        poster: 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
        rating: '8.1/10',
        description: '当洛基和他的外星军队威胁地球和平时，尼克·弗瑞和神盾局组建了一支超级英雄团队——复仇者联盟。钢铁侠、美国队长、雷神、绿巨人、黑寡妇和鹰眼首次联手，成为地球最强大的英雄团队。',
        quote: '"如果我们不能保护地球，你可以确信我们一定会为它复仇。"',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/9XAt3insTWL3jDADvWkO5IJAOM8.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/gHLs7Fy3DzLmLsD4lmfqL55KGcl.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/pqHltWKiECNh5j1MO1zU7X3j54a.jpg',
         
        ]
      },
      'infinity-war': {
        title: '复仇者联盟：无限战争',
        englishTitle: 'Avengers: Infinity War',
        year: '2018',
        director: 'Anthony & Joe Russo',
        poster: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
        rating: '8.4/10',
        description: '复仇者联盟和他们的盟友必须准备牺牲一切，试图阻止强大的灭霸在获得所有无限宝石后摧毁宇宙中的一半生命。这是漫威电影宇宙中最宏大的战役，也是最令人震撼的故事转折。',
        quote: '"你们猜怎么着，我就是天命。"',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/nMnsSfNqMRJ5KujWMOnCS82Xklz.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/sbpTzyKkBedre1CjExJMNawEbHB.jpg',
          
        ]
      },
      'endgame': {
        title: '复仇者联盟：终局之战',
        englishTitle: 'Avengers: Endgame',
        year: '2019',
        director: 'Anthony & Joe Russo',
        poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
        rating: '8.4/10',
        description: '在灭霸消灭宇宙一半生命后，幸存的复仇者们找到了一线希望，通过量子领域的时间旅行来收集过去的无限宝石，尝试逆转这一悲剧。这是漫威电影宇宙第一阶段的最终章节，也是一场壮观而感人的英雄告别。',
        quote: '"无论要付出什么代价。"',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/h9q0ozwMWy7CK5U7FSZsMVtbsCQ.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/1qjS1enn14Bey78GnF0q4xWGXCm.jpg',
         
        ]
      },
      'doctor-strange': {
        title: '奇异博士',
        englishTitle: 'Doctor Strange',
        year: '2016',
        director: 'Scott Derrickson',
        poster: 'https://image.tmdb.org/t/p/w500/xf8PbyQcR5ucXErmZNzdKR0s8ya.jpg',
        rating: '7.5/10',
        description: '著名神经外科医生史蒂芬·斯特兰奇在一次车祸中失去了双手的控制能力。在寻找治愈方法的过程中，他发现了神秘的魔法维度和卡玛泰姬的法师们。他成为了至尊法师的学徒，学习掌控时间和空间的魔法，最终成为保护地球免受神秘维度威胁的守护者。',
        quote: '"我来谈判的。"',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/7qI7HPrw3hD2toqYQ62vOdkLx3I.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/tqX1kakpqHNMFOeYbT4XZgudn7x.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/3zvZ699gMW2RhWc0GisIukzq0Ls.jpg',
        
        ]
      },
      'black-panther': {
        title: '黑豹',
        englishTitle: 'Black Panther',
        year: '2018',
        director: 'Ryan Coogler',
        poster: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
        rating: '7.3/10',
        description: '在瓦坎达国王特查拉回国继承王位后，必须面对来自国内外的多重威胁。当旧敌再度出现，特查拉作为国王和黑豹的双重身份将受到严峻考验。他必须团结自己的盟友，释放黑豹的全部力量，以保护瓦坎达和世界免于战争。',
        quote: '"瓦坎达万岁！"',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/AlFqBwJnokrp9zWTXOUv7uhkaeq.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/g48QjOQSy6PUMGPoKm8BZYyLEAw.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/mjVIlewPMlmTR6PCggsasmaMcac.jpg',
                ]
      },
      'thor-4': {
        title: '雷神4：爱与雷霆',
        englishTitle: 'Thor: Love and Thunder',
        year: '2022',
        director: 'Taika Waititi',
        poster: 'https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
        rating: '6.7/10',
        description: '雷神索尔在寻找内心的平静时，被卷入了一场银河系冲突，这使他不得不与自己的老朋友——"银河护卫队"联手。与此同时，戈尔神屠开始消灭众神，而简·福斯特竟然成为了女雷神，手持雷神之锤与索尔并肩作战。',
        quote: '"为爱而战。"',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/M2S9lDvj7LBKaXowSwq1e73upz.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/vUggnBQepscpXRPenvixY9pMp5.jpg',
        
        ]
      },
      'ant-man-3': {
        title: '蚁人3：量子狂潮',
        englishTitle: 'Ant-Man and the Wasp: Quantumania',
        year: '2023',
        director: 'Peyton Reed',
        poster: 'https://image.tmdb.org/t/p/w500/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg',
        rating: '6.1/10',
        description: '斯科特·朗和霍普·凡·戴恩一起踏上了一段危险旅程，以揭开量子领域的秘密。当他们来到了这个奇异世界，他们发现了征服者康——一个时间旅行者，他被困在量子领域并试图逃脱。',
        quote: '"征服量子领域。"',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/yr16bxr1luCMKPAHbRbrcwnXRbW.jpg',
          'https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/m8JTwHFwX7I7JY5fPe4SjqejWag.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/jJiAJ05XSa81OtTVfmTEx5lFvf5.jpg',
        
        ]
      },
      'venom-3': {
        title: '毒液3：最后一舞',
        englishTitle: 'Venom: The Last Dance',
        year: '2024',
        director: 'Kelly Marcel',
        poster: 'https://www.themoviedb.org/t/p/w1280/j3AQmdKEPBBkouIszuPJfdBzmi6.jpg',
        rating: '7.0/10',
        description: '在本次《毒液》三部曲的最终篇章中，埃迪·布洛克和毒液成为了逃亡者。他们被两个世界的追猎者紧追不舍，困境迫使这对共生体面临一个毁灭性的决定，将为毒液和埃迪的最后一舞画上句点。',
        quote: '"最后的共生。"',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/gn7zMnro44iruKBSRdsoPBFn82k.jpg',
          'https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/bzajGtlHlqYfB21lOAzZFwYUQqG.jpg',
        
        ]
      },
      'thunderbolts': {
        title: '雷霆特工队',
        englishTitle: 'Thunderbolts',
        year: '2025',
        director: 'Jake Schreier',
        poster: 'https://www.themoviedb.org/t/p/w1280/vU3Ir6FXUvHvm3ASYN7Wl0qhgLn.jpg',
        rating: '7.2/10',
        description: '雷霆特工队是一支由前恶棍和反英雄组成的团队，他们接受政府任务执行危险的黑色行动。在艾琳娜·贝洛娃的带领下，这支不稳定的队伍必须克服彼此间的不信任，共同应对一个意想不到的威胁。',
        quote: '"反派的救赎。"',
        images: [
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/mRLoD607hI2c5fNfCEuqPTFBzM3.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg',
          'https://media.themoviedb.org/t/p/w1000_and_h563_face/vzVojqW0zF9QrXVGuj8PwhxWACD.jpg',
        
        ]
      },
      'avengers-5': {
        title: '复仇者联盟5：末日',
        englishTitle: 'Avengers: Doomsday',
        year: '2026',
        director: 'Destin Daniel Cretton',
        poster: 'https://image.tmdb.org/t/p/w500/https://www.themoviedb.org/t/p/w1280/6eB2oh1SplddsZYCdayrIdrIGLd.jpg.jpg',
        rating: '8.0/10',
        description: '在多元宇宙的威胁不断扩大之际，一支全新的复仇者团队必须团结起来抵抗杜姆博士的入侵。面对前所未有的威胁，来自不同时间线和宇宙的英雄们聚集在一起，开启了漫威电影宇宙全新篇章的壮丽征程。',
        quote: '"多元宇宙集结。"',
        images: [
          'https://assets.zhayieye.com/news/data/article/2025_04_05/f7b2bcd3f33923a981e5ec5a2ef129e1.jpg?x-oss-process=image/resize,w_650,m_lfit',
          'https://upload.wikimedia.org/wikipedia/en/e/ee/Avengers_Doomsday_poster.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3OTXSedyko5gb5b3YJWptJhd47qF4HvOqng&s',
        
        ]
      }
    };
    
    // 动态加载电影详情
    function loadMovieDetails(movieId) {
      const movie = movieData[movieId];
      
      if (!movie) {
        console.error('Movie not found:', movieId);
        return;
      }
      
      // 构建模态框内容
      const modalHTML = `
        <div class="movie-modal-header">
          <div class="movie-modal-poster">
            <img src="${movie.poster}" alt="${movie.title}" loading="eager" fetchpriority="high" decoding="async">
          </div>
        </div>
        <div class="movie-modal-content">
          <div class="movie-modal-title">
            <div class="movie-modal-kicker">Marvel Collection</div>
            <h2>${movie.title}</h2>
            <p class="movie-modal-subtitle">${movie.englishTitle} <span>(${movie.year})</span></p>
            <div class="movie-modal-meta">
              <p><span>导演</span>${movie.director}</p>
              <div class="movie-modal-rating">
                <span class="star">★</span>
                <span>${movie.rating}</span>
              </div>
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
                ${movie.images.map(img => `<img src="${optimizeGalleryImage(img)}" alt="${movie.title} 剧照" loading="eager" decoding="async">`).join('')}
              </div>
            </div>
            ` : ''}
          </div>
        </div>
      `;
      
      // 打开模态框
      const modal = document.getElementById('modal');
      const modalContainer = document.getElementById('modal-content');
      
      if (modalContainer) {
        preloadMovieAssets(movieId);

        // 清除之前的内容
        modalContainer.innerHTML = '';
        
        // 添加关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.id = 'modal-close';
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        });
        
        // 将关闭按钮和内容添加到模态框
        modalContainer.appendChild(closeBtn);
        modalContainer.insertAdjacentHTML('beforeend', modalHTML);
        
        modal.classList.add('open');
        modal.scrollTop = 0;
        
        // 防止背景滚动
        document.body.style.overflow = 'hidden';
      }
    }
    
    // 设置关闭模态框的事件
    onMounted(() => {
      interestsController = new AbortController();
      const { signal } = interestsController;
      const modal = document.getElementById('modal');
      const closeBtn = document.getElementById('modal-close');
      
      if (modal && closeBtn) {
        // 关闭按钮点击事件
        closeBtn.addEventListener('click', () => {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }, { signal });
        
        // 点击模态框背景关闭
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
          }
        }, { signal });
        
        // ESC键关闭
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modal.classList.contains('open')) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
          }
        }, { signal });
      }
      
      // 为电影卡片添加点击事件
      document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', (e) => {
          // 防止按钮点击事件冒泡
          if (e.target.tagName !== 'BUTTON') {
            const button = card.querySelector('button[data-modal-source]');
            if (button) {
              const movieId = button.getAttribute('data-modal-source');
              loadMovieDetails(movieId);
            }
          }
        }, { signal });

        const movieButton = card.querySelector('button[data-modal-source]');
        const movieId = movieButton?.getAttribute('data-modal-source');

        if (movieId) {
          card.addEventListener('mouseenter', () => preloadMovieAssets(movieId), { signal });
          card.addEventListener('focusin', () => preloadMovieAssets(movieId), { signal });
        }
      });
      
      // 为详情按钮添加点击事件
      document.querySelectorAll('button[data-modal-type="movie"]').forEach(button => {
        button.addEventListener('click', (e) => {
          e.stopPropagation(); // 阻止冒泡
          const movieId = button.getAttribute('data-modal-source');
          loadMovieDetails(movieId);
        }, { signal });
      });
    });

    onUnmounted(() => {
      interestsController?.abort();
      interestsController = null;
      document.body.style.overflow = '';
    });
  
</script>

<template>
  <div class="interests-page">

  <!-- Header -->
  
  
  <!-- Interests Hero Section -->
  <section class="page-hero">
    <div class="container">
      <div class="page-hero__card page-hero__card--compact">
        <h1 class="page-title interests-page-title" style="margin-left: auto; margin-right: auto;">
          <span>漫威宇宙</span>与<span class="accent-word">科幻世界</span>
        </h1>
        <p class="page-summary" style="margin-left: auto; margin-right: auto;">
          这里记录了我喜欢的漫威科幻电影、经典台词和影评感想。<br>
          <span class="text-sm text-gray-400 mt-3 block">A space dedicated to my favorite Marvel sci-fi movies, quotes, and reviews.</span>
        </p>
        <div class="page-hero__divider"></div>
      </div>
    </div>
  </section>
  
  <!-- Marvel Movies Showcase -->
  <section class="py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-5xl font-bold mb-12 text-center">Marvel 电影精选</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <!-- Movie Card: 钢铁侠 (Iron Man) -->
        <div>
          <div class="movie-card h-72" style="background-image: url('https://www.themoviedb.org/t/p/w1280/jOCNOwURzzkOBCpmJKg4Fay4F0L.jpg')">
            <div class="movie-rating">
              <span class="star">★</span> 7.9/10
            </div>
            <div class="movie-card-content">
              <h3 class="text-lg font-bold mb-1">钢铁侠</h3>
              <p class="text-xs text-gray-300">Iron Man (2008)</p>
              <div class="movie-info">
                <p class="text-xs text-gray-400">我就是钢铁侠。</p>
              </div>
              <button data-modal="true" data-modal-type="movie" data-modal-source="iron-man">查看详情</button>
            </div>
          </div>
        </div>
        
        <!-- Movie Card: Guardians of the Galaxy -->
        <div>
          <div class="movie-card h-72" style="background-image: url('https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg')">
            <div class="movie-rating">
              <span class="star">★</span> 8.0/10
            </div>
            <div class="movie-card-content">
              <h3 class="text-lg font-bold mb-1">银河护卫队</h3>
              <p class="text-xs text-gray-300">Guardians of the Galaxy (2014)</p>
              <div class="movie-info">
                <p class="text-xs text-gray-400">我们是格鲁特。</p>
              </div>
              <button data-modal="true" data-modal-type="movie" data-modal-source="guardians">查看详情</button>
            </div>
          </div>
        </div>
        
        <!-- Movie Card: Avengers -->
        <div>
          <div class="movie-card h-72" style="background-image: url('https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg')">
            <div class="movie-rating">
              <span class="star">★</span> 8.1/10
            </div>
            <div class="movie-card-content">
              <h3 class="text-lg font-bold mb-1">复仇者联盟</h3>
              <p class="text-xs text-gray-300">The Avengers (2012)</p>
              <div class="movie-info">
                <p class="text-xs text-gray-400">地球最强的英雄们。</p>
              </div>
              <button data-modal="true" data-modal-type="movie" data-modal-source="avengers">查看详情</button>
            </div>
          </div>
        </div>
        
        <!-- Movie Card: Infinity War -->
        <div>
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
        
        <!-- Movie Card: Doctor Strange -->
        <div v-fade-in>
          <div class="movie-card h-72" style="background-image: url('https://image.tmdb.org/t/p/w500/xf8PbyQcR5ucXErmZNzdKR0s8ya.jpg')">
            <div class="movie-rating">
              <span class="star">★</span> 7.5/10
            </div>
            <div class="movie-card-content">
              <h3 class="text-lg font-bold mb-1">奇异博士</h3>
              <p class="text-xs text-gray-300">Doctor Strange (2016)</p>
              <div class="movie-info">
                <p class="text-xs text-gray-400">我是来谈判的。</p>
              </div>
              <button data-modal="true" data-modal-type="movie" data-modal-source="doctor-strange">查看详情</button>
            </div>
          </div>
        </div>
        
        <!-- Movie Card: Black Panther -->
        <div v-fade-in>
          <div class="movie-card h-72" style="background-image: url('https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg')">
            <div class="movie-rating">
              <span class="star">★</span> 7.3/10
            </div>
            <div class="movie-card-content">
              <h3 class="text-lg font-bold mb-1">黑豹</h3>
              <p class="text-xs text-gray-300">Black Panther (2018)</p>
              <div class="movie-info">
                <p class="text-xs text-gray-400">瓦坎达万岁！</p>
              </div>
              <button data-modal="true" data-modal-type="movie" data-modal-source="black-panther">查看详情</button>
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
        
        <!-- Movie Card: Venom 3 -->
        <div v-fade-in>
          <div class="movie-card h-72" style="background-image: url('https://www.themoviedb.org/t/p/w1280/j3AQmdKEPBBkouIszuPJfdBzmi6.jpg')">
            <div class="movie-rating">
              <span class="star">★</span> 7.0/10
            </div>
            <div class="movie-card-content">
              <h3 class="text-lg font-bold mb-1">毒液3：最后一舞</h3>
              <p class="text-xs text-gray-300">Venom: The Last Dance (2024)</p>
              <div class="movie-info">
                <p class="text-xs text-gray-400">最后的共生。</p>
              </div>
              <button data-modal="true" data-modal-type="movie" data-modal-source="venom-3">查看详情</button>
            </div>
          </div>
        </div>
        
        <!-- Movie Card: Thunderbolts -->
        <div v-fade-in>
          <div class="movie-card h-72" style="background-image: url('https://www.themoviedb.org/t/p/w1280/vU3Ir6FXUvHvm3ASYN7Wl0qhgLn.jpg')">
            <div class="movie-rating">
              <span class="star">★</span> 7.2/10
            </div>
            <div class="movie-card-content">
              <h3 class="text-lg font-bold mb-1">雷霆特工队</h3>
              <p class="text-xs text-gray-300">Thunderbolts (2025)</p>
              <div class="movie-info">
                <p class="text-xs text-gray-400">反派的救赎。</p>
              </div>
              <button data-modal="true" data-modal-type="movie" data-modal-source="thunderbolts">查看详情</button>
            </div>
          </div>
        </div>
        
        <!-- Movie Card: Avengers 5 -->
        <div v-fade-in>
          <div class="movie-card h-72" style="background-image: url('https://www.themoviedb.org/t/p/w1280/6eB2oh1SplddsZYCdayrIdrIGLd.jpg')">
            <div class="movie-rating">
              <span class="star">★</span> 8.0/10
            </div>
            <div class="movie-card-content">
              <h3 class="text-lg font-bold mb-1">复仇者联盟5</h3>
              <p class="text-xs text-gray-300">Avengers: Doomsday (2026)</p>
              <div class="movie-info">
                <p class="text-xs text-gray-400">多元宇宙集结。</p>
              </div>
              <button data-modal="true" data-modal-type="movie" data-modal-source="avengers-5">查看详情</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Favorite Quotes Section -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-5xl font-bold mb-6 text-center">经典台词</h2>
      <p class="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
        这些是我最喜欢的漫威电影台词，它们激励着我，给我力量。
        <span class="block text-sm text-gray-400 mt-1">My favorite Marvel quotes that inspire and empower me.</span>
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Quote 1 -->
        <div v-fade-in class="card quote-card">
          <div class="flex items-start">
            <div class="text-3xl font-bold mr-4" style="color: var(--muted-soft);">"</div>
            <div>
              <p class="text-lg mb-4">复仇者，集结！</p>
              <p class="text-sm text-gray-400 mb-2">Avengers, assemble!</p>
              <p style="color: var(--accent-orange);">—— 美国队长 / Captain America</p>
              <p class="text-xs text-gray-500">《复仇者联盟：终局之战》(2019)</p>
            </div>
          </div>
        </div>
        
        <!-- Quote 2 -->
        <div v-fade-in class="card quote-card">
          <div class="flex items-start">
            <div class="text-3xl font-bold mr-4" style="color: var(--muted-soft);">"</div>
            <div>
              <p class="text-lg mb-4">无论代价是什么。</p>
              <p class="text-sm text-gray-400 mb-2">Whatever it takes.</p>
              <p style="color: var(--accent-orange);">—— 复仇者联盟 / Avengers</p>
              <p class="text-xs text-gray-500">《复仇者联盟：终局之战》(2019)</p>
            </div>
          </div>
        </div>
        
        <!-- Quote 3 -->
        <div v-fade-in class="card quote-card">
          <div class="flex items-start">
            <div class="text-3xl font-bold mr-4" style="color: var(--muted-soft);">"</div>
            <div>
              <p class="text-lg mb-4">我可以和你打一整天。</p>
              <p class="text-sm text-gray-400 mb-2">I can do this all day.</p>
              <p style="color: var(--accent-orange);">—— 美国队长 / Captain America</p>
              <p class="text-xs text-gray-500">《美国队长：冬日战士》(2014)</p>
            </div>
          </div>
        </div>
        
        <!-- Quote 4 -->
        <div v-fade-in class="card quote-card">
          <div class="flex items-start">
            <div class="text-3xl font-bold mr-4" style="color: var(--muted-soft);">"</div>
            <div>
              <p class="text-lg mb-4">命运终会降临。</p>
              <p class="text-sm text-gray-400 mb-2">Dread it. Run from it. Destiny arrives all the same.</p>
              <p style="color: var(--accent-orange);">—— 灭霸 / Thanos</p>
              <p class="text-xs text-gray-500">《复仇者联盟：无限战争》(2018)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Movie Rankings Section -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-5xl font-bold mb-6 text-center">我的漫威电影榜单</h2>
      <p class="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
        以下是我心目中的漫威电影排名，基于个人喜好和观影体验。
        <span class="block text-sm text-gray-400 mt-1">My personal ranking of Marvel movies based on enjoyment and viewing experience.</span>
      </p>
      
      <div class="max-w-2xl mx-auto">
        <div class="space-y-6">
          <!-- Rank 1 -->
          <div v-fade-in class="card">
            <div class="flex items-center ranking-row ranking-row--first">
              <div class="text-4xl font-bold mr-6 ranking-row__index" style="color: var(--accent-orange);">1</div>
              <div class="flex-1">
                <h3 class="text-xl font-bold">复仇者联盟：终局之战</h3>
                <p class="text-sm text-gray-300">Avengers: Endgame (2019)</p>
              </div>
              <div class="text-xl font-bold" style="color: var(--accent-orange);">9.5</div>
            </div>
          </div>
          
          <!-- Rank 2 -->
          <div v-fade-in class="card">
            <div class="flex items-center">
              <div class="text-4xl font-bold mr-6" style="color: var(--accent-orange);">2</div>
              <div class="flex-1">
                <h3 class="text-xl font-bold">复仇者联盟：无限战争</h3>
                <p class="text-sm text-gray-300">Avengers: Infinity War (2018)</p>
              </div>
              <div class="text-xl font-bold" style="color: var(--accent-orange);">9.2</div>
            </div>
          </div>
          
          <!-- Rank 3 -->
          <div v-fade-in class="card">
            <div class="flex items-center">
              <div class="text-4xl font-bold mr-6" style="color: var(--accent-orange);">3</div>
              <div class="flex-1">
                <h3 class="text-xl font-bold">奇异博士</h3>
                <p class="text-sm text-gray-300">Doctor Strange (2016)</p>
              </div>
              <div class="text-xl font-bold" style="color: var(--accent-orange);">9.0</div>
            </div>
          </div>
          
          <!-- Rank 4 -->
          <div v-fade-in class="card">
            <div class="flex items-center">
              <div class="text-4xl font-bold mr-6" style="color: var(--accent-orange);">4</div>
              <div class="flex-1">
                <h3 class="text-xl font-bold">银河护卫队</h3>
                <p class="text-sm text-gray-300">Guardians of the Galaxy (2014)</p>
              </div>
              <div class="text-xl font-bold" style="color: var(--accent-orange);">8.8</div>
            </div>
          </div>
          
          <!-- Rank 5 -->
          <div v-fade-in class="card">
            <div class="flex items-center">
              <div class="text-4xl font-bold mr-6" style="color: var(--accent-orange);">5</div>
              <div class="flex-1">
                <h3 class="text-xl font-bold">黑豹</h3>
                <p class="text-sm text-gray-300">Black Panther (2018)</p>
              </div>
              <div class="text-xl font-bold" style="color: var(--accent-orange);">8.5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Marvel Universe Infographic -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-5xl font-bold mb-6 text-center">漫威宇宙时间线</h2>
      <p class="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
        这是一个简化的漫威电影宇宙时间线，帮助理解各个电影之间的联系。
        <span class="block text-sm text-gray-400 mt-1">A simplified timeline of the Marvel Cinematic Universe.</span>
      </p>
      
      <div class="relative max-w-4xl mx-auto py-8">
        <!-- Timeline Line -->
        <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1" style="background: rgba(217, 119, 87, 0.2);"></div>
        
        <!-- Timeline Item 1 -->
        <div class="relative z-10 mb-16">
          <div class="flex items-center">
            <div v-fade-in class="w-1/2 pr-8 text-right">
              <h3 class="text-xl font-bold" style="color: var(--accent-orange);">第一阶段</h3>
              <p class="text-gray-300">起源故事</p>
              <p class="text-sm text-gray-400 mt-2">钢铁侠、雷神、美国队长各自的起源故事，最终在《复仇者联盟》中聚集。</p>
            </div>
            <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full" style="background: var(--accent-orange);"></div>
            <div v-fade-in class="w-1/2 pl-8">
              <p class="text-sm text-gray-400">2008-2012</p>
            </div>
          </div>
        </div>
        
        <!-- Timeline Item 2 -->
        <div class="relative z-10 mb-16">
          <div class="flex items-center">
            <div v-fade-in class="w-1/2 pr-8 text-right">
              <p class="text-sm text-gray-400">2013-2015</p>
            </div>
            <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full" style="background: var(--accent-orange);"></div>
            <div v-fade-in class="w-1/2 pl-8">
              <h3 class="text-xl font-bold" style="color: var(--accent-orange);">第二阶段</h3>
              <p class="text-gray-300">团队扩展</p>
              <p class="text-sm text-gray-400 mt-2">银河护卫队加入，复仇者团队扩大，奥创出现。</p>
            </div>
          </div>
        </div>
        
        <!-- Timeline Item 3 -->
        <div class="relative z-10 mb-16">
          <div class="flex items-center">
            <div v-fade-in class="w-1/2 pr-8 text-right">
              <h3 class="text-xl font-bold" style="color: var(--accent-orange);">第三阶段</h3>
              <p class="text-gray-300">内战与无限战争</p>
              <p class="text-sm text-gray-400 mt-2">复仇者内战，灭霸收集无限宝石，宇宙危机。</p>
            </div>
            <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full" style="background: var(--accent-orange);"></div>
            <div v-fade-in class="w-1/2 pl-8">
              <p class="text-sm text-gray-400">2016-2019</p>
            </div>
          </div>
        </div>
        
        <!-- Timeline Item 4 -->
        <div class="relative z-10">
          <div class="flex items-center">
            <div v-fade-in class="w-1/2 pr-8 text-right">
              <p class="text-sm text-gray-400">2020-现在</p>
            </div>
            <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full" style="background: var(--accent-orange);"></div>
            <div v-fade-in class="w-1/2 pl-8">
              <h3 class="text-xl font-bold" style="color: var(--accent-orange);">第四阶段</h3>
              <p class="text-gray-300">多元宇宙</p>
              <p class="text-sm text-gray-400 mt-2">时间变异管理局，多元宇宙的开启，新英雄的崛起。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 电影详情模态框 -->
  <div id="modal" class="modal">
    <div id="modal-content" class="movie-modal">
      <button id="modal-close" class="modal-close">&times;</button>
      <!-- 模态框内容将由JavaScript动态加载 -->
    </div>
  </div>
  
  <!-- 添加电影详情模板 -->
  

  </div>
</template>

<style>
    .interests-page-title {
      max-width: none !important;
      white-space: nowrap;
    }

    .ranking-row--first {
      align-items: flex-start;
      padding-left: 0.22rem;
    }

    .ranking-row--first .ranking-row__index {
      line-height: 1;
      padding-top: 0.18rem;
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
      box-shadow: 0 14px 28px rgba(20, 20, 19, 0.14);
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
      background-color: rgba(255, 253, 248, 0.94);
      color: var(--ink);
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
      background-color: var(--accent-orange);
      color: #fff;
      transform: translateY(-2px);
    }
    
    /* 电影详情弹窗样式 */
    .movie-modal {
      display: flex;
      flex-direction: row;
      width: 100%;
      max-width: 980px;
      min-height: 620px;
      max-height: calc(100vh - 3rem);
      margin: auto;
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
      justify-content: stretch;
      border-bottom: none;
      width: 38%;
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
      justify-content: flex-start;
      width: 62%;
      max-height: calc(100vh - 3rem);
      overflow-y: auto;
      padding: 2.3rem 2.6rem 2.1rem;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 18%),
        linear-gradient(180deg, rgba(138, 43, 226, 0.06), rgba(138, 43, 226, 0.02));
    }
    
    .movie-modal-title {
      margin-bottom: 1.75rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid rgba(32, 37, 48, 0.12);
    }

    .movie-modal-kicker {
      color: rgba(255, 196, 87, 0.92);
      font-size: 0.72rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin-bottom: 0.9rem;
    }
    
    .movie-modal-title h2 {
      font-size: clamp(2.2rem, 3vw, 2.9rem);
      font-weight: 700;
      margin-bottom: 0.65rem;
      color: #171923;
      line-height: 1.08;
      letter-spacing: -0.03em;
    }

    .movie-modal-subtitle {
      color: rgba(46, 54, 69, 0.78);
      font-size: 1.02rem;
      line-height: 1.5;
    }

    .movie-modal-subtitle span {
      color: rgba(46, 54, 69, 0.52);
    }

    .movie-modal-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }

    .movie-modal-meta p {
      margin: 0;
      color: #2a3140;
      font-size: 1.02rem;
      line-height: 1.4;
    }

    .movie-modal-meta p span {
      display: inline-block;
      margin-right: 0.55rem;
      color: rgba(46, 54, 69, 0.56);
      font-size: 0.84rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .movie-modal-rating {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.45rem 0.8rem;
      border-radius: 999px;
      background: rgba(255, 196, 87, 0.12);
      border: 1px solid rgba(255, 196, 87, 0.24);
      color: #FFC457;
      font-weight: 700;
      font-size: 1rem;
    }
    
    .movie-modal-info {
      padding: 0;
    }
    
    .movie-modal-section {
      margin-bottom: 1.7rem;
    }
    
    .movie-modal-section h3 {
      color: #8A2BE2;
      font-size: 1.45rem;
      margin-bottom: 0.75rem;
      font-weight: 650;
    }
    
    .movie-modal-section p {
      color: #8A8D93;
      line-height: 1.85;
      font-size: 1rem;
    }
    
    .movie-modal-quote {
      font-style: italic;
      padding: 1.15rem 1.2rem;
      background-color: rgba(106, 13, 173, 0.1);
      border-left: 4px solid #8A2BE2;
      border-radius: 0 10px 10px 0;
      margin: 0.85rem 0 0;
    }
    
    .movie-modal-gallery {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
      overflow-x: auto;
      padding-bottom: 0.35rem;
    }
    
    .movie-modal-gallery img {
      width: 100%;
      height: 92px;
      object-fit: cover;
      border-radius: 8px;
      opacity: 1;
      background: rgba(255, 255, 255, 0.04);
      transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .movie-modal-gallery img:hover {
      opacity: 1;
      transform: scale(1.05);
      box-shadow: 0 12px 22px rgba(0, 0, 0, 0.28);
    }
    
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
      inset: 0;
      background-color: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);
      display: grid;
      place-items: center;
      padding: 2rem;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      overflow-y: auto;
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
        min-height: auto;
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
        padding: 1.5rem 1.25rem 1.35rem;
      }

      .movie-modal-meta {
        align-items: flex-start;
        flex-direction: column;
      }

      .movie-modal-gallery {
        grid-template-columns: 1fr;
      }

      .movie-modal-gallery img {
        height: 140px;
      }
    }
  
</style>
