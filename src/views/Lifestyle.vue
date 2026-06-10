<template>
  <div class="lifestyle">
    <!-- 固定头部 -->
    <div class="sticky-header">
      <!-- 导航栏 -->
      <van-nav-bar title="生活端碳积分" left-arrow @click-left="goBack" />

      <!-- 进度条 -->
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="progress-text">已完成 {{ completedItems }} / {{ totalItems }} 项</div>
    </div>

    <!-- 表单区域 -->
    <div class="form-container">
      <!-- 家庭用电 -->
      <div class="form-section">
        <h3 class="section-title">⚡ 家庭用电</h3>
        <p class="section-desc">请选择您家每月用电情况</p>
        <div class="option-list">
          <div
            v-for="option in electricityOptions"
            :key="option.id"
            class="option-item"
            :class="{ selected: form.electricity === option.id }"
            @click="form.electricity = option.id"
          >
            <div class="option-dot">
              <div class="option-dot-inner" v-if="form.electricity === option.id"></div>
            </div>
            <span class="option-label">{{ option.label }}</span>
          </div>
        </div>
      </div>

      <!-- 炊事燃料 -->
      <div class="form-section">
        <h3 class="section-title">🔥 炊事燃料</h3>
        <p class="section-desc">请选择您家做饭使用的燃料</p>
        <div class="option-list">
          <div
            v-for="option in cookingOptions"
            :key="option.id"
            class="option-item"
            :class="{ selected: form.cooking === option.id }"
            @click="form.cooking = option.id"
          >
            <div class="option-dot">
              <div class="option-dot-inner" v-if="form.cooking === option.id"></div>
            </div>
            <span class="option-label">{{ option.label }}</span>
          </div>
        </div>
      </div>

      <!-- 交通出行 -->
      <div class="form-section">
        <h3 class="section-title">🚗 交通出行</h3>
        <p class="section-desc">请选择您日常出行方式</p>
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

      <!-- 生活用水 -->
      <div class="form-section">
        <h3 class="section-title">💧 生活用水</h3>
        <p class="section-desc">请选择您家每月用水情况</p>
        <div class="option-list">
          <div
            v-for="option in waterOptions"
            :key="option.id"
            class="option-item"
            :class="{ selected: form.water === option.id }"
            @click="form.water = option.id"
          >
            <div class="option-dot">
              <div class="option-dot-inner" v-if="form.water === option.id"></div>
            </div>
            <span class="option-label">{{ option.label }}</span>
          </div>
        </div>
      </div>

      <!-- 垃圾分类 -->
      <div class="form-section">
        <h3 class="section-title">♻️ 垃圾分类</h3>
        <p class="section-desc">请选择您参与垃圾分类的情况</p>
        <div class="option-list">
          <div
            v-for="option in wasteOptions"
            :key="option.id"
            class="option-item"
            :class="{ selected: form.waste === option.id }"
            @click="form.waste = option.id"
          >
            <div class="option-dot">
              <div class="option-dot-inner" v-if="form.waste === option.id"></div>
            </div>
            <span class="option-label">{{ option.label }}</span>
          </div>
        </div>
      </div>

      <!-- 冬季取暖 -->
      <div class="form-section">
        <h3 class="section-title">❄️ 冬季取暖</h3>
        <p class="section-desc">请选择您冬季取暖方式</p>
        <div class="option-list">
          <div
            v-for="option in heatingOptions"
            :key="option.id"
            class="option-item"
            :class="{ selected: form.heating === option.id }"
            @click="form.heating = option.id"
          >
            <div class="option-dot">
              <div class="option-dot-inner" v-if="form.heating === option.id"></div>
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
import { lifestyleFactors } from '../data/emissionFactors'
import { calculateLifestyleEmission, calculateLifestyleCredits } from '../utils/calculator'

const router = useRouter()
const store = useCarbonStore()

// 表单数据
const form = ref({
  electricity: null,
  cooking: null,
  transport: null,
  water: null,
  waste: null,
  heating: null
})

// 选项数据
const electricityOptions = lifestyleFactors.electricity.options
const cookingOptions = lifestyleFactors.cooking.options
const transportOptions = lifestyleFactors.transport.options
const waterOptions = lifestyleFactors.water.options
const wasteOptions = lifestyleFactors.waste.options
const heatingOptions = lifestyleFactors.heating.options

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
    electricity: getOptionById(electricityOptions, form.value.electricity),
    cooking: getOptionById(cookingOptions, form.value.cooking),
    transport: getOptionById(transportOptions, form.value.transport),
    water: getOptionById(waterOptions, form.value.water),
    waste: getOptionById(wasteOptions, form.value.waste),
    heating: getOptionById(heatingOptions, form.value.heating)
  }

  const result = calculateLifestyleEmission(inputs)
  const credits = calculateLifestyleCredits(inputs)

  store.setLifestyleInputs(inputs)
  store.setLifestyleResult(result)
  store.setLifestyleCredits(credits.total)

  router.push('/result/lifestyle')
}

function goBack() {
  router.push('/')
}
</script>

<style scoped>
.lifestyle {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 100px;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
}

.progress-bar {
  height: 6px;
  background: #e0e0e0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2196f3, #03a9f4);
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
  background: #e3f2fd;
  transform: scale(0.98);
}

.option-item.selected {
  background: #e3f2fd;
  border-color: #2196f3;
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
  border-color: #2196f3;
}

.option-dot-inner {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #2196f3;
}

.option-label {
  font-size: 15px;
  color: #333;
  line-height: 1.4;
}

.option-item.selected .option-label {
  color: #1565c0;
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
