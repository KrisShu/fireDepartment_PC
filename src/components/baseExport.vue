<template>
    <el-tooltip class="item" effect="dark" content="表格导出" placement="left-start">
        <img @click="exportdata" src="../assets/images/report.png" alt="">
    </el-tooltip>
</template>

<script>
export default {
    methods:{
        exportdata(){
            this.$confirm('确定导出当前页数据吗？', '导出数据', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'none'
            }).then(() => {
               this.$emit('exportdata')
                
            }).catch(() => {
                         
            });
        }
    }
}
</script>

<style>

</style>