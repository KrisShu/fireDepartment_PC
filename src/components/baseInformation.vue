<template>
    <el-dialog
    class="baseInformationBox"
    title="防火单位熟悉卡"
    :visible.sync="dialogVisible"
     width="80%"
    :before-close="handleClose">
        <div class="basetable">
            <el-scrollbar>

                <!-- <p class="title"></p> -->
                <div class="card_content">
                        <table>
                            <tr>
                                <td class="td_title" rowspan="5">单位基本情况</td>
                                <td>单位名称</td>
                                <td colspan="2"><el-input v-model="cardform.fireUnitName" placeholder="请输入内容"></el-input></td>
                                <td>单位地址</td>
                                <td colspan="4"><el-input v-model="cardform.fireUnitAddress" placeholder="请输入内容"></el-input></td>
                            </tr>
                            <tr>
                                <td>人员总数</td>
                                <td>
                                    <div class="input_box">
                                        <el-input v-model="cardform.peopleNumber" placeholder="请输入内容"></el-input>人
                                    </div>
                                </td>
                                <td>&emsp;&emsp;</td>
                                <td>建筑高度</td>
                                <td>
                                    <div class="input_box">
                                        <el-input v-model="cardform.architectureHeight" placeholder="请输入内容"></el-input>米
                                    </div>
                                </td>
                                <td>&emsp;&emsp;</td>
                                <td>层数</td>
                                <td>
                                    <div class="input_box">
                                        <el-input v-model="cardform.floorNumber" placeholder="请输入内容"></el-input>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td  >建筑结构</td>
                                <td>
                                    <div class="input_box">
                                        <el-input v-model="cardform.architectureStructure" placeholder="请输入内容"></el-input>
                                    </div>
                                </td>
                                <td  >占地面积</td>
                                <td>
                                    <div class="input_box">
                                        <el-input v-model="cardform.coveredArea" placeholder="请输入内容"></el-input>㎡
                                    </div>
                                </td>
                                <td  >建筑总面积</td>
                                <td>
                                    <div class="input_box">
                                        <el-input v-model="cardform.architectureArea" placeholder="请输入内容"></el-input>㎡
                                    </div>
                                </td>
                                <td  >主要使用性质</td>
                                <td>
                                    <el-input v-model="cardform.natureOfUse" placeholder="请输入内容"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>毗邻建筑</td>
                                <td class="neartd">
                                    东：
                                </td>
                                <td>
                                    <el-input v-model="cardform.nearEast" placeholder="请输入内容"></el-input>
                                </td>
                                <td class="neartd"> 
                                    南：
                                </td>
                                <td><el-input v-model="cardform.nearSouth" placeholder="请输入内容"></el-input></td>
                                <td class="neartd">
                                    西：
                                </td>
                                <td> <el-input v-model="cardform.nearWest" placeholder="请输入内容"></el-input></td>
                                <td>
                                    <div class="input_box">
                                        北：
                                        <el-input v-model="cardform.nearNorth" placeholder="请输入内容"></el-input>
                                    </div>
                                </td>
                            
                            </tr>
                            <tr>
                                <td>
                                    辖区中队形式的路径及时间
                                </td>
                                <td colspan="7">
                                    <el-input v-model="cardform.fireDeptRoute" placeholder="请输入内容"></el-input>
                                </td>
                            </tr>
                            <!--  -->
                            <tr>
                                <td class="td_title" rowspan="9">
                                    单位内部主要消防设施
                                </td>
                                <td>
                                    消防控制室
                                </td>
                                <td>
                                    位置
                                </td>
                                <td colspan="6">
                                    <el-input v-model="cardform.fireControlRoomAddress" placeholder="请输入内容"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="2">
                                    消防水源
                                </td>
                                <td>
                                    消防水池数量
                                </td>
                                <td>
                                    <el-input v-model="cardform.waterPoolNumber" placeholder="请输入内容"></el-input>
                                </td>
                                <td>
                                    位置
                                </td>
                                <td>
                                    <el-input v-model="cardform.waterPoolAddress" placeholder="请输入内容"></el-input>
                                </td>
                                <td>
                                    总容量
                                </td>
                                <td>
                                    <el-input v-model="cardform.waterPoolCapacity" placeholder="请输入内容"></el-input>
                                </td>
                                <td>
                                    <div class="input_box">
                                        补给方式：
                                        <el-input v-model="cardform.waterPoolSupplyType" placeholder="请输入内容"></el-input>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    室外其他消防水源
                                </td>
                                <td colspan="2">
                                    <el-input v-model="cardform.otherWaterSource" placeholder="请输入内容"></el-input>
                                </td>
                                <td>
                                    位置
                                </td>
                                <td colspan="3">
                                    <el-input v-model="cardform.otherWaterAddress" placeholder="请输入内容"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>自动报警系统</td>
                                <td>
                                    <el-select v-model="cardform.autoAlarmSystem" clearable placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>自动喷水</td>
                                <td>
                                    <el-select v-model="cardform.autoWaterSystem" clearable placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>应急广播</td>
                                <td>
                                    <el-select v-model="cardform.broadcastSystem" clearable placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>防排烟系统</td>
                                <td>
                                    <el-select v-model="cardform.smokeSystem" clearable placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr>
                                <td>室外消火栓数量</td>
                                <td>
                                    <el-input v-model="cardform.outdoorHydrantNumber" placeholder="请输入内容"></el-input>
                                </td>
                                <td>室外消火栓位置分布</td>
                                <td colspan="5">
                                    <el-input v-model="cardform.outdoorHydrantAddress" placeholder="请输入内容"></el-input>
                                </td>
                            </tr>
                            <tr class="two_byte">
                                <td rowspan="2">
                                    消防泵
                                </td>
                                <td>
                                    消火栓泵
                                </td>
                                <td>
                                    <div class="input_box">
                                        数量：
                                        <el-input v-model="cardform.hydrantPumpNumber" placeholder="请输入内容"></el-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="input_box">
                                        扬程：
                                        <el-input v-model="cardform.hydrantPumpLift" placeholder="请输入内容"></el-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="input_box">
                                        流量：
                                        <el-input v-model="cardform.hydrantPumpFlow" placeholder="请输入内容"></el-input>
                                    </div>
                                </td>
                                <td>
                                水泵接合器
                                </td>
                                <td>
                                    <div class="input_box">
                                        流量：
                                        <el-input v-model="cardform.hydrantPumpCombinerNumber" placeholder="请输入内容"></el-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="input_box">
                                        位置：
                                        <el-input v-model="cardform.hydrantPumpCombinerAddress" placeholder="请输入内容"></el-input>
                                    </div>
                                </td>
                            </tr>
                            <tr class="two_byte">
                                <td>
                                    喷淋泵
                                </td>
                                <td>
                                    <div class="input_box">
                                        数量：
                                        <el-input v-model="cardform.sprayPumpNumber" placeholder="请输入内容"></el-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="input_box">
                                        扬程：
                                        <el-input v-model="cardform.sprayPumpLift" placeholder="请输入内容"></el-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="input_box">
                                        流量：
                                        <el-input v-model="cardform.sprayPumpFlow" placeholder="请输入内容"></el-input>
                                    </div>
                                </td>
                                <td>
                                水泵接合器
                                </td>
                                <td>
                                    <div class="input_box">
                                        流量：
                                        <el-input v-model="cardform.sprayPumpCombinerNumber" placeholder="请输入内容"></el-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="input_box">
                                        位置：
                                        <el-input v-model="cardform.sprayPumpCombinerAddress" placeholder="请输入内容"></el-input>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>消防电梯数量及位置</td>
                                <td colspan="2">
                                    <el-input v-model="cardform.elevatorNumberAndAddress" placeholder="请输入内容"></el-input>
                                </td>
                                <td>疏散楼梯数量及位置</td>
                                <td>
                                    <el-input v-model="cardform.stairsNumberAndAddress" placeholder="请输入内容"></el-input>
                                </td>
                                <td>安全出口数量及位置</td>
                                <td colspan="2">
                                    <el-input v-model="cardform.exitNumberAndAddress" placeholder="请输入内容"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>室内消火栓数量</td>
                                <td colspan="2">
                                    <el-input v-model="cardform.indoorHydrantNumber" placeholder="请输入内容"></el-input>
                                </td>
                                <td>标准室内消火栓数量及位置</td>
                                <td colspan="4">
                                    <el-input v-model="cardform.standLayerHydrantNumber" placeholder="请输入内容"></el-input>
                                </td>
                            </tr>
                            <!--  -->
                            <tr>
                                <td class="td_title" rowspan="2">重点部位情况（一）</td>
                                <td>
                                    重点部位名称
                                </td>
                                <td>
                                    <el-input v-model="cardform.keyPart1_Name" placeholder="请输入内容"></el-input>
                                </td>

                                <td>
                                    重点部位所在位置
                                </td>
                                <td>
                                    <el-input v-model="cardform.keyPart1_Address" placeholder="请输入内容"></el-input>
                                </td>
                                <td>
                                    建筑结构
                                </td>
                                <td>
                                    <el-input v-model="cardform.keyPart1_Structure" placeholder="请输入内容"></el-input>
                                </td>
                                <td>
                                    使用性质
                                </td>
                                <td>
                                    <el-input v-model="cardform.keyPart1_Nature" placeholder="请输入内容"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>主要危险性</td>
                                <td colspan="7">
                                    <el-input v-model="cardform.keyPart1_Danger" placeholder="请输入内容"></el-input>
                                </td>
                            </tr>
                            <!--  -->
                            <tr>
                                <td class="td_title" rowspan="2">重点部位情况（二）</td>
                                <td>
                                    重点部位名称
                                </td>
                                <td>
                                    <el-input v-model="cardform.keyPart2_Name" placeholder="请输入内容"></el-input>
                                </td>

                                <td>
                                    重点部位所在位置
                                </td>
                                <td>
                                    <el-input v-model="cardform.keyPart2_Address" placeholder="请输入内容"></el-input>
                                </td>
                                <td>
                                    建筑结构
                                </td>
                                <td>
                                    <el-input v-model="cardform.keyPart2_Structure" placeholder="请输入内容"></el-input>
                                </td>
                                <td>
                                    建筑层高
                                </td>
                                <td>
                                    <el-input v-model="cardform.keyPart2_FloorHeight" placeholder="请输入内容"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>主要危险性</td>
                                <td colspan="7">
                                    <el-input v-model="cardform.keyPart2_Danger" placeholder="请输入内容"></el-input>
                                </td>
                            </tr>
                            <!--  -->
                            <tr>
                                <td class="td_title" rowspan="3">
                                    消防组织
                                </td>
                                <td>
                                    单位负责人
                                </td>
                                <td>
                                    <el-input v-model="cardform.contractUserName" placeholder="请输入内容"></el-input>
                                </td>
                                <td>
                                    联系电话
                                </td>
                                <td>
                                    <el-input v-model="cardform.contractPhone" placeholder="请输入内容"></el-input>
                                </td>
                                <td>
                                    技术人员
                                </td>
                                <td>
                                    <el-input v-model="cardform.technologyUserName" placeholder="请输入内容"></el-input>
                                </td>
                                <td>
                                    联系电话
                                </td>
                                <td>
                                    <el-input v-model="cardform.technologyPhone" placeholder="请输入内容"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    专职消防队伍
                                </td>
                                <td>
                                    <el-select v-model="cardform.fullTimeBrigade" clearable placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    消防车辆和装备情况
                                </td>
                                <td colspan="5">
                                    <el-input v-model="cardform.carAndEquipment" placeholder="请输入内容"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>义务消防人员</td>
                                <td>
                                    <div class="input_box">
                                        <el-input v-model="cardform.partTimeBrigadeNumber" placeholder="请输入内容"></el-input>人
                                    </div>
                                </td>
                                <td>
                                    培训情况
                                </td>
                                <td colspan="5">
                                    <el-input v-model="cardform.partTimeBrigadeTrain" placeholder="请输入内容"></el-input>
                                </td>
                            </tr>
                            <tr class="selectpicture">
                                <td class="td_title">
                                    单位总平面图
                                </td>
                                <td class="selectimg" colspan="2">
                                    <baseUploadImg v-model="cardform.generalLayout"></baseUploadImg>
                                </td>
                                <td class="td_title">
                                    标准层平面图
                                </td>
                                <td  class="selectimg" colspan="2">
                                    <baseUploadImg v-model="cardform.standardFloorPlan"></baseUploadImg>
                                </td>
                                <td class="td_title">
                                    重点部位平面图
                                </td>
                                <td  class="selectimg" colspan="2">
                                    <baseUploadImg v-model="cardform.keyPartsPlan"></baseUploadImg>
                                
                                </td>
                            </tr>

                        </table>
                        <div class="btns">
                            <el-button @click="submit" type="primary">保存</el-button>
                            <el-button type="info">取消</el-button>
                        </div>
                </div>
            </el-scrollbar>
        

        </div>
    </el-dialog>
</template>

<script>
import baseUploadImg from './baseUploadImg'
export default {
    components:{
        baseUploadImg,
    },
    data(){
        return{
            dialogVisible:false,
            cardform:{},
            input:'',
            value:'',
            options:[
                 {
                    value: '选项1',
                    label: '有'
                 },
                 {
                    value: '选项2',
                    label: '无'
                 }
            ],
            outward_Picture:''
        }
    },
    created(){
        // this.GetFireUnitCard()
    },
    methods:{
        //获取信息
        GetFireUnitCard(fireUnitId){
                this.$axios.get(this.$api.GetFireUnitCard,{params:{fireUnitId}}).then(res=>{
                    console.log("res",res);
                    this.cardform = res.result;
                })
        },
        //提交信息
        submit(){
            // console.log(this.cardform);
            this.$axios.put(this.$api.UpdateFireUnitCard,this.cardform).then(res=>{
                console.log("提交信息",res)
                this.dialogVisible = false;
                this.$message({
                    message: '保存信息成功',
                    type: 'success'
                });
            })
        },
        handleClose(){
            this.dialogVisible = false
        }
    }

}
</script>

<style lang="less" >
    
    .baseInformationBox{
        .el-dialog{
            height: 76%;
        }
        .el-dialog__body{
            height: 82%;
        }
        .basetable{
            height: 100%;
        }
        .el-scrollbar {
            height: 100%;
            width: 100%;
        }
        .el-scrollbar__wrap {
            overflow-x: hidden;
        
        }

        .title{
            color: white;
            padding: 6px 0px;
        }
        .el-scrollbar {
            height: 100%;
            width: 100%;
        }
        .el-scrollbar__wrap {
            overflow-x: hidden;
        
        }
        table{
            width: 100%;
            height: 100%;
            td{
                color: white;
                border: 1px solid white;
                height: 40px;
                line-height: 40px;
                &.neartd{
                    text-align: right;
                }
                .input_box{
                    display: flex;
                }
                .el-input{
                 width: 100%;
                }
                input{
                    background: transparent;
                    // width: 120px;
                    border: none;
                    color: white;
                }
                &.td_title{
                    text-align: center;
                    vertical-align: middle;
                    // display: flex;
                    // line-height: 50%;
                }
               
            }
            .selectpicture{
                td{
                    height: 200px;
                    padding: 6px;
                    .el-button{
                        width: 100%;
                    }
                    &.selectimg{
                        // width: 22%;
                    }
                }
            }
            .two_byte{
                .el-input{
                 width: 70%;
                }
            }
        }
        .btns{
            padding: 6px 0px;
            .el-button{
                width: 100px;
            }
        }
    }
</style>