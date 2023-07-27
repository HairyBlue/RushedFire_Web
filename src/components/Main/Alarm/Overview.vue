<script setup>
import { onMounted, ref, watch } from "vue"
import { Icon } from "@iconify/vue";
import CountCard from '../../Cards/CountCard.vue';
import LineChart from '../../Charts/LineChart.vue';
import AlarmsTable from "../../Tables/AlarmsTable.vue";
const currentYear = new Date().getFullYear()
const selectedYear = ref(currentYear)
const years = ref([]);
const isFilterShow = ref(true)
function generateYearOption() {
    for (let i = 1990; i <= 2099; i++) {
        years.value.push(i)
    }
    return
}
onMounted(() => {
    generateYearOption()
})

watch(selectedYear, (newSelectedYear) => {
    console.log(newSelectedYear)
})

function filterShow() {
    isFilterShow.value = !isFilterShow.value
}
</script>

<template>
    <div class="w-full h-full space-y-4 max-md:space-y-1 pb-4">
        <div class="h-[40%] max-md:h-[60%] max-md:block max-md:space-y-2 md:flex gap-2">
            <div class="basis-[20%] max-md:h-36 ">
                <CountCard />
            </div>
            <div class="basis-[80%] max-md:h-80 border border-slate-300 bg-white rounded-lg">
                <div class="flex justify-between w-full pl-4 pr-8 mt-4">
                    <div>
                        Alarm Reports on year {{ selectedYear }}
                    </div>
                    <div>
                        <label for="year">Select a year:</label>
                        <select name="year" id="year" v-model="selectedYear">
                            <option v-for="(year, index) in years" :key="index" :value="year"
                                :selected="year == currentYear">{{ year }}</option>
                        </select>
                    </div>
                </div>
                <LineChart />
            </div>
        </div>
        <div class="lg:flex gap-2 pb-4">
            <div class="basis-[70%] p-2 border border-slate-300 bg-white rounded space-y-2">
                <!-- <div class="p-2 flex justify-between items-center">
                    <div class="w-3/4 ">
                        <form action="">
                            <label for="search"></label>
                            <input type="text" name="search" id="search" class="w-[75%] border border-slate-400 rounded-lg">
                            <button class="text-white pl-3 pr-3 ml-2  bg-blue-400 rounded-xl">Search</button>
                        </form>
                    </div>
                    <div>
                        <div class="relative mr-4">
                            <div @click="filterShow">
                                <Icon icon="mdi:filter-variant"
                                    class="text-4xl hover:scale-125 transition ease-in-out duration-300" />
                            </div>

                            <div :class="isFilterShow ? 'hidden' : ''"
                                class="absolute top-100 -left-[740%] w-80 h-20 bg-white z-10 border border-slate-400 rounded-lg">
                            </div>
                        </div>
                    </div>
                </div> -->
                <AlarmsTable />
                <div class="flex justify-center font-semibold w-full gap-2 hover:cursor-default">
                    <div class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">&lt;&lt;</div>
                    <div class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">&lt;</div>
                    <div class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">1</div>
                    <div class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">2</div>
                    <div class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">&gt;</div>
                    <div class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">&gt;&gt;</div>
                </div>
            </div>
            <div class="basis-[30%] border border-black max-lg:hidden">
                <div>
                </div>
                <div>

                </div>
            </div>
        </div>
    </div>
</template> 