<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-container {
  min-height: 100vh;
  max-width: 750px;
  margin: 0 auto;
  background: #f5f5f5;
}

/* 全局按钮样式 */
.van-button--primary {
  background: #4caf50 !important;
  border-color: #4caf50 !important;
}

.van-button--primary:active {
  background: #388e3c !important;
}

.van-button--default {
  border-color: #4caf50 !important;
  color: #4caf50 !important;
}

/* 导航栏样式 */
.van-nav-bar {
  background: #4caf50 !important;
}

.van-nav-bar__title {
  color: white !important;
  font-weight: bold;
}

.van-nav-bar .van-icon {
  color: white !important;
}

/* 禁用按钮样式 */
.van-button--disabled {
  opacity: 0.5;
}
</style>
