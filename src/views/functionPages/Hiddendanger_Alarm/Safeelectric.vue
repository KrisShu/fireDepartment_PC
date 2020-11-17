<template>
  <div class="Safeelectric">
      <div class="headerBox">
            <base-search @getSearchName="onsearch"></base-search>
            <base-export @exportdata="exportdata"></base-export>
      </div>
      <baseTable
          :columnList="columnList"
          :tableData="tableData"
          tableName="Safeelectric"
      ></baseTable>
      <base-page :propPage='page' @currentChange="GetDeptElectricAlarmList"></base-page>
  </div>
</template>

<script>
import { export2Excel } from '../../../plugins/utils'
export default {
  data(){
      return{
            columnList:[
                {
                    prop: "creationTime",
                    label: "报警时间"
                },
                {
                    prop: "fireUnitName",
                    label: "防火单位"
                },
                {
                    prop: "fireElectricDeviceSn",
                    label: "设备编号"
                },
                {
                    prop: "location",
                    label: "位置"
                },
                {
                    prop: "state",
                    label: "警情类型"
                },
                {
                    prop: "sign",
                    prop2: "analog",
                    label: "数值"
                },
            ],
            tableData:[],
            page:{
                DeptId:this.$store.state.userInfo.deptId,
                FireUnitName:'',
                DeviceState:'',
                MaxResultCount:10,
                SkipCount:0,
                total:0,
                current:1
            }
      }
  },
    created(){
        this.GetDeptElectricAlarmList()
    },
    methods:{
      GetDeptElectricAlarmList(){
          this.$axios.get(this.$api.GetDeptElectricAlarmList,
                {params:this.page}
          ).then(res=>{
                console.log("安全列表结果",res);
                ({items: this.tableData,totalCount: this.page.total} = res.result);
          })
      },
        //搜索查询
        onsearch(name){
            console.log(name)
            this.page.FireUnitName = name;
            this.page.current = 1;
            this.page.SkipCount = 0;
            this.GetDeptElectricAlarmList();
        },
        exportdata(){
            export2Excel(this.columnList,this.tableData)
        }
    }
}
</script>

<style lang="less">
  .Safeelectric{
    height: 100%;
    display: flex;
    flex-direction: column;
    & > :nth-child(2) {
            flex: 2 0 auto;
    }
    .headerBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
  }
</style>