<!-- 系统管理/职务管理 -->
<template>
  <transition name="editor">
    <div class="editor">
      系统管理/职务管理 / 测试页面
      <div>
        <el-button type="primary" @click="jumpOther(2)">职务管理</el-button>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'editor',
    data() {
      return {

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
        this.for.dome = 'editor'
        this.$emit('jumpOther',n);
      }
    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.editor{
  position: absolute;
  top:0;
  left:0;
  z-index: 1;
  width:100%;
  height:100%;
}

.editor-enter-active, .editor-leave-active {
  transition: .3s all ease;
}
.editor-leave-active,.editor-enter{
  transform:translateX(200px);
  opacity: 0;
}
</style>
