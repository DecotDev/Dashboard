// ApexBarGrouped.vue - Grouped Column Chart
<template>
  <apexchart
    type="bar"
    height="100%"
    width="100%"
    :options="chartOptions"
    :series="series"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ApexCharts from 'vue3-apexcharts';

const props = defineProps<{
  series: { name: string; data: number[] }[];
  categories: string[];
  title?: string;
  colorPalette?: string[];
}>();

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    background: 'transparent',
    foreColor: '#cbd5e1',
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      borderRadius: 4,
    },
  },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 2, colors: ['transparent'] },
  xaxis: {
    categories: props.categories,
    labels: {
      style: { colors: '#cbd5e1' },
    },
  },
  yaxis: {
    labels: {
      style: { colors: '#cbd5e1' },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    theme: 'dark',
  },
  colors: props.colorPalette ?? ['#0ea5e9', '#f59e0b', '#10b981'],
  title: {
    text: props.title ?? 'Grouped Column Chart',
    align: 'left',
    style: {
      fontSize: '14px',
      color: '#94a3b8',
    },
  },
}));
</script>

<style scoped>
</style>
