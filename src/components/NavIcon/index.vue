<!--  -->
<template>
  <i class="nav_icon iconfont" v-html="iconCont" v-on="$listeners"></i>
</template>

<script type="text/ecmascript-6">
  export default {
    naem:'nav_icon',
    props:{
      iconCont:{
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
<style scoped >
.nav_icon{
  font-size:1.1em;
  vertical-align: -0.15em;
  color:currentColor;
}
</style>