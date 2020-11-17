<template>
  <div class="stateBox">
        <el-button
            v-for="item in buttonarr"
            :key="item.text" 
            :type="item.type"
            @click="screen(item.text)"
        >
            <i v-if="screensign == item.text" class="el-icon-star-off  el-icon--right"></i>
            <div>
                <p>  {{item.text}} </p>
                <p>  {{item.num}} </p>
            </div>
           
        </el-button>
  </div>
</template>

<script>
export default {
    props:{
        buttonarr:{
            required: true,
            type: Array
        }
    },
    data(){
        return{
            screensign:'全部'
        }
    },
    methods:{
        screen(text){
            this.screensign = text;
            this.$emit('screen',text)
        }
    }
}
</script>

<style lang="less">
    .stateBox{
        display: flex;
        button{
            width: 70px;
            height: 40px;
            padding: 0;
            &>span{
                i{
                    margin-right: 6px;
                }
                display: inline-block;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        
    }
</style>