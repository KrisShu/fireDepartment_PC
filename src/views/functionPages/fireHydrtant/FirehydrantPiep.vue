<template>
    <div class="FirehydrantPiep">
        <baseTable
            :columnList="columnList"
            :tableData="tableData"
            tableName="FirehydrantPiep"
        ></baseTable>
        <base-page :propPage='page' @currentChange="GetDeptPressureList"></base-page>
    </div>
</template>

<script>
export default {
  data(){
    return{
      columnList:[
        {
          prop: "deviceSn",
          label: "设施编号"
        },
        {
          prop: "status",
          label: "状态"
        },
        {
          prop: "electricQuantity",
          label: "电量",
          unit:'%'
        },
        {
          prop: "pressure",
          label: "水压",
          unit:'KPa'
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
    this.GetDeptPressureList();
  },
  methods:{
    GetDeptPressureList(){
      this.$axios.get(this.$api.GetDeptPressureList,{params:this.page}).then(res=>{
         ({items: this.tableData,totalCount: this.page.total} = res.result);
      })
    }
  }
}
</script>

<style lang="less">
    .FirehydrantPiep{
     height: 100%;
     overflow: hidden;
      &>:nth-child(1){
           height: 100%;
      }
    }
</style>