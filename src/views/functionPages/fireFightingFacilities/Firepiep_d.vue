<template>
  <div class="Firepiep_d">
      <div class="headerBox">
          <base-search @getSearchName="onsearch"></base-search>
          <base-state @screen="screen" :buttonarr="buttonarr"></base-state>
      </div>
      <baseTable
        :columnList="columnList"
        :tableData="tableData"
        tableName="Firepiep"
      ></baseTable>
      <base-page :propPage='page' @currentChange="GetDeptWaterDeviceList"></base-page>
  </div>
</template>

<script>
export default {
  data(){
    return{
        columnList:[
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
                label: "监控类型"
            },
            {
                prop: "state",
                label: "状态"
            },
            {
                prop: "currentValue",
                label: "当前数值"
            },

        ],
            tableData:[],
            buttonarr:[
                {
                    type:'primary',
                    text:'全部',
                },
                {
                    type:'success',
                    text:'正常',
                    num:0
                },
                {
                    type:'warning',
                    text:'超限',
                     num:0
                },
                {
                    type:'info',
                    text:'离线',
                     num:0
                },
            ],
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
    this.GetDeptWaterDeviceList();
    this.GetDeptWaterDeviceStateNum();
  },
  methods:{
    onsearch(name){
        this.page.FireUnitName = name;
        this.page.current = 1;
        this.page.SkipCount = 0;
        this.GetDeptWaterDeviceList();
        this.GetDeptWaterDeviceStateNum();
    },
    screen(state){
      this.page.DeviceState = state;
      this.GetDeptWaterDeviceList();
    },
    GetDeptWaterDeviceStateNum(){
        this.$axios.get(this.$api.GetDeptWaterDeviceStateNum,
            {params:this.page}
        ).then(res=>{
          console.log("GetDeptWaterDeviceStateNum",res)
              this.buttonarr[1].num = res.result[0].value
              this.buttonarr[2].num = res.result[1].value
              this.buttonarr[3].num = res.result[2].value
        })
    },
    GetDeptWaterDeviceList(){
        this.$axios.get(this.$api.GetDeptWaterDeviceList,
            {params:this.page}
        ).then(res=>{
            console.log("GetDeptWaterDeviceList",res);
            ({items: this.tableData,totalCount: this.page.total} = res.result);
        })
    }
  }
}
</script>

<style lang="less">
    .Firepiep_d{
        display: flex;
        flex-direction: column;
        height: 100%;
        .headerBox{
            display: flex;
            justify-content: space-between;
        }
        &>:nth-child(2){
            flex: 2 0 auto;
        }
    }
</style>