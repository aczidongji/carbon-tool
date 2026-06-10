<template>
  <div class="production">
    <!-- 导航栏 -->
    <van-nav-bar title="生产端碳测算" left-arrow @click-left="goBack" />

    <!-- 进度条 -->
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="progress-text">已完成 {{ completedItems }} / {{ totalItems }} 项</div>

    <!-- 表单区域 -->
    <div class="form-container">
      <!-- 化肥施用 -->
      <div class="form-section">
        <h3 class="section-title">🌱 化肥施用</h3>
        <p class="section-desc">请选择您使用化肥的情况</p>
        <div class="option-list">
          <div
            v-for="option in fertilizerOptions"
            :key="option.id"
            class="option-item"
            :class="{ selected: form.fertilizer === option.id }"
            @click="form.fertilizer = option.id"
          >
            <div class="option-dot">
              <div class="option-dot-inner" v-if="form.fertilizer === option.id"></div>
            </div>
            <span class="option-label">{{ option.label }}</span>
          </div>
        </div>
      </div>

      <!-- 农药使用 -->
      <div class="form-section">
        <h3 class="section-title">🧴 农药使用</h3>
        <p class="section-desc">请选择您使用农药的情况</p>
        <div class="option-list">
          <div
            v-for="option in pesticideOptions"
            :key="option.id"
            class="option-item"
            :class="{ selected: form.pesticide === option.id }"
            @click="form.pesticide = option.id"
          >
            <div class="option-dot">
              <div class="option-dot-inner" v-if="form.pesticide === option.id"></div>
            </div>
            <span class="option-label">{{ option.label }}</span>
          </div>
        </div>
      </div>

      <!-- 农膜使用 -->
      <div class="form-section">
        <h3 class="section-title">📦 农膜使用与回收</h3>
        <p class="section-desc">请选择您使用和回收农膜的情况</p>
        <div class="option-list">
          <div
            v-for="option in filmOptions"
            :key="option.id"
            class="option-item"
            :class="{ selected: form.film === option.id }"
            @click="form.film = option.id"
          >
            <div class="option-dot">
              <div class="option-dot-inner" v-if="form.film === option.id"></div>
            </div>
            <span class="option-label">{{ option.label }}</span>
          </div>
        </div>
      </div>

      <!-- 农机燃油 -->
      <div class="form-section">
        <h3 class="section-title">🚜 农机燃油</h3>
        <p class="section-desc">请选择您使用农机的情况</p>
        <div class="option-list">
          <div
            v-for="option in machineryOptions"
            :key="option.id"
            class="option-item"
            :class="{ selected: form.machinery === option.id }"
            @click="form.machinery = option.id"
          >
            <div class="option-dot">
              <div class="option-dot-inner" v-if="form.machinery === option.id"></div>
            </div>
            <span class="option-label">{{ option.label }}</span>
          </div>
        </div>
      </div>

      <!-- 灌溉用电 -->
      <div class="form-section">
        <h3 class="section-title">💧 灌溉用电</h3>
        <p class="section-desc">请选择您的灌溉用电情况</p>
        <div class="option-list">
          <div
            v-for="option in irrigationOptions"
            :key="option.id"
            class="option-item"
            :class="{ selected: form.irrigation === option.id }"
            @click="form.irrigation = option.id"
          >
            <div class="option-dot">
              <div class="option-dot-inner" v-if="form.irrigation === option.id"></div>
            </div>
            <span class="option-label">{{ option.label }}</span>
          </div>
        </div>
      </div>

      <!-- 运输能耗 -->
      <div class="form-section">
        <h3 class="section-title">🚛 运输能耗</h3>
        <p class="section-desc">请选择您产品运输的距离</p>
        <div class="option-list">
          <div
            v-for="option in transportOptions"
            :key="option.id"
            class="option-item"
            :class="{ selected: form.transport === option.id }"
            @click="form.transport = option.id"
          >
            <div class="option-dot">
              <div class="option-dot-inner" v-if="form.transport === option.id"></div>
            </div>
            <span class="option-label">{{ option.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="submit-area">
      <van-button
        type="primary"
        block
        round
        size="large"
        :disabled="!isFormComplete"
        @click="handleSubmit"
      >
        查看测算结果
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCarbonStore } from '../stores/carbon'
import { productionFactors } from '../data/emissionFactors'
import { calculateProductionEmission, calculateProductionCredits } from '../utils/calculator'

const router = useRouter()
const store = useCarbonStore()

// 表单数据
const form = ref({
  fertilizer: null,
  pesticide: null,
  film: null,
  machinery: null,
  irrigation: null,
  transport: null
})

// 选项数据
const fertilizerOptions = productionFactors.fertilizer.options
const pesticideOptions = productionFactors.pesticide.options
const filmOptions = productionFactors.film.options
const machineryOptions = productionFactors.machinery.options
const irrigationOptions = productionFactors.irrigation.options
const transportOptions = productionFactors.transport.options

// 根据 id 获取选项
function getOptionById(options, id) {
  return options.find(o => o.id === id)
}

// 计算完成项数
const completedItems = computed(() => {
  return Object.values(form.value).filter(v => v !== null).length
})

const totalItems = 6

// 进度百分比
const progress = computed(() => {
  return (completedItems.value / totalItems) * 100
})

// 表单是否完成
const isFormComplete = computed(() => {
  return completedItems.value === totalItems
})

// 提交表单
function handleSubmit() {
  const inputs = {
    fertilizer: getOptionById(fertilizerOptions, form.value.fertilizer),
    pesticide: getOptionById(pesticideOptions, form.value.pesticide),
    film: getOptionById(filmOptions, form.value.film),
    machinery: getOptionById(machineryOptions, form.value.machinery),
    irrigation: getOptionById(irrigationOptions, form.value.irrigation),
    transport: getOptionById(transportOptions, form.value.transport)
  }

  const result = calculateProductionEmission(inputs)
  const credits = calculateProductionCredits(inputs)

  store.setProductionInputs(inputs)
  store.setProductionResult(result)
  store.setProductionCredits(credits.total)

  router.push('/result/production')
}

function goBack() {
  router.push('/')
}
</script>

<style scoped>
.production {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 100px;
}

.progress-bar {
  height: 6px;
  background: #e0e0e0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  padding: 14px;
  font-size: 15px;
  color: #555;
  background: white;
  font-weight: bold;
}

.form-container {
  padding: 16px;
}

.form-section {
  background: white;
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.section-title {
  font-size: 17px;
  color: #333;
  margin-bottom: 4px;
}

.section-desc {
  font-size: 13px;
  color: #999;
  margin-bottom: 14px;
}

.option-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e8e8e8;
  transition: all 0.15s;
}

.option-item:active {
  background: #e8f5e9;
  transform: scale(0.98);
}

.option-item.selected {
  background: #e8f5e9;
  border-color: #4caf50;
}

.option-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #ccc;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.15s;
}

.option-item.selected .option-dot {
  border-color: #4caf50;
}

.option-dot-inner {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4caf50;
}

.option-label {
  font-size: 15px;
  color: #333;
  line-height: 1.4;
}

.option-item.selected .option-label {
  color: #2e7d32;
  font-weight: bold;
}

.submit-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: white;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
}
</style>
