<script setup>
import Chart from "chart.js/auto"
import { ref, onMounted, toRaw } from "vue"
import { useDataStore } from "../../store/DataStore"

const dataStore = useDataStore();
const chartCanva = ref(null)
const finalData = ref(null);
const props = ref("alarms")
let data;
let chartInstance;

onMounted(() => {
    // await dataStore.dashboardData()
    // data = toRaw(dataStore.data.data.results)
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
    finalData.value = [10, 23, 54, 32, 78, 43, 99, 12, 78, 12, 10, 23]
    // finalData.value = data.alarm.alarmPost

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
    <div class="relative">
        <div class="absolute max-md:w-[96vw] md:w-[75vw] lg:w-[73vw] xl:w-[66vw] 2xl:w-[68vw] max-md:h-[28vh] md:h-[30vh] xl:h-[28vh] mt-4">
            <canvas ref="chartCanva"> </canvas>
        </div>
    </div>
</template>