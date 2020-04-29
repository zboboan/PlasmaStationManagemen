<!-- 系统管理/业务参数设置 -->
<template>
  <transition name="parameterSetting">
    <div class="parameterSetting">
      <h4>业务参数设置</h4>
      <table-package 
        :tableData="tableData" 
        :selectHead="tableHeadData" 
        :selectDefault="showTableHead"
        :tableHead="tableHead"
        @selectTableChange="selectTableChange"
      >
        aaaa
      </table-package>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {findIndex} from '@/utils'
  import TablePackage from '@/components/TablePackage';
  export default {
    name:'parameterSetting',
    data() {
      return {
        tableHeadData:[
          {
            value: '1',
            label: '日期',
            sortable:'custom',
            prop:'date',
            width:'180'
          },
          {
            value: '2',
            label: '姓名',
            prop:'name',
            width:'180',
            sortable:'custom',
            disabled:true
          },
          {
            value: '3',
            label: '地址',
            prop:'address',
            sortable:'custom',
            width:'280',
          },
          {
            value: '4',
            label: '联系电话',
            prop:'tel',
            width:'180',
          },
          {
            value: '5',
            label: '年龄',
            prop:'age',
            width:'80',
            sortable:'custom',
          },
          {
            value: '6',
            label: '组号',
            prop:'group',
            width:'180',
          }
        ],
        showTableHead:['1','2','3'],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tel:'0987',
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
        }],
        tableHead:[]
      }
    },
    computed:{

    },
    components:{
      TablePackage
    },
    mounted(){
      this._initTable();
    },
    methods:{
      _initTable(){
        for(let i=0;i<this.showTableHead.length;i++){
          for(let j=0;j<this.tableHeadData.length;j++){
            if(this.showTableHead[i] == this.tableHeadData[j].value){
              this.tableHead.push(this.tableHeadData[j]);
            }
          }
        }
      },
      _filterTableHeader(){
        // mark: 筛选表头数据
        let s = this.showTableHead;
        let t = this.tableHead;
        let ta = this.tableHeadData;
        if(s.length > t.length){
          // 添加
          for(let i=0;i<s.length;i++){
            let n = findIndex(t,'value',s[i]);
            if(n<0){
              let a = findIndex(ta,'value',s[i]);
              t.push(ta[a]);
            }
          }
        }else{
          // 删除
          for(let w=0;w<t.length;w++){
            let n = s.findIndex((value)=>value==t[w].value);;
            if(n<0){
              t.splice(w,1);
            }
          }
        }
      },
      selectTableChange(a){
        this.showTableHead = a;
        this._filterTableHeader();
      }
    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.parameterSetting{
  padding:10px;
  
}

</style>