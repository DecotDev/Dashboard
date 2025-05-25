<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>🚀 Negocio</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">🚀 Negocio</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Dashboard Grid -->
      <ion-grid class="dashboard-grid">

        <!-- Row 1: Custom, Chart.js, Apex, ECharts -->
        <ion-row class="ion-row-1">
          <ion-col size="6" size-lg="3">
            <div class="box">
              <CustomChart :data="[22, 40, 35, 60, 58, 71, 65]" title="📥 Descargas Mensuales" color="#0ea5e9" />
            </div>
          </ion-col>
          <ion-col size="6" size-lg="3">
            <div class="box">
              <EchartsGaugeMultiple :segments="echartMultiple" />
            </div>
          </ion-col>
<ion-col size="6" size-lg="3">
  <div class="box">
    <ApexBarRT :series="apexSeries" title="Rendimiento Actual" color="#f59e0b" :kpi-target="75" />
  </div>
</ion-col>

          <ion-col size="6" size-lg="3">
            <div class="box">
              <EchartsStackedArea :categories="areaCategories" :series-data="areaSeries"
                title="Actividades Semanales" />
            </div>
          </ion-col>
        </ion-row>

        <!-- Row 2: Real-time ECharts Multiple Gauge -->
        <ion-row class="ion-row-2">
          <ion-col size="12">
            <div class="box">
              <ChartJSLineAreaRT chartType="line" title="Usuarios conectados" color="#3b82f6" />
            </div>
          </ion-col>
        </ion-row>

      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/vue';
import { ref, onMounted, onUnmounted } from 'vue';

// Chart Components
import ChartJSLineAreaRT from '@/components/ChartJSLineAreaRT.vue';
import ApexLineRT from '@/components/ApexLineRT.vue';
import EchartsGauge from '@/components/EchartsGauge.vue';
import EchartsGaugeMultiple from '@/components/EchartsGaugeMultiple.vue';
import EchartsStackedArea from '@/components/EchartsStackedArea.vue';
import ApexBarRT from '@/components/ApexBarRT.vue';



// Custom components
import CustomSimpleChart from '@/components/CustomSimpleChart.vue';
import CustomAdvancedChart from '@/components/CustomAdvancedChart.vue';
import CustomChart from '@/components/CustomChart.vue';


// Custom dummy chart data
const customChartData = ref([10, 30, 20, 40, 35]);
const customChartData2 = ref([10, 30, 20, 40, 35, 50, 45, 38]);

// Stack data
const areaCategories = ref(['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']);
const areaSeries = ref([
  { name: 'Marketing', data: [120, 132, 101, 134, 90, 230, 210] },
  { name: 'Ventas', data: [220, 182, 191, 234, 290, 330, 310] },
  { name: 'Soporte', data: [150, 232, 201, 154, 190, 330, 410] }
]);

// ApexCharts realtime data
const apexSeries = ref([{ name: 'RT Data', data: [] as { x: number; y: number }[] }]);

// ECharts realtime values
const echartValue = ref(50);
const echartMultiple = ref([
  { value: 40, name: 'Segmento A', color: '#10b981', min: 30, max: 70 },
  { value: 60, name: 'Segmento B', color: '#3b82f6', min: 40, max: 90 }
]);

let lastDate = Date.now();
const UPDATE_INTERVAL = 1000;
let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  interval = setInterval(() => {
    const newX = lastDate + UPDATE_INTERVAL;
    const newY = Math.floor(Math.random() * 90) + 10;

    // Apex update
    apexSeries.value[0].data.push({ x: newX, y: newY });
    if (apexSeries.value[0].data.length > 50) {
      apexSeries.value[0].data.shift();
    }

    // ECharts update
    echartValue.value = newY;
    echartMultiple.value.forEach((s) => {
      s.value = Math.floor(Math.random() * (s.max - s.min + 1)) + s.min;
    });

    lastDate = newX;
  }, UPDATE_INTERVAL);
});

onUnmounted(() => clearInterval(interval));
</script>

<style scoped>
ion-row {
  overflow: hidden;
}

ion-col {
  max-height: 100%;
  --ion-grid-column-padding: 10px;
}

.box {
  background: #1e1e1e;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 16px;
  color: white;
}

@media (min-width: 992px) {
  ion-grid {
    height: 100%;
  }

  .ion-row-1 {
    height: 50%;
    max-height: 50%;
  }

  .ion-row-2 {
    height: 50%;
    max-height: 50%;
  }
}
</style>
