<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>📈 Técnico</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">🚀 Técnico</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-grid class="dashboard-grid">
        <ion-row class="ion-row-expanded">
          <ion-col size="12" size-md="3" push-md="9">
            <div class="box">
              <EchartsStackedArea :categories="stackedCategories" :series-data="stackedSeries" title="Compatibilidad versiones con plataformas" />
            </div>
          </ion-col>
          <ion-col size="12" size-md="9" pull-md="3">
            <div class="box">
              <ChartJSLineAreaRT chartType="area" title="Monitor en Tiempo Real" color="#10b981" :min="2000" :max="2400" />
              <div class="realtime-stats">
                <div class="stat-card">
                  <div class="stat-value">62</div>
                  <div class="stat-label">Peticiones por usuario / min</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">95.7%</div>
                  <div class="stat-label">Tasa de éxito</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">85ms</div>
                  <div class="stat-label">Latencia promedio</div>
                </div>
              </div>
            </div>
          </ion-col>
        </ion-row>

        <ion-row class="ion-row-expanded">
          <ion-col size="12" size-lg="4.5">
            <div class="box">
              <CustomChart :data="[27, 32, 29, 33, 28, 58, 53]" title="Errores reportados / dia" color="#f59e0b" />
            </div>
          </ion-col>
          <ion-col size="12" size-lg="4.5">
            <div class="box">
              <ApexBarRT :series="barRTSeries" title="Actualizaciones de marcadores" color="#ef4444" :kpi-target="90" />
            </div>
          </ion-col>
          <ion-col size="12" size-lg="3">
            <div class="box">
              <EchartsGauge :value="91" :min="50" :max="100" title="MAX % CPU servidor" />
              <div class="efficiency-stats">
                <div class="efficiency-item">
                  <span class="efficiency-label">CPU Servidor KPI:</span>
                  <span class="efficiency-value"><60%</span>
                </div>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage,
  IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonProgressBar
} from '@ionic/vue';

import ApexLineRT from '@/components/ApexLineRT.vue';
import ApexBarGrouped from '@/components/ApexBarGrouped.vue';
import ApexBarRT from '@/components/ApexBarRT.vue';
import EchartsGauge from '@/components/EchartsGauge.vue';
import EchartsGaugeMultiple from '@/components/EchartsGaugeMultiple.vue';
import EchartsStackedArea from '@/components/EchartsStackedArea.vue';
import ChartJSLineAreaRT from '@/components/ChartJSLineAreaRT.vue';
import CustomChart from '@/components/CustomChart.vue';

const lineSeries = ref([{ name: 'Sensor', data: [10, 22, 34, 40, 32, 50] }]);
const barSeries = ref([
  { name: 'Voltaje', data: [220, 240, 210, 250, 260, 245] },
  { name: 'Corriente', data: [10, 15, 12, 18, 14, 16] }
]);
const barCategories = ref(['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']);
const barRTSeries = ref([{ name: 'RT Data', data: [] as { x: number; y: number }[] }]);

const gaugeData = ref([
  { value: 70, name: 'CPU', color: '#facc15', min: 50, max: 100 },
  { value: 88, name: 'RAM', color: '#10b981', min: 60, max: 100 },
  { value: 65, name: 'GPU', color: '#3b82f6', min: 40, max: 90 },
  { value: 92, name: 'Red', color: '#8b5cf6', min: 70, max: 100 }
]);

const stackedCategories = ref([' v1.3', 'v1.4', 'v1.5', 'v2.0', 'v2.1']);
const stackedSeries = ref([
  { name: 'IOs', data: [97, 100, 100, 99, 99] },
  { name: 'Android', data: [98, 99, 97, 82, 95] },
  { name: 'Web', data: [99, 100, 94, 96, 99] }
]);

setInterval(() => {
  const newData = barRTSeries.value[0].data;
  if (newData.length > 10) newData.shift();
  newData.push({
    x: Date.now(),
    y: Math.floor(Math.random() * 100) + 50
  });
  barRTSeries.value = [{ name: 'RT Data', data: newData }];
}, 2000);
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
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.realtime-stats, .efficiency-stats {
  width: 100%;
  margin-top: 1rem;
}

.stat-card {
  background: #2a2a2a;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  min-width: 100px;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: bold;
  color: #10b981;
}

.stat-label {
  font-size: 0.8rem;
  color: #aaa;
}

.efficiency-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #333;
}

.efficiency-label {
  color: #aaa;
  font-size: 0.9rem;
}

.efficiency-value {
  font-weight: 500;
}

@media (min-width: 992px) {
  ion-grid {
    height: 100%;
  }
  .ion-row-expanded {
    height: 50%;
    max-height: 50%;
  }
}

h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #fff;
  font-size: 1.2rem;
  border-bottom: 1px solid #333;
  padding-bottom: 8px;
}
</style>
