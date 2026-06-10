/**
 * 碳足迹计算工具函数
 */

/**
 * 计算单项碳排放量
 * @param {number} quantity - 活动量
 * @param {number} factor - 排放系数
 * @returns {number} 碳排放量 (kgCO2)
 */
export function calculateEmission(quantity, factor) {
  return quantity * factor
}

/**
 * 计算生产端碳排放总量
 * @param {Object} inputs - 用户输入的各项活动数据
 * @returns {Object} 计算结果
 */
export function calculateProductionEmission(inputs) {
  const details = []
  let total = 0

  // 化肥施用
  if (inputs.fertilizer) {
    const emission = calculateEmission(inputs.fertilizer.value, inputs.fertilizer.factor)
    details.push({ name: '化肥施用', value: emission, percentage: 0 })
    total += emission
  }

  // 农药使用
  if (inputs.pesticide) {
    const emission = calculateEmission(inputs.pesticide.value, inputs.pesticide.factor)
    details.push({ name: '农药使用', value: emission, percentage: 0 })
    total += emission
  }

  // 农膜使用
  if (inputs.film) {
    const emission = calculateEmission(inputs.film.value, inputs.film.factor)
    details.push({ name: '农膜使用', value: emission, percentage: 0 })
    total += emission
  }

  // 农机燃油
  if (inputs.machinery) {
    const emission = calculateEmission(inputs.machinery.value, inputs.machinery.factor)
    details.push({ name: '农机燃油', value: emission, percentage: 0 })
    total += emission
  }

  // 灌溉用电
  if (inputs.irrigation) {
    const emission = calculateEmission(inputs.irrigation.value, inputs.irrigation.factor)
    details.push({ name: '灌溉用电', value: emission, percentage: 0 })
    total += emission
  }

  // 运输能耗
  if (inputs.transport) {
    const emission = calculateEmission(inputs.transport.value, inputs.transport.factor)
    details.push({ name: '运输能耗', value: emission, percentage: 0 })
    total += emission
  }

  // 计算各项占比
  details.forEach(item => {
    item.percentage = total > 0 ? (item.value / total * 100).toFixed(1) : 0
  })

  return {
    total: total.toFixed(2),
    details,
    unit: 'kgCO2'
  }
}

/**
 * 计算生活端碳排放总量
 * @param {Object} inputs - 用户输入的各项活动数据
 * @returns {Object} 计算结果
 */
export function calculateLifestyleEmission(inputs) {
  const details = []
  let total = 0

  // 家庭用电
  if (inputs.electricity) {
    const emission = calculateEmission(inputs.electricity.value, inputs.electricity.factor)
    details.push({ name: '家庭用电', value: emission, percentage: 0 })
    total += emission
  }

  // 炊事燃料
  if (inputs.cooking) {
    const emission = calculateEmission(inputs.cooking.value, inputs.cooking.factor)
    details.push({ name: '炊事燃料', value: emission, percentage: 0 })
    total += emission
  }

  // 交通出行
  if (inputs.transport) {
    const emission = calculateEmission(inputs.transport.value, inputs.transport.factor)
    details.push({ name: '交通出行', value: emission, percentage: 0 })
    total += emission
  }

  // 生活用水
  if (inputs.water) {
    const emission = calculateEmission(inputs.water.value, inputs.water.factor)
    details.push({ name: '生活用水', value: emission, percentage: 0 })
    total += emission
  }

  // 垃圾分类
  if (inputs.waste) {
    const emission = calculateEmission(inputs.waste.value, inputs.waste.factor)
    details.push({ name: '垃圾分类', value: emission, percentage: 0 })
    total += emission
  }

  // 冬季取暖
  if (inputs.heating) {
    const emission = calculateEmission(inputs.heating.value, inputs.heating.factor)
    details.push({ name: '冬季取暖', value: emission, percentage: 0 })
    total += emission
  }

  // 计算各项占比
  details.forEach(item => {
    item.percentage = total > 0 ? (item.value / total * 100).toFixed(1) : 0
  })

  return {
    total: total.toFixed(2),
    details,
    unit: 'kgCO2'
  }
}

/**
 * 计算生产端碳积分
 * @param {Object} inputs - 用户输入数据
 * @returns {Object} 积分结果
 */
export function calculateProductionCredits(inputs) {
  let totalCredits = 0
  const details = []

  // 化肥减量积分 (选择"少量使用"或"不使用"可获得积分)
  if (inputs.fertilizer && (inputs.fertilizer.level === 'low' || inputs.fertilizer.level === 'none')) {
    const credits = inputs.fertilizer.level === 'none' ? 100 : 50
    details.push({ name: '化肥减量', credits, description: inputs.fertilizer.label })
    totalCredits += credits
  }

  // 农膜回收积分 (选择"全部回收"可获得积分)
  if (inputs.film && inputs.film.recycled) {
    const credits = 30
    details.push({ name: '农膜回收', credits, description: '农膜全部回收' })
    totalCredits += credits
  }

  // 农药减量积分 (选择"少量使用"或"不使用"可获得积分)
  if (inputs.pesticide && (inputs.pesticide.level === 'low' || inputs.pesticide.level === 'none')) {
    const credits = inputs.pesticide.level === 'none' ? 80 : 40
    details.push({ name: '农药减量', credits, description: inputs.pesticide.label })
    totalCredits += credits
  }

  // 本地销售积分 (选择"本地销售"可获得积分)
  if (inputs.transport && inputs.transport.level === 'local') {
    const credits = 60
    details.push({ name: '本地销售', credits, description: '减少运输碳排放' })
    totalCredits += credits
  }

  return {
    total: totalCredits,
    details
  }
}

/**
 * 计算生活端碳积分
 * @param {Object} inputs - 用户输入数据
 * @returns {Object} 积分结果
 */
export function calculateLifestyleCredits(inputs) {
  let totalCredits = 0
  const details = []

  // 节电积分 (选择"用电量低"可获得积分)
  if (inputs.electricity && inputs.electricity.level === 'low') {
    const credits = 50
    details.push({ name: '节约用电', credits, description: '用电量低' })
    totalCredits += credits
  }

  // 垃圾分类积分 (选择"严格分类"或"简单分类"可获得积分)
  if (inputs.waste && inputs.waste.sorted) {
    const credits = inputs.waste.level === 'high' ? 30 : 15
    details.push({ name: '垃圾分类', credits, description: inputs.waste.label })
    totalCredits += credits
  }

  // 绿色出行积分 (选择"电动车/自行车"或"步行/公共交通"可获得积分)
  if (inputs.transport && inputs.transport.green) {
    const credits = 40
    details.push({ name: '绿色出行', credits, description: inputs.transport.label })
    totalCredits += credits
  }

  // 节水积分 (选择"用水量低"可获得积分)
  if (inputs.water && inputs.water.level === 'low') {
    const credits = 30
    details.push({ name: '节约用水', credits, description: '用水量低' })
    totalCredits += credits
  }

  // 清洁能源积分 (选择"使用电磁炉"可获得积分)
  if (inputs.cooking && inputs.cooking.level === 'none') {
    const credits = 40
    details.push({ name: '清洁能源', credits, description: '使用电磁炉' })
    totalCredits += credits
  }

  // 无需取暖积分 (选择"不需要取暖"可获得积分)
  if (inputs.heating && inputs.heating.level === 'none') {
    const credits = 20
    details.push({ name: '无需取暖', credits, description: '不需要取暖' })
    totalCredits += credits
  }

  return {
    total: totalCredits,
    details
  }
}

/**
 * 计算碳积分可兑换物品
 * @param {number} totalCredits - 总积分
 * @returns {Array} 可兑换物品列表
 */
export function getExchangeableItems(totalCredits) {
  const items = [
    { name: '牙膏', credits: 50, icon: '牙' },
    { name: '毛巾', credits: 80, icon: '巾' },
    { name: '洗衣粉', credits: 60, icon: '洗' },
    { name: '电费抵扣券', credits: 100, value: '5元', icon: '电' },
    { name: '燃气费优惠券', credits: 120, value: '5元', icon: '气' }
  ]

  return items.filter(item => totalCredits >= item.credits)
}
