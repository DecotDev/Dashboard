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
        <!-- System Status Row -->
        <ion-row class="ion-row-1">
          <ion-col size="12" size-md="4">
            <div class="box">
              <div class="system-status">
                <h3>Estado del Sistema</h3>
                <div class="status-item">
                  <span class="status-label">Versión de la App:</span>
                  <span class="status-value">2.4.1</span>
                </div>
                <div class="status-item">
                  <span class="status-label">Tiempo de Actividad:</span>
                  <span class="status-value">12d 4h 32m</span>
                </div>
                <div class="status-item">
                  <span class="status-label">Última Actualización:</span>
                  <span class="status-value">2023-11-15</span>
                </div>
                <div class="status-item">
                  <span class="status-label">Estado API:</span>
                  <span class="status-value online">Operacional</span>
                </div>
              </div>
            </div>
          </ion-col>
          <ion-col size="12" size-md="4">
            <div class="box">
              <div class="performance-metrics">
                <h3>Métricas de Rendimiento</h3>
                <div class="metric-item">
                  <span class="metric-label">Tiempo de Carga:</span>
                  <span class="metric-value">1.2s</span>
                  <ion-progress-bar :value="0.85" color="success"></ion-progress-bar>
                </div>
                <div class="metric-item">
                  <span class="metric-label">Uso de Memoria:</span>
                  <span class="metric-value">145MB/256MB</span>
                  <ion-progress-bar :value="0.57" color="warning"></ion-progress-bar>
                </div>
                <div class="metric-item">
                  <span class="metric-label">Tasa de FPS:</span>
                  <span class="metric-value">58/60</span>
                  <ion-progress-bar :value="0.97" color="success"></ion-progress-bar>
                </div>
              </div>
            </div>
          </ion-col>
          <ion-col size="12" size-md="4">
            <div class="box">
              <EchartsGaugeMultiple :data="gaugeData" title="Estado del Hardware" />
            </div>
          </ion-col>
        </ion-row>

        <!-- Fila 2: Chart.js Realtime -->
        <ion-row class="ion-row-2">
          <ion-col size="12" size-md="3" push-md="9">
            <div class="box">
              <EchartsStackedArea :categories="stackedCategories" :series-data="stackedSeries" title="Actividad Técnica" />
            </div>
          </ion-col>
          <ion-col size="12" size-md="9" pull-md="3">
            <div class="box">
              <ChartJSLineAreaRT chartType="area" title="Monitor en Tiempo Real" color="#10b981" :min="2000" :max="2400" />
              <div class="realtime-stats">
                <div class="stat-card">
                  <div class="stat-value">2,340</div>
                  <div class="stat-label">Peticiones/min</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">98.7%</div>
                  <div class="stat-label">Tasa de éxito</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">42ms</div>
                  <div class="stat-label">Latencia promedio</div>
                </div>
              </div>
            </div>
          </ion-col>
        </ion-row>

        <!-- Fila 3: Additional ECharts -->
        <ion-row class="ion-row-3">
          <ion-col size="12" size-lg="4.5">
            <div class="box">
              <CustomChart :data="[70, 85, 95, 80, 60, 40, 30]" title="Especificaciones Técnicas" color="#f59e0b" />
              <div class="tech-specs">
                <div class="spec-item">
                  <span class="spec-label">Tamaño de la App:</span>
                  <span class="spec-value">24.7MB</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Soporte de SO:</span>
                  <span class="spec-value">Android 10+, iOS 14+</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Librerías:</span>
                  <span class="spec-value">Ionic 7, Vue 3, Capacitor 5</span>
                </div>
              </div>
            </div>
          </ion-col>
          <ion-col size="12" size-lg="4.5">
            <div class="box">
              <ApexBarRT :series="barRTSeries" title="Carga Actual" color="#ef4444" :kpi-target="90" />
              <div class="load-details">
                <div class="load-item">
                  <span class="load-label">Usuarios Activos:</span>
                  <span class="load-value">1,243</span>
                </div>
                <div class="load-item">
                  <span class="load-label">Máx. Concurrentes:</span>
                  <span class="load-value">2,850</span>
                </div>
                <div class="load-item">
                  <span class="load-label">Ancho de Banda:</span>
                  <span class="load-value">45Mbps</span>
                </div>
              </div>
            </div>
          </ion-col>
          <ion-col size="12" size-lg="3">
            <div class="box">
              <EchartsGauge :value="75" :min="50" :max="100" title="Eficiencia del Sistema" />
              <div class="efficiency-stats">
                <div class="efficiency-item">
                  <span class="efficiency-label">Cache Hit Rate:</span>
                  <span class="efficiency-value">89%</span>
                </div>
                <div class="efficiency-item">
                  <span class="efficiency-label">DB Queries:</span>
                  <span class="efficiency-value">120/s</span>
                </div>
                <div class="efficiency-item">
                  <span class="efficiency-label">Compresión:</span>
                  <span class="efficiency-value">72%</span>
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

// Components
import ApexLineRT from '@/components/ApexLineRT.vue';
import ApexBarGrouped from '@/components/ApexBarGrouped.vue';
import ApexBarRT from '@/components/ApexBarRT.vue';
import EchartsGauge from '@/components/EchartsGauge.vue';
import EchartsGaugeMultiple from '@/components/EchartsGaugeMultiple.vue';
import EchartsStackedArea from '@/components/EchartsStackedArea.vue';
import ChartJSLineAreaRT from '@/components/ChartJSLineAreaRT.vue';
import CustomChart from '@/components/CustomChart.vue';

// Data
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

const stackedCategories = ref(['Mod1', 'Mod2', 'Mod3', 'Mod4', 'Mod5']);
const stackedSeries = ref([
  { name: 'Test 1', data: [120, 200, 150, 80, 70] },
  { name: 'Test 2', data: [90, 130, 170, 110, 95] },
  { name: 'Test 3', data: [60, 110, 130, 90, 80] }
]);

// Generate random real-time data
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

.system-status, .performance-metrics, .tech-specs, .load-details, .efficiency-stats {
  width: 100%;
}

.status-item, .metric-item, .spec-item, .load-item, .efficiency-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #333;
}

.status-label, .metric-label, .spec-label, .load-label, .efficiency-label {
  color: #aaa;
  font-size: 0.9rem;
}

.status-value, .metric-value, .spec-value, .load-value, .efficiency-value {
  font-weight: 500;
}

.online {
  color: #10b981;
}

.offline {
  color: #ef4444;
}

.realtime-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
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

ion-progress-bar {
  margin-top: 4px;
  height: 6px;
  border-radius: 3px;
}

@media (min-width: 992px) {
  ion-grid {
    height: 100%;
  }
  .ion-row-1 {
    height: 20%;
    max-height: 20%;
  }
  .ion-row-2 {
    height: 40%;
    max-height: 40%;
  }
  .ion-row-3 {
    height: 40%;
    max-height: 40%;
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