<!-- 系统管理/职务管理 -->
<template>
  <transition name="position">
    <div class="position">
      系统管理/职务管理
      <div>
        <el-button type="primary" @click="jumpOther(1)">测试页面</el-button>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'position',
    data() {
      return {
        obj:'abd'
      }
    },
    inject: ['for'],
    computed:{

    },
    components:{

    },
    mounted(){
      console.log(this.for.dome);
    },
    methods:{
      jumpOther(n){
        this.for.dome=this.obj
        this.$emit('jumpOther',n);
      }
    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.position{
  position: absolute;
  top:0;
  left:0;
  z-index: 1;
  width:100%;
  height:100%;
}

</style>