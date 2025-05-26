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
              <CustomChart :data="[0, 40000, 35000, 60000, 58000, 71000, 65000, 70000 ]" title="Descargas semanales" color="#0ea5e9" />
            </div>
          </ion-col>
          <ion-col size="6" size-lg="3">
            <div class="box">
              <EchartsGaugeMultiple :segments="echartMultiple" />
            </div>
          </ion-col>
          <ion-col size="6" size-lg="3">
            <div class="box">
              <ApexBarGrouped :series="groupedSeries" :categories="['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']"
                title="Comparativa Semanal" />
            </div>
          </ion-col>

          <ion-col size="6" size-lg="3">
            <div class="box">
              <EchartsStackedArea :categories="areaCategories" :series-data="areaSeries"
                title="Acceso APP" />
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
import ApexBarGrouped from '@/components/ApexBarGrouped.vue';


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
  { name: 'IOs', data: [315, 341, 351, 311, 298, 427, 387] },
  { name: 'Android', data:   [2613, 2010, 1932, 2141, 2340, 2815, 3115] },
  { name: 'Web', data: [1202, 1315, 1241, 1540, 1231, 2300, 2214] }
]);

// Bars data
const groupedSeries = ref([
  { name: 'Ventas', data: [34, 44, 54, 21, 12, 43, 33] },
  { name: 'Marketing', data: [22, 29, 41, 25, 13, 34, 27] }
]);


// ApexCharts realtime data
const apexSeries = ref([{ name: 'RT Data', data: [] as { x: number; y: number }[] }]);

// ECharts realtime values
const echartValue = ref(50);
const echartMultiple = ref([
  { value: 40, name: 'Juego', color: '#10b981', min: 48, max: 54 },
  { value: 60, name: 'App', color: '#3b82f6', min: 13, max: 18 }
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
