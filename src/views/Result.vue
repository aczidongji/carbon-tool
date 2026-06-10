<template>
  <div class="result">
    <!-- 导航栏 -->
    <van-nav-bar :title="resultTitle" left-arrow @click-left="goBack" />

    <!-- 碳排放总量卡片 -->
    <div class="summary-card">
      <div class="summary-icon">{{ resultIcon }}</div>
      <div class="summary-total">{{ totalEmission }}</div>
      <div class="summary-unit">千克二氧化碳</div>
      <div class="summary-label">碳排放总量</div>
    </div>

    <!-- 碳积分卡片 -->
    <div class="credit-card">
      <div class="credit-star">★</div>
      <div class="credit-content">
        <div class="credit-title">获得碳积分</div>
        <div class="credit-value">{{ totalCredits }} 分</div>
      </div>
    </div>

    <!-- 排放分项图表 -->
    <div class="chart-section">
      <h3 class="section-title">碳排放分项占比</h3>
      <div class="chart-container" ref="chartRef"></div>
    </div>

    <!-- 分项详情 -->
    <div class="detail-section">
      <h3 class="section-title">分项详情</h3>
      <div class="detail-list">
        <div
          v-for="item in emissionDetails"
          :key="item.name"
          class="detail-item"
        >
          <div class="detail-name">{{ item.name }}</div>
          <div class="detail-bar">
            <div
              class="detail-bar-fill"
              :style="{ width: item.percentage + '%' }"
            ></div>
          </div>
          <div class="detail-value">{{ item.value.toFixed(2) }}</div>
          <div class="detail-percentage">{{ item.percentage }}%</div>
        </div>
      </div>
      <div class="detail-unit">单位：千克二氧化碳</div>
    </div>

    <!-- 碳积分详情 -->
    <div class="credit-detail-section">
      <h3 class="section-title">积分明细</h3>
      <div class="credit-list">
        <div
          v-for="item in creditDetails"
          :key="item.name"
          class="credit-item"
        >
          <div class="credit-item-icon">+</div>
          <div class="credit-item-info">
            <div class="credit-item-name">{{ item.name }}</div>
            <div class="credit-item-desc">{{ item.description }}</div>
          </div>
          <div class="credit-item-value">{{ item.credits }} 分</div>
        </div>
        <div v-if="creditDetails.length === 0" class="no-credit">
          暂无积分，选择低碳行为可获得积分
        </div>
      </div>
    </div>

    <!-- 可兑换物品 -->
    <div class="exchange-section" v-if="exchangeableItems.length > 0">
      <h3 class="section-title">可兑换物品</h3>
      <div class="exchange-list">
        <div
          v-for="item in exchangeableItems"
          :key="item.name"
          class="exchange-item"
        >
          <div class="exchange-icon">{{ item.icon }}</div>
          <div class="exchange-name">{{ item.name }}</div>
          <div class="exchange-credits">{{ item.credits }} 分</div>
        </div>
      </div>
    </div>

    <!-- 提示信息 -->
    <div class="tip-section">
      <p class="tip-text">* 所有数据均为预设值，待实地调研后校准</p>
      <p class="tip-text">* 碳积分可兑换日用品和金融服务优惠</p>
    </div>

    <!-- 操作按钮 -->
    <div class="action-area">
      <van-button plain block round size="large" @click="handleRecalculate">
        重新测算
      </van-button>
      <van-button type="primary" block round size="large" @click="handleGoHome" style="margin-top: 12px;">
        返回首页
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCarbonStore } from '../stores/carbon'
import { getExchangeableItems } from '../utils/calculator'
import * as echarts from 'echarts'

const router = useRouter()
const route = useRoute()
const store = useCarbonStore()

const chartRef = ref(null)
let chart = null

// 判断类型
const type = computed(() => route.params.type)
const isProduction = computed(() => type.value === 'production')

// 结果数据
const resultTitle = computed(() => isProduction.value ? '生产端测算结果' : '生活端测算结果')
const resultIcon = computed(() => isProduction.value ? '🌾' : '🏠')
const totalEmission = computed(() => {
  const result = isProduction.value ? store.productionResult : store.lifestyleResult
  return result ? result.total : '0.00'
})

const totalCredits = computed(() => {
  return isProduction.value ? store.productionCredits : store.lifestyleCredits
})

const emissionDetails = computed(() => {
  const result = isProduction.value ? store.productionResult : store.lifestyleResult
  return result ? result.details : []
})

const creditDetails = computed(() => {
  const inputs = isProduction.value ? store.productionInputs : store.lifestyleInputs
  const details = []

  if (isProduction.value) {
    if (inputs.fertilizer && (inputs.fertilizer.level === 'low' || inputs.fertilizer.level === 'none')) {
      details.push({ name: '化肥减量', description: inputs.fertilizer.label, credits: inputs.fertilizer.level === 'none' ? 100 : 50 })
    }
    if (inputs.film && inputs.film.recycled) {
      details.push({ name: '农膜回收', description: '农膜全部回收', credits: 30 })
    }
    if (inputs.pesticide && (inputs.pesticide.level === 'low' || inputs.pesticide.level === 'none')) {
      details.push({ name: '农药减量', description: inputs.pesticide.label, credits: inputs.pesticide.level === 'none' ? 80 : 40 })
    }
    if (inputs.transport && inputs.transport.level === 'local') {
      details.push({ name: '本地销售', description: '减少运输碳排放', credits: 60 })
    }
  } else {
    if (inputs.electricity && inputs.electricity.level === 'low') {
      details.push({ name: '节约用电', description: '用电量低', credits: 50 })
    }
    if (inputs.waste && inputs.waste.sorted) {
      details.push({ name: '垃圾分类', description: inputs.waste.label, credits: 30 })
    }
    if (inputs.transport && inputs.transport.green) {
      details.push({ name: '绿色出行', description: inputs.transport.label, credits: 40 })
    }
    if (inputs.water && inputs.water.level === 'low') {
      details.push({ name: '节约用水', description: '用水量低', credits: 30 })
    }
    if (inputs.cooking && inputs.cooking.level === 'none') {
      details.push({ name: '清洁能源', description: '使用电磁炉', credits: 40 })
    }
    if (inputs.heating && inputs.heating.level === 'none') {
      details.push({ name: '无需取暖', description: '不需要取暖', credits: 20 })
    }
  }

  return details
})

const exchangeableItems = computed(() => {
  return getExchangeableItems(totalCredits.value)
})

// 初始化图表
function initChart() {
  if (!chartRef.value || emissionDetails.value.length === 0) return

  nextTick(() => {
    if (chart) {
      chart.dispose()
    }
    chart = echarts.init(chartRef.value)

    const data = emissionDetails.value.map(item => ({
      name: item.name,
      value: parseFloat(item.value.toFixed(2))
    }))

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        left: 'center',
        textStyle: {
          fontSize: 12
        }
      },
      series: [
        {
          name: '碳排放',
          type: 'pie',
          radius: ['40%', '65%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: data,
          color: ['#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800']
        }
      ]
    }

    chart.setOption(option)
  })
}

function handleResize() {
  if (chart) {
    chart.resize()
  }
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

watch(emissionDetails, () => {
  initChart()
}, { deep: true })

function goBack() {
  if (isProduction.value) {
    router.push('/production')
  } else {
    router.push('/lifestyle')
  }
}

function handleRecalculate() {
  if (isProduction.value) {
    router.push('/production')
  } else {
    router.push('/lifestyle')
  }
}

function handleGoHome() {
  router.push('/')
}
</script>

<style scoped>
.result {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 32px;
}

.summary-card {
  background: linear-gradient(135deg, #4caf50, #8bc34a);
  color: white;
  text-align: center;
  padding: 30px 20px;
  margin: 16px;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
}

.summary-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.summary-total {
  font-size: 52px;
  font-weight: bold;
}

.summary-unit {
  font-size: 14px;
  opacity: 0.9;
}

.summary-label {
  font-size: 16px;
  opacity: 0.9;
  margin-top: 8px;
}

.credit-card {
  background: white;
  margin: 0 16px 16px;
  padding: 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.credit-star {
  font-size: 36px;
  margin-right: 16px;
  color: #ff9800;
}

.credit-content {
  flex: 1;
}

.credit-title {
  font-size: 14px;
  color: #666;
}

.credit-value {
  font-size: 32px;
  font-weight: bold;
  color: #ff9800;
}

.chart-section {
  background: white;
  margin: 0 16px 16px;
  padding: 18px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.chart-container {
  width: 100%;
  height: 250px;
}

.section-title {
  font-size: 17px;
  color: #333;
  margin-bottom: 16px;
  padding-left: 12px;
  border-left: 4px solid #4caf50;
}

.detail-section {
  background: white;
  margin: 0 16px 16px;
  padding: 18px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.detail-item {
  display: grid;
  grid-template-columns: 70px 1fr 60px 45px;
  align-items: center;
  gap: 8px;
}

.detail-name {
  font-size: 13px;
  color: #333;
}

.detail-bar {
  height: 10px;
  background: #e8f5e9;
  border-radius: 5px;
  overflow: hidden;
}

.detail-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  border-radius: 5px;
  transition: width 0.5s ease;
}

.detail-value {
  font-size: 12px;
  color: #666;
  text-align: right;
}

.detail-percentage {
  font-size: 13px;
  color: #4caf50;
  text-align: right;
  font-weight: bold;
}

.detail-unit {
  text-align: right;
  font-size: 11px;
  color: #999;
  margin-top: 10px;
}

.credit-detail-section {
  background: white;
  margin: 0 16px 16px;
  padding: 18px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.credit-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.credit-item {
  display: flex;
  align-items: center;
  padding: 14px;
  background: #fff8e1;
  border-radius: 12px;
}

.credit-item-icon {
  width: 28px;
  height: 28px;
  background: #4caf50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  margin-right: 14px;
  flex-shrink: 0;
}

.credit-item-info {
  flex: 1;
}

.credit-item-name {
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.credit-item-desc {
  font-size: 12px;
  color: #888;
  margin-top: 2px;
}

.credit-item-value {
  font-size: 18px;
  font-weight: bold;
  color: #ff9800;
}

.no-credit {
  text-align: center;
  padding: 24px;
  color: #999;
  font-size: 14px;
}

.exchange-section {
  background: white;
  margin: 0 16px 16px;
  padding: 18px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.exchange-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.exchange-item {
  text-align: center;
  padding: 16px 8px;
  background: #f1f8e9;
  border-radius: 12px;
  border: 2px solid #c8e6c9;
}

.exchange-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.exchange-name {
  font-size: 13px;
  color: #333;
  margin-bottom: 4px;
  font-weight: bold;
}

.exchange-credits {
  font-size: 12px;
  color: #ff9800;
  font-weight: bold;
}

.tip-section {
  margin: 0 16px 16px;
  padding: 16px;
  background: #e8f5e9;
  border-radius: 12px;
}

.tip-text {
  font-size: 13px;
  color: #2e7d32;
  margin-bottom: 8px;
  line-height: 1.5;
}

.tip-text:last-child {
  margin-bottom: 0;
}

.action-area {
  padding: 16px;
}
</style>
