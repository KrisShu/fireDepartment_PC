<template>
    <el-form ref="form"  :inline="true" :model="searchform" label-width="100px">
        <el-form-item label="防火单位：">
            <el-input clearable placeholder="请输入防火单位名称" v-model="searchform.name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data(){
        return{
            searchform:{
                name:''
            }
        }
    },
    methods:{
        onSearch(){
            this.$emit('getSearchName',this.searchform.name)
        }
    }
}
</script>

<style lang="less">
    .el-form{
        .el-form-item__label{
            color: white;
        }
    }
</style>