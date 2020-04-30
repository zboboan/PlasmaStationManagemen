<!-- 系统管理/凭证管理 -->
<template>
  <transition name="credentials">
    <div class="credentials">
      系统管理/凭证管理
      <el-button @click="_showDialog">aaa</el-button>
      <el-dialog
        :visible.sync="centerDialogVisible"
        width="90%">
          <template v-slot:title>
            <div>注射管理【<span style="color:red;">供血浆者信息</span>】</div>
          </template>
          <donor-info />
      </el-dialog>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import DonorInfo from '@/components/DonorInfo';
  export default {
    name:'credentials',
    data() {
      return {
        centerDialogVisible:false
      }
    },
    computed:{

    },
    components:{
      DonorInfo
    },
    mounted(){

    },
    methods:{
      _showDialog(){
        this.centerDialogVisible = true
      }
    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>

.credentials{
}

</style>