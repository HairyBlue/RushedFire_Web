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
                this.data = null
                this.data = await Api.prototype.getDashboardData()    
            } catch (error) {
                this.error = null
                this.error = error
                console.log(this.error)
            }
        },
        async overviewAlarmData(page, selectedYear) {
            try {
                this.data = null
                this.data = await Api.prototype.getAlarmOverview(page, selectedYear);
            } catch (error) {
                this.error = null
                this.error = error
                console.log(this.error)
            }
        },
        async viewEachDeviceData(deviceId) {
            try {
                this.refData = null
                this.refData = await Api.prototype.getViewEachDevice(deviceId);
            } catch (error) {
                this.error = null
                this.error = error
                console.log(this.error)
            }
        }
    }
})