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
  series: { name: string; data: { x: number; y: number }[] }[];
  title?: string;
  color?: string;
  kpiTarget?: number;
}>();

const series = computed(() => [
  {
    name: props.series[0].name,
    data: props.series[0].data.map(d => ({
      x: new Date(d.x).toLocaleTimeString().slice(0, 8),
      y: d.y
    }))
  }
]);

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 300
      }
    },
    toolbar: { show: false },
    background: 'transparent',
    foreColor: '#cbd5e1'
  },
  xaxis: {
    type: 'category',
    labels: {
      style: { colors: '#cbd5e1' }
    }
  },
  yaxis: {
    min: 0,
    max: 100,
    labels: {
      style: { colors: '#cbd5e1' }
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '60%'
    }
  },
  annotations: {
    yaxis: [
      props.kpiTarget
        ? {
            y: props.kpiTarget,
            borderColor: '#f87171',
            label: {
              borderColor: '#f87171',
              style: {
                color: '#fff',
                background: '#f87171'
              },
              text: `KPI: ${props.kpiTarget}`
            }
          }
        : null
    ].filter(Boolean)
  },
  title: {
    text: props.title ?? 'Bar Chart',
    align: 'left',
    style: {
      color: '#94a3b8',
      fontSize: '14px'
    }
  },
  tooltip: {
    theme: 'dark'
  },
  colors: [props.color ?? '#f59e0b']
}));
</script>
