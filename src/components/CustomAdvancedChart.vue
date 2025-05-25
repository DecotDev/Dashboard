<template>
  <div class="chart-container">
    <div class="chart-header">
      <h3>{{ title }}</h3>
      <span class="value">Último valor: {{ data[data.length - 1] }}</span>
    </div>

    <svg :viewBox="`0 0 ${width} ${height}`" preserveAspectRatio="none">
      <!-- X and Y axis -->
      <line x1="0" y1="0" :x2="0" :y2="height" class="axis" />
      <line x1="0" :y1="height" :x2="width" :y2="height" class="axis" />

      <!-- Data polyline -->
      <polyline :points="points" :stroke="color" fill="none" stroke-width="2" class="line" />

      <!-- Dots -->
      <circle
        v-for="(p, i) in pointArray"
        :key="i"
        :cx="p.x"
        :cy="p.y"
        r="3"
        :fill="color"
        class="dot"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    data: number[];
    color?: string;
    width?: number;
    height?: number;
  }>(),
  {
    title: '📈 Evolución',
    color: '#10b981',
    width: 300,
    height: 120,
  }
);

const pointArray = computed(() => {
  const max = Math.max(...props.data);
  const min = Math.min(...props.data);
  const range = max - min || 1;
  const step = props.width / (props.data.length - 1);

  return props.data.map((val, i) => {
    const x = i * step;
    const y = props.height - ((val - min) / range) * props.height;
    return { x, y };
  });
});

const points = computed(() =>
  pointArray.value.map(p => `${p.x},${p.y}`).join(' ')
);
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  padding: 16px;
  background-color: #1e1e1e;
  border-radius: 8px;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
}

.chart-header .value {
  font-size: 0.85rem;
  color: #94a3b8;
}

svg {
  width: 100%;
  height: auto;
}

.axis {
  stroke: #334155;
  stroke-width: 1;
}

.line {
  transition: all 0.3s ease-in-out;
}

.dot {
  transition: r 0.3s;
}
</style>
