<template>
    <el-scrollbar>
        <el-container class="functionPagesIndexBox">
            <el-header>
                <div class="title">
                    <p>城市智慧消防预警工作台</p>
                </div>
                <div class="base-header-tit"></div>

                <div class="logout">
                    <span>{{$store.state.userInfo.areaName}}</span>
                    <img style="cursor: pointer;" @click="logout" src="../../assets/images/top_img_04.png" alt="">
                </div>
            </el-header>
            <el-container class="main_content">
                <el-aside el-aside width="200px">
                    <base-aside>
                    </base-aside>
                </el-aside>
             
                <el-main>
                  <el-scrollbar>
                    <router-view></router-view>
                  </el-scrollbar>
                </el-main>
            
            </el-container>
        </el-container>
    </el-scrollbar>
</template>

<script>
import baseAside from '../../components/baseAside.vue'
export default {
    components:{
        baseAside
    },
    methods:{
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
    .functionPagesIndexBox{
        background-image: url("../../assets/images/mainBack.png");
        background-repeat: repeat-y;
        background-size: 100%, 100%;
        height: 100vh;
        //---------------------header-----------------------------------
        .el-header{
            height:66px !important;
            position: relative;
            .title{
                font-size: 24px;
                p{
                    line-height: 2;
                }
            }
            .base-header-tit{
                    position: absolute;
                    bottom: -12px;
                    right: 50%;
                    transform: translateX(50%);
                    width: 600px;
                    height: 50px;
                    opacity: 0.5;
                    background-image: url("../../assets/images/title2.gif");
                    background-size: 100%;
                    background-repeat: no-repeat;
                    background-position: center center;
            }
            .logout{
                position: absolute;
                right: 20px;
                bottom: 50%;
                transform: translateY(50%);
                display: flex;
                align-items: center;
                img{
                    margin-left: 6px;
                    cursor: pointer;
                }
            }
        }
        //---------------------content-----------------------------------
        .main_content{
            border: 1px solid rgb(100, 100, 100);
            padding: 6px;
            overflow: hidden;
            .el-aside{
                overflow: hidden;
            }
            .el-scrollbar {
                height: 100%;
                width: 100%;
            }
            .el-scrollbar__wrap {
                overflow-x: hidden;
                .el-scrollbar__view{
                    height: 100%;
                }
            }
            .el-main{
                margin-left: 4px;
                border-image: url("../../assets/images/mapBoeder.png") 32 37 repeat stretch;
                border-width:  20px 20px;
                border-style: solid;
                box-sizing: border-box;
                padding: 0;
            }
        }
    }
</style>