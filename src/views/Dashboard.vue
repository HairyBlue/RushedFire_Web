<script setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router"
import { Icon } from '@iconify/vue';
import SideNav from "../components/Main/SideNav.vue"


const path = useRoute().path;
const currentPath = ref(path)
watch(path, (newValue) => {
    currentPath.value = newValue
})
</script>

<template>
    <div class="flex flex-row h-screen">
        <div class="max-xl:hidden 2xl:basis-1/12 text-white bg-slate-800">
            <SideNav />
        </div>
        <div class="max-2xl:basis-full 2xl:basis-11/12 h-full">
            <div class="h-[5%] p-2 bg-white border border-b-2 border-slate-300">
                <div class="flex flex-row justify-start items-center gap-4">
                    <Icon icon="material-symbols:menu" class="xl:hidden w-8 h-8" />
                    <p>{{ currentPath }}</p>
                </div>
            </div>
            <div class="max-md:p-2 p-8 h-[95%] bg-slate-100 overflow-auto">
                <router-view />
            </div>
        </div>
    </div>
</template>