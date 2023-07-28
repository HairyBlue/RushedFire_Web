<script setup>
import { ref, watchEffect } from 'vue';
import {useRoute} from "vue-router"
import { Icon } from "@iconify/vue"
import sideNavData from "../../data/sideNavData"

const route = useRoute()

const _index = ref(0);
const _subindex = ref(0);

watchEffect(() => {
    for (let i = 0; i < sideNavData.length; i++){
        if (sideNavData[i].path == route.path) {
            _index.value = i
        }
        if (sideNavData[i + 1]?.subpath[1].path == route.path) {    
            _subindex.value = 1
        }
    }   
})
function isIndexClick(value) {
    _subindex.value = 0
    _index.value = value
}
function isSubIndexClick(value) {
    _subindex.value = value
}
</script>

<template>
    <div class="p-2">
        <div class="lg:text-base 2xl:text-lg font-medium flex flex-col justify-start items-start space-y-6">
            <div class="flex flex-row justify-center items-center">
                <img src="../../assets/House_Fire_Logo.png" alt="" class=" 2xl:w-12 w-8 ">
                <h1 class="font-bold">RushFire</h1>
            </div>
            <div v-for="(item, index) in sideNavData">
                <div>
                    <div :to="item.path" @click="isIndexClick(index)"
                        :class="_index == index ? 'text-black bg-white pl-1 pr-4 opacity-60 rounded' : ''"
                        class="flex flex-row justify-start items-center gap-2">
                        <Icon :icon="item.icon" />
                        <router-link :to="item.path">
                            {{ item.name }}
                        </router-link>
                    </div>
                    <div v-for="(subpath, subindex) in item.subpath">
                        <div :class="_index == index ? '' : 'hidden'" class="mt-2">
                            <div @click="isSubIndexClick(subindex)"
                                :class="_subindex == subindex ? 'text-black bg-white pl-1 pr-2 opacity-60 rounded' : ''"
                                class="flex flex-row justify-start items-center gap-2 ml-6">
                                <Icon :icon="subpath.icon" />
                                <router-link :to="subpath.path">
                                    {{ subpath.name }}
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>