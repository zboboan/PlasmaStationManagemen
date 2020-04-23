<template>
  <div class="position-container">
    <transition name="pageSwitch">
      <component :is="currentRole" @jumpOther="jumpOther" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mainPosition from './position/position'
import editorPosition from './editor/editor'

export default {
  name: 'Dashboard',
  components: { mainPosition, editorPosition },
  data() {
    return {
      currentRole: 'mainPosition',
      demo:''
    }
  },
  provide(){
    return {
      for: this
    }
  },
  computed: {

  },
  created() {
    
  },
  methods:{
    jumpOther(n){
      if(n==1){
        this.currentRole = 'editorPosition'
      }else{
        this.currentRole = 'mainPosition'
      }
    }
  }
}
</script>

<style scoped lang='scss' rel='stylesheet/scss'>

.position-container{
  position: relative;
  width:100%;
  height:100%;
  background:red;
}


</style>
