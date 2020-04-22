<!-- 查询条件  重置 -->
<template>
  <div class="queryReset">
    <div style="padding:0 10px">
      <div>
        <slot name="show_part"></slot>
      </div>
      <div class="hide_part_item" :style="{'height':hideHeight+'px'}">
        <div ref="hidePart">
          <slot name="hide_part"></slot>
        </div>
      </div>
    </div>
    <div class="demo-block-control">
      <div class="query_btn">
        <el-button type="primary" @click="clickQueryBtn(0)">
          <nav-icon iconCont='&#xe6b9;' /> 
          <span>查询</span>
        </el-button>
        <el-button @click="clickQueryBtn(1)">
          <nav-icon iconCont='&#xe6b8;' /> 
          <span>重置</span>
        </el-button>
      </div>
      <div class="show_all_icon" @click="setShow" v-if="isMore">
        <i :class="showType==0?'el-icon-caret-bottom':'el-icon-caret-top'"></i>
        <span>{{showType==0?'显示全部':'隐藏'}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'queryReset',
    props:{
      isMore:{
        type:Boolean,
        default:true
      }
    },
    data() {
      return {
        hideHeight:0,
        showType:0
      }
    },
    computed:{

    },
    components:{

    },
    mounted(){

    },
    methods:{
      setShow(){
        if(this.showType == 0){
          this.hideHeight = this.$refs.hidePart.offsetHeight;
          this.showType = 1;
        }else{
          this.hideHeight = 0;
          this.showType = 0;
        }
      },
      clickQueryBtn(n){
        this.$emit('clickQueryBtn',n);
      }
    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.queryReset{
  padding-top:20px;
  .demo-block-control{
    border-top: 1px solid #eaeefb;
    padding:10px 0;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    
    position: relative;

    &:hover{
      color: #409eff;
      background-color: #f9fafc;

      .show_all_icon{
        width:110px;
        right:10px;
        span {
          opacity: 1;
          display: inline-block;
          transform: translateX(10px);
          transition: all .3s;
        }
      }
    }

    .show_all_icon{
      position:absolute;
      right:-50px;
      top:50%;
      z-index: 2;
      display:inline-block;
      width:100px;
      cursor: pointer;
      text-align: initial;
      transition: all .3s;
      transform: translateY(-50%);

      span {
        opacity:0;
        position: absolute;
        transform: translateX(30px);
        font-size: 14px;
        line-height: 44px;
        transition: .3s;
      }

      i{
        font-size: 16px;
        line-height: 44px;
        transition: .3s;
      }
    }
  }

  .hide_part_item{
    overflow: hidden;
    transition: all .3s;
  }
}

</style>