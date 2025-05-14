<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-img alt="Chart.js" style="width: 40px; height: 40px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Chart.js_logo.svg/800px-Chart.js_logo.svg.png"/>
        </ion-buttons>
        <ion-title>Charts.js</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <!-- Fila para los gráficos -->
        <ion-row class="ion-justify-content-center">
          <!-- Primer gráfico: Población - LineChart -->
          <ion-col size="12" size-sm="6" size-md="4" class="text-center">
            <h2>Población</h2>
            <LineChart :chartData="lineData" />
          </ion-col>


          <!-- Segundo gráfico: Poder del anillo - PolarChart -->
          <ion-col size="12" size-sm="6" size-md="4" class="text-center">
            <h2>Poder del anillo</h2>
            <PolarAreaChart :chartData="polarData" />
          </ion-col>


          <!-- Tercer gráfico: Batallas Ganadas - BarChart -->
          <ion-col size="12" size-sm="6" size-md="4" class="text-center">
            <h2>Batallas Ganadas</h2>
            <BarChart :chartData="barData" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonImg, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { LineChart, BarChart, PolarAreaChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);


const lineData = {
  labels: ['Árboles', '2º Edad', '3ª Edad', '4ª Edad'],
  datasets: [
    {
      label: 'Población de Humanos en la Tierra Media',
      data: [100, 500, 1200, 800],
      borderColor: '#4A6B3D',  
      backgroundColor: 'rgba(74, 107, 61, 0.2)',
      fill: true,  
      tension: 0.4,
      pointBackgroundColor: '#4A6B3D',  
      pointBorderColor: '#fff',  
      pointBorderWidth: 2,
    },
  ],
};




const barData = {
  labels: ['Gondor', 'Rohan', 'Mordor'],
  datasets: [
    {
      label: 'Batallas ganadas',
      data: [10, 7, 3],
      backgroundColor: ['#C8A951', '#4A6B3D', '#5C3A21'],
    },
  ],
};


const polarData = {
  labels: ['Fuerza', 'Sabiduría', 'Coraje', 'Magia'],
  datasets: [
    {
      label: 'Poder del Anillo',
      data: [95, 70, 50, 80],
      backgroundColor: ['#C8A951', '#4A6B3D', '#5C3A21', '#2C3E50'],
    },
  ],
};


</script>
