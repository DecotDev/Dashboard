<template>
  <VEChart class="stacked-area-chart" :option="chartOptions" autoresize />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  TitleComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VEChart from 'vue-echarts';

use([
  LineChart,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  TitleComponent,
  CanvasRenderer
]);

const props = defineProps<{
  seriesData: { name: string; data: number[] }[];
  categories: string[];
  title?: string;
}>();

const chartOptions = computed(() => ({
  title: {
    text: props.title ?? 'ECharts Área Apilada',
    textStyle: { color: '#e2e8f0', fontSize: 16 },
    left: 'center',
    top: 10
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#1e293b',
    textStyle: { color: '#f1f5f9' }
  },
  legend: {
    top: 35,
    textStyle: { color: '#cbd5e1' }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.categories,
    axisLine: { lineStyle: { color: '#64748b' } },
    axisLabel: { color: '#cbd5e1' }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#64748b' } },
    axisLabel: { color: '#cbd5e1' },
    splitLine: { lineStyle: { color: '#334155' } }
  },
  series: props.seriesData.map(s => ({
    ...s,
    type: 'line',
    stack: 'Total',
    areaStyle: {},
    smooth: true
  }))
}));
</script>

<style scoped>
.stacked-area-chart {
  width: 100%;
  min-height: 250px;
}
</style>
