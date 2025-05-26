<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>🎯 KPIs</ion-title>
        </ion-toolbar>
      </ion-header>
  
  
      <ion-content :fullscreen="true" class="ion-padding">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">🎯 KPIs</ion-title>
          </ion-toolbar>
        </ion-header>
  
  
        <h1 class="ion-padding">🚀 KPIs de Negocio</h1>
        <ion-accordion-group expand="inset" :multiple="true">
          <ion-accordion v-for="item in smartGoals" :key="item.id" :value="item.id.toString()">
            <ion-item slot="header">
              <ion-label>{{ item.id }}. {{ item.title }}</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">
              <p>{{ item.description }}</p>
              <ion-list :inset="true">
                <ion-item v-for="(element, index) in item.smart" :key="index">
                  <ion-label><b>{{ element.letter }}</b> → {{ element.content }}</ion-label>
                </ion-item>
              </ion-list>
            </div>
          </ion-accordion>
        </ion-accordion-group>
        <br>
        <h1 class="ion-padding">📈 KPIs Técnicos</h1>
        <ion-accordion-group expand="inset" :multiple="true">
          <ion-accordion v-for="item in smartGoals2" :key="item.id" :value="item.id.toString()">
            <ion-item slot="header">
              <ion-label>{{ item.id }}. {{ item.title }}</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">
              <p>{{ item.description }}</p>
              <ion-list :inset="true">
                <ion-item v-for="(element, index) in item.smart" :key="index">
                  <ion-label><b>{{ element.letter }}</b> → {{ element.content }}</ion-label>
                </ion-item>
              </ion-list>
            </div>
          </ion-accordion>
        </ion-accordion-group>
      </ion-content>
    </ion-page>
  </template>
  
  
  <script setup lang="ts">
  import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList } from '@ionic/vue';
  import { ref } from 'vue';
  
  
  // Definición de la estructura de datos para un objetivo SMART
  interface SmartElement {
    letter: string;
    content: string;
  }
  
  
  interface SmartGoal {
    id: number;
    title: string;
    description: string;
    smart: SmartElement[];
  }
  
  
  // Array de objetivos SMART
  const smartGoals = ref<SmartGoal[]>([
    {
      id: 1,
      title: "Aumentar descargas",
      description: "Aumentar las descargas para cosneguir que todos los jugadores del jeugo hagan uso de la app y que de más visibilidad para atraer nuevos jugadores",
      smart: [
        { letter: "S", content: "Aumentar las las descargas mensuales cada més un 10%" },
        { letter: "M", content: "10% (de 70,000 a 77,000)" },
        { letter: "A", content: "Promociaonando la app en las tiendas de apps movil" },
        { letter: "R", content: "Lograr mas ventas del juego" },
        { letter: "T", content: "En 1 mes" }
      ]
    },
    {
      id: 2,
      title: "Aumentar usuarios jugando y usando la app a la vez",
      description: "Aumentar hasta llegar a un total de 20% los usuarios activos usando la app, gracias a añadir funciones conectadas entre la app y el juego aumentando la utilidad",
      smart: [
        { letter: "S", content: "Llegar al 20% de usuarios activos en la app" },
        { letter: "M", content: "20% (300 a 450)" },
        { letter: "A", content: "Añadiendo acciones utiles en la app con una utilidad en el juego" },
        { letter: "R", content: "Aumentar la cohexistencia de la app con le juego" },
        { letter: "T", content: "En 2 meses" }
      ]
    },
    {
      id: 3,
      title: "Lograr mas ventas des de la app",
      description: "Lograr mas ventas des de la app en un 25% regalando pack exclusivos por la compra des de la app para atraer mas beneficios al comprador mediante este metodo, en 3 semanas",
      smart: [
        { letter: "S", content: "Subir las ventas desde la app un 25%" },
        { letter: "M", content: "25% (35 a 42 diarias)" },
        { letter: "A", content: "Regalando pack exclusivos por la compra des de la app" },
        { letter: "R", content: "Para atraer mas beneficios al comprador des de la app" },
        { letter: "T", content: "En 3 semanas" }
      ]
    },
    {
      id: 4,
      title: "Alianzas estratégicas",
      description: "Crear 10 alianzas estratégicas en el próximo bienio por medio de la organización de foros, y así obtener más exposición de marca y mejorar la red de proveedores.",
      smart: [
        { letter: "S", content: "Crear alianzas estratégicas" },
        { letter: "M", content: "10 alianzas estratégicas" },
        { letter: "A", content: "Por medio de la organización de foros" },
        { letter: "R", content: "Obtener más exposición de marca y mejorar la red de proveedores" },
        { letter: "T", content: "En 2 años" }
      ]
    },
    {
      id: 5,
      title: "Accesos app",
      description: "Subir los accesosde la app hasta 6.000 en un día en las proximas 6 semanas atrayendo a mas usuarios y mantener-los usando la app con eventos diarios o semanales dentro de la app.",
      smart: [
        { letter: "S", content: "Aumentar accesos darios a la app" },
        { letter: "M", content: "De 4.800/dia a > 6.000/dia" },
        { letter: "A", content: "Con eventos diarios o semanales dentro de la app" },
        { letter: "R", content: "Mantener a los usuarios usando la app por mas tiempo" },
        { letter: "T", content: "En las proximas 6 semanas" }
      ]
    }
  ]);
    const smartGoals2 = ref<SmartGoal[]>([
    {
      id: 1,
      title: "Optimizar rendimiento en tiempo real",
      description: "Reducir la latencia y aumentar la tasa de éxito para mejorar la experiencia del usuario en operaciones críticas a base de implementar mejoras en la optimización de las llamadas API y mejorar el uso de caché buscando una mejora en estos parámetros hace que la respuesta del sistema sea más ágil y confiable, lograrlo en un plazo de 2 meses",
      smart: [
        { letter: "S", content: "Reducir la latencia promedio y aumentar la tasa de éxito de las peticiones" },
        { letter: "M", content: "Latencia promedio de 85 ms a <50 ms y elevar tasa de éxito (95.7% a >99%)" },
        { letter: "A", content: "Implementar mejoras en la optimización de las llamadas API y mejorar el uso de caché" },
        { letter: "R", content: "Una mejora en estos parámetros hace que la respuesta del sistema sea más ágil y confiable" },
        { letter: "T", content: "Lograrlo en un plazo de 2 meses." }
      ]
    },
    {
      id: 2,
      title: "Aumentar compatibilidad de la app",
      description: "Aumentar el porcentaje de compatibilidad de las versiones de la app con cada plataforma a un 99% o mas por cada version solucionando los errores de compatibilidad de cada platforma i conseguir una mejor experiencia y asegurar la accesibilidad a todos los usuarios, en la proxima version (1 mes aproximadamente)",
      smart: [
        { letter: "S", content: "Aumentar el porcentaje de compatibilidad de las versiones de la app con cada plataforma" },
        { letter: "M", content: "de <99% a 99% o >99%" },
        { letter: "A", content: "Solucionando los errores de compatibilidad de cada platforma" },
        { letter: "R", content: "Conseguir una mejor experiencia y asegurar la accesibilidad a todos los usuarios" },
        { letter: "T", content: "En la proxima version (1 mes aproximadamente)" }
      ]
    },
    {
      id: 3,
      title: "Reducir los errores reportados ",
      description: "Reducir los errores reportados cada dia un 50%, eyendo los reportes y poniendo solución Para obtener una mejore experiencia ins errores que reportar en 1 o 2 meses",
      smart: [
        { letter: "S", content: "Reducir los errores reportados cada dia" },
        { letter: "M", content: "-50% (42 a 21 errores)" },
        { letter: "A", content: "Leyendo los reportes y poniendo solución" },
        { letter: "R", content: "Para obtener una mejore experiencia ins errores que reportar" },
        { letter: "T", content: "En 1 o 2 meses" }
      ]
    },
    {
      id: 4,
      title: "Marcadores estables",
      description: "Establecer una cantidad estale de actualizaciones en los marcadores de 90  Crear 10 alianzas estratégicas en el próximo bienio por medio de la organización de foros, y así obtener más exposición de marca y mejorar la red de proveedores asi evitando el sobreuso de recursos de aqui a un 1 mes.",
      smart: [
        { letter: "S", content: "Establecer una cantidad estale de actualizaciones en los marcadores, limitando a actualizar solo ejores puntuaciones" },
        { letter: "M", content: "90 por oleada de updates" },
        { letter: "A", content: "Limitando a actualizar solo ejores puntuaciones" },
        { letter: "R", content: "Evitando usar demasiados recursos" },
        { letter: "T", content: "En 1 mes" }
      ]
    },
    {
      id: 5,
      title: "Uso CPU servidor",
      description: "Reducir el porcentaje de uso de la CPU del servidor a un 60% o menos optimizando las respuestas y servicios que tiene el servidor o aumentar sus carecteristicas para evitar un colapso del servidor, empezar ya y lograr en los proximos 3 meses.",
      smart: [
        { letter: "S", content: "Reducir el porcentaje de uso de la CPU del servidor a un 60% o menos" },
        { letter: "M", content: "De 91% a <60%" },
        { letter: "A", content: "Optimizando las respuestas y servicios que tiene el servidor o aumentar sus carecteristicas" },
        { letter: "R", content: "Para evitar un colapso del servidor" },
        { letter: "T", content: "Empezar ya y lograr en los proximos 3 meses" }
      ]
    }
  ]);
  
  
  </script>
  
  
  <style scoped>
  
  
  ion-accordion.accordion-collapsing ion-item[slot='header'],
    ion-accordion.accordion-collapsed ion-item[slot='header'] {
      --background: var(--ion-color-light);
      --color: var(--ion-color-light-contrast);
    }
  
  
    ion-accordion.accordion-expanding ion-item[slot='header'],
    ion-accordion.accordion-expanded ion-item[slot='header'] {
      --background: rgba(var(--ion-color-primary-rgb), 0.14);
      color: var(--ion-color-primary);
    }
  
  
  </style>
  