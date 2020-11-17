<template>
  <div class="uploadimg">
      <div
        @mouseenter="enter" 
        @mouseleave="leave"
        v-if="url" 
      >
            <el-image 
                :style="{width: imgWidth,height: imgHeight}" 
                :src="url" fit="cover" 
            >
            </el-image>
            <div  v-if="show" class="Mantle">
                <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview"
                >
                    <i class="el-icon-zoom-in"></i>
                </span>
                <span
                    class="el-upload-list__item-preview"
                    @click="handleRemove"
                >
                    <i class="el-icon-delete"></i>
                </span>
            </div>
      </div>
   
    <div class="noImg" v-else>
        <img :src="uploadimgIocn" alt="">
    </div>
    
   
    <el-button  @click="openFile">{{uploadimg}}</el-button>
    <input type="file" ref="uploadInput" @change="upload">
    <base-dialog class="plandialog" ref="plandialog" title="平面图" :dialogfooter="false">
        <img width="100%" height="100%" :src="url" alt="">
    </base-dialog>
  </div>
</template>

<script>
export default {
    model:{
        prop:'url',
        event:'change'
    },
    props:{
        url:String,
        imgWidth:{
            type:String,
            default(){
                return '200px'
            }
        },
        imgHeight:{
            type:String,
            default(){
                return '200px'
            }
        },
        uploadimg:{
            type:String,
            default :'上传图片'
        }
    },
    data(){
        return{
            uploadimgIocn:require("../assets/images/upload.png"),
            show:false,
            dialogVisible:false,//弹窗是否显示
        }
    },
    watch:{
      
    },
    methods:{
        enter(){
            this.show = true
        },
        leave(){
            this.show = false
        },
        //点击查看大图
        handlePictureCardPreview(){
            // this.dialogVisible = true
            this.$refs.plandialog.DialogVisible = true
        },
        handleRemove(){
            // this.url = '';  //這樣子會報錯的  子組件不能修改父組件給的值   
           
            this.$emit('change','')
        },
        openFile(){
            let input = this.$refs.uploadInput
            input.click();
        },
        upload(){
            let input = this.$refs.uploadInput
            let imgFile = input.files[0];
            console.log("imgFile",imgFile)
            this.fileToBase64(imgFile).then(res=>{
                this.$emit('change',res)
            })
            console.log(imgFile)
        },
        fileToBase64(file){
            let that =this,
            reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve,reject)=>{
                reader.onload = function (e) { 
                    if(this.result){
                        resolve(this.result)
                    }else{
                        reject("err")
                    }

                }
            })  
        }

    }
};
</script>

<style lang="less">
    .uploadimg{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        .Mantle{
            width: 200px;
            height: 200px;
            background: rgba(66, 66, 66, 0.8);
            position: absolute;
            // z-index: 199;
            top: 0;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .noImg{
            width: 200px;
            height: 200px;
            border: 1px solid skyblue;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .el-button{
            width: 300px;
            margin-top: 30px;
            background: rgb(1, 0, 80);
            color:white;
        }
        input{
            display: none;
        }
        .plandialog{
            z-index: 29999 !important;
        }
    }
</style>