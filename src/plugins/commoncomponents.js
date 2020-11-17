import Vue from "vue";
import baseTable from '../components/baseTable.vue'
import baseSearch from '../components/baseSearch.vue'
import basePage from '../components/basePage.vue'
import baseState from '../components/baseState.vue'
import baseDialog from '../components/baseDialog.vue'
import baseExport from '../components/baseExport.vue'

// 弹窗
Vue.component("baseTable", baseTable);
Vue.component("baseSearch", baseSearch);
Vue.component("basePage", basePage);
Vue.component("baseState", baseState);
Vue.component("baseDialog", baseDialog);
Vue.component("baseExport", baseExport);