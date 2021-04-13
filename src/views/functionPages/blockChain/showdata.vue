
<template>
    <div class="showdataBox">
        <div class="selectbox">
            <div class="Fuzzyquery">
                <label>组织：</label>
                <el-autocomplete
                    v-model="searchName"
                    :fetch-suggestions="querySearchAsync"
                    @select="handleSelect"
                    :hide-loading="true"
                    :trigger-on-focus= "false"
                    clearable
                >
                </el-autocomplete>
                <el-button @click="verify" style="marginLeft:10px" type="primary">数据站区块验证</el-button>
            </div>
            <div class="Unitquery">
                <div>
                    <label>日期：</label>
                    <el-date-picker
                    v-model="timerange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                     value-format="yyyy-MM-dd"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div style="marginLeft:40px">
                    <label>防火单位：</label>
                    <el-autocomplete
                        v-model="searchFireName"
                        :fetch-suggestions="querySearchAsync_FireUnit"
                        @select="handleSelect_FireUnit"
                        :hide-loading="true"
                        :trigger-on-focus= "false"
                        clearable
                    >
                    </el-autocomplete>
                </div>
                 <el-button :disabled="disabled" @click="select" style="marginLeft:10px" type="primary">查询</el-button>
            </div>
        </div>
        <!--  -->
        <div class="" v-if="verification">
            <div v-if="!unitshow" class="verification-content organizationdata">
                <p class="tips">{{verificationText}}</p>
                <baseTable
                    :columnList="columnList"
                    :tableData="tableData"
                ></baseTable>
            </div>
            <div v-else class="verification-content UnitData">
                <p class="tips">来源数据站：{{deviceSn}}</p>
                <baseTable
                    :columnList="columnList_unit"
                    :tableData="tableData_unit"
                ></baseTable>
                <base-page :propPage='selectPage' @currentChange="GetselectPageList"></base-page>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchName:'',//模糊查询输入值
            selected_AreaId:'',//
            verification:false,//是否验证成功
            columnList:[
                {
                    prop: "areaName",
                    label: "组织"
                },
                {
                    prop: "deviceSn",
                    label: "数据站"
                },
                {
                    prop: "selfVerifyResult",
                    label: "本地区块指纹验证"
                },
                {
                    prop: "organizeVerifyResult",
                    label: "组织级区块指纹验证"
                }
            ],
            tableData:[],
            verificationText:'',//验证结论
            unitshow:false,//
            timerange:[],//时间范围
            searchFireName:'',
            disabled:true,//按钮是否能点击，true不能
            deviceSn:'',
            selectmessage:'',
            selectPage:{
                FireUnitId:0,
                StartDate:'',
                EndDate:'',
                MaxResultCount:9,
                SkipCount:0,
                total:0,
            },
            tableData_unit:[],
            columnList_unit:[
                {
                    prop: "creationTime",
                    label: "记录时间"
                },
                {
                    prop: "fireUnitName",
                    label: "防火单位"
                },
                {
                    prop: "systemType",
                    label: "记录类型"
                },
                {
                    prop: "action",
                    label: "行为记录"
                }
            ]


        }

    },
    methods:{
         //模糊查询的搜索
        querySearchAsync(queryString, callback){
            if(!queryString){
                return
            }
            let result =[];
            this.$axios.get(this.$api.GetOrganizeForDropdown,{params:{AreaName :queryString,DeptId:this.$store.state.userInfo.deptId}}).then(res=>{
                for(let item of  res.result) {
                result.push({
                    value:item.areaName,
                    id:item.areaId
                })
                }
                clearTimeout(this.timeout);
                this.timeOut = setTimeout(()=>{
                    callback(result)
                })
            })
        },
        handleSelect(item){
            this.selected_AreaId = item.id
        },
        //数据站区块验证
        verify(){
            this.unitshow = false
            if(!this.searchName){
                return
            }
            let verifymessage =  this.$message({
                    message: '数据站区块验证中，请稍候......',
                    type: 'warning',
                    duration:0
            });
            this.$axios.get(this.$api.GetOrganizeVerifyResult,{params:{AreaId:this.selected_AreaId}}).then(res=>{
                console.log("数据站区块验证中返回的数据",res)
                if(res.success){
                    verifymessage.close();
                    if(res.result.verifyResultList.length>0){
                        this.disabled = false//查询按钮可用
                        this.verification = true
                        this.verificationText = res.result.result//验证结论
                        this.tableData = res.result.verifyResultList

                    }
                }
            }).catch(err=>{
                    this.$message({
                        message: err.data.error.message,
                        type: 'error'
                    })
            })
        },
        //模糊查询防火单位
        querySearchAsync_FireUnit(queryString, callback){
            if(!queryString){
                return
            }
            let result =[];
            this.$axios.post(this.$api.QueryFireUnitLikeName,{matchName:queryString,areaId:this.$store.state.userInfo.areaId}).then(res=>{
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
        handleSelect_FireUnit(item){
            this.selectPage.FireUnitId = item.id
        },
        select(){
            this.selectmessage =  this.$message({
                    message: '获取数据中......',
                    type: 'warning',
                    duration:0
            });
            this.unitshow = true 
            console.log(this.timerange)
            if(this.timerange){ 
                this.selectPage.StartDate = this.timerange[0]
                this.selectPage.EndDate = this.timerange[1]
            }else{
                 this.selectPage.StartDate =  ''
                 this.selectPage.EndDate = ''
            }
           this.GetselectPageList();

           
        },
        GetselectPageList(){
            this.$axios.get(this.$api.GetBlockDataList,{params:this.selectPage}).then(res=>{
                console.log("查询获得",res);
                this.selectmessage.close();
                this.deviceSn = res.result.deviceSn;

                ({items:this.tableData_unit,totalCount:this.selectPage.total} = res.result.blockDataList)

            }).catch(err=>{
                console.log(err)
                this.$message({
                    message:err.data.error.message,
                    type: 'error'
                });
            })
        }
    }
}
</script>

<style lang="less">
    .showdataBox{
        display: flex;
        flex-direction: column;
        height: 100%;
        &>:nth-child(2){
            flex: 2 0 auto;
        }
        text-align: left;
        .verification-content{
            display: flex;
            flex-direction: column;
            height: 100%;
            &>:nth-child(2){
                flex: 2 0 auto;
            }
        }
        .Fuzzyquery{
            margin-bottom: 20px;
        }
        .Unitquery{
            display: flex;
            input{
                background-color: #304f87 !important;
                border: 1px solid #304f87 !important;
                color: white;
            }

        }
        .organizationdata,.UnitData{
            margin-top: 20px;
            .tips{
                margin-bottom: 20px;
            }
        }
    }
</style>