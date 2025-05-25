<template>
  <div class="custom-chart-box">
    <h4>{{ title }}</h4>
    <svg :width="width" :height="height">
      <polyline
        :points="points"
        fill="none"
        :stroke="color"
        stroke-width="2"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  title?: string;
}>();

const width = props.width ?? 200;
const height = props.height ?? 60;
const color = props.color ?? '#10b981';
const title = props.title ?? 'Custom Chart';

const points = computed(() => {
  const max = Math.max(...props.data);
  const min = Math.min(...props.data);
  const range = max - min || 1;
  const step = width / (props.data.length - 1);
  return props.data
    .map((val, i) => {
      const x = i * step;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');
});
</script>

<style scoped>
.custom-chart-box {
  width: 100%;
  padding: 12px;
  color: #e2e8f0;
}
h4 {
  font-size: 14px;
  margin-bottom: 8px;
}
svg {
  width: 100%;
  height: auto;
}
</style>
