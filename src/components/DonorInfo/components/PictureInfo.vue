<!-- 图片信息 -->
<template>
  <div class="pic_info" ref="picInfo">
    <el-row :gutter="10" >
      <el-col :span="17">
        <div class="pic1" :style="contH">
          <div :style="{'background-image':`url(${photoUrl})`}"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="pic2" :style="contH">
          <div :style="{'background-image':`url(${photoUrl})`}"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="17">
        <el-col :span="13" style="padding-right:5px;">
          <div class="pic3" :style="contH2">
            <div :style="{'background-image':`url(${photoUrl})`}"></div>
          </div>
        </el-col>
        <el-col :span="11" style="padding-left:5px;padding-right:2px;">
          <div class="pic4" :style="contH2">
            <div :style="{'background-image':`url(${photoUrl})`}"></div>
          </div>
        </el-col>
      </el-col>
      <el-col :span="7" style="padding-left:8px">
        <div class="pic5" :style="contH2">
          <div :style="{'background-image':`url(${photoUrl})`}"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'pic_info',
    props:{
      photoUrl:{
        type:Object,
        default:function (){
          return {}
        }
      }
    },
    data() {
      return {
        contH:{
          height:'',
        },
        contH2:{
          height:'',
        },
      }
    },
    computed:{

    },
    components:{

    },
    mounted(){
      window.addEventListener('resize', this._getHeight);
      this._getHeight();
    },
    methods:{
      _getHeight(){
        this.$nextTick(()=>{
          this.contH.height=this.$refs.picInfo.offsetWidth*.42+'px';
          this.contH2.height=this.$refs.picInfo.offsetWidth*.23+'px';
        });
      },
    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.pic_info{
  .el-row{
    margin-bottom:10px;

    .pic1{
      background:url('./images/IDFront.png') no-repeat center/cover;

      div{
        width:100%;
        height:100%;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    .pic2{
      background:url('./images/provider.png') no-repeat center/cover;

      div{
        width:100%;
        height:100%;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    .pic3{
      background:url('./images/IDBack.png') no-repeat center/cover;

      div{
        width:100%;
        height:100%;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    .pic4{
      background:url('./images/rightHand.png') no-repeat center/cover;

      div{
        width:100%;
        height:100%;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    .pic5{
      background:url('./images/leftHand.png') no-repeat center/cover;

      div{
        width:100%;
        height:100%;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}


</style>