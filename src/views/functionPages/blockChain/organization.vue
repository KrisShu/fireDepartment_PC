<template>
    <div class="organizationBox">
        <div class="top">
            <el-button type="primary" @click="add">新增</el-button>
        </div>
        <baseTable
            :columnList="columnList"
            :tableData="tableData"
            tableName="organization"
            @organization_OP="organization_OP"
        ></baseTable>
        <base-page :propPage='page' @currentChange="GetOrganizeList"></base-page>
        <!-- 新增和修改的弹窗 -->
        <base-dialog width="30%" :dialogfooter="true" @submit="add_updatesubmit" title="维护组织" ref="add_updatedialog">
            <div style="textAlign:center">
                <label>对应区域：</label>
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
           
        </base-dialog>
        <!-- 管理数据站的弹窗 -->
        <base-dialog  :dialogfooter="false" title="管理数据站" ref="managementDialog">
            <div class="managementDialog">
                <div class="top">
                    <p>所属组织：{{organizeName}}</p>
                    <el-button type="primary" @click="management_add">新增</el-button>
                </div>
                <baseTable
                    :columnList="columnList_management"
                    :tableData="tableData_management"
                    tableName="managementData"
                    @management_OP="management_OP"
                ></baseTable>
            </div>
        </base-dialog>
        <!-- 维护数据站 -->
        <base-dialog width="30%"  @submit="maintian_submit" :dialogfooter="true" title="维护数据站" ref="maintainDialog">
            <el-form ref="maintain_form" :model="maintain_form" label-width="100px">
                <el-form-item label="数据站编号：">
                    <el-input v-model="maintain_form.deviceSn"></el-input>
                </el-form-item>
                <el-form-item label="数据站地址：">
                    <el-input v-model="maintain_form.deviceAddress"></el-input>
                </el-form-item>
            </el-form>
        </base-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            columnList:[
                {
                    prop: "areaName",
                    label: "对应区域"
                },
                {
                    prop: "deviceNum",
                    label: "包含数据站数量"
                },
                {
                    label: "操作"
                }
            ],
            tableData:[
                {
                   fireUnitName:'aa' 
                }
            ],
            page:{
                DeptId:this.$store.state.userInfo.deptId,
                SkipCount:0,
                MaxResultCount:10,
                total:0,
                current:1
            },
            searchName:'',//对应区域搜索名称,
            Select_areaId:'',//对应区域搜索的选择区域id
            organizeId:'',//当前组织的id
            organizeName:'',//当前组织的名称
            columnList_management:[
                {
                    prop: "deviceSn",
                    label: "数据站编号"
                },
                {
                    prop: "deviceAddress",
                    label: "数据站地址"
                },
                {
                    prop: "state",
                    label: "数据站状态"
                },
                {
                    label: "操作"
                }
            ],
            tableData_management:[],
            maintain_form:{ //新增数据站的表单信息
                deviceSn:'',
                deviceAddress:'',
            },
            management_page:{
                OrganizeId:'',
                SkipCount:0,
                MaxResultCount:10,
                total:0,
                current:1
            }
        }
    },

    created(){
        this.GetOrganizeList();
    },
    methods:{
        //打开新增的弹窗
        add(){
            this.$refs.add_updatedialog.DialogVisible = true;
            this.searchName = ''
            this.organizeId = ''
        },
        //获取组织列表
        GetOrganizeList(){
            this.$axios.get(this.$api.GetOrganizeList,{params:this.page}).then(res=>{
                console.log("获取组织列表",res);
                ({items: this.tableData,totalCount: this.page.total} = res.result);
            })
        },
        //模糊查询的搜索
        querySearchAsync(queryString, callback){
            if(!queryString){
                return
            }
            let result =[];
            this.$axios.get(this.$api.GetAreasByName,{params:{areaName:queryString}}).then(res=>{
                // console.log("res",res)
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
            // console.log(item)
            this.Select_areaId = item.id
        },
        //新增和修改的提交
        add_updatesubmit(){
            let axios = this.organizeId ? this.$axios.put(this.$api.UpdateOrganize,{areaId:this.Select_areaId,organizeId:this.organizeId}) :
            this.$axios.post(this.$api.AddOrganize,{areaId:this.Select_areaId,deptId:this.$store.state.userInfo.deptId});


            axios.then(res=>{
                console.log(res)
                if(res.success){
                    this.$message({
                        message: this.organizeId ? '修改组织成功' :'新增组织成功',
                        type: 'success'
                    })
                    this.$refs.add_updatedialog.DialogVisible = false;
                    this.GetOrganizeList();
                }
            }).catch(err=>{
                    this.$message({
                        message: err.data.error.message,
                        type: 'warning'
                    })
            })
           
        },
        //table操作方法
        organization_OP(item,flga){
            console.log(item,flga)
            this.organizeId = item.organizeId
            this.organizeName = item.areaName
            if(flga == '修改'){
                this.searchName = item.areaName
                this.$refs.add_updatedialog.DialogVisible = true;
            }else if(flga == '管理数据站'){
                this.$refs.managementDialog.DialogVisible = true;
                this.maintain_form.organizeId = item.organizeId
                this.management_page.OrganizeId = item.organizeId
                this.GetOrganizeDeviceList();
            }else if(flga == '删除'){
                this.$axios.delete(this.$api.DeleteOrganize,{params:{organizeId:item.organizeId}}).then(res=>{
                    if(res.success){
                        this.$message({
                            message:'删除数据成功',
                            type: 'success'
                        })
                        this.GetOrganizeList();
                    }
                })
            }
        },
        //管理数据站的列表操作
        management_OP(item,flga){
            console.log("item",item)
            if(flga == '修改'){
                this.$refs.maintainDialog.DialogVisible = true;
                ({deviceSn:this.maintain_form.deviceSn,deviceAddress:this.maintain_form.deviceAddress,deviceId:this.maintain_form.deviceId} = item )
                console.log("dddddd",this.maintain_form)
            }else if(flga == '删除'){
                this.$axios.delete(this.$api.DeleteOrganizeDevice,{params:{deviceId:item.deviceId}}).then(res=>{
                    // console.log(res)
                    if(res.success){
                        this.$message({
                            message:'删除数据成功',
                            type: 'success'
                        })
                        this.GetOrganizeDeviceList();
                    }
                })
            }
        },
        //打开新增管理数据站
        management_add(){
            this.$refs.maintainDialog.DialogVisible = true;
            this.maintain_form.deviceAddress = ''
            this.maintain_form.deviceSn = ''
            this.maintain_form.deviceId = ''
            
        },
        //新增和修改数据站
        maintian_submit(){
            let axios = this.maintain_form.deviceId ? this.$axios.put(this.$api.UpdateOrganizeDevice,this.maintain_form) :
            this.$axios.post(this.$api.AddOrganizeDevice,this.maintain_form);

            axios.then(res=>{
                console.log("res",res)
                if(res.success){
                    this.$message({
                        message: this.maintain_form.deviceId ? '修改组织成功': '新增组织成功',
                        type: 'success'
                    })
                    this.GetOrganizeDeviceList();
                }
            }).catch(err=>{
                this.$message({
                    message: err.data.error.message,
                    type: 'error'
                })
            })
            this.$refs.maintainDialog.DialogVisible = false;
        },
        //获取数据站列表
        GetOrganizeDeviceList(){
            this.$axios.get(this.$api.GetOrganizeDeviceList,{params:this.management_page}).then(res=>{
                // console.log("获取数据站列表",res);
                ({items: this.tableData_management,totalCount: this.management_page.total} = res.result);
            })
        }

    }
}
</script>

<style lang="less">
.organizationBox{
    display: flex;
    flex-direction: column;
    height: 100%;
    &>:nth-child(2){
        flex: 2 0 auto;
    }
    &>.top{
        text-align: right;
        margin-bottom: 20px;
    }
    .managementDialog{
        .top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
        }
    }
}
</style>