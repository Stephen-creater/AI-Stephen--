<template>
  <footer>
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">My<span class="text-purple-light">Tech</span>Universe</h3>
          <p>探索、创造与无限可能</p>
        </div>

        <div>
          <h4 class="text-lg font-medium mb-4">快速导航</h4>
          <ul class="space-y-2">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/portfolio">作品</router-link></li>
            <li><router-link to="/interests">兴趣</router-link></li>
            <li><router-link to="/knowledge">知识库</router-link></li>
            <li><router-link to="/contact">联系我</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-medium mb-4">联系方式</h4>
          <ul class="space-y-2">
            <li>邮箱: yaonanye1@gmail.com</li>
            <li>微信: thanoswillreturn</li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-800 text-center">
        <p class="text-sm">
          &copy; 2025 MyTechUniverse. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
