<template>
  <div class="chart-container">
    <div class="chart-header">
      <h3>{{ title }}</h3>
      <span class="value">Último valor: {{ data[data.length - 1] }}</span>
    </div>

    <div class="chart-wrapper">
      <svg :viewBox="`0 0 ${width} ${height}`" preserveAspectRatio="xMinYMid meet">
        <!-- Gradient fill -->
        <defs>
          <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" :stop-color="color" stop-opacity="0.3" />
            <stop offset="100%" :stop-color="color" stop-opacity="0" />
          </linearGradient>
        </defs>

        <!-- Area fill -->
        <polygon :points="filledPoints" :fill="`url(#${gradientId})`" class="fill" />

        <!-- Line -->
        <polyline :points="points" :stroke="color" fill="none" stroke-width="2.5" class="line" />

        <!-- Dots -->
        <circle
          v-for="(p, i) in pointArray"
          :key="i"
          :cx="p.x"
          :cy="p.y"
          r="4"
          :fill="color"
          class="dot"
        >
          <title>Valor: {{ data[i] }}</title>
        </circle>
      </svg>
    </div>
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
    title: '📈 Actividad',
    color: '#3b82f6',
    width: 300,
    height: 120,
  }
);

const gradientId = `gradient-${Math.random().toString(36).substring(2, 8)}`;

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

const filledPoints = computed(() => {
  const base = points.value;
  return `${base} ${props.width},${props.height} 0,${props.height}`;
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  padding: 12px;
  border-radius: 12px;
  background: linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9));
  backdrop-filter: blur(4px);
  border: 1px solid rgba(100, 116, 139, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
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
  font-weight: 600;
}

.chart-header .value {
  font-size: 0.85rem;
  color: #94a3b8;
}

.chart-wrapper {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

svg {
  width: 100%;
  height: auto;
  max-height: 100%;
}

.fill {
  animation: fadeIn 1s ease-in-out;
}

.line {
  stroke-linejoin: round;
  stroke-linecap: round;
  animation: draw 1s ease-in-out;
}

.dot {
  transition: transform 0.2s;
}
.dot:hover {
  transform: scale(1.3);
}

@keyframes draw {
  from {
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
