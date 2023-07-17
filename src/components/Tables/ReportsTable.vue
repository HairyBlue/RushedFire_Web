<script setup>
import { defineProps, ref } from "vue"
const props = defineProps([
    "title"
])
const isHidden = ref(true)
function isClick(value) {
    isHidden.value = value
}

</script>
<template>
    <div class="p-2 border border-slate-300 bg-white rounded">
        <div class="flex flex-row justify-between">
            <p>{{ props.title }}</p>
            <a href="" class="text-white mr-4 pl-2 pr-2 bg-blue-400 rounded font-semibold">See All</a>
        </div>
        <table class="min-w-full text-center mt-6">
            <thead class="font-medium border-b border-slate-400 ">
                <tr>
                    <th class="p-2">#</th>
                    <th scope="col" class="p-2">Image</th>
                    <th scope="col" class="p-2">Address</th>
                    <th scope="col" class="p-2">User Id</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="n in 10">
                    <td class="p-2 border-b dark:border-neutral-400">{{ n }}</td>
                    <td class="p-2 border-b dark:border-neutral-400">
                        <img @click="isClick(false)" src="../../assets/House_Fire_Logo.png" alt=""
                            class="w-5 h-5 m-auto border border-slate-400 rounded-full ">
                    </td>
                    <td class="p-2 border-b dark:border-neutral-400">Hagonoy</td>
                    <td class="p-2 border-b dark:border-neutral-400">DD435Gd-FD34</td>
                </tr>
            </tbody>
        </table>
        <div :class="isHidden == true ? 'hidden' : 'block'"
            class="absolute top-[20%]  min-[280px]:left-[8  %] min-[320px]:left-[16%]  min-[480px]:left-[20%] min-[560px]:left-[25%] sm:left-[30%] lg:left-[35%] xl:left-[40%] bg-white border-2 border-slate-400 p-2">
            <div class="flex justify-end font-semibold text-xl">
                <p @click="isClick(true)" class="cursor-pointer">X</p>
            </div>
            <img src="../../assets/rafael-rex-felisilda-_3FZYcFeWnc-unsplash 1.png" alt=""
                class="max-lg:w-60 max-lg:h-60 md:w-72 md:h-72 lg:w-96 lg:h-96 ">
            <p>Naay nag daub ug lukay</p>
        </div>
</div></template>