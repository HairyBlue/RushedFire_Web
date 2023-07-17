<script setup>
import LineChartDashboard from '../../Charts/LineChartDashboard.vue';
import CountCardsDashboard from '../../Cards/CountCardsDashboard.vue';
import AlarmsTable from "../../Tables/AlarmsTable.vue";
import ReportsTable from "../../Tables/ReportsTable.vue"

</script>
<template>
    <div class="w-full h-full space-y-8">
        <div class="h-[52%] p-2 border border-slate-300 bg-white rounded-lg">
            <LineChartDashboard />
        </div>
        <div class="space-y-8">
            <div>
                <CountCardsDashboard />
            </div>
            <div class="flex flex-row max-lg:flex-col w-full gap-4 pb-4">
                <AlarmsTable class="basis-[40%]" :title="'Alarm Table'"/>
                <ReportsTable class="basis-[60%]" :title="'Report Table'"/>
            </div>
        </div>
    </div>
</template>