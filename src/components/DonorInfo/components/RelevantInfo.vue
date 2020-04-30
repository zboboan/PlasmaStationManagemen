<!-- 相关信息 -->
<template>
  <transition name="relevant-info">
    <div class="relevant-info">
      <com-title title="相关信息" />
      <el-tabs v-model="activeName" @tab-click="_handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import ComTitle from '@/components/ComTitle';
  export default {
    name:'relevant-info',
    props:{
      t:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        activeName: 'second'
      }
    },
    computed:{

    },
    components:{
      ComTitle
    },
    mounted(){

    },
    methods:{
      _handleClick(tab, event) {
        console.log(tab);
      }
    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.relevant-info{

}

</style>