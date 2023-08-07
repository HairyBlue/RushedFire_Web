<script setup>
import { onMounted, onBeforeMount, ref } from "vue"
import LineChartDashboard from '../../Charts/LineChartDashboard.vue';
import CountCardsDashboard from '../../Cards/CountCardsDashboard.vue';
import AlarmsTable from "../../Tables/AlarmsTable.vue";
import ReportsTable from "../../Tables/ReportsTable.vue"

import { useDataStore } from "../../../store/DataStore"
const dataStore = useDataStore();
const dataTable = ref(null)
const loading = ref(true)

onBeforeMount(async () => {
    await dataStore.dashboardData()
    dataTable.value = dataStore.data.data.results.alarm.alarmTake10
    loading.value = false
})

</script>
<template>
    <div v-if="loading">
        loading...
    </div>
    <div v-else class="w-full h-full space-y-8">
        <div class="h-[52%] p-2 border border-slate-300 bg-white rounded-lg">
            <LineChartDashboard />
        </div>
        <div class="space-y-8">
            <div>
                <CountCardsDashboard />
            </div>
            <div class="flex flex-row max-lg:flex-col w-full gap-4 pb-4">
                <div class="basis-[40%] border border-slate-300 bg-white rounded">
                    <div class="w-full flex justify-between p-4">
                        <p>Alarm Table</p>
                        <router-link to="/dashboard/alarm"
                            class=" text-white pl-2 pr-2 bg-blue-400 rounded font-semibold">See All</router-link>
                    </div>
                    <AlarmsTable  :dataTable="dataTable" :isClickable="false"/>
                </div>
                <div class="basis-[60%] border border-slate-300 bg-white rounded">
                    <div class="w-full flex justify-between p-4">
                        <p>Reports Table</p>
                        <router-link to="/dashboard/reports"
                            class=" text-white pl-2 pr-2 bg-blue-400 rounded font-semibold">See All</router-link>
                    </div>
                    <ReportsTable />
                </div>
            </div>
        </div>
    </div>
</template>