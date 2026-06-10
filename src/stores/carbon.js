import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCarbonStore = defineStore('carbon', () => {
  // 用户输入数据
  const productionInputs = ref({})
  const lifestyleInputs = ref({})

  // 计算结果
  const productionResult = ref(null)
  const lifestyleResult = ref(null)

  // 积分数据
  const productionCredits = ref(0)
  const lifestyleCredits = ref(0)

  // 总积分
  const totalCredits = computed(() => productionCredits.value + lifestyleCredits.value)

  // 设置生产端输入
  function setProductionInputs(inputs) {
    productionInputs.value = inputs
  }

  // 设置生活端输入
  function setLifestyleInputs(inputs) {
    lifestyleInputs.value = inputs
  }

  // 设置生产端结果
  function setProductionResult(result) {
    productionResult.value = result
  }

  // 设置生活端结果
  function setLifestyleResult(result) {
    lifestyleResult.value = result
  }

  // 设置生产端积分
  function setProductionCredits(credits) {
    productionCredits.value = credits
  }

  // 设置生活端积分
  function setLifestyleCredits(credits) {
    lifestyleCredits.value = credits
  }

  // 重置所有数据
  function resetAll() {
    productionInputs.value = {}
    lifestyleInputs.value = {}
    productionResult.value = null
    lifestyleResult.value = null
    productionCredits.value = 0
    lifestyleCredits.value = 0
  }

  return {
    productionInputs,
    lifestyleInputs,
    productionResult,
    lifestyleResult,
    productionCredits,
    lifestyleCredits,
    totalCredits,
    setProductionInputs,
    setLifestyleInputs,
    setProductionResult,
    setLifestyleResult,
    setProductionCredits,
    setLifestyleCredits,
    resetAll
  }
})
