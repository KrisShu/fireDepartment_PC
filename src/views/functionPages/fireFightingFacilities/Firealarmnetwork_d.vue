<template>
  <div class="Firealarmnetwork_d">
        <div class="headerBox">
            <base-search @getSearchName="onsearch"></base-search>
            <base-state @screen="screen" :buttonarr="buttonarr"></base-state>
        </div>
        <baseTable
          :columnList="columnList"
          :tableData="tableData"
          tableName="Firealarmnetwork_d"
          @getSlotDetail="getSlotDetail"
        ></baseTable>
      <base-page :propPage='page' @currentChange="GetDeptFireAlarmDeviceList"></base-page>
      <base-dialog :dialogfooter="false" :title="title" ref="basedialog">
        <div class="top_tip">
            <span>地址:{{address}}</span>
            <span>总数量：{{page2.total}}</span>
        </div>
         <baseTable
          :columnList="columnList2"
          :tableData="tableData2"
        ></baseTable>
        <base-page :propPage='page2' @currentChange="getSlotDetail"></base-page>
      </base-dialog>
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
                    prop: "deviceSn",
                    label: "设备编号"
                },
                {
                    prop: "fireUnitArchitectureName",
                    label: "所在建筑"
                },
                {
                    prop: "state",
                    label: "状态"
                },
                {
                    prop: "netDetectorNum",
                    label: "联网部件数量"
                },
                {
                    prop: "faultDetectorNum",
                    label: "故障部件数量",
                    slot: "GetFireAlarmFaultDetectorList"
                },
                {
                    prop: "detectorFaultRate",
                    label: "部件故障率"
                },
                {
                    prop: "alarmNum30Day",
                    label: "30天火警数量",
                    slot: "GetFireAlarm30DayList"
                },
                {
                    prop: "highAlarmDetectorNum",
                    label: "高频部件数量",
                    slot: "GetFireAlarmHighList"
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
                    text:'在线',
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
            },
            title:'',
            page2:{
                fireAlarmDeviceId:'',
                MaxResultCount:6,
                SkipCount:0,
                total:0,
                current:1  
            },
            columnList2:[],
            FaultList:[
                {
                label:"部件地址",
                prop:'identify'
                },
                {
                label:"部件类型",
                prop:'detectorTypeName'
                },
                {
                label:"安装位置",
                prop:'location'
                },
                {
                label:"故障时间",
                prop:'faultTime'  
                }
            ],
            alarm30List:[
                {
                label:"部件地址",
                prop:'identify'
                },
                {
                label:"部件类型",
                prop:'detectorTypeName'
                },
                
                {
                label:"安装位置",
                prop:'location'
                },
                {
                label:"报警时间",
                prop:'alarmTime'
                }
            ],
            highfireList:[
                {
                label:"部件地址",
                prop:'identify'
                },
                {
                label:"部件类型",
                prop:'detectorTypeName'
                },
                {
                label:"安装位置",
                prop:'location'
                },
                {
                label:"30天平均每天报警",
                prop:'alarmNum'
                }
            ],

            tableData2:[],
            slotName:'',
            address:'',

        }
    },
    created(){
        this.GetDeptFireAlarmDeviceStateNum();
        this.GetDeptFireAlarmDeviceList();
    },
    methods:{
        //获取状态数量
        GetDeptFireAlarmDeviceStateNum(){
            this.$axios.get(this.$api.GetDeptFireAlarmDeviceStateNum,
                {params:this.page}
            ).then(res=>{
                console.log("获取状态数量",res)
                this.buttonarr[1].num = res.result[0].value
                this.buttonarr[2].num = res.result[1].value
            })
        },
        screen(state){
            this.page.DeviceState = state;
            this.GetDeptFireAlarmDeviceList();
        },
        onsearch(name){
            this.page.FireUnitName = name;
            this.page.current = 1;
            this.page.SkipCount = 0;
            this.GetDeptFireAlarmDeviceList();
            this.GetDeptFireAlarmDeviceStateNum();
        },
        //获取列表数据
        GetDeptFireAlarmDeviceList(){
            this.$axios.get(this.$api.GetDeptFireAlarmDeviceList,
                {params:this.page}
            ).then(res=>{
                console.log("火警联网list",res);
                ({items: this.tableData,totalCount: this.page.total} = res.result);
            })
        },
        getSlotDetail(item,text){
            // console.log(item,text);
            // console.log("arguments",arguments)
            if(arguments.length>1){
                this.address = item.fireUnitName;
                this.page2.fireAlarmDeviceId = item.deviceId
                this.$refs.basedialog.DialogVisible = true;
                this.page2.current = 1;
                this.page2.SkipCount = 0;
                this.slotName = text;
            }

            const APILIST = {
                //  故障部件数量
                GetFireAlarmFaultDetectorList: {
                    url: this.$api.GetFireAlarmFaultDetectorList,
                    title: "故障部件列表",
                    columnList:this.FaultList
                },
                //  最近30天报警次数
                GetFireAlarm30DayList: {
                    url: this.$api.GetFireAlarm30DayList,
                    title: "最近30天报警列表",
                    columnList:this.alarm30List
                },
                //  高频报警部件
                GetFireAlarmHighList: {
                    url: this.$api.GetFireAlarmHighList,
                    title: "高频部件列表",
                    columnList:this.highfireList
                }
            };
            this.title = APILIST[this.slotName].title;
            this.columnList2 = APILIST[this.slotName].columnList;

            console.log("this.page2",this.page2)
            this.$axios.get(APILIST[this.slotName].url,{params:this.page2}).then(res=>{
                console.log("res",res);
                ({items: this.tableData2,totalCount: this.page2.total} = res.result);
            })
        }
    }
}
</script>

<style lang="less">
    .Firealarmnetwork_d{
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
        .el-dialog__body{
            padding: 0;
            .top_tip{
                padding: 14px;
                display: flex;
                justify-content: space-between;
            }
            .pageBox{
                padding: 6px;
            }
        }
    }
</style>