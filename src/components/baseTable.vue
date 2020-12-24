<template>
    <div class="base-table">
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                show-overflow-tooltip
                v-for="(item, index) in columnList"
                :width="item.width"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :align="item.align ? item.align : 'center'"    
            >
                <template slot-scope="scope">
                    <!-- 如果存在两个prop值 -->
                    <span v-if="item.prop == 'sign'" > {{scope.row[item.prop]}}：{{scope.row[item.prop2]}}</span>
                    <!-- 火警联网 -->
                    <span class="cursor" :class="getclass(scope.row[item.prop],tableName)" v-else-if="(tableName == 'Firealarmnetwork' || tableName == 'Firealarmnetwork_d') && (item.prop == 'state' || item.prop == 'checkState')" > 
                        {{scope.row[item.prop] | Firealarmnetwork(item) }}
                        <i 
                            @click="getBitMap(scope.row.fireAlarmId)" 
                            class="BitMap" 
                            v-if="scope.row.existBitMap && tableName == 'Firealarmnetwork'"
                        >点位图</i>
                    </span>
                    <span v-else-if="item.slot && scope.row[item.prop]">
                        <el-button type="text" @click="getSlotDetail(scope.row, item.slot)">
                        {{ scope.row[item.prop] }}
                        <i class="el-icon-zoom-in"></i>
                        </el-button>
                    </span>

                    <!-- 安全用电 -->
                    <span class="cursor"  :class="getstateclass(scope.row[item.prop])" v-else-if="tableName == 'Safeelectric' && item.prop == 'state'" > {{scope.row[item.prop] | Safeelectric }}</span>
                    <!-- 安全用电操作 -->
                    <div class="cursor"   v-else-if="tableName == 'Safeelectric' && item.prop == 'Safeelectric_d'" > 
                        <el-button
                            @click="getdetails(scope.row)"
                            size="mini"
                            type="text"
                            icon="el-icon-search"
                        >详情</el-button>
                        <el-button
                            @click="refresh(scope.row)"
                            size="mini"
                            type="text"
                            icon="el-icon-refresh-left"
                        >数值刷新</el-button>
                        <el-button
                            @click="powerOff(scope.row)"
                            size="mini"
                            type="text"
                            icon="el-icon-warning-outline"
                        >断电</el-button>
                        <el-button
                            @click="deletedata(scope.row)"
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                        >删除</el-button>
                    </div>
                    <!-- 安全用电数值 -->
                    <div class="cursor"   v-else-if="tableName == 'Safeelectric' && item.prop == 'phaseType'">
                        <!-- <ul v-if="scope.row[item.prop7]"> -->
                        
                        <ul>
                            <li v-if="scope.row[item.prop]== 1">
                                <p>
                                    <span>L：{{scope.row[item.prop1]}}</span>
                                    <span @click="gettrend(scope.row,'L')" class="cursor">趋势</span>
                                </p>

                                <p>
                                    <span>N：{{scope.row[item.prop2]}}</span>
                                    <span @click="gettrend(scope.row,'N')" class="cursor">趋势</span>
                                </p>
                            </li>
                            <li v-if="scope.row[item.prop]== 2">
                               <p>
                                   <span>L1：{{scope.row[item.prop4]}}</span>
                                   <span @click="gettrend(scope.row,'L1')" class="cursor">趋势</span>
                                </p>
                                <p>
                                   <span>L2：{{scope.row[item.prop5]}}</span>
                                   <span @click="gettrend(scope.row,'L2')" class="cursor">趋势</span>
                                </p>
                                <p>
                                   <span>L3：{{scope.row[item.prop6]}}</span>
                                   <span @click="gettrend(scope.row,'L3')" class="cursor">趋势</span>
                                </p>

                                <p>
                                    <span>N：{{scope.row[item.prop2]}}</span>
                                    <span @click="gettrend(scope.row,'N')" class="cursor">趋势</span>
                                </p>
                            </li>
                            <li v-if="scope.row[item.prop0]">
                                剩余电流：{{scope.row[item.prop3]}}
                                <span @click="gettrend(scope.row,'A')" class="cursor">趋势</span>
                            </li>
                        </ul>

                    </div>
                    <!-- 独立火警 -->
                    <span class="cursor" :class="Independentfirealarm_color(scope.row[item.prop],item)"   v-else-if="tableName == 'Independentfirealarm' && (item.prop == 'state' || item.prop == 'checkState')" > 
                        {{scope.row[item.prop] | Independentfirealarm(item) }}
                    </span>
                    <!-- 消防管网 -->
                    <span class="cursor"  :class="Firepiep_color(scope.row[item.prop],item)" v-else-if="tableName == 'Firepiep' && (item.prop == 'state' || item.prop == 'alarmHandleStatus')" > 
                        {{scope.row[item.prop] | Firepiep(item) }}
                    </span>
                    <!--  -->
                    <span class="cursor"  v-else-if="tableName == 'Firepiep' && item.prop == 'monitorType'" > {{scope.row[item.prop] | monitorType }}</span>
                    <!-- 市政消火栓状态 -->
                    <span class="cursor" :class="statusClass(scope.row[item.prop])"  v-else-if="(tableName == 'firehydrant'|| tableName == 'FirehydrantPiep' )&& item.prop == 'status'" > {{scope.row[item.prop] | status }}</span>
                    <!-- 市政消火栓 -->
                    <span class="cursor"   v-else-if="tableName == 'Policeincident' && item.prop == 'handleStatus'" > {{scope.row[item.prop] | handleStatus }}</span>
                    <!-- 市政消火栓 -->
                    <span class="cursor"   v-else-if="tableName == 'Policeincident' && item.prop == 'alarmEvent'" > {{scope.row[item.prop] | alarmEvent }}</span>
                    <span class="cursor"  @click="getmapBot(scope.row)" v-else-if="item.prop == 'existBitMap'">
                        {{scope.row[item.prop] ? '点位图' :''}}
                    </span>
                    <span class="cursor"  v-else-if="item.prop == 'alarmPhotoUrl'">
                        <el-button @click="lookalarmPhotoUrl(scope.row[item.prop])" type="text">查看</el-button>
                    </span>
                    <!-- 数据站的状态 -->
                    <span :class="statusClass(scope.row[item.prop])" v-if="item.prop == 'state'&& tableName == 'managementData'">
                        {{scope.row[item.prop] | status }}
                    </span>
                    <!-- 时间处理 -->
                    <span v-else-if="item.prop == 'creationTime' || item.prop == 'netTime'  || item.prop == 'alarmTime'">{{scope.row[item.prop] |dealTime}}</span>
                    <!-- 联盟区块链下的组织table -->
                    <div v-else-if="!item.prop && tableName == 'organization'">
                        <el-button type="text" @click="organization_OP(scope.row,'修改')">修改</el-button>
                        <el-button type="text" @click="organization_OP(scope.row,'管理数据站')">管理数据站</el-button>
                        <el-button type="text" @click="organization_OP(scope.row,'删除')">删除</el-button>
                    </div>
                    <!-- 联盟区块链下的组织下的管理数据站 -->
                    <div v-else-if="!item.prop && tableName == 'managementData'">
                        <el-button type="text" @click="management_OP(scope.row,'修改')">修改</el-button>
                        <el-button type="text" @click="management_OP(scope.row,'删除')">删除</el-button>
                    </div>
                    <div v-else-if="!item.prop">
                        <el-button @click="fireunitCard(scope.row)" type="text">防火单位熟悉卡</el-button>
                        <el-button @click="datareport(scope.row)" type="text">智慧消防数据综合报告</el-button>
                    </div>
                    <!-- 默认值显示，值为空则显示-    -->
                    <span v-else>{{ scope.row[item.prop] | capitalize(item) }}</span>
                </template>
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
export default {
    props:{
        columnList: {
            type: Array,
            require: true
        },
        tableData: {
            type: Array,
            require: true
        },
        tableName:{
            type:String,
            require:true
        }
    },
    filters: {
        Firealarmnetwork:(val,item)=>{
            // console.log("Firealarmnetwork",val,item)
            if(item.prop == "checkState"){
                if(val == 1){
                    return '未核警'
                }else if(val == 2){
                    return '误报'
                }else if(val == 3){
                    return '测试'
                }else if(val == 4){
                    return '真实火警'
                }else if(val == 5){
                    return '未核警'
                }
            }else if(item.prop == 'state'){
                if(val == 1){
                    return '在线'
                }else if(val == -1){
                    return '离线'
                }
            }
        },
        Safeelectric:(val)=>{
             if(val == -1){
                return '离线'
            }else if(val == 2){
                return '良好'
            }else if(val == -2){
                return '超限'
            }else if(val == -4){
                return '故障'
            }else if(val == -3){
                return '隐患'
            }
        },
        Independentfirealarm:(val,item)=>{
            if(item.prop == "checkState"){
                if(val == 1){
                    return '未核警'
                }else if(val == 2){
                    return '误报'
                }else if(val == 3){
                    return '测试'
                }else if(val == 4){
                    return '真实火警'
                }else if(val == 5){
                    return '未核警'
                }
            }else if(item.prop == 'state'){
                if(val == 1){
                    return '正常'
                }else if(val == 2){
                    return '故障'
                }else if(val == -1){
                    return '离线'
                }
            }
        },
        Firepiep:(val,item)=>{
            if(item.prop == "alarmHandleStatus"){
                if(val == 1){
                    return '未处理'
                }else if(val == 2){
                    return '误报'
                }else if(val == 3){
                    return '已处理'
                }else if(val == 4){
                    return '忽略'
                }
            }else if(item.prop == "state"){
                if(val == 2){
                    return '良好'
                }else if(val == -2){
                    return '超限'
                }else if(val == -1){
                    return '离线'
                }
            }
        },  
        monitorType:(val)=>{
            if(val == 1){
                return '液位'
            }else if(val == 2){
                return '水压'
            }
        },
        status:(val)=>{
            if(val == 1){
                return '在线'
            }else if(val == -1){
                return '离线'
            }
        },
        handleStatus:(val)=>{
            if(val == 1){
                return '未处理'
            }else if(val == 2){
                return '已处理'
            }
        },
        alarmEvent:(val)=>{
            if(val == 1){
                return '封盖开启'
            }else if(val == 2){
                return '出现流水'
            }else if(val == 3){
                return '碰撞倾斜'
            }else if(val == 4){
                return '闷盖旋转'
            }else if(val == 5){
                return '电量不足'
            }else if(val == 6){
                return '水压超限'
            }
        },
        // todo 对于没有值和为0的值显示为-、unit是单位名
        capitalize: function(val, item) {
            return val ? `${val}${item.unit ? item.unit : ""}` : "—";
        },
        //时间格式处理
        dealTime:(val)=>{
            // console.log("time",val)
            var str = val.split('T');
            var str2 = str[1].split(".")
            var timestr = str[0] +" "+ str2[0]
            return timestr;
        }
    },
    methods:{
        getclass(val,tableName){
            // console.log("val",val)
            if(tableName == 'Firealarmnetwork'){
                if(val == 1){
                    return 'gray'
                }else if(val == 2 || val == 3 || val == 4){
                    return 'lightBlue'
                }else if(val == 5){
                    return 'gray'
                }
            }else if(tableName == 'Firealarmnetwork_d'){
                if(val == -1){
                    return 'gray'
                }else if(val == 1){
                    return 'green'
                }
            }
           
        },
        //
        getstateclass(val){
            if(val == -1){
                return 'gray'
            }else if(val == 2){
                return 'green'
            }else if(val == -2){
                return 'orange'
            }else if(val == -4){
                return 'yellow'
            }else if(val == -3){
                return 'yellow'
            }
        },
        statusClass(val){
            console.log("statusClass",val)
            if(val == 1){
                return 'green'
            }else if(val == -1){
                return 'gray'
            }
        },
        Independentfirealarm_color(val,item){
            if(item.prop == "checkState"){
                
            }else if(item.prop == 'state'){
                if(val == 1){
                    return 'green'
                }else if(val == 2){
                    return 'yellow'
                }else if(val == -1){
                    return 'gray'
                }
            }
        },
        Firepiep_color(val,item){
            if(item.prop == "alarmHandleStatus"){
               
            }else if(item.prop == "state"){
                if(val == 2){
                    return 'green'
                }else if(val == -2){
                    return 'yellow'
                }else if(val == -1){
                    return 'gray'
                }
            }
        },
        getdetails(item){
            this.$emit('getdetails',item)
        },
        //获取趋势
        gettrend(item,flag){
            // console.log(item,flag);
            this.$emit('gettrend',item,flag)
        },
        //
        refresh(scope){
            this.$emit('refresh',scope)
        },
        //
        powerOff(scope){
            this.$confirm('您确认要对该设备所在线路执行断电操作吗？','断电',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
              this.$emit('powerOff',scope)
            }).catch(()=>{

            })
            
        },
        //
        deletedata(scope){
            this.$confirm('确定删除该数据？','删除数据',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
              this.$emit('deletedata',scope)
            }).catch(()=>{

            })
        },
        //火警联网的获取趋势
        getBitMap(fireAlarmId){
            this.$emit('getBitMap',fireAlarmId)
        },
        //消防设施下的事件查询
        getSlotDetail(itme,text){
            // console.log(itme,text)
            this.$emit('getSlotDetail',itme,text)
        },
        //获取点位图
        getmapBot(item){
            console.log("获取点位图",item)
            this.$emit('getmapBot',item)
        },
        //打开防火单位熟悉卡
        fireunitCard(item){
            this.$emit('fireunitCard',item)
        },
        //获取综合数据报告
        datareport(item){
             this.$emit('datareport',item)
        },
        //查看消防通道堵塞的报警图片
        lookalarmPhotoUrl(url){
            // console.log("lookalarmPhotoUrl",url)
            this.$emit('lookalarmPhotoUrl',url)
        },
        //2020/12/24新增模块组织的操作方式
        organization_OP(item,flga){
            if(flga == '删除'){
                this.$confirm('确定删除该数据？','删除数据',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.$emit('organization_OP',item,flga)
                }).catch(()=>{

                })
            }else{
                this.$emit('organization_OP',item,flga)
            }
        },
        management_OP(item,flga){
            if(flga == '删除'){
                this.$confirm('确定删除该数据？','删除数据',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                this.$emit('management_OP',item,flga)
                }).catch(()=>{

                })
            }else{
                this.$emit('management_OP',item,flga)
            }
        }
    }
}
</script>

<style lang="less">
    .base-table{
        background: #0E4878;
        .el-table th {
            background-color:#167FC1;
            color: white;
        }
        tbody {
            td{
                color: white;
                .cell{
                     line-height: 40px;
                }
            }
            tr:nth-of-type(odd) {
                background-color: #0E4878;
            }
            tr:nth-of-type(even){
                background: #11335B;
            }
            .el-button--text{
                color: #00e4ff !important;
            }
        }
        .el-table--enable-row-hover .el-table__body tr:hover > td {
            background-color: #167fc1 !important;
        }
        .el-table__empty-block {
            background-color: #0e4878;
        }
        .cursor{
            cursor: pointer;
        }
        .yellow{
            color: #E6A23C;
        }
        .lightBlue{
            color: rgb(116, 220, 255);
        }
        .orange{
            color: #F56C6C;
        }
        .green{
            color: rgb(47, 226, 47);
        }
        .gray{
            color: rgb(216, 213, 213);
        }

        ul{
            li{
                span.cursor{
                    margin-left: 6px;
                    text-decoration: underline;
                     
                }
                p{
                    line-height: normal;
                }
               
            }
        }
        .BitMap{
            color: rgb(94, 187, 241) !important;
            margin-left: 20px;
        }

    }
    
</style>