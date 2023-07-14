// noinspection ES6UnusedImports
import { defineStore } from "pinia"
import Api from "../api/adminapi"
export const useDataStore = defineStore("dataStore", {
    state: () => ({
        data: null,
        error: null   
    }),
    actions: {
        async dashboardData() {
            try {
                this.data = await Api.prototype.getDashboardData()    
            } catch (error) {
                this.error = error
            }
        }
    }
})