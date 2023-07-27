<script setup>
import { watchEffect, ref, computed } from "vue";
import { useRoute } from "vue-router"
import { Icon } from '@iconify/vue';
import SideNav from "../components/Main/SideNav.vue"


const route = useRoute();
const currentPath = ref(route.path)
const currentSubPath = ref(0);
const isNavHidden = ref(true)
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

function isClick() {
    isNavHidden.value = !isNavHidden.value
}
</script>

<template>
    <div class="flex flex-row h-screen ">
        <div :class="isNavHidden ? 'max-xl:hidden' : ''" class="relative 2xl:basis-1/12 text-white bg-slate-800 ">
            <SideNav :currentSubPath="currentSubPath" />
            <div @click="isClick"
                class="xl:hidden absolute -right-7 top-[50%]  font-extrabold text-4xl text-slate-400 flex items-center justify-center w-14 h-14 rounded-full bg-slate-200  border border-slate-400 hover:scale-125  shadow-md shadow-slate-800 cursor-default">
                <span class="mb-2 mr-1">&lt;</span>
            </div>
        </div>
        <div class="max-2xl:basis-full 2xl:basis-11/12 h-full">
            <div class="h-[5%] p-2 bg-white border border-b-2 border-slate-300">
                <div class="flex flex-row justify-start items-center gap-4">
                    <div @click="isClick">
                        <Icon icon="material-symbols:menu" class="xl:hidden w-8 h-8" />
                    </div>
                    <div>
                        <ul class="flex flex-row">
                            <li v-bind="currentSubPath == index" v-for="(segment, index) in breadCrumbsSegments"
                                :key="index" class="no-underline list-none">
                                <router-link :to="segment.path" class="text-orange-400">
                                    {{ segment.name }}
                                </router-link>
                                <span v-if="index !== breadCrumbsSegments.length - 1">/</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="max-lg:p-2 p-8 h-[95%] bg-slate-100 overflow-auto">
                <router-view />
            </div>
        </div>
    </div>
</template>