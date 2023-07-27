<script setup>
import { onMounted, ref } from "vue"
import { useDataStore } from "../../store/DataStore"
const dataStore = useDataStore();
const tablesData = ref([])
onMounted(() => {
    tablesData.value = dataStore.data.data.results.alarm.alarmTake10
})
</script>

<template>
    <div class="p-2">
        <table class="text-center min-w-full">
            <thead class="font-medium border-b border-slate-400 ">
                <tr>
                    <th class="p-2">#</th>
                    <th scope="col" class="p-2">Model</th>
                    <th scope="col" class="p-2">Type</th>
                    <th scope="col" class="p-2">Serial</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tableData, index) in tablesData">
                    <td class="p-2 border-b dark:border-neutral-400">{{ index + 1 }}</td>
                    <td class="p-2 border-b dark:border-neutral-400">{{ tableData.model }}</td>
                    <td class="p-2 border-b dark:border-neutral-400">{{ tableData.type }}</td>
                    <td class="p-2 border-b dark:border-neutral-400">{{ tableData.serial }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>