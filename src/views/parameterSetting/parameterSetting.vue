<!-- 系统管理/业务参数设置 -->
<template>
  <transition name="parameterSetting">
    <div class="parameterSetting">
      <h4>业务参数设置</h4>
      <table-package :tableData="tableData" :selectVal="options" :valDefault="value2">
        aaaa
      </table-package>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import TablePackage from '@/components/TablePackage';
  export default {
    name:'parameterSetting',
    data() {
      return {
        options:[
          {
            value: '1',
            label: '日期',
            prop:'data',
            width:'180'
          },
          {
            value: '2',
            label: '姓名',
            prop:'name',
            width:'180',
            disabled:true
          },
          {
            value: '3',
            label: '地址',
            prop:'address'
          },
          {
            value: '4',
            label: '联系电话',
            prop:'tel'
          },
          {
            value: '5',
            label: '年龄',
            prop:'age'
          },
          {
            value: '6',
            label: '组号',
            prop:'group'
          }
        ],
        value2:['1','2','3'],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tel:'',
          age:12,
          group:1
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tel:'123456',
          age:16,
          group:2
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tel:'59486783734',
          age:17,
          group:3
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tel:'59486783734',
          age:17,
          group:4
        }]
      }
    },
    computed:{

    },
    components:{
      TablePackage
    },
    mounted(){

    },
    methods:{
      _selectChange(a){
        console.log(a);
      }
    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.parameterSetting{
  padding:10px;
  
}

</style>