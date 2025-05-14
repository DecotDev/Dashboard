<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>ChartJSLineAreaRT + ApexLineRT + EchartsGaugeRT</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">ChartJSLineAreaRT + ApexLineRT + EchartsGaugeRT</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-grid>
        <ion-row class="ion-row-1">
          <ion-col  size="12" size-lg="4">
            <div class="box">
              <ChartJSLineAreaRT chartType="line" title="Carga CPU" color="#10b981" />
            </div>
          </ion-col>
          <ion-col  size="12" size-lg="4">
            <div class="box">
              <ChartJSLineAreaRT chartType="area" title="Memoria" color="#3b82f6" :min=50 :max=70 />
            </div>
          </ion-col>
          <ion-col  size="12" size-lg="4">
            <div class="box">
              <EchartsGaugeMultiple :segments="ringSegments" />
            </div>
          </ion-col>
        </ion-row>
        <ion-row class="ion-row-2">
          <ion-col  size="12" size-lg="9">
            <div class="box">
              <ApexLineRT :series="series" title="Usuarios online" :kpi-target="70" color="#3b82f6" />
            </div>
          </ion-col>
          <ion-col  size="12" size-lg="3">
            <div class="box">
              <EchartsGauge :value="currentValue" title="USUARIOS ONLINE" />
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">


/***** DEPENDENCIAS *****/
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { ref, onMounted, onUnmounted } from 'vue';


// ApexLineChart Realtime
import ApexLineRT from '@/components/ApexLineRT.vue';


// Echarts
import EchartsGauge from '@/components/EchartsGauge.vue';
import EchartsGaugeMultiple from '@/components/EchartsGaugeMultiple.vue';


// ChartJS
import ChartJSLineAreaRT from '@/components/ChartJSLineAreaRT.vue';


/***** FIN DEPENDENCIAS *****/


/***** CONSTANTES y VARIABLES REACTIVAS *****/


// Constantes generales
const UPDATE_INTERVAL = 1000;
const MAX_DATA_POINTS = 60;   // Límit nº puntos para mejor rendimiento


// Variables generales
let lastDate = Date.now();
let interval: ReturnType<typeof setInterval>;


// Data: ApexLineRT - Series
const data = ref<{ x: number; y: number }[]>([]);
const series = ref([{ name: 'Usuarios', data: data.value }]);


// Data: ECharts - Gauge Simple: Valor inicial
const currentValue = ref(0);  


// Data: Echarts - Gauge Múltiple: Valores iniciales
const ringSegments = ref([
  { value: 0, name: '🥘 España', color: '#f97316', min: 80, max: 99 },
  { value: 0, name: '🌍 Mundo', color: '#10b981', min: 10, max: 30 }
]);


/***** FIN CONSTANTES y VARIABLES REACTIVAS *****/


/***** LÓGICA REALTIME *****/


function addDataRealTime() {
 
  const newX = lastDate + UPDATE_INTERVAL;
  const newY = Math.floor(Math.random() * 90) + 10;
  data.value.push({ x: newX, y: newY });


  // ApexLineRT - Cuidar uso de memoria
  if (data.value.length > MAX_DATA_POINTS) {
    data.value = data.value.slice(-2);
    series.value = [{ name: 'Usuarios', data: data.value }]; // Asegúra que ApexCharts recoja el cambio
  }
 
  lastDate = newX;


  // ECharts - Gauge simple: nuevo valor
  currentValue.value = newY;


  // Echarts - Gauge múltiple: nuevo valor para cada segmento
  ringSegments.value.forEach((s) => {
    s.value = Math.floor(Math.random() * (s.max - s.min + 1)) + s.min;
  });


}


/***** LÓGICA REALTIME *****/


/***** CARGA y BORRADO DEL COMPONENTE *****/


onMounted(() => {
  interval = setInterval(addDataRealTime, UPDATE_INTERVAL);
});


onUnmounted(() => {
  clearInterval(interval);
});


/***** FIN CARGA y BORRADO DEL COMPONENTE *****/


</script>


<style scoped>


ion-row{
  overflow: hidden;
}


ion-col {
  max-height: 100%;
  --ion-grid-column-padding:10px;
}


/* Contenido de cada columna */
.box {
  background: #1E1E1E;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius:5px;
  display: flex;
  justify-content: center;
  align-items: start;
}


/* Altura total y por filas (pantallas ≥ lg) */
@media (min-width: 992px) {  
  ion-grid{height: 100%;}
  .ion-row-1{height: 40%; max-height: 40%;}
  .ion-row-2{height: 60%; max-height: 60%;}
  .ion-row-3{height: 30%; max-height: 30%;}
}


</style>
