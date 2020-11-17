<template>
  <el-dialog id="printBox" class="unit-report" :visible.sync="show" width="30%">
    <!--startprint-->
    <div id="diaBody">
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
                <a href="#" @click="perWeek(false)">查询上周</a>
                <a href="#" @click="perMonth">查询上月</a>
            </div>
        </div>
        <p class="fireUnitName">防火单位：{{fireUnitName}}</p>
        <!--  -->
        <div 
          class="dataBlock"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
           
                <el-collapse v-model="activeNames" >
                    <el-collapse-item title="设施设备数据" name="1">
                        <el-collapse v-model="activeNames" class="two">
                              <el-collapse-item 
                                  v-for="(arr,index) in collapseIemsOne" 
                                  :key="index"
                                  :name="arr.name"
                                  :disabled="arr.disabled"
                              >
                                <template slot="title">
                                    <div class="titlebox display">
                                        <span>{{arr.title}}</span>
                                        <i v-if="arr.disabled" >暂无数据</i>
                                    </div>
                                    
                                </template>
                                <div class="content">
                                    <div> 
                                        <p class="content_title"> <span> ◆</span>当前数据</p>
                                        <p :class="arr.title =='其他消防设施' ?'pdb':'' " v-html="arr.data.nowData"></p>
                                    </div>
                                    <div v-if="arr.title != '其他消防设施'"> 
                                        <p class="content_title"><span> ◆</span>事件数据（{{content_title_time}}） </p>
                                        <p style="padding-bottom: 20px;" v-html="arr.data.eventData"></p>
                                    </div>
                                </div>
                              </el-collapse-item>
                        </el-collapse>
                    </el-collapse-item>
                    <el-collapse-item title="人工作业数据" name="2">
                        <div class="content">
                            <div> 
                                <p class="content_title"> <span> ◆</span>当前数据</p>
                                <p v-html="personData.nowData"></p>
                            </div>
                            <div> 
                                <p class="content_title"><span> ◆</span>事件数据（{{content_title_time}}）</p>
                                <p style="padding-bottom: 20px;" v-html="personData.eventData"></p>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
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
export default {
  name: "UnitReport",
  components: {},
  props: {},
  data() {
    return {
      show: false,
      timeData:[],
      loading:false,
      activeNames: ['1'],
      collapseIemsOne:[
          {
              name:'1_1',
              title:'火灾自动报警联网设施',
              disabled:false,
              data:''
          },
          {
              name:'1_2',
              title:'独立式火警联网设施',
              disabled:false,
              data:''
          },
          {
              name:'1_3',
              title:'电气火灾防护设施',
              disabled:false,
              data:''
          },
          {
              name:'1_4',
              title:'消防管网远程监控设施',
              disabled:false,
              data:''
          },
          {
              name:'1_5',
              title:'AI智能分析设施',
              disabled:false,
              data:''
          },
          {
              name:'1_6',
              title:'其他消防设施',
              disabled:false,
              data:''
          }
      ],
      fireUnitName:'',
      personData:'',
      infos:{
        fireUnitId:'',
        beginDate:'',
        endDate:'',
      },
      content_title_time:'',
      listDeviceData:[],

    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    GetFireUnitReport(){
            this.show = true;
            this.loading = true;
            this.$axios.get(this.$api.GetFireUnitReport,{params:this.infos}).then(res=>{
                console.log("请求结果",res);
                this.loading = false;
                this.fireUnitName = res.result.fireUnitName;
                this.content_title_time = res.result.dateRange
                let listDeviceData = res.result.listDeviceData;
                this.personData = res.result.personData;
                for(let x = 0;x<this.collapseIemsOne.length;x++){
                    if(listDeviceData[x].deviceData){
                        this.collapseIemsOne[x].disabled = false
                        this.collapseIemsOne[x].data = listDeviceData[x].deviceData
                    }else{
                        this.collapseIemsOne[x].disabled = true
                    }
                }
                this.activeNames = ['1','2'];//调用钱展开所有节点
                for(let arr of this.collapseIemsOne){
                    if(!arr.disabled){
                        this.activeNames.push(arr.name)
                    }
                }
            }).catch(err=>{
                console.log(err)
            })
    },
    //打印按钮
    dayin(){
      let diaBody =  document.getElementById('diaBody');
      let top = document.getElementsByClassName('top')[0];
            
      diaBody.removeChild(top);
      let topdiv = `<div class="topdiv"><span class="title">防火单位智慧消防数据综合报告</span><span class="time">${this.infos.beginDate}至${this.infos.endDate}</span></div>`
      $('#diaBody').prepend(topdiv); //将新创建的div节点插入到nav容器的内容顶部
      let printHtml = document.getElementById('diaBody').innerHTML
      window.document.body.innerHTML = printHtml;
      window.print();
      window.location.reload();
    },
    //选择查询
    select(){
        this.infos.beginDate = this.timeData[0]
        this.infos.endDate =  this.timeData[1];
        this.activeNames=[]
        this.GetFireUnitReport()
    },
    //上一周
    perWeek(fID){
      console.log("perWeek_fID",fID)
      if(fID){
        this.infos.fireUnitId = fID
        console.log("传参点击")
      }
      let lastweekstartDate = moment().week(moment().week() - 1).startOf('week').add(1,'days').format('YYYY-MM-DD');
      let lastweekendDate = moment().week(moment().week() - 1).endOf('week').add(1,'days').format('YYYY-MM-DD');
      this.timeData=[ lastweekstartDate,lastweekendDate];
      // console.log("timeData",this.timeData)
      this.infos.beginDate =  lastweekstartDate
      this.infos.endDate =  lastweekendDate
      this.activeNames=[]
      this.GetFireUnitReport();
    },
    //上一个月
    perMonth(){
          let lastmonthstartDate = moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD');
          let lastmonthendDate = moment().month(moment().month() - 1).endOf('month').format('YYYY-MM-DD');
          this.timeData=[ lastmonthstartDate,lastmonthendDate];
          // console.log("timeData",this.timeData)
          this.infos.beginDate =  lastmonthstartDate
          this.infos.endDate =  lastmonthendDate
          this.activeNames=[]
          this.GetFireUnitReport();
    },
  }
}
</script>

<style lang="less">
    .topdiv{
        width: 100%;
        text-align: center;
        .title{
            font-size: 20px;
            font-weight: bold;
        }
        .time{
            font-size: 14px;
        }
    }
.unit-report {
    // background: white;
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
  #diaBody{
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
                  // border: 1px solid #ffffff !important;
            }
    }
    .fireUnitName{
        font-size: 16px;
        margin-bottom: 10px;
        text-align: left;
    }
    .dataBlock{
      .el-collapse{
        .el-collapse-item__header{
            background: rgb(38, 88, 47);
            // background:#1d477b ;
            color: rgb(255, 255, 255);
            padding: 0 20px;
            font-size: 18px;
        }
        .el-collapse-item__content{
            padding-bottom: 0px;
        }
        .content{
            padding: 0 20px;
            font-size: 14px;
            p{
                text-align: left;
            }
            .pdb{
                padding-bottom: 20px;
            }
            color: black;
            .content_title{
                display: flex;
                align-items: center;
                span{
                    font-size: 36px;
                }
            }
        }
        .two{
            .el-collapse-item__header{
                background: rgb(111, 187, 125);
                // background: #167fc1;
                color: black;
                font-weight: bold;
                font-size: 16px;
                padding: 0 20px;
                .titlebox{
                    width: 100%;
                }
            }
                  
        }

      }
    }
    
  }
    
        
}
</style>
