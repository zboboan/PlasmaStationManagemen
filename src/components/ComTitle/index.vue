<!-- title 名字 -->
<template>
  <div class="com_title">
    <el-divider content-position="left"><span class="plasma_title">{{title}}</span></el-divider>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'com_title',
    props:{
      title:{
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

    },
    mounted(){

    },
    methods:{

    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
@import "@/assets/scss/color_var.scss";
.com_title{
  .plasma_title{
    display:inline-block;
    line-height: 25px;
    font-size:16px;
    border-bottom:3px solid $main;
  }
}

</style>