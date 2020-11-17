<template>
    <div class="Policeincident">
        <baseTable
            :columnList="columnList"
            :tableData="tableData"
            tableName="Policeincident"
        ></baseTable>
        <base-page :propPage='page' @currentChange="GetDeptHydrantAlarmList"></base-page>
    </div>
</template>

<script>
export default {
  data(){
    return{
      columnList:[
        {
          prop: "creationTime",
          label: "报警时间"
        },
        {
          prop: "deviceTypeName",
          label: "设备类型"
        },
        {
          prop: "deviceSn",
          label: "设备编号"
        },
        {
          prop: "alarmEvent",
          label: "警情事件"
        },
        {
          prop: "handleStatus",
          label: "处理状态"
        }
      ],
      tableData:[],   
      page:{
          AreaId :this.$store.state.userInfo.areaId,
          MaxResultCount:10,
          SkipCount:0,
          total:0,
          current:1
      }
    }
  }, 
  created(){
    this.GetDeptHydrantAlarmList();
  },
  methods:{
    GetDeptHydrantAlarmList(){
      this.$axios.get(this.$api.GetDeptHydrantAlarmList,{params:this.page}).then(res=>{
         ({items: this.tableData,totalCount: this.page.total} = res.result);
      })
    }
  }
}
</script>

<style lang="less">
    .Policeincident{
     height: 100%;
     overflow: hidden;
      &>:nth-child(1){
           height: 100%;
      }
    }
</style>