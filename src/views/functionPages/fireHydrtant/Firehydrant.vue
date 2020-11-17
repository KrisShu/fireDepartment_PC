<template>
  <div class="firehydrant">
      <baseTable
          :columnList="columnList"
          :tableData="tableData"
          tableName="firehydrant"
      ></baseTable>
      <base-page :propPage='page' @currentChange="GetDeptHydrantList"></base-page>
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
    this.GetDeptHydrantList();
  },
  methods:{
    GetDeptHydrantList(){
      this.$axios.get(this.$api.GetDeptHydrantList,{params:this.page}).then(res=>{
         ({items: this.tableData,totalCount: this.page.total} = res.result);
      })
    }
  }
}
</script>

<style lang="less">
  .firehydrant{
     height: 100%;
     overflow: hidden;
      &>:nth-child(1){
           height: 100%;
      }
  }
</style>