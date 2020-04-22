<!-- 选择图标 -->
<template>
  <transition name="icon_select">
    <div class="icon_select">
      <div class="icon-list">
        <div class="icon-li" v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
          <nav-icon :iconCont='item.val' style="font-size:15px"/>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import icons from'./requireIcons';
  export default {
    name:'icon_select',
    props:{
      t:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        iconList: icons
      }
    },
    computed:{

    },
    components:{

    },
    mounted(){

    },
    methods:{
      reset(){

      },
      selectedIcon(item){
        this.$emit('selected', item)
        document.body.click()
      }
    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.icon_select{
  width: 100%;
  padding: 10px;
  .icon-list {
    height: 200px;
    overflow-y: scroll;
    div.icon-li {
      height: 30px;
      line-height: 30px;
      margin-bottom: -5px;
      cursor: pointer;
      width: 33%;
      float: left;

      &:hover{
        background:#fafafa;
      }

      i{
        margin-left:5px;
      }

      span {
        display: inline-block;
        margin-left:5px;
        vertical-align: bottom;
        fill: currentColor;
        overflow: hidden;
      }
    }
    
  }
}
</style>