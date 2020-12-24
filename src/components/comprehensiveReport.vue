<template>
  <el-dialog id="printBox" class="unit-report" :visible.sync="show" width="30%">
    <!--startprint-->
    <div id="comprehensiveReport">
        <div class="top display">
            <div class="top_left">
                智慧消防数据综合报告 
                <el-button type="success" @click="dayin">打印</el-button>
            </div>
            <div class="top_right display">
                <div class="block">
                    <span>日期：</span>
                    <el-date-picker
                    v-model="timeData"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button @click="select" type="primary">查询</el-button>
                </div>
                <a href="#" @click="perMonth">查询上月</a>
            </div>
        </div>

        <div class="title">
          <h2>{{$store.state.userInfo.areaName}}智慧消防试运行报告</h2>
          <p>
            报告统计时段:<span class="time">{{infos.beginDate}}至{{infos.endDate}}</span>
          </p>
        </div>
      
        <!-- 内容 -->
        <div class="contentBox">
            <!-- 接入单位统计 -->
            <div class="allfireunit contentIem">
              <h3>◆接入单位统计</h3>
              <p class="tips">共计接入防火单位<span class="numSpan"> {{allfireunitNum}}</span>家，分别是：</p>
              <table>
                <tr>
                    <th>单位名称</th>
                    <th>单位地址</th>
                </tr>
                <tr v-for="(arr,index) in allfireunitList" :key="index">
                  <td>{{arr.fireUnitName}}</td>
                  <td>{{arr.address}}</td>
                </tr>
              </table>
              <p>已接入单位类型包括：高层小区、商业综合体、九小场所、市场、学校、景区和其它，各类型占比如下：</p>
            
              <div id="trendEcharts"></div>
              <img class="echartsImg" :src="echartsImg" alt="">

             
            </div>
            <!-- 接入设备 -->
            <div class="contentIem">
                <h3>◆接入设备统计</h3>
                <p class="tips">安装智慧消防设备数量共计<span class="numSpan"> {{alldeviceNum}}</span>台，各设备类型数量分别为：</p>
                <table>
                  <tr>
                      <th>设备类型</th>
                      <th>安装数量</th>
                  </tr>
                  <tr v-for="(arr,index) in alldeviceList.listKey" :key="index">
                    <td>{{arr}}</td>
                    <td>{{alldeviceList.listValue[index]}}</td>
                  </tr>
              </table>
            </div>
             <!-- 发现警情统计 -->
            <div class="contentIem">
                <h3>◆发现警情统计</h3>
                <p class="tips">报告统计时段内，发现火警联网警情共计：<span class="numSpan">{{FireAlarmForReport.num}}</span>次，排列前三的防火单位是：</p>
                <table>
                  <tr>
                      <th>防火单位</th>
                      <th>火警联网警情数量</th>
                  </tr>
                  <tr v-for="(arr,index) in FireAlarmForReport.alarmList" :key="index">
                    <td>{{arr.key}}</td>
                    <td>{{arr.value}}</td>
                  </tr>
              </table>
              <p class="tips">报告统计时段内，发现安全用电警情共计：<span class="numSpan"> {{AlarmForReport.num}}</span>次，排列前三的防火单位是：</p>
              <table>
                  <tr>
                      <th>防火单位</th>
                      <th>安全用电警情数量</th>
                  </tr>
                   <tr v-for="(arr,index) in AlarmForReport.alarmList" :key="index">
                    <td>{{arr.key}}</td>
                    <td>{{arr.value}}</td>
                  </tr>
              </table>
              <p class="tips">报告统计时段内，发现终端部件（感烟式火灾探测器等）故障数量共计：<span class="numSpan"> {{FireFaultForReport.num}}</span>个，排列前三的防火单位是：</p>
              <table>
                  <tr>
                      <th>防火单位</th>
                      <th>终端部件故障数量</th>
                  </tr>
                  <tr v-for="(arr,index) in FireFaultForReport.alarmList" :key="index">
                    <td>{{arr.key}}</td>
                    <td>{{arr.value}}</td>
                  </tr>
              </table>
            </div>
        </div>
    </div>
  </el-dialog>                                                                                                                                                       
</template>

<script>
/**
 *  作者：0          时间：2019/7/10 11:51
 *  1,常量从js文件引入，不要定义魔术变量
 */
let moment = require("moment");
import axios from "axios";
export default {
  name: "comprehensiveReport",
  components: {},
  props: {},
  data() {
    return {
      show: false,
      infos:{},
      timeData:[],
      loading:false,      
      echartsImg:{}, //echarts转换的base64图片
      areaId:this.$store.state.userInfo.areaId,    
      allfireunitNum:'',//总共接入防火单的数量
      allfireunitList:'',//总共接入防火单的列表  
      typeRateData:{},//整体比例数据
      alldeviceList:'',//接入整体设备数据
      alldeviceNum:0,
      FireAlarmForReport:'',//发现火警联网警情
      AlarmForReport:'',
      FireFaultForReport:'',


    };
  },
  computed: {},
  watch: {},
  created() {
     
      let lastmonthstartDate = moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD');
      let lastmonthendDate = moment().month(moment().month() - 1).endOf('month').format('YYYY-MM-DD');
      this.timeData=[ lastmonthstartDate,lastmonthendDate];
      this.infos.beginDate = this.timeData[0]
      this.infos.endDate =  this.timeData[1]

      this.allrequest();
  },
  mounted() {
   
  },
  methods: {

    async EchartsToImg(){
      let imgsrc = await this.initEcharts();
      var echartsimg =imgsrc.getDataURL()//图片转码
      this.echartsImg = echartsimg
    },
    initEcharts(){
        return new Promise((resolve)=> {
            let trendEcharts = this.$echarts.init(document.getElementById('trendEcharts'));
            trendEcharts.setOption({
                  
                  tooltip: {
                      trigger: 'item',
                      formatter: '{a} <br/>{b} : {c} ({d}%)'
                  },
                  series: [
                      {
                          name: '访问来源',
                          type: 'pie',
                          radius: '55%',
                          center: ['50%', '40%'],
                          data: this.typeRateData,
                          label: {//饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，label选项在 ECharts 2.x 中放置于itemStyle下，在 ECharts 3 中为了让整个配置项结构更扁平合理，label 被拿出来跟 itemStyle 平级，并且跟 itemStyle 一样拥有 emphasis 状态。
                            formatter: '{b}: {d}%'
                          },
                          emphasis: {
                              itemStyle: {
                                  shadowBlur: 10,
                                  shadowOffsetX: 0,
                                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                              }
                          }
                      }
                  ]
            })

            setTimeout(()=>{
              resolve(trendEcharts)
            },1000)
           
        })
            
          
    },
    //打印按钮
    dayin(){
      let comprehensiveReport =  document.getElementById('comprehensiveReport');
      let top = document.getElementsByClassName('top')[0];
      comprehensiveReport.removeChild(top);
      let printHtml = document.getElementById('comprehensiveReport').innerHTML
      window.document.body.innerHTML = printHtml;
      window.print();
      window.location.reload();
    },
    //选择查询
    select(){
        this.infos.beginDate = this.timeData[0]
        this.infos.endDate =  this.timeData[1]

        axios.all([this.GetFireAlarmForReport(),this.GetElecAlarmForReport(),this.GetFireFaultForReport()])
        .then(axios.spread((res1,res2,res3)=>{
          this.FireAlarmForReport = res1.result;//发现火警联网警情
          this.AlarmForReport = res2.result;//发现火警联网警情
          this.FireFaultForReport = res3.result;//发现火警联网警情
        }))
        

    },
    //上一个月
    perMonth(){
          let lastmonthstartDate = moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD');
          let lastmonthendDate = moment().month(moment().month() - 1).endOf('month').format('YYYY-MM-DD');
          this.timeData=[ lastmonthstartDate,lastmonthendDate];
          // console.log("timeData",this.timeData)
          this.infos.beginDate =  lastmonthstartDate
          this.infos.endDate =  lastmonthendDate

          axios.all([this.GetFireAlarmForReport(),this.GetElecAlarmForReport(),this.GetFireFaultForReport()])
          .then(axios.spread((res1,res2,res3)=>{
            this.FireAlarmForReport = res1.result;//发现火警联网警情
            this.AlarmForReport = res2.result;//发现火警联网警情
            this.FireFaultForReport = res3.result;//发现火警联网警情
          }))
         
    },

    GetFireUnitNumber(){
      return this.$axios.get(this.$api.GetFireUnitNumber,{params:{areaId:this.areaId}})
    },
    GetFireUnitListForReport(){
      return this.$axios.get(this.$api.GetFireUnitListForReport,{params:{areaId:this.areaId}})
    },
    GetFireUnitTypePieChat(){
      return this.$axios.get(this.$api.GetFireUnitTypePieChat,{params:{areaId:this.areaId}})
    },
    GetNetDeviceNumber(){
       return this.$axios.get(this.$api.GetNetDeviceNumber,{params:{areaId:this.areaId}})
    },
    GetFireAlarmForReport(){
      return this.$axios.get(this.$api.GetFireAlarmForReport,
        {params:{areaId:this.areaId,StartDate:this.infos.beginDate,endTime:this.infos.endDate}}
      )
    },                                                    
    GetElecAlarmForReport(){
       return this.$axios.get(this.$api.GetElecAlarmForReport,
        {params:{areaId:this.areaId,StartDate:this.infos.beginDate,endTime:this.infos.endDate}}
       )
    },
    GetFireFaultForReport(){
      return this.$axios.get(this.$api.GetFireFaultForReport,
        {params:{areaId:this.areaId,StartDate:this.infos.beginDate,endTime:this.infos.endDate}}
      )
    },
    allrequest(){
      axios.all([this.GetFireUnitNumber(),this.GetFireUnitListForReport(),this.GetFireUnitTypePieChat(),
        this.GetNetDeviceNumber(),this.GetFireAlarmForReport(),this.GetElecAlarmForReport(),this.GetFireFaultForReport()
      ])
      .then(axios.spread((res1,res2,res3,res4,res5,res6,res7)=>{
        console.log("s",res1,res2,res3,res4,res5,res6,res7);
        this.allfireunitNum = res1.result;
        this.allfireunitList = res2.result;
        this.typeRateData = res3.result;
        this.alldeviceList = res4.result;
        for(let arr of res4.result.listValue){
          this.alldeviceNum += arr
        }
        this.FireAlarmForReport = res5.result;//发现火警联网警情
        this.AlarmForReport = res6.result;//发现火警联网警情
        this.FireFaultForReport = res7.result;//发现火警联网警情

      }))


     
    }
    

  }
}
</script>

<style lang="less">
.unit-report {
  .el-dialog {
    margin: 0 auto !important;
    min-height: 100vh;
    width: 915px !important;
    background: white !important;
    .el-dialog__body {
      flex: 2 0 auto;
      padding: 0 !important;
    }
    .el-dialog__header {
      display: none;
    }
    .el-form-item__label {
      color: #606266 !important;
    }
  }
  #comprehensiveReport{
    color: #232323;
    padding: 20px;
    .display{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .top{
            color: 232323;
            margin-bottom: 20px;
            .top_left{
                font-size: 18px;
            }
            a{
                // color: rgb(78, 189, 115);
                color:  #167fc1;
            }
            a:nth-of-type(1){
                margin: 0px 20px;
            }
            .el-date-editor{
              width: 250px;
              border: rgb(201, 197, 197) 1px solid !important;

              margin-right: 10px;
            }
            .el-input__inner {
                  background-color: #ffffff !important;
            }
    }
    .title{
        width: 100%;
        text-align: center;
        margin-bottom: 40px;
        h2{
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
           
        }
    }
    .contentBox{
      .contentIem{
        h3{
          text-align: left;
          font-size: 16px;
          font-weight: bold;
         margin-bottom: 10px;

        }
        .tips{
          text-align: left;
          .numSpan{
            font-size: 16px;
            font-weight: bold;
          }
         
        }
       
        table{
         width: 90%;
         margin: 20px;
          th{
            font-weight: bold;
             width: 50%;
          }
          th,td{
            border: 1px black solid ;
            line-height: 30px;
            font-size: 16px;
          }
        }
          #trendEcharts{
                width: 100%;
                height:400px;
          }
          .echartsImg{
            display: none;
          }
      }
    }
         

    
  }
    
        
}

  @media print{  
    .title{
        width: 100%;
        text-align: center;
        margin-bottom: 40px;
        h2{
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
           
        }
    }
        .contentBox{
          .contentIem{
            h3{
              text-align: left;
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .numSpan{
              font-size: 16px;
              font-weight: bold;
            }
            table{
              width: 90%;
              margin: 20px;
              tr{
                th{
                  font-weight: bold;
                  width: 50%;
                }
              }
              
              th,td{
                border: 1px black solid ;
                line-height: 30px;
                font-size: 16px;
                text-align: center;
              }
            }
            #trendEcharts{
                  display: none;
            }
          }
        }
         
      
      .echartsImg{
        width: 800px;
        // height: 400px;
        display: block;
      }
  }  
</style>
