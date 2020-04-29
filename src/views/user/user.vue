<!-- 系统管理/用户管理 -->
<template>
  <transition name="user">
    <div class="user">
      系统管理/用户管理
      <div style="width:530px">
        <plasma-those-info
          photoUrl="https://img1.doubanio.com/img/celebrity/large/1365758880.69.jpg"
          positiveUrl="https://tse1-mm.cn.bing.net/th/id/OIP.E44sZ2Cf_rRlgEh5U6eb2AHaE0?pid=Api&rs=1"
          reverseUrl="https://tse4-mm.cn.bing.net/th/id/OIP.XOMp4pBOeb60g-6o-QK1ogAAAA?pid=Api&rs=1"
        />
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import PlasmaThoseInfo from "@/components/PlasmaThoseInfo";
  export default {
    name:'user',
    data() {
      return {

      }
    },
    computed:{

    },
    components:{
      PlasmaThoseInfo
    },
    mounted(){

    },
    methods:{

    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.user{

} 

</style>