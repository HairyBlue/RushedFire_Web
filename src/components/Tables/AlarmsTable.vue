<script setup>
import { defineProps } from "vue"
const props = defineProps([
    "title"
])


</script>

<template>
    <div class="p-2 border border-slate-300 bg-white rounded">
        <div class="flex flex-row justify-between">
            <p>{{ props.title }}</p>
            <a href="" class="text-white mr-4 pl-2 pr-2 bg-blue-400 rounded font-semibold">See All</a>
        </div>
        <table class="text-center min-w-full mt-6">
            <thead class="font-medium border-b border-slate-400 ">
                <tr>
                    <th class="p-2">#</th>
                    <th scope="col" class="p-2">Model</th>
                    <th scope="col" class="p-2">Type</th>
                    <th scope="col" class="p-2">Serial</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="n in 10">
                    <td class="p-2 border-b dark:border-neutral-400">{{ n }}</td>
                    <td class="p-2 border-b dark:border-neutral-400">ESP32</td>
                    <td class="p-2 border-b dark:border-neutral-400">Arduino Compatible Board</td>
                    <td class="p-2 border-b dark:border-neutral-400">34676</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>