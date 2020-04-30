<!-- 供血浆者基本信息 -->
<template>
  <div class="plasma_those" ref="plasmaContent">
    <div class="those_conte">
      <com-title title="供血浆者基本信息" />
      <!-- <el-divider content-position="left"><span class="plasma_title">供血浆者基本信息</span></el-divider> -->
      <div class="pict">
        <el-row :gutter="10">
          <el-col :span="8">
            <div class="my_photo" :style="contH">
              <div class="photo" :style="{'background-image':`url(${photoUrl})`}"></div>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="positive_reverse" :style="contH">
              <div class="positive" v-show="isPos" :style="{'background-image':`url(${positiveUrl})`}"></div>
              <div class="reverse"  v-show="!isPos" :style="{'background-image':`url(${reverseUrl})`}"></div>
              <div class="turn" @click="_turn">
                <nav-icon  iconCont='&#xe6b8;' />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="info">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-col :span="10">
              <span class="title_lable">供血浆者姓名</span>
            </el-col>
            <el-col :span="14">
              <el-input v-model="form.name" :disabled="true"></el-input>
            </el-col>
          </el-col>
          <el-col :span="12">
            <el-col :span="10">
              <span class="title_lable">性别</span>
            </el-col>
            <el-col :span="14">
              <el-input v-model="form.name" :disabled="true"></el-input>
            </el-col>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-col :span="10">
              <span class="title_lable">供血浆者编号</span>
            </el-col>
            <el-col :span="14">
              <el-input v-model="form.name" :disabled="true"></el-input>
            </el-col>
          </el-col>
          <el-col :span="12">
            <el-col :span="10">
              <span class="title_lable">免疫名称</span>
            </el-col>
            <el-col :span="14">
              <el-input v-model="form.name" :disabled="true"></el-input>
            </el-col>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-col :span="10">
              <span class="title_lable">登记编号</span>
            </el-col>
            <el-col :span="14">
              <el-input v-model="form.name" :disabled="true"></el-input>
            </el-col>
          </el-col>
          <el-col :span="12">
            <el-col :span="10">
              <span class="title_lable">供血浆者类型</span>
            </el-col>
            <el-col :span="14">
              <el-input v-model="form.name" :disabled="true"></el-input>
            </el-col>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-col :span="10">
              <span class="title_lable">年龄</span>
            </el-col>
            <el-col :span="14">
              <el-input v-model="form.name" :disabled="true"></el-input>
            </el-col> 
          </el-col>
          <el-col :span="12">
            
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ComTitle from '@/components/ComTitle';
  export default {
    name:'plasma_those',
    props:{
      photoUrl:{  // 本人照片
        type:String,
        default:''
      },
      positiveUrl:{  // 正面图片
        type:String,
        default:''
      },
      reverseUrl:{  // 反面图片
        type:String,
        default:''
      }
    },
    data() {
      return {
        contH:{
          height:'',
        },
        isPos:true,
        form:{
          name:'abc'
        }
      }
    },
    computed:{

    },
    components:{
      ComTitle
    },
    created(){
      window.addEventListener('resize', this.getHeight);
      this._getHeight()
    },
    mounted(){

    },
    methods:{
      _getHeight(){
        this.$nextTick(()=>{
          this.contH.height=this.$refs.plasmaContent.offsetWidth*.4+'px';
        });
      },
      _turn(){
        this.isPos = !this.isPos;
      }
    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.plasma_those{
  width:100%;
  height:100%;

  .those_conte{
    padding:0px 10px;
    border: 1px solid #dcdfe6;

    .plasma_title{
      font-size:16px;
    }

    .pict{
      .my_photo{
        background:url('./images/provider.png') no-repeat center/cover;
    
        .photo{
          width:100%;
          height:100%;
          background-repeat: no-repeat;
          background-position: center;
          background-size:cover;
        }
      }

      .positive_reverse{
        position: relative;
        background:url('./images/IDFront.png') no-repeat center/cover;

        .reverse,.positive{
          width:100%;
          height:100%;
          background-repeat: no-repeat;
          background-position: center;
          background-size:cover;
        }

        .turn{
          position: absolute;
          top:0;
          right:0;
          z-index: 1;
          padding:10px;
          cursor:pointer;
          user-select:none;
          color:#777;
          background:rgba(111,111,111,.3);
        }

      }
    }

    .info{
      margin-top:20px;
      .title_lable{
        font-size:14px;
        line-height: 28px;
      }

      .el-row {
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 15px;
        }
      }
    }
  }

  
}

</style>