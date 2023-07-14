<script setup>
import { ref } from 'vue';
import { Icon } from "@iconify/vue"
import sideNavData from "../../data/sideNavData"

const menuid = ref(0);
const arrayId = ["dashboard", "alarm", "reports", "device", "team", "user"]
const menuClicked = (e) => {
    menuid.value = arrayId.indexOf(e)
}
</script>

<template>
    <div class="p-2">
        <div class="lg:text-sm 2xl:text-lg font-medium flex flex-col justify-start items-start space-y-6">
            <div class="flex flex-row justify-center items-center">
                <img src="../../assets/House_Fire_Logo.png" alt="" class=" 2xl:w-12 w-8 ">
                <h1 class="font-bold">RushFire</h1>
            </div>
            <div v-for="(item, index) in sideNavData">
                <div>
                    <div class="flex flex-row justify-start items-center gap-2">
                        <Icon :icon="item.icon" />
                        <p>
                            {{ item.name }}
                        </p>
                    </div>
                    <div v-for="subpath in item.subpath">
                        <div class="flex flex-row justify-start items-center gap-2">
                            <Icon :icon="subpath.icon" />
                            <p>
                                {{ subpath.name }}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>