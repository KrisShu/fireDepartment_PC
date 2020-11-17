<template>
    <el-container class="home">
        <!-- 头部 -->
        <el-header class="display" style="height:auto">
            <el-col class="logo" :span="4">
                <img  @click="gotolistPage" src="../assets/images/logo2.png" alt="">
            </el-col>
            <el-col class="title" :span="16">
                <p>城市消防预警数据可视化终端</p>
            </el-col>
            <el-col :span="4">
                <div class="header-right">
                    <span>{{$store.state.userInfo.areaName}}</span>
                    <img style="cursor: pointer;" @click="logout" src="../assets/images/top_img_04.png" alt="">
                </div>
            </el-col>
        </el-header>
        <!-- 主题内容 -->
        <el-main>
            <!-- 左侧面板 -->
            <div class="left_Mantle">
                <div class="left_Mantle_title">
                    <p>
                        <img src="../assets/images/zhibiaoicon.png" alt="">
                        关键物联指标
                    </p>
                    <el-radio-group @change="radiochange" v-model="radio">
                        <el-radio-button label="实时"></el-radio-button>
                        <el-radio-button v-if="paneltext == '防火单位'" label="近一周"></el-radio-button>
                        <el-radio-button v-if="paneltext == '防火单位'" label="近一月"></el-radio-button>
                        <el-radio-button label="趋势"></el-radio-button>
                    </el-radio-group>
                </div>
                <!-- 防火单位面板 -->
                <div v-if="paneltext == '防火单位'" class="left_Mantle_content">
                    <!--  -->
                    <ul>
                        <li @click="selecttarget(arr.abbreviation,index)" v-for="(arr,index) in trendArr" :key="index"> 
                            <p><span class="green">【{{arr.abbreviation}}】</span> {{arr.all}}</p>
                            <p class="num">
                                <i v-if="trend_sign == arr.abbreviation" class="el-icon-star-on"></i>
                                <span>{{arr.num}}</span>
                            </p>
                        </li>
                    </ul>
                    <!--  -->
                    <div class="table_echarts">
                        <!--  -->
                        <el-table
                            :data="tableData"
                            style="width: 100%"
                            v-if="table_show"
                        >
                            <el-table-column
                                prop="fireUnitName"
                                label="防火单位"
                                width="180"
                            >
                            <template v-if="paneltext == '防火单位'" slot-scope="scope">
                                <el-button @click="getmap_fireunit(scope.row)" type="text">{{ scope.row.fireUnitName }}<img src="../assets/images/wangyuanjing.png"/></el-button>
                            </template>
                            </el-table-column>
                            <el-table-column
                                prop="iotNumber"
                                label="指标异常"
                                width="180"
                            >
                                <template v-if="paneltext == '防火单位'" slot-scope="scope">
                                    <el-button @click="getabnormallist(scope.row)" type="text">{{ scope.row.iotNumber }}<img src="../assets/images/wangyuanjing.png"/></el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <div v-else class="echarts_content" id="echarts">

                        </div>
                    
                    </div>
                </div>
                <!-- 市政消火栓面板 -->
                <div v-else-if="paneltext == '市政消火栓'" class="left_Mantle_content left_Mantle_content_hydrant ">
                    <ul>
                        <li @click="selecttarget_hydrant('指标正常')"> 
                            <p>指标正常</p>
                            <p class="num">
                                <i v-if="hydrant_trend_sign == '指标正常'" class="el-icon-star-on"></i>
                                <span>{{hydrant_goodnum}}</span>
                            </p>
                        </li>
                        <li @click="selecttarget_hydrant('指标异常')"> 
                            <p>指标异常</p>
                            <p class="num">
                                <i v-if="hydrant_trend_sign == '指标异常'" class="el-icon-star-on"></i>
                                <span>{{hydrant_badnum}}</span>
                            </p>
                        </li>
                    </ul>
                    <div class="table_echarts">
                        <!--  -->
                        <el-table
                            :data="tableData_hydrant"
                            style="width: 100%"
                            v-if="table_show"
                        >
                            <el-table-column
                                prop="hydrantSn"
                                label="编号"
                                width="120"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="hydrantState"
                                label="状态"
                                width="100"
                            >
                            <template slot-scope="scope">
                                <span v-if="scope.row.hydrantState == 0">正常</span>
                                <span v-if="scope.row.hydrantState == 1">封盖正常</span>
                                <span v-if="scope.row.hydrantState == 2">出现流水</span>
                                <span v-if="scope.row.hydrantState == 3">碰撞倾斜</span>
                                <span v-if="scope.row.hydrantState == 4">闷盖旋转</span>
                                <span v-if="scope.row.hydrantState == 5">电量不足</span>
                                <span v-if="scope.row.hydrantState == 6">水压超限</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                                prop="electricQuantity"
                                label="电量（%）"
                                width="100"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="pressure"
                                label="水压（KPa）"
                                width="110"
                            >
                            </el-table-column>
                        </el-table>
                        <div v-else class="echarts_content" id="echarts">

                        </div>

                    </div>
                </div>
            </div>
            <!-- 地图盒子 -->
            <div id="mapBox">

            </div>
            <!-- 右侧面板 -->
            <div class="right_Mantle">
                <!--  -->
                <div v-if="paneltext == '防火单位'" class="right_Mantle_fireUnit">
                    <div class="right_Mantle_total">
                        <div>
                            <p><img src="../assets/images/danwei_blue.png" alt="">接入防火单位</p>
                            <p><span class="num">{{totalFireunitNumber}}</span>家</p>
                        </div>
                        <div>
                            <p><img src="../assets/images/shebei.png" alt="">接入物联网设备</p>
                            <p><span class="num">{{totalDeviceNumber}}</span>个</p>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <p><span class="green">【电】</span>安全用电</p>
                            <div class="sliderbox">
                                <el-slider :max="totalDevicelistValueMax" disabled v-model="totalDevicelistValue[4]"></el-slider>
                                <span class="totaldevicevalue">{{totalDevicelistValue[4]}}</span>    
                            </div>
                            
                        </li>
                        <li>
                            <p><span class="green">【火】</span>火警联网</p>
                            <div class="sliderbox">
                                <el-slider :max="totalDevicelistValueMax" disabled v-model="totalDevicelistValue[3]"></el-slider>
                                <span class="totaldevicevalue">{{totalDevicelistValue[3]}}</span>    
                            </div>
                            
                        </li>
                        <li>
                            <p><span class="green">【小】</span>独立烟感</p>
                            <div class="sliderbox">
                                <el-slider :max="totalDevicelistValueMax" disabled v-model="totalDevicelistValue[2]"></el-slider>
                                <span class="totaldevicevalue">{{totalDevicelistValue[2]}}</span>    
                            </div>
                            
                        </li>
                        <li>
                            <p><span class="green">【视】</span>AI智脑</p>
                            <div class="sliderbox">
                                <el-slider :max="totalDevicelistValueMax" disabled v-model="totalDevicelistValue[1]"></el-slider>
                                <span class="totaldevicevalue">{{totalDevicelistValue[1]}}</span>    
                            </div>
                            
                        </li>
                        <li>
                            <p><span class="green">【水】</span>消防供水</p>
                            <div class="sliderbox">
                                <el-slider :max="totalDevicelistValueMax" disabled v-model="totalDevicelistValue[0]"></el-slider>
                                <span class="totaldevicevalue">{{totalDevicelistValue[0]}}</span>    
                            </div>
                            
                        </li>
                    </ul>
                </div>
                <!--  -->
                <div v-else-if="paneltext == '市政消火栓'">
                    <div class="right_Mantle_total">
                        <div>
                            <p><img src="../assets/images/shebei.png" alt="">接入市政消火栓</p>
                            <p><span class="num">{{totalhydrantNum}}</span>个</p>
                        </div>
                        <div>
                            <p><img src="../assets/images/danwei_blue.png" alt="">接入管网水压监测点</p>
                            <p><span class="num">{{totalpiepdotNum}}</span>个</p>
                        </div>
                    </div>
                </div>
               
            </div>
            <!-- 防火单位下的搜索框 -->
            <div v-if="paneltext == '防火单位'" class="search_fireunitName">
                <el-autocomplete
                    v-model="search_fireunitName"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="查询防火单位"
                    @select="handleSelect"
                    :hide-loading="true"
                    :trigger-on-focus= "false"
                    clearable
                >
                <el-button slot="append" icon="el-icon-search"></el-button>
                </el-autocomplete>
            </div>
            <!--  -->
            <div class="switch_tab">
                 <el-button @click="switch_tab('防火单位')" :type="switch_tab_type" round>防火单位</el-button>
                   
                    <div v-if="isExistNewTrueFireAlarm" class="radar2 radar"></div>
                    <div v-else class="radar">
                        <div class="radar_text">
                            <p>城市消防安全</p>
                            <p>智能监测中......</p>
                        </div>
                    </div>
                 <el-button @click="switch_tab('市政消火栓')" :type="switch_tab_type2" round>市政消火栓</el-button>
            </div>
        </el-main>

        <baseInformation ref="baseInformation"></baseInformation>
        <!-- 智慧消防数据报告 -->
        <MapUnitReport  ref="MapUnitReport"></MapUnitReport>
        <!--  -->
        <base-dialog title="指标异常列表" :dialogfooter="false" ref="abnormallist">
            <baseTable
                :columnList="abnormallist"
                :tableData="abnormallistData"
                tableName='Firepiep'
                @getmapBot="getmapBot"
                @lookalarmPhotoUrl="lookalarmPhotoUrl"
            ></baseTable>
            <base-page :propPage='abnormalpage' @currentChange="getabnormallist"></base-page>
        </base-dialog>

        <audio ref="audio" style="z-index:1999" controls  hidden="true" src="../../static/fire_alarm.wav"></audio>
       <!--  <el-button id="dianji" @click="play">点击</el-button> -->
        <!-- 火警点位图 -->
        <basemapBot ref="basemapBot"></basemapBot>
        <!-- 消防通道堵塞的照片 -->
        <base-dialog class="alarmPhotoUrl" title="消防通道堵塞照片" :dialogfooter="false" ref="alarmPhotoUrl">
            <img :src="alarmPhotoUrl" alt="">

        </base-dialog>
       
    </el-container>
</template>

<script>
let moment = require('moment')
import AMap from 'AMap'
import MapUnitReport from '../components/MapUnitReport.vue'
import '../assets/css/style.css'//公共重置初始化样式
import baseInformation from '../components/baseInformation.vue'
import basemapBot from '../components/basemapBot.vue'
export default {
    components:{
        MapUnitReport,
        baseInformation,
        basemapBot
    },
    data(){
        return{
            areaId:this.$store.state.userInfo.areaId,
            mapObj:{},
            map:{
                zoom:9,
                areaName:'',
                fillColor:'black',
                fillColorCount:0
            },
            radio: '实时',
            trendArr:[
                {
                    abbreviation:'电',
                    all:'安全用电超限',
                    num:10
                },
                {
                    abbreviation:'火',
                    all:'火警部件故障',
                    num:10
                },
                {
                    abbreviation:'小',
                    all:'独立烟感故障',
                    num:10
                },
                {
                    abbreviation:'视',
                    all:'消防通道堵塞',
                    num:10
                },
                {
                    abbreviation:'水',
                    all:'消防供水异常',
                    num:10
                },
                {
                    abbreviation:'警',
                    all:'火警联网报警',
                    num:10
                }
            ],
            trend_sign:'电',
            fireunit_spotArray:[],
            fireunit_spots:[],
            nearhydrant_spotArray:[],
            nearhydrant_spots:[],
            nearhydrantCircle:{},
            firehousemarker:{},
            tableData: [],
            timeSlot:0,
            IoTListPage:{
                areaId:this.$store.state.userInfo.areaId,
                IoTType:1,
                timeSlot:0,
                MaxResultCount:10,
                SkipCount:0,
                total:0
            },
            table_show:true,//table是否显示，在状态为趋势时不显示
            alarmPhotoUrl:'',//消防通道堵塞的照片
            search_fireunitName:'',
            totalFireunitNumber:0,
            totalDeviceNumber:0,
            totalDevicelistValue:[],
            totalDevicelistValueMax:0,
            infoWindow:'',//地图气泡窗口
            abnormallistData:[],
            abnormallist:[],
            dian_abnormallist:[
                {
                    prop: "creationTime",
                    label: "报警时间"
                },
                {
                    prop: "deviceSn",
                    label: "终端设备"
                },
                {
                    prop: "location",
                    label: "安装位置"
                },
                {
                    prop: "analog",
                    label: "报警数值"
                },
            ],
            huo_abnormallist:[
                {
                    prop: "creationTime",
                    label: "报警时间"
                },
                {
                    prop: "detectorSn",
                    label: "故障编号"
                },
                {
                    prop: "detectorType",
                    label: "部件类型"
                },
                {
                    prop: "location",
                    label: "部件位置"
                },
            ],
            xiao_abnormallist:[
                {
                    prop: "creationTime",
                    label: "故障时间"
                },
                {
                    prop: "detectorSn",
                    label: "设备编号"
                },
                {
                    prop: "location",
                    label: "设备位置"
                },
            ],
            shi_abnormallist:[
                {
                    prop: "creationTime",
                    label: "报警时间"
                },
                {
                    prop: "deviceSn",
                    label: "视觉设备"
                },
                {
                    prop: "location",
                    label: "监控位置"
                },
                {
                    prop: "alarmPhotoUrl",
                    label: "报警图片"
                },
            ],
            shui_abnormallist:[
                {
                    prop: "creationTime",
                    label: "报警时间"
                },
                {
                    prop: "deviceSn",
                    label: "设备编号"
                },
                {
                    prop: "location",
                    label: "设备位置"
                },
                {
                    prop: "monitorType",
                    label: "指标类型"
                },
                {
                    prop: "value",
                    label: "报警数值"
                },
            ],
            jing_abnormallist:[
                {
                    prop: "creationTime",
                    label: "报警时间"
                },
                {
                    prop: "detectorSn",
                    label: "终端编号"
                },
                {
                    prop: "detectorType",
                    label: "终端类型"
                },
                {
                    prop: "location",
                    label: "终端位置"
                },
                {
                    label: "点位图",
                    prop:'existBitMap'
                },
            ],
            abnormalpage:{
                FireUnitId:'',
                timeSlot:'',
                MaxResultCount:6,
                total:0,
                current:1
            }, 
            issetZoomAndCenter:false,//是否重置过地图的中心或者层级
            isExistNewTrueFireAlarm:false,//是否存在火警报警
            audioUrl:require('../../static/fire_alarm.wav'),
            switch_tab_type:'primary',
            switch_tab_type2:'',
            paneltext:'防火单位',
            hydrant_trend_sign:'指标正常',
            allhydrant_spotArray:[],
            allhydrant_spots:[],
            hydrant_goodnum:190,
            hydrant_badnum:190,
            totalhydrantNum:0,
            totalpiepdotNum:0,
            IoTListPage_hydrant:{
                areaId:this.$store.state.userInfo.areaId,
                State:1,
                MaxResultCount:10,
                SkipCount:0,
                total:0
            },
            tableData_hydrant:[],
            polygons:[],//行政区面板
           
        }
    },
    created(){
         this.map.areaName = this.$store.state.userInfo.areaName
        if(this.$store.state.userInfo.areaName == '成华'){
            this.map.zoom = 13
        }else if(this.$store.state.userInfo.areaName == '柳州'){
            this.map.zoom = 9

        }
    },
    mounted(){
        this.initmap();//初始化地图
        this.GetFireUnitNumber();
        this.GetNetDeviceNumber();
        this.GetIoTAlarmNumber();
        this.GetIoTList();
        this.ExistNewTrueFireAlarm();


        this.setInterval_GetIoTAlarmNumber =setInterval(() => {
            setTimeout(()=>{
                this.GetIoTAlarmNumber() //时间
                this.GetIoTList();

            }, 0)
        }, 60000)

        this.setInterval_ExistNewTrueFireAlarm=setInterval(() => {
            setTimeout(()=>{
                this.ExistNewTrueFireAlarm();

            }, 0)
        }, 5000)


       
    },
    watch:{
        isExistNewTrueFireAlarm(val,old){//10秒后，停止报警 状态正常
            console.log(val,old)
            if(val){
                setTimeout(()=>{
                    // console.log("修改")
                    this.isExistNewTrueFireAlarm =false
                },10000)
            }
        }
    },
    methods:{
        //页面跳转到列表页面 
        gotolistPage(){
            console.log("页面跳转")
            this.$router.push({
                name:'index'
            })
        },
        //初始化地图
        initmap(){
            this.mapObj = new AMap.Map('mapBox', {
                resizeEnable: true, //自适应大小
                zoom: this.map.zoom,//初始视窗
                center:[this.$store.state.userInfo.lng, this.$store.state.userInfo.lat],
                // mapStyle: 'amap://styles/blue', //设置地图的显示样式
                 layers: [
                    // 卫星
                    new AMap.TileLayer.Satellite(),
                    // 路网
                    new AMap.TileLayer.RoadNet()
                ],
            });
            // let features =['bg','building','point'];
            // this.mapObj.setFeatures(features);
            setTimeout(() => {
                this.setarea();
                this.makeMark(this.areaId);
            });
           
        },
        //行政区规划
        setarea() {
            let that = this;
            AMap.plugin('AMap.DistrictSearch', function () {
                var districtSearch = new AMap.DistrictSearch({
                    // 关键字对应的行政区级别
                    level: 'district',
                    //  显示下级行政区级数，1表示返回下一级行政区
                    subdistrict: 1,
                    // 返回行政区边界坐标等具体信息
                    extensions: "all",
                })
                // 搜索所有省/直辖市信息 
                districtSearch.search(that.map.areaName, function(status, result) {
                    // 查询成功时，result即为对应的行政区信息
                    // console.log(result)
                    // 获取相关区域的边界信息
                    var bounds = result.districtList[0].boundaries
                    if(bounds){
                        for (var i = 0, l = bounds.length; i < l; i++) {
                            //生成行政区划polygon
                            var polygon = new AMap.Polygon({
                                map: that.mapObj,
                                strokeWeight: 4,
                                path: bounds[i],
                                fillOpacity: 0.2,
                                fillColor: that.map.fillColor,
                                // strokeColor: 'white'
                                strokeColor: '#ffff37'
                            })
                            that.polygons.push(polygon)
                        }
                    }
                })
            })
        },
        //防火单位列表标点
        makeMark(areaId){
            this.mapObj.remove(this.allhydrant_spotArray);
            this.$axios.get(this.$api.GetFireUnitLatByArea,
                {params:{areaId}}
            ).then(res=>{
                console.log("获取的点位",res)
                this.fireunit_spots = res.result;
                let icon = new AMap.Icon({
                    size: new AMap.Size(40, 50), // 图标尺寸
                    // image:require("../assets/images/start-white.png") // Icon的图像
                    image:require("../assets/images/house.png")
                });
                for (let item of  this.fireunit_spots) {
                    let marker = new AMap.Marker({
                        position: new AMap.LngLat(item.lng, item.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        title: item.fireunitId,
                        offset: new AMap.Pixel(-10, -10),
                        icon: icon
                    });
                    marker.item = item; // 自定义参数
                    marker.on('click',this.getMapMarkInfo)
                    this.fireunit_spotArray.push(marker);
                }
                // console.log(this.fireunit_spotArray)
                this.mapObj.add(this.fireunit_spotArray);
            })    

               
        },
        getMapMarkInfo(){

        },
        //选择radio
        radiochange(text){
            // console.log(text);
            // this.table_show =false;
            if(this.paneltext == '防火单位'){
                if(text == '趋势'){
                    this.table_show =false;
                    for(let arr of this.trendArr){
                        arr.num = '--';
                    }
                    this.GetIoTDiagram();
                }else{
                    switch (text) {
                        case '实时':
                            this.timeSlot = 0
                            this.IoTListPage.timeSlot =0;
                            break;
                        case '近一周':
                            this.timeSlot = 1;
                            this.IoTListPage.timeSlot =1;
                            break;
                        case '近一月':
                            this.timeSlot = 2
                            this.IoTListPage.timeSlot =2;
                            break;
                    }
                    this.GetIoTAlarmNumber();
                    this.table_show =true;
                    this.abnormalpage.SkipCount = 0; 
                    this.abnormalpage.current = 1; 
                    this.GetIoTList();
                }
            }else if(this.paneltext == '市政消火栓'){
                if(text == '趋势'){
                    this.table_show =false;
                    this.hydrant_goodnum = '--'
                    this.hydrant_badnum = '--'
                    this.GetHydrantStateDiagram();
                }else{
                    this.table_show =true;
                    this.IoTListPage_hydrant.State = 1;
                    this.GetHydrantList();
                    this.GetHydrantStateNumber();
                }
            }
        },
        //选择指标
        selecttarget(text,index){
            console.log("选择指标",text)
            this.trend_sign =text;
            this.IoTListPage.IoTType =index+1;
            this.abnormalpage.SkipCount = 0; //切换了指标则将指标异常的列表SkipCount重置为0
            this.abnormalpage.current = 1; 
            if(this.issetZoomAndCenter){//如果为true说明重置过地图的中心和层级（显示过气泡），所以重新选择指标时要将地图恢复为原来的样子
                // this.infoWindow.close();
                // this.mapObj.setZoomAndCenter(9, [this.$store.state.userInfo.lng, this.$store.state.userInfo.lat]); //同时设置地图层级与中心点
                // if(this.nearhydrant_spotArray.length>0){//如果附近的消火栓数组有数据则表示地图添加过
                if(this.firehousemarker){//如果新增了firehousemarker这个点表示地图添加过1km半径的圆
                    this.mapObj.remove(this.nearhydrant_spotArray);
                    this.mapObj.remove(this.firehousemarker);
                    this.nearhydrant_spotArray =[];
                    this.mapObj.remove(this.nearhydrantCircle)
                }
            }
            
            if(this.radio == '趋势'){
                this.GetIoTDiagram();
            }else{
                this.GetIoTList();
            }
        },
        //市政消火栓的选择指标
        selecttarget_hydrant(text){
            this.hydrant_trend_sign =text;
            if(text == '指标正常'){
                this.IoTListPage_hydrant.State = 1
            }else{
                this.IoTListPage_hydrant.State = 2
            }
            if(this.radio == '趋势'){
                this.GetHydrantStateDiagram();
            }else{
                this.GetHydrantList();
            }

        },
        //获取地图上的防火单位位置
        getmap_fireunit(item){
            this.GetFireUnitBaseInfo(item.fireUnitId)
            this.mapObj.remove(this.polygons)//删除地图层上的行政区面板
            this.map.fillColorCount =-1;//点击获取地图上的防火单位位置时需要给行政区面板的蒙层颜色次数设置为-1，因为再次出发switch_tab事件时fillColorCount就为0，就正常添加蒙层颜色
            if(this.firehousemarker){//如果新增了firehousemarker这个点表示地图添加过1km半径的圆
                this.mapObj.remove(this.nearhydrant_spotArray);
                this.mapObj.remove(this.firehousemarker);

                this.nearhydrant_spotArray =[];
                this.mapObj.remove(this.nearhydrantCircle)
            }
        },
        //查看消防通道堵塞照片
        lookalarmPhotoUrl(url){
            // console.log("sssssssssssss",url)
            this.alarmPhotoUrl = `${this.$URL}${url}`;
            this.$refs.alarmPhotoUrl.DialogVisible = true
        },
        //获取单位的具体气泡信息
        GetFireUnitBaseInfo(fireUnitId){
            this.issetZoomAndCenter = true;//触发设置层级和中心位置
            this.$axios.get(this.$api.GetFireUnitBaseInfo,{params:{fireUnitId}}).then(res=>{
                console.log("获取地图上的防火单位位置",res);
                var zoom = 18;
                var lng = res.result.lng;
                var lat = res.result.lat;
                this.mapObj.setZoomAndCenter(zoom, [lng, lat]); //同时设置地图层级与中心点
                this.getMapMarkInfo(res.result)

            })
        },
        getMapMarkInfo(item){
            var title = '防火单位信息',
            content=[];
            content.push(`【名称】${item.fireUnitName}`);
            content.push(`【地址】${item.fireUnitAddress}`);
            this.infoWindow = new AMap.InfoWindow({  
                isCustom: true,  //使用自定义窗体
                content: this.createInfoWindow(title, content.join("<br/>"),item.fireUnitId,item),
                offset: new AMap.Pixel(16, -45)
            }); 
            this.infoWindow.open(this.mapObj, [item.lng,item.lat]);
        },
        createInfoWindow(title, content,fID,item) {
            var info = document.createElement("div");
            info.className = "custom-info input-card content-window-card";

            //可以通过下面的方式修改自定义窗体的宽高
            //info.style.width = "400px";
            // 定义顶部标题
            var top = document.createElement("div");
            var titleD = document.createElement("div");
            var closeX = document.createElement("img");
            top.className = "info-top";
            titleD.innerHTML = title;
            closeX.src = "https://webapi.amap.com/images/close2.gif";
            closeX.onclick = this.closeInfoWindow;

            top.appendChild(titleD);
            top.appendChild(closeX);
            info.appendChild(top);

            // 定义中部内容
            var middle = document.createElement("div");
            middle.className = "info-middle";
            middle.style.backgroundColor = 'white';
            middle.innerHTML = content;

            let reportDiv = document.createElement('div'),
            span1 = document.createElement('span'),
            span2 = document.createElement('span');

            span1.innerText = '单位熟悉卡';
           
            if(this.isExistNewTrueFireAlarm || this.trend_sign == '警'){//如果存在最新报警则显示市政消火栓
                span2.innerText = '市政消火栓';
                span2.onclick=()=>{
                    this.findHydrant(item)
                }
            }else{
                span2.innerText = '智慧消防数据综合报告';
                span2.onclick=()=>{
                    this.openReportDialog(fID)
                }
            }
            span1.style.borderBottom = '1px solid rgb(91, 183, 245)'
            span1.style.marginRight = '30px'
            span2.style.borderBottom = '1px solid rgb(91, 183, 245)'
            reportDiv.appendChild(span1)
            reportDiv.appendChild(span2)
            reportDiv.style.textAlign="center"
            reportDiv.style.color="rgb(91, 183, 245)"
            reportDiv.style.cursor="pointer"
            
           
            span1.onclick=()=>{
                this.GetFireUnitCard(fID)
            }
            middle.appendChild(reportDiv)
            info.appendChild(middle);

            // 定义底部内容
            var bottom = document.createElement("div");
            bottom.className = "info-bottom";
            bottom.style.position = 'relative';
            bottom.style.top = '0px';
            bottom.style.margin = '0 auto';
            var sharp = document.createElement("img");
            sharp.src = "https://webapi.amap.com/images/sharp.png";
            bottom.appendChild(sharp);
            info.appendChild(bottom);
            return info;
        },
        closeInfoWindow(){
             this.infoWindow.close();
        },
        //打开单位熟悉卡  
        GetFireUnitCard(id){
            this.$refs.baseInformation.dialogVisible = true;
            console.log("GetFireUnitCard",id)
            this.$refs.baseInformation.GetFireUnitCard(id);
        },
        openReportDialog(fID){
            this.$refs.MapUnitReport.perWeek(fID)
        },
        //发现周边的消火栓
        findHydrant(item){//
            console.log("发现周边的消火栓",item)
            this.infoWindow.close();
            this.nearhydrantCircle = new AMap.Circle({
                center: new AMap.LngLat(item.lng,item.lat),  // 圆心位置
                radius: 1000, // 圆半径
                fillColor: '#9EC4E6',   // 圆形填充颜色
                fillOpacity:0.4,
                strokeColor: '#9EC4E6', // 描边颜色
                strokeWeight: 2, // 描边宽度
            });
            this.GetNearbyHygrant(item.lng,item.lat);

            this.firehousemarker = new AMap.Marker({
                position: new AMap.LngLat(item.lng,item.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                icon:require('../assets/images/house-fire.png')
            });
            this.mapObj.add(this.firehousemarker);
            this.mapObj.add(this.nearhydrantCircle);
            this.mapObj.setZoom(15)
        },
        //获取坐标点附近1KM范围内的市政消火栓
        GetNearbyHygrant(lng,lat){
            this.$axios.get(this.$api.GetNearbyHygrant,{params:{lng,lat}}).then(res=>{
                console.log("获取坐标点附近1KM范围内的市政消火栓",res)
                this.nearhydrant_spots = res.result;
                this.nearhydrant_spotArray
                let icon = new AMap.Icon({
                    size: new AMap.Size(40, 50), // 图标尺寸
                    image:require("../assets/images/hydrant-green.png") // Icon的图像
                });
                let icon2 = new AMap.Icon({
                    size: new AMap.Size(20, 30), // 图标尺寸
                    image:require("../assets/images/hydrant-red.png") // Icon的图像
                });
                for (let item of  this.nearhydrant_spots) {
                    let marker = new AMap.Marker({
                        position: new AMap.LngLat(item.lng, item.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        title: item.hydrantId,
                        offset: new AMap.Pixel(-10, -10),
                        icon: item.isOK ? icon :icon2
                    });
                    this.nearhydrant_spotArray.push(marker);
                }
                this.mapObj.add(this.nearhydrant_spotArray);
            })
        },
        //获取异常列表
        getabnormallist(item){
            console.log("item",item)
            if(item){//如果存在item则是点击请求，不存在则是分页请求
                this.abnormalpage.fireunitId = item.fireUnitId
                this.abnormalpage.timeSlot = this.timeSlot
                this.$refs.abnormallist.DialogVisible = true;
            }
           
            if(this.IoTListPage.IoTType == 1){//当前指标是  -安全用电超限
                this.abnormallist = this.dian_abnormallist;
                this.$axios.get(this.$api.GetElectricAlarmList,{params:this.abnormalpage}).then(res=>{
                    console.log("获取异常列表",res);
                    ({items: this.abnormallistData,totalCount: this.abnormalpage.total} = res.result);
                })
            }else if(this.IoTListPage.IoTType == 2){//当前指标是  -火警部件故障
                this.abnormallist = this.huo_abnormallist;
                this.$axios.get(this.$api.GetFireDetectorFaultList,{params:this.abnormalpage}).then(res=>{
                    console.log("获取异常列表",res);
                    ({items: this.abnormallistData,totalCount: this.abnormalpage.total} = res.result);
                })
            }else if(this.IoTListPage.IoTType == 3){
                this.abnormallist = this.xiao_abnormallist;
                this.$axios.get(this.$api.GetIndependentFaultList,{params:this.abnormalpage}).then(res=>{
                    console.log("获取异常列表",res);
                   ({items: this.abnormallistData,totalCount: this.abnormalpage.total} = res.result);
                })
            }else if(this.IoTListPage.IoTType == 4){
                this.abnormallist = this.shi_abnormallist;
                this.$axios.get(this.$api.GetVisionAlarmist,{params:this.abnormalpage}).then(res=>{
                    console.log("获取异常列表",res);
                   ({items: this.abnormallistData,totalCount: this.abnormalpage.total} = res.result);
                })
            }else if(this.IoTListPage.IoTType == 5){
                this.abnormallist = this.shui_abnormallist;
                this.$axios.get(this.$api.GetWaterAlarmist,{params:this.abnormalpage}).then(res=>{
                    console.log("获取异常列表",res);
                   ({items: this.abnormallistData,totalCount: this.abnormalpage.total} = res.result);
                })
            }else if(this.IoTListPage.IoTType == 6){
                this.abnormallist = this.jing_abnormallist;
                this.$axios.get(this.$api.GetFireAlarmist,{params:this.abnormalpage}).then(res=>{
                    console.log("获取异常列表",res);
                   ({items: this.abnormallistData,totalCount: this.abnormalpage.total} = res.result);
                })
            }
            

           
        },
        getmapBot(item){
            this.$refs.basemapBot.getpoint(item.fireAlarmId)
        },
        //模糊查询
        querySearchAsync(queryString, callback){
            if(!queryString){
                // console.log("111111111111111111111111")
                return
            }
            let result =[];
            this.$axios.post(this.$api.QueryFireUnitLikeName,
                {matchName:queryString,areaId:this.areaId}
            ).then(res=>{
                for(let item of  res.result) {
                result.push({
                    value:item.fireUnitName,
                    id:item.fireUnitId
                })
                }
                clearTimeout(this.timeout);
                this.timeOut = setTimeout(()=>{
                    callback(result)
                })
            })
        },
        handleSelect(item){
            console.log("模糊查询选择",item);
            this.$axios.get(this.$api.GetFireUnitBaseInfo,{params:{fireUnitId:item.id}}).then(res=>{
                console.log("获取地图上的防火单位位置",res);
                var zoom = 18;
                var lng = res.result.lng;
                var lat = res.result.lat;
                this.mapObj.setZoomAndCenter(zoom, [lng, lat]); //同时设置地图层级与中心点
                this.getMapMarkInfo(res.result)

            })
        },
        //获取接入的防火单位数量
        GetFireUnitNumber(){
            this.$axios.get(this.$api.GetFireUnitNumber,{params:{areaId:this.areaId}}).then(res=>{
                console.log("获取接入的防火单位数量",res);
                this.totalFireunitNumber = res.result;
            })
        },
        //获得辖区内接入物联网设备的数量
        GetNetDeviceNumber(){
            this.totalDeviceNumber =0;
            this.$axios.get(this.$api.GetNetDeviceNumber,{params:{areaId:this.areaId}}).then(res=>{
                console.log("获得辖区内接入物联网设备的数量",res);
                for(let arr of res.result.listValue){
                    this.totalDeviceNumber += arr
                }
                // console.log() 
                this.totalDevicelistValueMax = Math.max(...res.result.listValue)
                this.totalDevicelistValue = res.result.listValue;

            })
        },
        //获得指定时间段内物联指标异常数量
        GetIoTAlarmNumber(){
            this.$axios.get(this.$api.GetIoTAlarmNumber,
                {params:{areaId:this.areaId,timeSlot:this.timeSlot}}
            ).then(res=>{
                // console.log("获得指定时间段内物联指标异常数量",res)
                this.trendArr[0].num = res.result[0].value
                this.trendArr[1].num = res.result[1].value
                this.trendArr[2].num = res.result[2].value
                this.trendArr[3].num = res.result[3].value
                this.trendArr[4].num = res.result[4].value
                this.trendArr[5].num = res.result[5].value
            })
        },
        //获取物联指标异常的防火单位列表
        GetIoTList(){
            this.$axios.get(this.$api.GetIoTList,{params:this.IoTListPage}).then(res=>{
                // console.log("消火栓",res);
                if(this.isExistNewTrueFireAlarm){//如果发现存在最新火警联网报警则地图显示气泡
                        this.GetFireUnitBaseInfo(res.result.items[0].fireUnitId);
                }
                ({items: this.tableData,totalCount: this.IoTListPage.total} = res.result);
            })
        },
        //获取物联指标异常趋势  
         GetIoTDiagram(){
            this.$axios.get(this.$api.GetIoTDiagram,
                {params:{areaId:this.areaId,IoTType:this.IoTListPage.IoTType}}
            ).then(res=>{
                console.log("获取物联指标异常趋势",res)
                this.$nextTick(()=>{
                    this.inittrendcharts(res.result)
                })
            })
        },
        inittrendcharts(result){
            this.echarts  = this.$echarts.init(document.getElementById('echarts'));
            this.echarts.setOption({
                color:['#4E95D4'],
                xAxis: {
                    type: 'value',
                    axisLabel:{
                        color:'white'
                    },
                },
                grid:{
                    left:76
                },
                yAxis: {
                   
                    axisLabel:{
                        color:'white',
                    },
                    splitLine: {//设置坐标轴在 grid 区域中的分隔线。
                        lineStyle:{
                            color: ['red']
                        }
                    },
                    type: 'category',
                    data: result.listKey
                },
                series: [{
                    data: result.listValue,
                    type: 'bar'
                }]
            })
        },
        //选择面板  防火单位或者市政消火栓
        switch_tab(text){
            //每触发一次switch_tab事件fillColorCount就加1，如果大于0说明触发这个事件多次则在this.setarea();时会出现蒙层颜色叠加，则大于时蒙层颜色为空
            this.map.fillColorCount++
            console.log(this.map.fillColorCount)
            if(this.map.fillColorCount>0){
                this.map.fillColor = ''
            }
            this.setarea();
            this.paneltext = text;
            this.radio = '实时';
            this.table_show = true;
            this.mapObj.setZoomAndCenter(this.map.zoom, [this.$store.state.userInfo.lng, this.$store.state.userInfo.lat]); //同时设置地图层级与中心点
            if(this.infoWindow){
                this.infoWindow.close();
            }
            if(text == '防火单位'){
                this.switch_tab_type =  'primary'
                this.switch_tab_type2 ='';
                this.timeSlot = 0;
                this.trend_sign ='电';
                this.IoTListPage.IoTType = 1;
                this.GetFireUnitNumber();
                this.GetNetDeviceNumber();
                this.GetIoTAlarmNumber();
                this.GetIoTList();
                this.makeMark(this.areaId);

            }else{
                this.switch_tab_type2 =  'primary'
                this.switch_tab_type ='';
                this.hydrant_trend_sign = '指标正常';
                this.IoTListPage_hydrant.State = 1;
                this.GetHydrantNumber();
                this.GetPressureMonitorNumber();
                this.GetHydrantStateNumber();
                this.GetHydrantList();
                this.GetHydrantList_all();
            }
        },
        //每五秒判断是否有新的真实火警
        ExistNewTrueFireAlarm(){
            let fomdatas =new FormData();
            fomdatas.append('areaId',this.areaId)
            this.$axios.post(this.$api.ExistNewTrueFireAlarm,fomdatas).then(res=>{
                // console.log("每五秒判断是否有新的真实火警",res)
                this.isExistNewTrueFireAlarm = res.result
                if(res.result){
                    this.$nextTick(()=>{
                      this.play();

                    })
                    
                    this.paneltext = '防火单位';
                    this.radio = '实时';
                    this.IoTListPage.timeSlot =0;
                    this.trend_sign = '警';
                    this.IoTListPage.IoTType = 6;
                    this.GetIoTList();
                }
            })
        },
        play(){
            // console.log("chufaaffafafafafafa")
            // this.$refs.audio.play();
            let audio = new Audio()
            audio.src = require('../../static/fire_alarm.wav')
            audio.play();
        },










        //市政消火栓的
        GetHydrantNumber(){
            this.$axios.get(this.$api.GetHydrantNumber,{params:{areaId:this.areaId}}).then(res=>{
                // console.log("市政消火栓的接入数量",res);
                this.totalhydrantNum = res.result
            })
        },
        //获得辖区内接入管网水压监测点的数量
        GetPressureMonitorNumber(){
            this.$axios.get(this.$api.GetPressureMonitorNumber,{params:{areaId:this.areaId}}).then(res=>{
                // console.log("市政消火栓的接入数量",res)
                this.totalpiepdotNum = res.result
            })
        },
        //获得市政消火栓状态实时数量
        GetHydrantStateNumber(){
            this.$axios.get(this.$api.GetHydrantStateNumber,{params:{areaId:this.areaId}}).then(res=>{
                // console.log("市政消火栓的接入数量",res)
                this.hydrant_goodnum = res.result[0].value
                this.hydrant_badnum = res.result[1].value
            })
        },
        //
        GetHydrantList(){
            this.$axios.get(this.$api.GetHydrantList,{params:this.IoTListPage_hydrant}).then(res=>{
                // console.log("GetHydrantList",res);
                 ({items: this.tableData_hydrant,totalCount: this.IoTListPage_hydrant.total} = res.result);
            })
        },
        //获取所有消火栓在地图上的点
        GetHydrantList_all(){
            this.mapObj.remove(this.fireunit_spotArray);
            this.$axios.get(this.$api.GetAllHydrantList,{params:{AreaId:this.areaId}}).then(res=>{
                // console.log("GetHydrantList_all",res);
                this.makehydrantMark(res.result)
            })
        },
        //市政消火栓的标点
        makehydrantMark(all){
            // this.allhydrant_spots ;
            console.log("所有消火栓点位",all)
            let icon = new AMap.Icon({
                size: new AMap.Size(30, 40), // 图标尺寸
                image:require("../assets/images/hydrant-green.png") // Icon的图像
            });
            let icon2 = new AMap.Icon({
                size: new AMap.Size(30, 40), // 图标尺寸
                image:require("../assets/images/hydrant-red.png") // Icon的图像
            });
            for (let item of  all) {
                let marker = new AMap.Marker({
                    position: new AMap.LngLat(item.lng, item.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    title: item.fireunitId,
                    offset: new AMap.Pixel(-10, -10),
                    icon: item.hydrantState  ? icon2 :icon
                });
                this.allhydrant_spotArray.push(marker);
            }
            // console.log(this.allhydrant_spotArray)
            this.mapObj.add(this.allhydrant_spotArray);    

               
        },

        //获取市政消火栓状态趋势
        GetHydrantStateDiagram(state){
            this.$axios.get(this.$api.GetHydrantStateDiagram,
                {params:{areaId:this.areaId,state:this.IoTListPage_hydrant.State}}
            ).then(res=>{
                console.log("GetHydrantStateDiagram",res)
                this.$nextTick(()=>{
                    this.inittrendcharts(res.result)
                })
            })
        },

       
       
       
       
        
        
       
      
        //退出登录
        logout(){
            this.$confirm('你确定注销当前用户登录吗？', '注销登录', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'none'
            }).then(() => {
                this.$axios.post(this.$api.UserLogout).then(res=>{
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: '注销成功'
                    });
                    localStorage.clear();
                    this.$router.push({
                        name:'login'
                    })
                })
                
            }).catch(() => {
                         
            });
        }
    }
}
</script>

<style lang="less">
    @bgcolor:rgb(0, 0, 0);
    .home{
        height: 100vh;
        width: 100%;
        background: @bgcolor;
        color: white;
        user-select: none;
        position: relative;
        .display{
            display: flex;
            align-items: center;
        }
        //-------------------------------
        .el-header{
            box-sizing: border-box;
            line-height: 60px;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1999;
            background: rgba(0, 0, 0, 0.5);
            width: 100%;
            .logo{
                cursor: pointer;
                text-align: left;
                display: flex;
                align-items: center;
            }
            .title{
                font-size: 20px;
            }
            .header-right{
                text-align: right;
                line-height: 2;
                padding-right: 90px;
                cursor: pointer;
                img{
                    margin-left: 10px;
                }
                
            }
        }
        //------------------------------------------------------------
        .el-main{
            padding: 0px 0px;
            position: relative;
            border-top: 1px solid rgb(107, 158, 226);
            #mapBox{
                width: 100%;
                height: 100%;
                .amap-info{
                    .content-window-card {
                        position: relative;
                        box-shadow: none;
                        bottom: -20px;
                        left: 0;
                        width: auto;
                        padding: 0;
                        p {
                            height: 2rem;
                        }
                        div.info-top {
                            position: relative;
                            background: none repeat scroll 0 0 #F9F9F9;
                            border-bottom: 1px solid #CCC;
                            text-align: center;
                            // border-radius: 5px 5px 0 0;
                            div {
                                display: inline-block;
                                // color: #00c3ff;
                                color: #333;
                                font-size: 14px;
                                text-align: center;
                                font-weight: bold;
                                line-height: 31px;
                                padding: 0 24px;
                            }
                            img {
                                position: absolute;
                                top: 10px;
                                right: 4px;
                                transition-duration: 0.25s;
                                &:hover {
                                    box-shadow: 0px 0px 5px rgb(128, 68, 68);
                                }
                            }
                        }
                        div.info-middle {
                            font-size: 14px;
                            padding: 10px 6px;
                            line-height: 20px;
                            color: rgb(112, 112, 121);
                            text-align: left;
                        }
                        div.info-bottom {
                            height: 0px;
                            width: 100%;
                            clear: both;
                            text-align: center;
                            img {
                                position: relative;
                                z-index: 104;
                            }
                        }
        
                    }
                    .custom-info {
                            border: solid 1px rgb(179, 168, 168);
                    }
                }
            }
            .left_Mantle,.right_Mantle{
                width: 30%;
                height: 100%;
                position: fixed;
                // background: rgba(151, 192, 246, 0.2);
                background: rgba(0, 0, 0, 0.5);
                z-index: 199;
                padding-top: 20px;
            }
            .left_Mantle{
                left: 0;
                top: 60px;
                .left_Mantle_title{
                    display: flex;
                    align-items: center;
                    padding: 0px 20px;
                    p{
                        img{
                            vertical-align: middle;
                            margin-right: 10px;
                        }
                        margin-right: 50px;
                    }
                    .el-radio-button__inner{
                        background: #9DC3E6;
                        border: none;
                        color: white;
                    }
                    .el-radio-button__orig-radio:checked+.el-radio-button__inner{
                        background: #409EFF;
                    }
                }
                .left_Mantle_content{
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                    ul{
                        li{
                            width: 170px;
                            padding: 6px;
                            box-sizing: border-box;
                            height: 70px;
                            border: 1px double rgb(79, 109, 124);
                            border-radius: 0px 18px;
                            margin-bottom: 10px;
                            cursor: pointer;
                            p{
                                line-height: 1.5;
                                &.num{
                                    display: flex;
                                    align-items: center;
                                    padding-left: 16px;
                                    i{
                                        color: rgb(93, 184, 77);
                                    }
                                    span{
                                        color: rgb(223, 238, 20);
                                        font-size: 20px;
                                        font-family: Georgia, 'Times New Roman', Times, serif;
                                        flex: 2 0 auto;
                                    }
                                }
                            }
                            span{
                                &.green{
                                    color: rgb(93, 184, 77);
                                }
                            }
                        }
                    }
                    .el-table{
                        background: none;
                        color: white;
                        &::before {
                            height: 0px;
                        }
                        thead{
                            background: none;
                        }
                        th, tr,td{
                            background:none;
                            border: none;
                            .el-button{
                                padding: 0;
                                color: white;
                                img{
                                    width: 22px;
                                    margin-left: 10px;
                                }
                            }
                        }
                        th{
                            color: rgb(206, 246, 251);
                            font-weight: bold;
                        }
                        .el-table__empty-text{
                            color: white;
                        }
                       
                        el-table__row>td {
                            border: none;
                        }
                    }
                    .table_echarts{
                        flex: 2 0 auto;
                        padding-left: 6px;
                    }
                    .echarts_content{
                        width: 100%;
                        height: 100%;
                    }
                }
                .left_Mantle_content_hydrant{
                    ul{
                        min-height: 480px;
                        li{
                            width: 110px;
                        }
                    }
                }
            }
            .right_Mantle{
                right: 0;
                top: 60px;
                width: 20%;
                padding: 20px;
                box-sizing: border-box;
                .right_Mantle_total{
                   
                    div{
                        &:nth-child(1){
                            margin-bottom: 50px;
                        }
                        p{
                            text-align: left;
                            line-height: 1.5;
                            img{
                                width: 22px;
                                vertical-align: middle;
                                margin-right: 10px;
                            }
                            span{
                                &.num{
                                    font-size: 30px;
                                    font-family: Georgia, 'Times New Roman', Times, serif;
                                    color: rgb(90, 145, 235);
                                    padding-left: 32px;
                                    margin-right: 10px;
                                }
                            }
                        }
                    }
                }
                ul{
                    padding-top: 20px;
                    li{
                        margin-bottom: 16px;
                        p{
                            text-align: left;
                            line-height: 2;
                            span{
                                &.green{
                                    color: rgb(93, 184, 77);
                                }
                            }
                        }
                        .sliderbox{
                            // display: flex;
                            position: relative;
                            width: 90%;
                            .el-slider__runway.disabled .el-slider__bar{
                                background: #409EFF;
                            }
                            .totaldevicevalue{
                                position: absolute;
                                right: -40px;
                                top: 10px;
                                color: white;
                            }
                        }
                        
                    }
                }
            }
            .search_fireunitName{
                position: absolute;
                top: 70px;
                left: 62%;
                .el-input{
                    border: 1px solid white;
                    border-radius: 4px;
                }
                input{
                    background: transparent;
                    
                }

                .el-input-group__append{
                    background: #304F87;
                    border-color: #304F87;
                }
            }
            .switch_tab{
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translate(-50%, 0);
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 160px;
                // border: 1px solid firebrick;
                width: 30%;
                .el-button{
                    height: 44px;
                    width: 120px;
                }

            }
           
        }
        .alarmPhotoUrl{
            img{
                width: 100%;
                height: 100%;
            }
        }
       
    }
    .el-select-dropdown__wrap{
        max-height: none !important;
    }
</style>