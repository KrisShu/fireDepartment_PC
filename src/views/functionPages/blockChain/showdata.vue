
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
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div style="marginLeft:40px">
                    <label>防火单位：</label>
                    <el-autocomplete
                        v-model="searchName"
                        :fetch-suggestions="querySearchAsync"
                        @select="handleSelect"
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
        <div v-if="verification">
            <div v-if="!unitshow" class="organizationdata">
                <p class="tips">验证完成！组织内数据共有<span class="num">5</span> 台，其中<span class="num">5</span>台在线，<span class="num">5</span>台离线</p>
                <baseTable
                    :columnList="columnList"
                    :tableData="tableData"
                ></baseTable>
            </div>
            <div v-else class="UnitData">
                <p class="tips">来源数据站：</p>
                <baseTable
                    :columnList="columnList_unit"
                    :tableData="tableData"
                ></baseTable>
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
            timerange:'',//时间范围
            fireUnitName:'',//防火单位名字
            disabled:true,//按钮是否能点击，true不能
            columnList:[
                {
                    prop: "fireUnitName",
                    label: "组织"
                },
                {
                    prop: "fireUnitName",
                    label: "数据站"
                },
                {
                    prop: "fireUnitName",
                    label: "本地区指纹验证"
                },
                {
                    prop: "fireUnitName",
                    label: "组织级区块指纹验证"
                }
            ],
            tableData:[],
            unitshow:false,//
            columnList_unit:[
                {
                    prop: "fireUnitName",
                    label: "记录时间"
                },
                {
                    prop: "fireUnitName",
                    label: "防火单位"
                },
                {
                    prop: "fireUnitName",
                    label: "记录类型"
                },
                {
                    prop: "fireUnitName",
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
            this.$axios.get(this.$api.GetOrganizeVerifyResult,{params:{AreaId:this.selected_AreaId}}).then(res=>{
                console.log(res)
                if(res.success){

                }
            }).catch(err=>{
                    this.$message({
                        message: err.data.error.message,
                        type: 'warning'
                    })
            })
        },
        select(){
            this.unitshow = true
        }
    }
}
</script>

<style lang="less">
    .showdataBox{
        text-align: left;
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
        .organizationdata{
            margin-top: 20px;
            .tips{
                margin-bottom: 20px;
                .num{
                    font-size: 22px;
                }
            }
        }
    }
</style>