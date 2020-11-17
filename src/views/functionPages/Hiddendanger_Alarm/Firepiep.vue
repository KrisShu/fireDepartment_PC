<template>
  <div class="Firepiep">
      <div class="headerBox">
          <base-search @getSearchName="onsearch"></base-search>
          <base-export @exportdata="exportdata"></base-export>
      </div>
      <baseTable
          :columnList="columnList"
          :tableData="tableData"
          tableName="Firepiep"
      ></baseTable>
      <base-page :propPage='page' @currentChange="GetDeptWaterAlarmList"></base-page>
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
            prop: "deviceSN",
            label: "设备编号"
          },
          {
            prop: "location",
            label: "位置"
          },
          {
            prop: "monitorType",
            label: "警情类型"
          },
          {
            prop: "value",
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
      this.GetDeptWaterAlarmList();
    },
    methods:{
      //获取列表
      GetDeptWaterAlarmList(){
        this.$axios.get(this.$api.GetDeptWaterAlarmList,
          {params:this.page}
        ).then(res=>{
          console.log("获取消防管网",res);
          ({items: this.tableData,totalCount: this.page.total} = res.result);
        })
      },
      onsearch(name){
        this.page.FireUnitName = name;
        this.page.current = 1;
        this.page.SkipCount = 0;
        this.GetDeptWaterAlarmList();
      },
      exportdata(){
          export2Excel(this.columnList,this.tableData)
      }
    }
}
</script>

<style lang="less">
  .Firepiep{
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