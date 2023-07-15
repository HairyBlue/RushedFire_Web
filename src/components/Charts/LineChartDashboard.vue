<script setup>
import Chart from "chart.js/auto"
import { ref, onMounted, toRaw } from "vue"
import { useDataStore } from "../../store/DataStore"

const dataStore = useDataStore();
const chartCanva = ref(null)
const finalData = ref(null);
const props = ref("alarm")
let data;
let chartInstance;


// await dataStore.dashboardData()
// data = toRaw(dataStore.data.data.results)

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
    if (props.value == "alarm") {

        finalData.value = [10, 23, 54, 32, 78, 43, 99, 12, 78, 12, 10, 23]
        // finalData = data.alarm.alarmPost
    }
    if (props.value == "report") {
        finalData.value = [90, 23, 54, 32, 78, 43, 10, 12, 78, 12, 10, 100]
        // finalData = data.report.reportPost
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
                        data: toRaw(finalData.value),
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
        <div class="absolute m-auto w-[86vw] h-[35vh]">
            <canvas ref="chartCanva"> </canvas>
        </div>
        <div class="absolute top-0 right-0 flex flex-row font-semibold">
            <div @click="isClick('alarm')"
                :class="props == 'alarm' ? 'text-white bg-red-400' : 'border-2 text-red-500 border-red-400'"
                class="pl-4 pr-4">
                Alarm
            </div>
            <div @click="isClick('report')"
                :class="props == 'report' ? 'text-white bg-red-400' : 'border-2 text-red-500 border-red-400'"
                class="pl-4 pr-4">
                Report
            </div>
        </div>
    </div>
</template>
