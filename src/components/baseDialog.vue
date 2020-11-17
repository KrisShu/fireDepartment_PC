<template>
    <el-dialog
        :title="title"
        :visible.sync="DialogVisible"
        :width='width'
        center
    >
   <slot></slot>
    <span slot="footer" v-if="dialogfooter" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
    </span>
    </el-dialog>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default(){
                return '标题'
            }
        },
        width:{
            type:String,
            default(){
                return '50%'
            }
        },
        dialogfooter:{
            type:Boolean,
            default(){
                return true
            }
        }
    },
    data(){
        return{
            DialogVisible:false
        }
    },
    methods:{
        submit(){
            this.$emit('submit')
        }
    }
}
</script>

<style lang="less">
    .el-dialog{
        background: #41629D !important;
        
        .el-dialog__header{
            background: #1387E1 !important;
            .el-dialog__title{
                color: white !important;
                font-weight: bold;
                font-size: 20px;
            }
            .el-dialog__headerbtn{
                .el-dialog__close{
                    color: white;
                    font-weight: bold;
                    font-size: 18px;
                }
            }
            
        }
        .el-dialog__body{
            color: white !important;
        }
    }
</style>