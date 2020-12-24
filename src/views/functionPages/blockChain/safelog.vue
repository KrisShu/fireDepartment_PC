<template>
    <div class="safelogBox">
        <div class="top">
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
            <el-button @click="select" style="marginLeft:10px" type="primary">查询</el-button>
        </div>
        <baseTable
            :columnList="columnList"
            :tableData="tableData"
        ></baseTable>
        <base-page :propPage='page' @currentChange="GetBlockDeviceLogList"></base-page>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchName:"",//模糊查询
            selected_AreaId:'',//
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
                    prop: "creationTime",
                    label: "日志时间"
                },
                {
                    prop: "remark",
                    label: "安全日志"
                }
            ],
            tableData:[],
            page:{
                AreaId:0,
                SkipCount:0,
                MaxResultCount:10,
                total:0,
                current:1
            },


        }
    },
    created(){
        this.GetBlockDeviceLogList();

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

        select(){
            if(this.selected_AreaId){
                this.page.AreaId = this.selected_AreaId
            }
            
            this.selected_AreaId = ''
            this.GetBlockDeviceLogList();
        },
        //获取安全日志列表
        GetBlockDeviceLogList(){
            this.$axios.get(this.$api.GetBlockDeviceLogList,{params:this.page}).then(res=>{
                console.log("GetBlockDeviceLogList",res);
                ({items: this.tableData,totalCount: this.page.total} = res.result);
            })
        }
    }
}
</script>

<style lang="less">
    .safelogBox{
        .top{
            text-align: left;
            margin-bottom: 20px;
        }
    }
</style>