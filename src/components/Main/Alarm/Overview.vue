<script setup>
//**********Imports**********
import { onBeforeMount, ref, watch, watchEffect, computed } from "vue";

import CountCard from "../../Cards/CountCard.vue";
import LineChart from "../../Charts/LineChart.vue";
import AlarmsTable from "../../Tables/AlarmsTable.vue";
import { useDataStore } from "../../../store/DataStore";
import { createMap } from "../../../utilities/mapBox";
//**********Re Variable**********
const dataStore = useDataStore();
const currentYear = new Date().getFullYear();

//**********REACTIVE VARIABLE**********
const alarmCount = ref(0);
const dataTable = ref(null);
const pageCount = ref(null);
const mapData = ref(null);
const emitData = ref([]);
const page = ref(1);
const selectedYear = ref(currentYear.toString());
const years = ref([]);
const loading = ref(true);
const isMapHidden = ref(true);
// const isFilterShow = ref(true)

//**********HOOKS**********
onBeforeMount(async () => {
  await resolve();
  generateYearOption();
  loading.value = false;
});

watch(selectedYear, async (newSelectedYear) => {
  selectedYear.value = newSelectedYear.toString();
  await resolve();
});

watchEffect(async () => {
  if (emitData.value[0]) {
    await dataStore.viewEachDeviceData(emitData.value[0]);
    mapData.value = dataStore.refData.data.results.deviceInfo;
    isMapHidden.value = false;
    createMap(mapData.value);
  }
});

//**********METHODS**********
async function resolve() {
  await dataStore.overviewAlarmData(page.value.toString(), selectedYear.value);
  dataTable.value = dataStore.data.data.results.alarmTake20;
  pageCount.value = dataStore.data.data.results.pageCount;
  alarmCount.value = dataStore.data.data.results.alarmCount;
}
function fetchData(event) {
  emitData.value = event;
}
function generateYearOption() {
  for (let i = 1990; i <= 2099; i++) {
    years.value.push(i);
  }
  return;
}
function getTime() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const time = new Date(
    dataStore.data.data.results.alarmTake20[emitData.value[1]].createdAt
  );

  const hours = (time.getHours() % 24) % 12 || 12;
  const minutes =
    (time.getMinutes() < 10 ? "0" : "") + time.getMinutes().toString();
  // const seconds = time.getSeconds().toString()
  const calcTime =
    hours.toString() + ":" + minutes + (time.getHours() < 12 ? "AM" : "PM");

  return `${calcTime} - ${days[time.getDay()]}, ${months[time.getMonth()]
    } ${time.getDate()} ${time.getFullYear()}`;
}
async function paginateClick(optionClick) {
  if ("increment" == optionClick) {
    if (page.value == pageCount.value) {
      return;
    }
    page.value++;
  }
  if ("decrement" == optionClick) {
    if (page.value == 1) {
      return;
    }
    page.value--;
  }
  if ("start" == optionClick) {
    if (page.value == 1) {
      return;
    }
    page.value = 1;
  }
  if ("end" == optionClick) {
    page.value = pageCount.value;
  }
  await resolve();
}
</script>

<template>
  <div v-if="loading">loading...</div>
  <div v-else class="w-full h-full space-y-4 max-md:space-y-1 pb-4">
    <div class="h-[40%] max-md:h-[60%] max-md:block max-md:space-y-2 md:flex gap-2">
      <div class="basis-[20%] max-md:h-36">
        <CountCard />
      </div>
      <div class="basis-[80%] max-md:h-80 border border-slate-300 bg-white rounded-lg">
        <div class="flex justify-between w-full pl-4 pr-8 mt-4">
          <div>Alarm Reports on year {{ selectedYear }}</div>
          <div>
            <label for="year">Select a year:</label>
            <select name="year" id="year" v-model="selectedYear">
              <option v-for="(year, index) in years" :key="index" :value="year" :selected="year == currentYear">
                {{ year }}
              </option>
            </select>
          </div>
        </div>
        <LineChart />
      </div>
    </div>
    <div class="lg:flex max-lg:flex-col gap-2 pb-4">
      <div class="basis-[70%] p-2 max-lg:w-full border border-slate-300 bg-white rounded space-y-2">
        <!-- <div class="p-2 flex justify-between items-center">
                    <div class="w-3/4 ">
                        <form action="">
                            <label for="search"></label>
                            <input type="text" name="search" id="search" class="w-[75%] border border-slate-400 rounded-lg">
                            <button class="text-white pl-3 pr-3 ml-2  bg-blue-400 rounded-xl">Search</button>
                        </form>
                    </div>
                    <div>
                        <div class="relative mr-4">
                            <div @click="filterShow">
                                <Icon icon="mdi:filter-variant"
                                    class="text-4xl hover:scale-125 transition ease-in-out duration-300" />
                            </div>

                            <div :class="isFilterShow ? 'hidden' : ''"
                                class="absolute top-100 -left-[740%] w-80 h-20 bg-white z-10 border border-slate-400 rounded-lg">
                            </div>
                        </div>
                    </div>
                </div> -->
        <AlarmsTable :dataTable="dataTable" :isClickable="true" @clicked="fetchData($event)" />
        <div class="flex justify-center font-semibold w-full gap-2 hover:cursor-default">
          <div @click="paginateClick('start')"
            class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">
            &lt;&lt;
          </div>
          <div @click="paginateClick('decrement')"
            class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">
            &lt;
          </div>
          <div class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">
            {{ page }}
          </div>
          <div @click="paginateClick('increment')"
            class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">
            &gt;
          </div>
          <div @click="paginateClick('end')"
            class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">
            &gt;&gt;
          </div>
        </div>
        <div class="text-center">
          <p>
            You are on page <span class="font-extrabold"> {{ page }} </span>
          </p>
        </div>
      </div>
      <div class="basis-[30%] h-[600px] border border-slate-300 bg-white rounded max-lg:w-full">
        <div id="map" class="w-full h-[50%]"></div>
        <div v-if="isMapHidden">
          <div class="text-center">
            <p>Click the row to get a map preview</p>
          </div>
        </div>
        <div v-else class="p-4 space-y-2 transition-all">
          <div>
            <p class="font-semibold underline">Location</p>
            <p>
              <span class="font-semibold"> Address:</span>
              {{ mapData.address }}
            </p>
            <p>
              <span class="font-semibold">lat:</span>
              {{ mapData.coords.split(",")[0] }}
              <span class="font-semibold">long:</span>
              {{ mapData.coords.split(",")[1] }}
            </p>
          </div>
          <div>
            <p class="font-semibold underline">Device Information</p>
            <p>
              <span class="font-semibold">Model:</span>
              {{ mapData.model }}
            </p>
            <p>
              <span class="font-semibold">Type:</span>
              {{ mapData.type }}
            </p>
            <p>
              <span class="font-semibold">Serial:</span>
              {{ mapData.serial }}
            </p>
          </div>
          <div>
            <p>
              <span class="font-semibold">Fire incident break at:</span>
              {{ getTime() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* .mapboxgl-ctrl-bottom-left {
  z-index: 0;
  display: none !important;
} */
/* #map {
  min-width: 100%;
  height: 50%;
} */
/* .marker {
  background-image: url("https://raw.githubusercontent.com/HairyBlue/RushedFire_Web/master/src/assets/House_Fire_Logo.png");
  background-size: cover;
  width: 200px;
  height: 200px;
  cursor: pointer;
} */
</style>
