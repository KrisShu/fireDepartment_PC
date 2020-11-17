<template>
  <div class="fireUnit">
        <div class="headerBox">
            <base-search @getSearchName="onsearch"></base-search>
        </div>
        <baseTable
          :columnList="columnList"
          :tableData="tableData"
          tableName="fireUnit"
          @fireunitCard="fireunitCard"
          @datareport="datareport"
        ></baseTable>
      <base-page :propPage='page' @currentChange="GetDeptFireUnitList"></base-page>

      <!-- 单位熟悉卡 -->
      <baseInformation ref="baseInformation"></baseInformation>
      <!-- 智慧消防报告 -->
      <MapUnitReport ref="MapUnitReport"></MapUnitReport>
  </div>
</template>

<script>
import baseInformation from '../../../components/baseInformation'
import MapUnitReport from '../../../components/MapUnitReport.vue'
export default {
  components:{
    baseInformation,
    MapUnitReport
  },
  data(){
    return{
      columnList:[
          {
            prop: "fireUnitName",
            label: "防火单位"
          },
          {
            prop: "areaName",
            label: "所属区域"
          },
          {
            prop: "contractUserName",
            label: "联系人"
          },
          {
            prop: "contractPhone",
            label: "联系电话"
          },
          {
            prop: "netTime",
            label: "联网时间"
          },
          {
            label:'操作'
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
    this.GetDeptFireUnitList();
  },
  methods:{
    onsearch(name){
      this.page.FireUnitName = name;
      this.page.SkipCount = 0;
      this.page.current = 1;
      this.GetDeptFireUnitList();
    },
    //获取列表
    GetDeptFireUnitList(){
            this.$axios.get(this.$api.GetDeptFireUnitList,
                {params:this.page}
            ).then(res=>{
                // console.log("火警联网list",res);
                ({items: this.tableData,totalCount: this.page.total} = res.result);
            })
    },
    //单位熟悉卡
    fireunitCard(item){
      console.log("单位熟悉卡",item)
      this.$refs.baseInformation.dialogVisible = true;
      this.$refs.baseInformation.GetFireUnitCard(item.fireUnitId);
    },
    //智慧数据报告
    datareport(item){
      this.$refs.MapUnitReport.perWeek(item.fireUnitId)
    }
  }
}
</script>

<style lang="less">
  .fireUnit{
      display: flex;
      flex-direction: column;
      height: 100%;
      .headerBox{
         text-align: left;
      }
      &>:nth-child(2){
          flex: 2 0 auto;
      }
  }
</style>