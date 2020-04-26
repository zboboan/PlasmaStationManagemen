<!-- 系统管理/部门管理 -->
<template>
  <transition name="department">
    <div class="department">
      <div class="hand_add">
        <el-button type="primary" @click="_handleAddDept">新增部门</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="depName"
          label="名称"
        >
        </el-table-column>
        <el-table-column
          prop="enabled"
          label="状态"
          align="center"
          width="100">     
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isEnable"
              v-if="!(scope.row.pid == 0)"
              active-color="#409EFF"
              inactive-color="#F56C6C"
              @change="changeEnabled(scope.row)"
            />
          </template>

        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="180"
        >
          <template slot-scope="scope" v-if="!(scope.row.pid == 0)">
            <el-button type="primary" @click="_listEdit(scope)">编辑</el-button>
            <el-button type="danger" @click="_listDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑部门':'添加部门'" :before-close="_closeDialog">
        <el-form ref="dept" :model="dept" label-width="80px" :rules="deptFrom"  autocomplete="on" label-position="left">
          <el-form-item label="名称" prop="depName">
            <el-input v-model="dept.depName"/>
          </el-form-item>

          <el-form-item label="上级部门" prop="superior">
            <treeselect v-model="dept.pid" :options="superior" placeholder="选择上级类目" />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="dialogVisible=false">
            {{ $t('permission.cancel') }}
          </el-button>
          <el-button type="primary" @click="_confirmDept">
            {{ $t('permission.confirm') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getAllDept,addDept,deleteDept,updateDept} from '@/api/department.js'
  import { deepClone,findIndex} from '@/utils'
  import { listToThree2,filterOriginalToSuperior} from '@/utils/views'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  const defaultDept= {
    id: '',
    pid:null,
    depName: '',
    fkOrgId: null,
    isEnable: true,
    remark: null,
  }

  export default {
    name:'department',
    data() {
      let validateName =(rule, value, callback)=>{
        let reg = /[`~!@#$%^&*()\+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘'，。、]/im;
        let val = value.trim();
        if (val=='') {
          callback(new Error(this.$t('message.err3')))
        } else if(reg.test(val)){
          callback(new Error(this.$t('message.err6')))
        }else{
          callback()
        }
      }

      let validateSuper = (rule, value, callback)=>{

        if (this.dept.pid!=null) {
          callback()
        } else{
          callback(new Error(this.$t('message.err7')))
        }
      }

      return {
        dept: Object.assign({}, defaultDept),
        dialogType: 'new',
        dialogVisible:false,
        deptFrom:{
          depName: [{ required:true, trigger: 'blur',validator: validateName}],
          superior: [{required: true, trigger: 'blur',validator: validateSuper}]
        },
        tableData: [],
        originalData:[],
        superior:[],
      }
    },
    computed:{

    },
    components:{
      Treeselect
    },
    mounted(){
      this.__getAllDept();
    },
    methods:{
      changeEnabled(item,id){
        // mark: 修改状态
        this.dept= Object.assign({}, item);
        this.__updateDept();
      },
      _handleAddDept(){
        // mark: 添加
        this.dialogType='new';
        this.dialogVisible=true;
        this.dept=Object.assign({}, defaultDept),
        this.$nextTick(() => {
          this.$refs.dept.clearValidate()
        })
      },
      _confirmDept(){
        // mark: 弹窗确定

        this.$refs.dept.validate(valid => {
          if(valid){
            if(this.dialogType == 'new'){
              this.__addDept();
            }else{
              this.__updateDept();
            }

            this.dialogVisible=false
          }
          
        });
      },
      _listEdit(item){
        // mark: 每一条数据 编辑
        this.dialogType='edit';
        this.dialogVisible=true;
        this.dept= Object.assign({}, item.row);

        this.$nextTick(() => {
          this.$refs.dept.clearValidate()
        })
      },
      _filterData(data,id){
        // 筛选  选中点击分支的value
        let newAr=[];
        data.forEach(element => {
          if(element.value == id){
            newAr.push(element.value);
          }else{
            if(element.children){
              let aa = this._filterData(element.children,id);
              
              if(aa.length>0){
                for(let j=0;j<aa.length;j++){
                  newAr.push(aa[j]);
                }
                newAr.unshift(element.value);
              }
            }else{
              return []
            }
          }
        });
        // console.log(newAr);
        return newAr;
      },
      _listDelete(item){
        // mark: 每一条数据 删除
        let id = item.row.id;

        this.$confirm(this.$t('message.msg9'), this.$t('message.msg8'), {
          confirmButtonText:this.$t('button.confirm'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
        }).then(async() => {
          deleteDept(id).then(res=>{
            let i = findIndex(this.originalData,'id',id);
            this.originalData.splice(i,1);
            this.tableData = listToThree2(this.originalData);
            this.$message({
              type: 'success',
              message: this.$t('message.msg7')
            })
          });
        }).catch(err => { console.error(err) })
      },
      _closeDialog(done){
        done()
      },
      __getAllDept(){
        // mark: A 获取所有部门
        try {
          this.originalData.length = 0;
          this.tableData.length = 0;
          this.superior.length = 0;
          getAllDept().then(res=>{
            let {data}=res;
            this.originalData =deepClone(data)
            this.tableData = listToThree2(data);
            this.superior = filterOriginalToSuperior(this.tableData,'depName');
          }).catch(err=>{
            console.error(err);
          });
        }catch (err) {
          console.error(err);
        };
      },
      __addDept(){
        // mark: A 添加部门
        this.tableData.length = 0;
        try {
          addDept(this.dept).then(res=>{
            let {data} = res;
            this.originalData.push(data);
            this.tableData = listToThree2(this.originalData);
          }).catch(err=>{
            console.error(err);
          });
        }catch (err) {
          console.error(err);
        };
      },
      __updateDept(){
        // mark: A 修改部门
        try {
          updateDept(this.dept).then(res=>{
            let {data} = res;
            let i = findIndex(this.originalData,'id',data.id);
            this.$set(this.originalData,i,data);
            this.$nextTick(()=>{
              this.tableData = listToThree2(this.originalData);
            })
            this.$message({
              type: 'success',
              message: this.$t('message.msg10')
            })
          }).catch(err=>{
            console.error(err);
          });
        }catch (err) {
          console.error(err);
        };
      }
    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.department{
  padding:20px;
  .hand_add{
    margin-bottom:20px;
  }
}

</style>