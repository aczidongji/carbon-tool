/**
 * 碳足迹测算工具 - 排放系数库
 * 数据来源优先级：中国本土实测数据 > 国家发改委推荐值 > IPCC默认值
 * 所有预设参数标注"待实地校准"
 */

// 生产端排放系数
export const productionFactors = {
  // 化肥施用 (kgCO2/kg化肥)
  fertilizer: {
    name: '化肥施用',
    unit: 'kgCO2/kg化肥',
    options: [
      { id: 'f1', label: '大量使用（>50kg/亩）', value: 50, factor: 0.89, level: 'high' },
      { id: 'f2', label: '中等使用（30-50kg/亩）', value: 40, factor: 0.89, level: 'medium' },
      { id: 'f3', label: '少量使用（<30kg/亩）', value: 20, factor: 0.89, level: 'low' },
      { id: 'f4', label: '不使用化肥', value: 0, factor: 0, level: 'none' }
    ],
    source: 'IPCC排放因子数据库'
  },

  // 农药使用 (kgCO2/kg农药)
  pesticide: {
    name: '农药使用',
    unit: 'kgCO2/kg农药',
    options: [
      { id: 'p1', label: '大量使用', value: 3, factor: 5.1, level: 'high' },
      { id: 'p2', label: '中等使用', value: 2, factor: 5.1, level: 'medium' },
      { id: 'p3', label: '少量使用', value: 1, factor: 5.1, level: 'low' },
      { id: 'p4', label: '不使用农药', value: 0, factor: 0, level: 'none' }
    ],
    source: '国家发改委指南'
  },

  // 农膜使用 (kgCO2/kg农膜)
  film: {
    name: '农膜使用与回收',
    unit: 'kgCO2/kg农膜',
    options: [
      { id: 'fm1', label: '使用且全部回收', value: 2, factor: 1.5, recycled: true },
      { id: 'fm2', label: '使用，部分回收', value: 2, factor: 2.2, recycled: false },
      { id: 'fm3', label: '使用，不回收', value: 2, factor: 3.0, recycled: false },
      { id: 'fm4', label: '不使用农膜', value: 0, factor: 0, recycled: false }
    ],
    source: '中国农业碳排放文献'
  },

  // 农机燃油 (L/亩)
  machinery: {
    name: '农机燃油',
    unit: 'L/亩',
    options: [
      { id: 'm1', label: '大量使用（>5L/亩）', value: 6, factor: 2.68, level: 'high' },
      { id: 'm2', label: '中等使用（3-5L/亩）', value: 4, factor: 2.68, level: 'medium' },
      { id: 'm3', label: '少量使用（<3L/亩）', value: 2, factor: 2.68, level: 'low' },
      { id: 'm4', label: '不使用农机', value: 0, factor: 0, level: 'none' }
    ],
    source: 'IPCC排放因子数据库'
  },

  // 灌溉用电 (kWh/亩)
  irrigation: {
    name: '灌溉用电',
    unit: 'kWh/亩',
    options: [
      { id: 'i1', label: '大量灌溉（>200kWh/亩）', value: 250, factor: 0.581, level: 'high' },
      { id: 'i2', label: '中等灌溉（100-200kWh/亩）', value: 150, factor: 0.581, level: 'medium' },
      { id: 'i3', label: '少量灌溉（<100kWh/亩）', value: 50, factor: 0.581, level: 'low' },
      { id: 'i4', label: '不灌溉/雨养农业', value: 0, factor: 0, level: 'none' }
    ],
    source: '中国碳核算数据库'
  },

  // 运输能耗 (kgCO2/kg产品/km)
  transport: {
    name: '运输能耗',
    unit: 'kgCO2/kg产品/km',
    options: [
      { id: 't1', label: '长途运输（>100km）', value: 150, factor: 0.0001, level: 'high' },
      { id: 't2', label: '中途运输（50-100km）', value: 75, factor: 0.0001, level: 'medium' },
      { id: 't3', label: '短途运输（<50km）', value: 25, factor: 0.0001, level: 'low' },
      { id: 't4', label: '本地销售', value: 5, factor: 0.0001, level: 'local' }
    ],
    source: '国家发改委指南'
  }
}

// 生活端排放系数
export const lifestyleFactors = {
  // 家庭用电 (kWh/月)
  electricity: {
    name: '家庭用电',
    unit: 'kWh/月',
    options: [
      { id: 'e1', label: '用电量高（>300kWh/月）', value: 350, factor: 0.581, level: 'high' },
      { id: 'e2', label: '用电量中等（150-300kWh/月）', value: 225, factor: 0.581, level: 'medium' },
      { id: 'e3', label: '用电量低（<150kWh/月）', value: 100, factor: 0.581, level: 'low' }
    ],
    source: '中国碳核算数据库'
  },

  // 炊事燃料 (kg/月)
  cooking: {
    name: '炊事燃料',
    unit: 'kg/月',
    options: [
      { id: 'c1', label: '使用柴火', value: 50, factor: 1.2, level: 'high' },
      { id: 'c2', label: '使用液化气', value: 15, factor: 2.93, level: 'medium' },
      { id: 'c3', label: '使用天然气', value: 10, factor: 2.16, level: 'low' },
      { id: 'c4', label: '使用电磁炉', value: 0, factor: 0, level: 'none' },
      { id: 'c5', label: '混合使用', value: 20, factor: 1.8, level: 'medium' }
    ],
    source: 'IPCC排放因子数据库'
  },

  // 交通出行 (km/月)
  transport: {
    name: '交通出行',
    unit: 'km/月',
    options: [
      { id: 'tr1', label: '主要开车', value: 500, factor: 0.2, green: false },
      { id: 'tr2', label: '主要骑摩托车', value: 300, factor: 0.08, green: false },
      { id: 'tr3', label: '主要骑电动车/自行车', value: 200, factor: 0.02, green: true },
      { id: 'tr4', label: '主要步行/公共交通', value: 100, factor: 0.05, green: true }
    ],
    source: '国家发改委指南'
  },

  // 生活用水 (吨/月)
  water: {
    name: '生活用水',
    unit: '吨/月',
    options: [
      { id: 'w1', label: '用水量高（>10吨/月）', value: 12, factor: 0.91, level: 'high' },
      { id: 'w2', label: '用水量中等（5-10吨/月）', value: 7, factor: 0.91, level: 'medium' },
      { id: 'w3', label: '用水量低（<5吨/月）', value: 3, factor: 0.91, level: 'low' }
    ],
    source: '国家发改委指南'
  },

  // 垃圾分类
  waste: {
    name: '垃圾分类',
    unit: 'kg/月',
    options: [
      { id: 'ws1', label: '严格分类', value: 20, factor: 0.5, sorted: true },
      { id: 'ws2', label: '简单分类', value: 30, factor: 0.8, sorted: true },
      { id: 'ws3', label: '不分类', value: 40, factor: 1.2, sorted: false }
    ],
    source: '中国碳核算数据库'
  },

  // 冬季取暖 (kg/月)
  heating: {
    name: '冬季取暖',
    unit: 'kg/月',
    options: [
      { id: 'h1', label: '使用煤炭', value: 100, factor: 2.66, level: 'high' },
      { id: 'h2', label: '使用电暖', value: 0, factor: 0, level: 'none' },
      { id: 'h3', label: '使用柴火', value: 80, factor: 1.2, level: 'medium' },
      { id: 'h4', label: '不需要取暖', value: 0, factor: 0, level: 'none' }
    ],
    source: 'IPCC排放因子数据库'
  }
}

// 碳积分规则 (待实地校准)
export const creditRules = {
  production: {
    fertilizerReduction: { name: '化肥减量', creditPerKg: 2 },
    filmRecycling: { name: '农膜回收', creditPerKg: 1.5 },
    newEnergyTransport: { name: '新能源运输', creditPerTrip: 5 }
  },
  lifestyle: {
    electricitySaving: { name: '节电', creditPerKwh: 0.5 },
    wasteSorting: { name: '垃圾分类', creditPerMonth: 10 },
    greenTransport: { name: '绿色出行', creditPerKm: 0.2 }
  }
}

// 碳积分兑换规则 (待实地校准)
export const exchangeRules = {
  items: [
    { name: '牙膏', credits: 50, icon: 'toothpaste' },
    { name: '毛巾', credits: 80, icon: 'towel' },
    { name: '洗衣粉', credits: 60, icon: 'detergent' },
    { name: '电费抵扣券', credits: 100, value: 5, icon: 'electricity' },
    { name: '燃气费优惠券', credits: 120, value: 5, icon: 'gas' }
  ],
  financial: {
    loanRateDiscount: { credits: 1000, discount: 0.5 }
  }
}
