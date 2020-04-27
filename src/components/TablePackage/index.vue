<!-- 表格封装 -->
<template>
  <div class="table_pack">
    <div class="table_cont">
      <div class="title clearfix">
        <div class="title_left">
          <slot></slot>
        </div>
        <div class="table_config">
          <label for="select_item">
            <span class="table_conf">表格列配置</span>
            <el-select
              id="select_item"
              class="sel_item"
              v-model="selectValDef"
              multiple
              style=""
              @change="_selectChange"
              placeholder="请选择">
              <el-option
                v-for="item in selectVal"
                :disabled="item.disabled"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </label>
        </div>
      </div>

      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
    
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'table_pack',
    props:{
      tableData:{  // 整个表渲染数据
        type:Array,
        default:function (){
          return []
        }
      },
      valDefault:{   // 表头显示数据
        type:Array,
        default:function (){
          return []
        }
      },
      selectVal:{  // 表格配置例表  通过 valDefault 确定显示表头
        type:Array,
        default:function (){
          return []
        }
      }
    },
    data() {
      return {
        selectValDef:[]
      }
    },
    computed:{

    },
    components:{

    },
    mounted(){
      this._getValDef();
    },
    methods:{
      _getValDef(){
        console.log(this.valDefault);
        for(let i=0;i<this.valDefault.length;i++){
          this.selectValDef.push(this.valDefault[i]);
        }
      },
      _selectChange(a){
        console.log(a);
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
.table_pack{
  .table_cont{
    width:100%;
    .title{
      height:40px;
      border:solid #dcdfe6;
      box-sizing: content-box;
      border-width: 1px 1px 0 1px;
      background:#fafafa;

      .title_left{
        float:left;
        margin-left:10px;
        line-height:40px;
      }

      .table_config{
        position: relative;
        float:right;

        .table_conf{
          display:inline-block;
          line-height:40px;
          font-weight:normal;
          font-size:14px;
          margin-right:10px;
        }

        .sel_item{
          position: absolute;
          top:0;
          right:0;
          z-index: 5;
          min-width:220%;
          height:100%;
          opacity:0;
          transform: translateY(15%);

          .el-select__tags{
            display:none;
          }
        }
      }

    }
  }
}

.popper__arrow{
  left: 127px !important;
}

</style>