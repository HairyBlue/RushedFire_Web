<script setup>
import Chart from "chart.js/auto"
import { ref, onMounted, toRaw } from "vue"
import { useDataStore } from "../../store/DataStore"

const dataStore = useDataStore();
const chartCanva = ref(null)
let data;
let finalData;
const props = ref("alarm")

const createLineChart = async () => {
    // await dataStore.dashboardData()
    // data = toRaw(dataStore.data.data.results)
    if (props.value == "alarm") {
        finalData = [10, 23, 54, 32, 78, 43, 99, 12, 78, 12, 10, 23]
        // finalData = data.alarm.alarmPost
    } else {
        finalData = [90, 23, 54, 32, 78, 43, 10, 12, 78, 12, 10, 23]
        // finalData = data.report.reportPost
    }
    new Chart(
        chartCanva.value.getContext('2d'),
        {
            type: "line",
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: "",
                        data: finalData,
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


onMounted(() => {
    createLineChart();
})

</script>

<template>
    <div class="relative ">
        <div class="absolute m-auto w-[86vw] h-[35vh]">
            <canvas ref="chartCanva"> </canvas>
        </div>
        <div class="absolute top-0 right-0 flex flex-row">
            <div class="pl-4 pr-4 border border-red-400">
                Alarm
            </div>
            <div class="pl-4 pr-4 border border-red-400">
                Report
            </div>
        </div>
    </div>
</template>
