<template>
    <div class="pageBox">
        <el-pagination
            background
            hide-on-single-page
            layout="prev, pager, next"
            :total="propPage.total"
            :current-page="propPage.current"
            :page-size="propPage.MaxResultCount"
            prev-text="上一页"
            next-text="下一页"
            @current-change="currentChange"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    props:{
        propPage:{
            required: true,
            type: Object
        }
    },
    methods:{
        currentChange(val){
            console.log("currentChange",val)
            let p = this.propPage;
            p.current = val;
            p.SkipCount = (val - 1) * p.MaxResultCount; // todo 分页，需要跳过多少数据进行查询
            this.$emit("currentChange");
        }
    }
}
</script>

<style lang="less">
    .pageBox{
        background: #0E4878;
        padding-bottom: 6px;
        text-align: center;
        button{
            padding: 0 4px !important;
             background: #167FC1 !important;
             color: white !important;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active {
            background-color: #11335b !important;
            border: 1px solid #167fc1;
        }
        .number,
        .el-icon,
        .more,
        .btn-quickprev,
        .el-icon-more {
            background-color:#167fc1 !important;
            color:white !important;
        }
    }
</style>