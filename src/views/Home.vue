<template>
  <div class="home">
    <!-- 顶部标题区 -->
    <div class="header">
      <div class="header-icon">🌿</div>
      <h1 class="title">碳足迹测算工具</h1>
      <p class="subtitle">峨边彝族自治县</p>
    </div>

    <!-- 功能选择区 -->
    <div class="section">
      <h2 class="section-title">选择测算类型</h2>

      <!-- 生产端测算 -->
      <div class="card" @click="goToProduction">
        <div class="card-icon">🌾</div>
        <div class="card-content">
          <h3 class="card-title">生产端碳测算</h3>
          <p class="card-desc">面向合作社 / 农户</p>
          <p class="card-detail">测算农业生产碳排放，获取品牌溢价数据</p>
        </div>
        <div class="card-arrow">▶</div>
      </div>

      <!-- 生活端测算 -->
      <div class="card" @click="goToLifestyle">
        <div class="card-icon">🏠</div>
        <div class="card-content">
          <h3 class="card-title">生活端碳积分</h3>
          <p class="card-desc">面向基层群众</p>
          <p class="card-detail">测算日常生活碳排放，获取积分兑换奖品</p>
        </div>
        <div class="card-arrow">▶</div>
      </div>
    </div>

    <!-- 说明区 -->
    <div class="section tips">
      <h2 class="section-title">使用说明</h2>
      <div class="tip-item">
        <span class="tip-num">1</span>
        <span class="tip-text">选择您要测算的类型</span>
      </div>
      <div class="tip-item">
        <span class="tip-num">2</span>
        <span class="tip-text">根据实际情况勾选各项数据</span>
      </div>
      <div class="tip-item">
        <span class="tip-num">3</span>
        <span class="tip-text">查看碳排放结果和积分兑换</span>
      </div>
    </div>

    <!-- 底部信息 -->
    <div class="footer">
      <p>碳足迹测算 + 碳积分激励</p>
      <p class="footer-note">数据仅用于感知和激励，不用于碳交易</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToProduction() {
  router.push('/production')
}

function goToLifestyle() {
  router.push('/lifestyle')
}
</script>

<style scoped>
.home {
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(180deg, #e8f5e9 0%, #f5f5f5 30%);
}

.header {
  text-align: center;
  padding: 30px 0 20px;
}

.header-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.title {
  font-size: 28px;
  color: #2e7d32;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 16px;
  color: #666;
}

.section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 16px;
  padding-left: 12px;
  border-left: 4px solid #4caf50;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 2px solid #e8f5e9;
  transition: transform 0.15s, box-shadow 0.15s;
  cursor: pointer;
}

.card:active {
  transform: scale(0.97);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background-color: #fafffe;
}

.card-icon {
  font-size: 40px;
  margin-right: 16px;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 4px;
}

.card-desc {
  font-size: 14px;
  color: #4caf50;
  margin-bottom: 4px;
  font-weight: bold;
}

.card-detail {
  font-size: 12px;
  color: #999;
}

.card-arrow {
  font-size: 20px;
  color: #4caf50;
  margin-left: 12px;
}

.tips {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.tip-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.tip-item:last-child {
  margin-bottom: 0;
}

.tip-num {
  width: 28px;
  height: 28px;
  background: #4caf50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  margin-right: 14px;
  flex-shrink: 0;
}

.tip-text {
  font-size: 15px;
  color: #555;
}

.footer {
  text-align: center;
  padding: 30px 0;
  color: #999;
  font-size: 14px;
}

.footer-note {
  font-size: 12px;
  margin-top: 8px;
}
</style>
