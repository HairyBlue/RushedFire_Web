<script setup>
import { onMounted, reactive } from "vue"
import { Icon } from '@iconify/vue';
import { useDataStore } from '../../store/DataStore';
const dataStore = useDataStore();

const countData = reactive({
    alarm: 0,
    report: 0,
    device: 0,
    user: 0
})

onMounted(() => {
        countData.alarm = dataStore?.data.data.results.alarm.alarmCount
        countData.report = dataStore?.data.data.results.report.reportCount
        countData.device = dataStore?.data.data.results.others.deviceCount
        countData.user = dataStore?.data.data.results.others.userCount

})

</script>
<template>
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div class=" xl:h-36 2xl:h-40 p-4 border border-slate-300 bg-white rounded-lg">
            <div class="flex flex-row items-start place-content-between">
                <Icon icon="material-symbols:detector-alarm" class="w-20 h-20 text-red-400" />
                <div class="mt-2 mr-4 text-center">
                    <p class="text-2xl ">
                        Alarm
                    </p>
                    <p class="text-6xl">
                        {{ countData.alarm }}
                    </p>
                </div>
            </div>
            <div class="border-t text-slate-400">
                <p>Total Reports from Alarm Devices</p>
            </div>
        </div>
        <div class="xl:h-36 2xl:h-40 p-4 border border-slate-300 bg-white rounded-lg">
            <div class="flex flex-row items-start place-content-between">
                <Icon icon="material-symbols:partner-reports" class="w-20 h-20 text-blue-400" />
                <div class="mt-2 mr-4 text-center">
                    <p class="text-2xl">
                        Report
                    </p>
                    <p class="text-6xl">
                        {{ countData.report }}
                    </p>
                </div>
            </div>

            <div class="border-t text-slate-400">
                <p>Total Reports from User</p>
            </div>
        </div>
        <div class="xl:h-36 2xl:h-40 p-4 border border-slate-300 bg-white rounded-lg">
            <div class=" flex flex-row items-start place-content-between">
                <Icon icon="material-symbols:device-hub-rounded" class="w-20 h-20 text-teal-500" />
                <div class="mt-2 mr-4 text-center ">
                    <p class="text-2xl">
                        Device
                    </p>
                    <p class="text-6xl">
                        {{ countData.device }}
                    </p>
                </div>
            </div>
            <div class="border-t text-slate-400">
                <p>Total Number of Alarm Devices</p>
            </div>
        </div>
        <div class="xl:h-36 2xl:h-40 p-4  border border-slate-300 bg-white rounded-lg">
            <div class="flex flex-row items-start place-content-between">
                <Icon icon="material-symbols:person" class="w-20 h-20 text-orange-400" />
                <div class="mt-2 mr-4 text-center">
                    <p class="text-2xl">
                        User
                    </p>
                    <p class="text-6xl">
                        {{ countData.user }}
                    </p>
                </div>
            </div>
            <div class="border-t text-slate-400">
                <p>Total Number of User</p>
            </div>
        </div>
    </div>
</template>