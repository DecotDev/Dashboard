<template>
  <div class="streaming-chart">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Chart, LineController, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Filler } from 'chart.js';
import streamingPlugin from 'chartjs-plugin-streaming';
import 'chartjs-adapter-date-fns';

const props = withDefaults(defineProps<{
  chartType?: 'line' | 'area';
  title?: string;
  color?: string;
  min?: number;
  max?: number;
}>(), {
  chartType: 'line',
  title: 'Usuarios conectados',
  color: '#10b981',
  min: 2000,
  max: 2400,
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

onMounted(() => {
  if (!canvasRef.value) return;

  const isArea = props.chartType === 'area';

  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    TimeScale,
    Title,
    Tooltip,
    streamingPlugin
  );

  if (isArea) {
    Chart.register(Filler);
  }

  chartInstance = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      datasets: [{
        label: props.title,
        borderColor: props.color,
        backgroundColor: isArea ? `${props.color}40` : 'transparent',
        borderWidth: 2,
        fill: isArea,
        tension: 0.3,
        data: []
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio || 2,
      animation: false,
      scales: {
        x: {
          type: 'realtime',
          realtime: {
            duration: 120000, // show last 2 minutes
            refresh: 5000,    // update every 5 seconds
            delay: 1000,
            onRefresh(chart) {
              const y = Math.floor(Math.random() * (2315 - 2250 + 1)) + 2250;
              chart.data.datasets[0].data.push({
                x: Date.now(),
                y
              });
            }
          },
          grid: {
            color: 'rgba(203, 213, 225, 0.1)'
          },
          ticks: {
            color: '#8C8C8C',
            maxRotation: 0
          }
        },
        y: {
          min: 2000,
          max: 2400,
          grid: {
            color: 'rgba(203, 213, 225, 0.1)'
          },
          ticks: {
            color: '#8C8C8C',
            stepSize: 50
          },
          title: {
            display: false,
            text: 'Usuarios (%)',
            color: '#8C8C8C',
            font: {
              size: 12
            }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#e2e8f0',
            usePointStyle: true
          }
        },
        title: {
          display: true,
          text: props.title,
          color: '#8C8C8C',
          align: 'start',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20,
          }
        },
        tooltip: {
          enabled: true,
          mode: 'nearest',
          intersect: false,
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          titleColor: '#8C8C8C',
          bodyColor: '#8C8C8C',
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `Usuarios: ${context.parsed.y}`;
            }
          }
        }
      },
      elements: {
        point: {
          radius: 0,
          hoverRadius: 6,
          hitRadius: 10,
          borderWidth: 2
        },
        line: {
          borderWidth: 2,
          borderJoinStyle: 'round'
        }
      }
    }
  });
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});
</script>

<style scoped>
.streaming-chart {
  width: 100%;
  height: 100%;
  padding: 8px 15px;
}
</style>
