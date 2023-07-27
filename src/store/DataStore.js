// noinspection ES6UnusedImports
import { defineStore } from "pinia"
import Api from "../api/adminapi"
export const useDataStore = defineStore("dataStore", {
    state: () => ({
        data: null,
        refData: null,
        error: null   
    }),
    actions: {
        async dashboardData() {
            try {
                this.data = await Api.prototype.getDashboardData()    
            } catch (error) {
                this.error = error
            }
        },
        async overviewAlarmData() {
            try {
                this.data = await Api.prototype.getAlarmOverview();
            } catch (error) {
                this.error = error
            }
        },
        async viewEachDeviceData() {
            try {
                this.refData = await Api.prototype.getViewEachDevice();
            } catch (error) {
                this.error = error
            }
        }
    }
})