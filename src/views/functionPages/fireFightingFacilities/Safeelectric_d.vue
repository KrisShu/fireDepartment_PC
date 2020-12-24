<template>
    <div class="Safeelectric_d">
       <div class="headerBox">
            <base-search @getSearchName="onsearch"></base-search>
            <base-state @screen="screen" :buttonarr="buttonarr"></base-state>
        </div>
        <baseTable
          :columnList="columnList"
          :tableData="tableData"
          tableName="Safeelectric"
          @getdetails="getdetails"
          @gettrend="gettrend"
          @refresh="refresh"
          @powerOff="powerOff"
          @deletedata="deletedata"
        ></baseTable>
        <base-page :propPage='page' @currentChange="GetDeptElectricDeviceList"></base-page>
        <!--  -->
        <base-dialog title="指标趋势" :dialogfooter="false" ref="Indicatortrend">
            <div class="dialog_content">
                <div class="trend_head">
                    <p>监测指标：{{monitorItemName}}</p>
                    <div>
                        <el-date-picker
                        v-model="timeArr"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                        <el-button @click="selectTime" type="primary">查询</el-button>
                    </div>
                </div>
                <el-row v-if="trendDataObject.lstAnalogData.length">
                    <el-col :span="7">
                        <el-scrollbar style="height:400px">
                                <div class="left_list">
                                    <p v-for="item in trendDataObject.lstAnalogData" :key="item.time">
                                    <span class="time">{{item.time}}</span>
                                    <span class="gap">-</span>
                                    <span class="green" v-if="item.value<trendDataObject.max*0.8" >{{item.value}} {{trendDataObject.unit}}</span>
                                    <span class="orange" v-if="item.value<trendDataObject.max && item.value>=trendDataObject.max*0.8" >{{item.value}} {{trendDataObject.unit}}</span>
                                    <span class="red" v-if="item.value>=trendDataObject.max" >{{item.value}}{{trendDataObject.unit}}</span>
                                    </p>
                                </div>
                        </el-scrollbar>
                    </el-col>
                    <el-col :span="17">
                        <div id="trendEcharts"></div>
                    </el-col>
                </el-row>
            </div>
        </base-dialog>
        <!-- 详情 -->
        <base-dialog title="安全用电设备" ref="details" @submit="update">
            <el-form class="formBox"  ref="form" :model="Electricform" label-width="90px">
                <!-- 基本 -->
                <el-row class="baseBox" :gutter="20">
                    <el-col class="left_box" :span="4">
                        <div class="grid-content basetitle">基本</div>
                    </el-col>
                    <el-col :span="20">
                        <div class="grid-content">
                            <el-row class="pd20 one_row" :gutter="20">
                                <el-col :span="12">
                                    <p> <span>编号：</span> {{Electricform.deviceSn}}</p>
                                </el-col>
                                <el-col style="padding-left:25px" :span="12">
                                    <p><span>用户：</span>{{Electricform.fireUnitName}}</p>
                                </el-col>
                            </el-row>
                            <el-row class="pd20" :gutter="20">
                                <el-col :span="12">
                                    <el-form-item  label="联系人：" prop="contractName">
                                        <el-input  v-model="Electricform.contractName" placeholder="请输入联系人"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  label="手机号：" prop="contractPhone">
                                        <el-input  v-model="Electricform.contractPhone" placeholder="请输入手机号"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
                <!-- 参数 -->
                <el-row class="baseBox" :gutter="20">
                    <el-col class="left_box" :span="4">
                        <div class="grid-content basetitle">参数</div>
                    </el-col>
                    <el-col :span="20">
                    <div class="grid-content">
                        <!--监测类型  -->
                        <el-row class="pd20">
                            <el-col  :span="24">
                                <el-form-item  label="剩余电流：" prop="maxAmpere">
                                    <el-input v-model.number="Electricform.maxAmpere">
                                        <template slot="append">mA</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="pd20">
                            <el-col :span="24">
                                <el-form-item  label="电缆温度：" prop="phaseType">
                                    <el-radio-group v-model="Electricform.phaseType">
                                        <el-radio :label="1">单相</el-radio>
                                        <el-radio :label="2">三相</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row  v-if="Electricform.phaseType == 1" class="pd20">
                            <el-col :span="6">
                                <el-form-item  label="L：" prop="L">
                                    <el-input v-model.number="Electricform.maxL">
                                        <template slot="append">℃</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item  label="N：" prop="N">
                                    <el-input v-model.number="Electricform.maxN">
                                        <template slot="append">℃</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row  v-if="Electricform.phaseType == 2" class="pd20">
                            <el-col :span="6">
                                <el-form-item  label="L1：" prop="maxL">
                                    <el-input v-model.number="Electricform.maxL">
                                        <template slot="append">℃</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item  label="L2:" prop="maxL2">
                                    <el-input v-model.number="Electricform.maxL2">
                                        <template slot="append">℃</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item  label="L3：" prop="L3">
                                    <el-input v-model.number="Electricform.maxL3">
                                        <template slot="append">℃</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item  label="N：" prop="maxN">
                                    <el-input v-model.number="Electricform.maxN">
                                        <template slot="append">℃</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="pd20">
                            <el-col style="display:flex; align-items: center;" :span="24">
                               <span style="display:inline-block;width:90px;padding-left:10px">超限动作：</span>
                               <div style="margin-left:10px;flex:2 0 auto;">
                                    <el-checkbox v-model="Electricform.enableAlarmSwitch">自动断电</el-checkbox>
                                    <div style="display:flex;align-items: center;margin-top:10px">
                                        <el-checkbox v-model="Electricform.enableSMS">发送短信</el-checkbox>
                                        <el-input v-if="Electricform.enableSMS" style="margin-left:10px" v-model="Electricform.smsPhones" placeholder="接收人手机，多个以英文逗号隔开"></el-input>
                                    </div>
                               </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                </el-row>
            </el-form>
        </base-dialog>
    </div>
</template>

<script>
let moment = require('moment')
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
                prop: "location",
                label: "位置"
            },
            {
                prop: "state",
                label: "状态"
            },
            {
                prop:'phaseType',
                prop0:'existAmpere',
                prop7:'existTemperature',
                prop1:'l',
                prop2:'n',
                prop3:'a',
                prop4:'l1',
                prop5:'l2',
                prop6:'l3',
                label: "当前数值"
            },
            {
                prop: "Safeelectric_d",
                label: "操作"
            }
        ],
        tableData:[],
        page:{
            DeptId:this.$store.state.userInfo.deptId,
            FireUnitName:'',
            DeviceState:'',
            MaxResultCount:6,
            SkipCount:0,
            total:0,
            current:1
        },
        buttonarr:[
            {
                type:'primary',
                text:'全部',
            },
            {
                type:'success',
                text:'良好',
                num:0
            },
            {
                type:'warning',
                text:'隐患',
                num:0
            },
            {
                type:'danger',
                text:'超限',
                num:0
            },
            {
                type:'warning',
                text:'故障',
                num:0
            },
            {
                type:'info',
                text:'离线',
                num:0
            },
        ],
        refresh_message:'',
        powerOff_message:'',
        gettrenditem:{
            Sign:''
        },
        timeArr:[moment().subtract(1,'months').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')],
        monitorItemName:'',
        trendDataObject:{
            lstAnalogData:[]
        },
        Electricform:{
            enableAlarmList:[]
        },

    }
  },
  created(){
    this.GetDeptElectricDeviceList();
    this.GetDeptElectricDeviceStateNum();
  },
  methods:{
    onsearch(name){
        this.page.FireUnitName = name;
        this.page.current = 1;
        this.page.SkipCount = 0;
        this.GetDeptElectricDeviceList();
        this.GetDeptElectricDeviceStateNum();
    },
    screen(state){
        this.page.DeviceState = state;
        this.GetDeptElectricDeviceList();
    },
    GetDeptElectricDeviceStateNum(){
        this.$axios.get(this.$api.GetDeptElectricDeviceStateNum,{params:this.page}).then(res=>{
            console.log("zhuangtai",res)
            this.buttonarr[1].num = res.result[0].value
            this.buttonarr[2].num = res.result[1].value
            this.buttonarr[3].num = res.result[2].value
            this.buttonarr[4].num = res.result[3].value
            this.buttonarr[5].num = res.result[4].value
        })
    },
    GetDeptElectricDeviceList(){
      this.$axios.get(this.$api.GetDeptElectricDeviceList,
          {params:this.page}
      ).then(res=>{
          console.log("安全用电list",res);
          ({items: this.tableData,totalCount: this.page.total} = res.result);
      })
    },
    //获取趋势
    gettrend(item,flag){
        // console.log(item,flag)
        this.monitorItemName = flag
        if(flag == 'A'){
            this.monitorItemName = '剩余电流'
        }
        this.gettrenditem.DeviceId  = item.deviceId
        this.gettrenditem.Sign   = flag
        this.gettrenditem.Start  = moment().subtract(1,'months').format('YYYY-MM-DD');
        this.gettrenditem.End  =  moment().format('YYYY-MM-DD')
        console.log("this.gettrenditem",this.gettrenditem)
        this.$refs.Indicatortrend.DialogVisible = true;
        this.GetRecordElectric(this.gettrenditem)
    },
    //选择时间
    selectTime(){
        // console.log(this.timeArr);
        this.gettrenditem.Start  =this.timeArr[0]
        this.gettrenditem.End  =  this.timeArr[1]
        this.GetRecordElectric(this.gettrenditem);
    },
    //
    GetRecordElectric(item){
        this.$axios.get(this.$api.GetRecordElectric,{params:item}).then(res=>{
            // console.log("GetRecordElectric",res)
            // this.trendData = res.result.lstAnalogData;
            let timevalue = []
            let datavalue = []

            for(let arr of  res.result.lstAnalogData){
                arr.time = this.dealTime(arr.time)
                timevalue.push(arr.time)
                datavalue.push(arr.value)
            }
            this.trendDataObject = res.result;
           
            //数据反转
            timevalue.reverse()
            datavalue.reverse()
            if(res.result.lstAnalogData.length>0){
                this.$nextTick(()=>{
                  this.initEcharts(timevalue,datavalue)
                })
            }
        })
    },
    dealTime:(val)=>{
        var str = val.split('T');
        var str2 = str[1].split(".")
        var timestr = str[0] +" "+ str2[0]
        return timestr;
    },
    initEcharts(timevalue,datavalue){
        let trendEcharts = this.$echarts.init(document.getElementById('trendEcharts'));
        trendEcharts.setOption({
            legend:{
                top:'top'
            },
            grid:{
                top:'20'
            },
            xAxis: {//x轴
                type: 'category',
                data: timevalue,
                axisLabel:{
                    showMaxLabel: true,//是否显示最大 tick 的 label。
                    showMinLabel: true,//是否显示最小 tick 的 label。
                    formatter:function(value){//坐标文字处理现实
                        var str = value.split(" ");
                        var addstr ="";
                        addstr = str[0]+"\n"+str[1]  
                        return addstr
                        /* if(timevalue.length>6){
                            return timevalue[idx]
                        }else{
                        return value
                        } */
                    }
                },
                axisTick: {
                    alignWithLabel: true,
                },
                axisLine:{//设置轴线的属性
                    lineStyle:{
                        color:'white',
                        width:4,//这里是为了突出显示加上的
                    }
                } 
            },
            yAxis: {
                type: 'value',
                axisLine:{
                    lineStyle:{
                        color:'white',
                        width:4,//这里是为了突出显示加上的
                    }
                } 

            },
            dataZoom: [
                {
                    startValue: timevalue[0],
                    endValue:timevalue[timevalue.length-1],
                    left:"center",                           
                    right:"auto",
                    bottom:"0",     
                },
                {
                    type: 'inside'
                }
            ],
            series: [{
                data:datavalue,
                type: 'line',
                lineStyle:{
                    width:4
                },
            }]

        });
    },
    //获取详情
    getdetails(item){
        // console.log("获取的详情",item)
        this.$refs.details.DialogVisible = true
        this.GetFireElectricDevicePara(item.deviceId)
    },
    //获取详情
    GetFireElectricDevicePara(deviceId){
        this.$axios.get(this.$api.GetFireElectricDevicePara,{params:{deviceId}}).then(res=>{
            console.log("res",res);
            this.Electricform = res.result
        })
    },
    //更新提交
    update(){
        if(!this.Electricform.contractName || !this.Electricform.contractPhone){
            this.$message('请完善基本信息');
            return
        }
        if(this.Electricform.maxAmpere<=0 || this.Electricform.maxL<=0 || this.Electricform.maxN <=0){
            this.$message('范围数值必须大于0');
            return
        }
       
        if(this.Electricform.enableAlarmSwitch){
            if(this.Electricform.enableAlarmList.indexOf('自动断电') == -1){
                this.Electricform.enableAlarmList.push('自动断电')
            }
            
        }else{
            if(this.Electricform.enableAlarmList.indexOf('自动断电') != -1){
                let index = this.Electricform.enableAlarmList.indexOf('自动断电');
                this.Electricform.enableAlarmList.splice(index,1)
            }
        }
        if(this.Electricform.enableSMS){
            if(this.Electricform.enableAlarmList.indexOf('发送短信') == -1){
                this.Electricform.enableAlarmList.push('发送短信')
            }
        }else{
            if(this.Electricform.enableAlarmList.indexOf('发送短信') != -1){
                let index = this.Electricform.enableAlarmList.indexOf('发送短信');
                this.Electricform.enableAlarmList.splice(index,1)
            }
        }
        console.log("this.Electricform",this.Electricform)
        this.$axios.put(this.$api.UpdateFireElectricDevicePara,this.Electricform).then(()=>{
            // console.log("更新数据成功",res)
            this.$message({
                message: '设施参数提交成功',
                type: 'success'
            });
             this.$refs.details.DialogVisible = false
        }).catch(err=>{
            console.log("err",err)
        })
    },
    //数值刷新
    refresh(items){
        this.refresh_message = this.$message({
            message: '刷新数值中......',
            duration: 0,
            type: 'success'
        });
        let electricDeviceId = items.deviceId;
        this.$axios.get(this.$api.GetSingleElectricDeviceData,
            {params:{electricDeviceId}}
        ).then(res=>{
            this.refresh_message.close();
            if(res.result.result){
                this.$message({
                    message: '刷新数值成功!',
                    type: 'success',
                    showClose: true,
                    duration:3000
                });
                this.tableData.forEach((item,index)=>{
                    if(item.deviceId == electricDeviceId){
                    this.$set(this.tableList[index],'state',res.result.deviceData.state)
                    this.$set(this.tableData[index],'l',res.result.deviceData.l)
                    this.$set(this.tableData[index],'l1',res.result.deviceData.l1)
                    this.$set(this.tableData[index],'l2',res.result.deviceData.l2)
                    this.$set(this.tableData[index],'l3',res.result.deviceData.l3)
                    this.$set(this.tableData[index],'n',res.result.deviceData.n)
                    this.$set(this.tableData[index],'a',res.result.deviceData.a)
                    }
                })
            }else{
                this.$message({
                    message: '刷新数值超时，请稍后再试',
                    type: 'warning',
                    showClose: true,
                    duration:5000
                });
            }
        })
    },
    //断电
    powerOff(items){
        // console.log("断电",items)
        this.powerOff_message = this.$message({
            message: '发送断电信号中......',
            duration: 0,
            type: 'success'
        });
        let electricDeviceId = items.deviceId;
        let form =  new FormData();
        form.append("electricDeviceId", electricDeviceId);
        this.$axios.post(this.$api.BreakoffPower,form).then(()=>{
            this.powerOff_message.close();
            this.$message({
                message: '已发送断电指令',
                type: 'success',
                showClose: true,
                duration:5000
            });
        })
    },
    //删除
    deletedata(items){
        let DeviceId = items.deviceId
        this.$axios.delete(this.$api.DeleteFireElectricDevice,{params:{DeviceId}}).then(()=>{
            this.$message({
                message: '删除数据成功',
                type: 'success'
            });
            this.GetDeptElectricDeviceList()
        }).catch(err=>{
            console.log("删除失败",err)
            this.$message({
                message: err.data.error.message,
                type: 'error'
            });
        })
    }
  }

}
</script>

<style lang="less">
  .Safeelectric_d{
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
        .dialog_content{
            width: 100%;
            height: 100%;
            .trend_head{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .el-date-editor{
                    input{
                        background: #304F87;
                        color: #fff;
                    }
                }
            }
            .left_list{
                width: 100%;
                p{
                    line-height: 2;
                    color: white;
                    .gap{
                        display: inline-block;
                        margin:0px 8px;
                    }
                    .green{
                        color: rgb(44, 177, 44);
                    }
                    .orange{
                        color: orange;
                    }
                    .red{
                        color: red;
                    }
                
                }
            }
            .el-scrollbar__wrap{
                overflow-x: hidden;
            }
            #trendEcharts{
                width: 100%;
                height:400px;
            }
        }
        .formBox{
            width: 100%;
            .baseBox{
                display: flex;
                align-items: center;
                border: 1px dotted white;
                border-radius: 4px;
                padding: 10px 0px;
                .left_box{
                    height: 100px;
                    line-height: 100px;
                    border-right:1px dotted rgb(196, 194, 194);
                    text-align: center;
                }

                &:nth-of-type(2){
                    margin: 20px 0px;
                    .left_box{
                        height: 200px;
                        line-height: 200px;
                    }
                }
                .one_row{
                    margin: 20px 0px;
                    padding-left: 22px;
                    p{
                        span{
                            display: inline-block;
                            width: 80px;
                        }
                    }
                }
                .el-input-group__append{
                    padding: 0 6px;
                    background: #405C8F;
                    border: none;
                    color: whitesmoke;
                }
                .el-input-group{
                    width: 100px;
                }
            }
           
            .el-checkbox{
                .el-checkbox__label{
                    color:#fff;
                }
            }
            
            .el-radio-group{
                .el-radio__label{
                    color: #fff;
                }
            }
            input::placeholder{
                color: #999898;
            }
        }
  }
</style>