<!--  -->
<template>
  <div class="donor_info">
    <com-title title="供血浆者基本信息" />
    <el-row>
      <el-col :span="14">
        <info-list />
      </el-col>
      <el-col :span="10">
        <picture-info />
      </el-col>
    </el-row>
    <div>
      <RelevInfo />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ComTitle from '@/components/ComTitle';
  import InfoList from './components/InfoList';
  import RelevInfo from './components/RelevantInfo';
  import PictureInfo from './components/PictureInfo';
  export default {
    name:'donor_info',
    props:{
      t:{
        type:String,
        default:''
      }
    },
    data() {
      return {

      }
    },
    computed:{

    },
    components:{
      ComTitle,
      InfoList,
      RelevInfo,
      PictureInfo
    },
    mounted(){

    },
    methods:{

    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.donor_info{

}

</style>