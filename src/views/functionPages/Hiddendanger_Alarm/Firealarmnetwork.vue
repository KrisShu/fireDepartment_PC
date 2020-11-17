<template>
    <div class="Firealarmnetwork">
        <div class="headerBox">
            <base-search @getSearchName="onsearch"></base-search>
            <base-export @exportdata="exportdata"></base-export>
        </div>
        <baseTable
            :columnList="columnList"
            :tableData="tableData"
            tableName="Firealarmnetwork"
            @getBitMap="getBitMap"
        ></baseTable>
        <base-page :propPage='page' @currentChange="GetDeptFireAlarmList"></base-page>

        <base-dialog class="fireMap" title="点位图" :dialogfooter="false" ref="bitmap">
            <div id="fireBit" ref="fireBit">
            </div>
        </base-dialog>
    </div>
</template>

<script>
import { export2Excel } from '../../../plugins/utils';
import AILabel  from 'ailabel'
export default {
    data(){
        return{
            columnList:[
                {
                    prop: "creationTime",
                    label: "报警时间"
                },
                {
                    prop: "fireUnitName",
                    label: "防火单位"
                },
                {
                    prop: "detectorSn",
                    label: "报警部件"
                },
                {
                    prop: "detectorTypeName",
                    label: "部件类型"
                },
                {
                    prop: "location",
                    label: "位置"
                },
                {
                    prop: "checkState",
                    label: "核警状态"
                }
            ],
            tableData:[],
            page:{
                DeptId:this.$store.state.userInfo.deptId,
                FireUnitName:'',
                DeviceState:'',
                MaxResultCount:10,
                SkipCount:0,
                total:0,
                current:1
            },
            gMap:'',
            fireBit:'',
            fireimg:require('../../../assets/images/fire.gif'),
        }
    },
    created(){
        this.GetDeptFireAlarmList()
    },
    methods:{
        GetDeptFireAlarmList(){
            this.$axios.get(this.$api.GetDeptFireAlarmList,
                {params:this.page}
            ).then(res=>{
                console.log("列表结果",res);
                ({items: this.tableData,totalCount: this.page.total} = res.result)

            })
        },
        //搜索查询
        onsearch(name){
            console.log(name)
            this.page.FireUnitName = name;
            this.page.current = 1;
            this.page.SkipCount = 0;
            this.GetDeptFireAlarmList()
        },
        //导出表格
        exportdata(){
            export2Excel(this.columnList,this.tableData)
        },
        //
        getBitMap(fireAlarmId){
            console.log("fireAlarmId",fireAlarmId)
            this.$refs.bitmap.DialogVisible = true;
            this.$axios.get(this.$api.GetDetectorBitMap,{
                params:{fireAlarmId}
            }).then(res=>{
                console.log("火警点位图",res)
                if(res.result.floorPicture){
                    res.result.creationTime=this.delTime(res.result.creationTime)
                    this.fireBit = res.result;
                    this.init(res.result.coordinateX,res.result.coordinateY)
                    this.createMarker(this.fireBit)
                }
              
            }).catch(err=>{
                console.log("err",err)
            })
        },
        init(){
            this.gMap = new AILabel.Map('fireBit',
                {
                    zoom: 1500, 
                    cx: 0, 
                    cy: 0, 
                    zoomMax: 650 * 10, 
                    zoomMin: 650 / 10, 
                    autoPan: true, 
                    drawZoom: true
                }
            );
            // 图片层实例\添加
            const gImageLayer = new AILabel.Layer.Image('img',  this.fireBit.floorPicture, 
                {
                    w: 1080, 
                    h: 720
                }, 
                {
                    zIndex: 1
                }
            );
            this.gMap.addLayer(gImageLayer);
            // 矢量层实例\添加
            this.gFeatureLayer = new AILabel.Layer.Feature('featureLayer', 
            {
                zIndex: 2, 
                transparent: true
            }
            );
            this.gMap.addLayer(this.gFeatureLayer);
        },
        createMarker(content) {
            let  marker = new AILabel.Marker(content.id, {
                src:this.fireimg,
                x: content.coordinateX,
                y: content.coordinateY,
                offset: {x: -10, y: -10},
            });
            this.gMap.mLayer.addMarker(marker);
            let imga =  $("#markerLayer").find('img')
            imga.on({
                mouseenter: function () {
                    let p =$(`<div class='ss'>
                    <p>【时间】：${content.creationTime}</p>
                    <p>【部件】：${content.detectorSn}</p>
                    <p>【类型】：${content.detectorTypeName}</p>
                    <p>【位置】：${content.location}</p>
                    </div>`);
                    p.css({"position":"absolute"})
                    imga.after(p)
                },
                mouseleave: function () {
                    $('.ss').remove()
                }
            })
               
           
        },
          //时间处理格式
        delTime(data){
            var str = data.split('T');
            var str2 = str[1].split(".")
            var timestr = str[0] +" "+ str2[0]
            return timestr;
        },
    }
}
</script>

<style lang="less">
    .Firealarmnetwork{
        height: 100%;
        display: flex;
        flex-direction: column;
        .headerBox{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        & > :nth-child(2) {
            flex: 2 0 auto;
        }

        .fireMap{
            height: 80%;
            .el-dialog__body{
                height: 450px;
                 #fireBit{
                    width: 100%;
                    height: 100%;
                    position: relative;
                    .noData{
                        color: white;
                        font-size: 20px;
                        text-align: center;
                    }
                    #markerLayer{
                        position: relative;
                        img{
                            width: 20px;
                            height: 20px;
                        }
                        .ss{
                            background: rgb(255, 255, 255);
                            padding: 10px;
                            border-radius: 6px;
                            color: #000;

                        } 
                    }
                }
            }
        }

    }
</style>