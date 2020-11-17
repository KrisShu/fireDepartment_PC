<template>
    <div class="asidemenu">
        <el-menu
            :default-active="menuValue"
            background-color="transparent"
            text-color="#fff"
            :unique-opened="true"
            class="el-menu-vertical-demo"
            @select="handleSelect"
        >
            <el-submenu v-for="(item, index) in asideList" :key="index" :index="item.title">
                <template slot="title">
                    <img class="icon" alt :src="item.icon" />
                    <span class="text">{{ item.title }}</span>
                </template>
                <el-menu-item v-for="(a, b) in item.child" :key="b" :index="a.url">{{ a.name }}</el-menu-item>
            </el-submenu>
        </el-menu>
        <img class="logo" @click="goHome" src="../assets/images/logo2.png" alt="">
    </div>
</template>

<script>
export default {
    data(){
        return{
            menuValue: "Firealarmnetwork",
            asideList:[
                {
                    title: "隐患及警情",
                    icon: require("../assets/images/yujing.png"),
                    child:[
                        {
                            url: "Firealarmnetwork",
                            name: "火警联网"
                        },
                        {
                            url: "Independentfirealarm",
                            name: "独立火警"
                        },
                        {
                            url: "Safeelectric",
                            name: "安全用电"
                        },
                        {
                            url: "Firepiep",
                            name: "消防管网"
                        },
                    ]
                },
                {
                    title: "消防设施",
                    icon: require("../assets/images/sheshi.png"),
                    child:[
                        {
                            url: "Firealarmnetwork_d",
                            name: "火警联网"
                        },
                        {
                            url: "Independentfirealarm_d",
                            name: "独立火警"
                        },
                        {
                            url: "Safeelectric_d",
                            name: "安全用电"
                        },
                        {
                            url: "Firepiep_d",
                            name: "消防管网"
                        }
                    ]
                },
                {
                    title: "防火单位",
                    icon: require("../assets/images/danwei.png"),
                    child:[
                        {
                            url: "Fireunit",
                            name: "防火单位"
                        }
                    ]
                },
                {
                    title: "市政消火栓",
                    icon: require("../assets/images/hydrant.svg"),
                    child:[
                        {
                            url: "Firehydrant",
                            name: "市政消火栓"
                        },
                        {
                            url: "FirehydrantPiep",
                            name: "市政消防管网"
                        },
                        {
                            url: "Policeincident",
                            name: "警情事件"
                        }
                    ]
                }
            ]
        }
    },
    watch:{
        '$route'(to){
            this.menuValue=to.name
        }
    },
    created(){
        // console.log("this.$route.name",this.$route.name)
        this.menuValue = this.$route.name;
    },
    methods:{
        handleSelect(key) {
            console.log(key);
            this.menuValue = key;
            this.$router.push({
                name: key
            });
        },
        //回转到数据大屏
        goHome(){
            this.$router.push({
                name:'Home'
            })
        }
    }
}
</script>

<style lang="less">
    .asidemenu{
        height: 100%;
        border-image: url("../assets/images/mapBoeder.png") 32 37 repeat stretch;
        border-width:  20px 20px;
        border-style: solid;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        // padding: 0 6px;
        .el-menu{
            border: none;
            flex:2 0 auto;
        }
        .icon{
            width: 18px;
            height: 18px;
            margin-right: 6px;
        }
        .text{
            display: inline-block;
            width: 100px;
            text-align: left;
            margin-left: 6px;
        }
        //一级菜单
        .el-submenu__title:hover {
            transition: all 1s ease 0s;
            background-color: #304f87 !important;
        }
        .el-submenu .el-menu-item {
            &:hover {
                transition: all 1s ease 0s;
                background-color: #167fc1 !important;
            }
        }
        .el-menu-item{
            // padding: 0 !important;
            margin: 0;
            min-width: 160px;
        }
        .el-menu-item.is-active {
            color: white !important;
            background-color: #167fc1 !important;
        }
        .logo{
            cursor: pointer;
        }
        //
    }
</style>