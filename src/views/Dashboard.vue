<script setup>
import { watchEffect, ref, computed } from "vue";
import { useRoute } from "vue-router"
import { Icon } from '@iconify/vue';
import SideNav from "../components/Main/SideNav.vue"


const route = useRoute();
const currentPath = ref(route.path)

watchEffect(() => {
    currentPath.value = route.path
    //     console.log(currentPath.value.split("/"))
})

const breadCrumbsSegments = computed(() => {
    const segments = currentPath.value.split("/").filter(segment => segment !== "");
    return segments.map((segment, index) => ({
        name: segment,
        path: `/${segments.slice(0, index + 1).join("/")}`
    }))

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
                    <ul class="flex flex-row">
                        <li v-for="(segment, index) in breadCrumbsSegments" :key="index" class="no-underline list-none">
                            <router-link :to="segment.path" class="text-orange-400">
                                {{ segment.name }}
                            </router-link>
                            <span v-if="index !== breadCrumbsSegments.length - 1">/</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="max-md:p-2 p-8 h-[95%] bg-slate-100 overflow-auto">
                <router-view />
            </div>
        </div>
    </div>
</template>