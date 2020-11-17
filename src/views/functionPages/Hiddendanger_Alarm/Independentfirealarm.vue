<template>
  <div class="Independentfirealarm">
      <div class="headerBox">
          <base-search @getSearchName="onsearch"></base-search>
          <base-export @exportdata="exportdata"></base-export>
      </div>
      <baseTable
        :columnList="columnList"
        :tableData="tableData"
        tableName="Independentfirealarm"
      ></baseTable>
      <base-page :propPage='page' @currentChange="GetDeptIndependentAlarmList"></base-page>
  </div>
</template>

<script>
import { export2Excel } from '../../../plugins/utils'
export default {
  data(){
    return{
      columnList:[
        {
          prop:'creationTime',
          label:'报警时间'
        },
        {
          prop:'fireUnitName',
          label:'防火单位'
        },
        {
          prop:'detectorSn',
          label:'设备编号'
        },
        {
          prop:'location',
          label:'位置'
        }, 
        {
          prop:'checkState',
          label:'核警状态'
        }
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
    this.GetDeptIndependentAlarmList();
  },
  methods:{
    GetDeptIndependentAlarmList(){
      this.$axios.get(this.$api.GetDeptIndependentAlarmList,
        {params:this.page}
      ).then(res=>{
        console.log("独立火警res",res);
        ({items: this.tableData,totalCount: this.page.total} = res.result)
      })
    },
    onsearch(name){
      this.page.FireUnitName = name;
      this.page.SkipCount = 0;
      this.page.current = 1;
      this.GetDeptIndependentAlarmList();
    },
    exportdata(){
        export2Excel(this.columnList,this.tableData)
    }
  }
}
</script>

<style lang="less">
  .Independentfirealarm{
    display: flex;
    flex-direction: column;
    height: 100%;
    .headerBox{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &>:nth-child(2){
      flex: 2 0 auto;
    }
  }
</style>