<script setup>
import Chart from "chart.js/auto"
import { ref, onMounted, toRaw } from "vue"
import { useDataStore } from "../../store/DataStore"

const dataStore = useDataStore();
const chartCanva = ref(null)
const finalData = ref(null);
const data = ref(null)
const props = ref("alarms")
let chartInstance;

onMounted(() => {
    createChart()
})
function isClick(value) {
    props.value = value
    createChart()
}

function createChart() {
    if (chartInstance) {
        chartInstance.destroy()
    }
    if (props.value == "alarms") {

        // finalData.value = [10, 23, 54, 32, 78, 43, 99, 12, 78, 12, 10, 23]
        finalData.value = dataStore.data.data.results.alarm.alarmPost
    }
    if (props.value == "reports") {
        finalData.value = [90, 100, 54, 32, 78, 43, 10, 12, 78, 12, 10, 100]
        // finalData.value = dataStore.data.data.results.report.reportPost
    }
    chartInstance = new Chart(
        chartCanva.value.getContext('2d'),
        {
            type: "line",
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: "",
                        data: finalData.value,
                        borderWidth: 5,
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    )
}

</script>

<template>
    <div class="relative ">
        <div class="ml-2">
            <p class="text-sm">Total Incidents This Year</p>
            <p class="text-2xl font-semibold">{{ props.toLocaleUpperCase() }}</p>
        </div>
        <div class="absolute m-auto w-[86vw] h-[35vh]">
            <canvas ref="chartCanva"> </canvas>
        </div>
        <div class="absolute top-0 right-0 flex flex-row font-semibold">
            <div @click="isClick('alarms')"
                :class="props == 'alarms' ? 'text-white bg-red-400' : 'border-2 text-red-500 border-red-400'"
                class="pl-4 pr-4 cursor-default">
                Alarm
            </div>
            <div @click="isClick('reports')"
                :class="props == 'reports' ? 'text-white bg-red-400' : 'border-2 text-red-500 border-red-400'"
                class="pl-4 pr-4 cursor-default">
                Report
            </div>
        </div>
    </div>
</template>
