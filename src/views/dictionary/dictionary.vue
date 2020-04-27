<!-- 系统管理/数据字典 -->
<template>
  <transition name="dictionary">
    <div class="dictionary">
      系统管理/数据字典
      <div>
        <v-nodes :vnodes="drawingDome"></v-nodes>
      </div>
    </div>
  </transition>
</template>

<script type="text/jsx">
  export default {
    name:'dictionary',
    data() {
      return {
        list:[
          {
            name:'a',
            val:1
          },
          {
            name:'b',
            val:2
          },
          {
            name:'c',
            val:3
          }
        ]
      }
    },
    computed:{},
    components:{
      VNodes:{
        functional:true,
        render:(h,ctx)=>{
          console.log(ctx.props);
          return ctx.props.vnodes()
        }
      }
    },
    mounted(){},
    methods:{
      drawingDome(){
        return(
          <div>
            {
              this.list.map(item=>(
                <div>{item.name} <span style="color:red">{item.val}</span> </div>
              ))
            }
          </div>
        );
      }
    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.dictionary{

}

</style>