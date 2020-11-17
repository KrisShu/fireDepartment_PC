<template>
  <baseDialog 
    ref="baseDialog"
    width="70%"
    :dialogfooter="false"
    title="火警点位图"
  >
        <div id="fireBit" ref="fireBit">
               
        </div>
            
  </baseDialog>
</template>

<script>
import AILabel  from 'ailabel'
export default {
    props:{
        // fireAlarmId: {
        //     type: Number,
        //     require: true
        // },
    },
    data(){
        return{
            fireBit:{},
            fireimg:require('../assets/images/fire.gif'),
            gMap:{}
        }
    },
    methods:{
        getpoint(fireAlarmId){
            this.$refs.baseDialog.DialogVisible = true;
            this.$axios.get(this.$api.GetDetectorBitMap,{
                params:{fireAlarmId}
            }).then(res=>{
                if(res.result.floorPicture){
                    // res.result.creationTime=this.deal(res.data.result.creationTime)
                    this.fireBit = res.result;
                    this.init(res.result.coordinateX,res.result.coordinateY);
                    this.makemark(res.result)
                }
              
            }).catch(err=>{
                console.log("err",err)
            })
        },

        init(cx,cy){
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
        makemark(content){
            let  marker = new AILabel.Marker(content.id, {
                src:require('../assets/images/fire.gif'),
                x: content.coordinateX,
                y: content.coordinateY,
                offset: {x: -10, y: -10},
            });
            this.gMap.mLayer.addMarker(marker);
            let imga =  $("#markerLayer").find('img')
            imga.on({
                mouseenter: function (e) {
                    let p =$(`<div class='ss'>
                    <p>【时间】：${content.creationTime}</p>
                    <p>【部件】：${content.detectorSn}</p>
                    <p>【类型】：${content.detectorTypeName}</p>
                    <p>【位置】：${content.location}</p>
                    </div>`);
                    p.css({"position":"absolute"})
                    imga.after(p)
                },
                mouseleave: function (e) {
                    $('.ss').remove()
                }
            })
        },
    }
}
</script>

<style lang="less">
    #fireBit{
        width: 94%;
        height: 600px;
        position: relative; 
        cursor: pointer;
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
                color: black;

            } 
        }
                  
             
    }
</style>