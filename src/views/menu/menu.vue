<!-- 系统管理/菜单管理 -->
<template>
  <transition name="menu">
    <div class="menu">
      <div class="hand_add">
        <el-button type="primary" @click="_handleAddDept">新增部门</el-button>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="components"
          label="名称"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="icon"
          label="图标"
          width="60"
        >
          <nav-icon iconCont='&#xe697;' />
        </el-table-column>
        <el-table-column
          align="center"
          prop="sort"
          label="排序"
        > 
        </el-table-column>
        <el-table-column
          prop="path"
          label="路由地址"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="permission"
          label="权限标识"
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
          <template slot-scope="scope">
            <el-button type="primary" @click="_listEdit(scope)">编辑</el-button>
            <el-button type="danger" @click="_listDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog append-to-body :before-close="_closeDialog" :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑菜单':'添加菜单'" width="580px">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="菜单类型" prop="type">
            <el-radio-group v-model="form.type" @change='_radioChange' size="mini" style="width: 178px">
              <el-radio-button label="0">目录</el-radio-button>
              <el-radio-button label="1">菜单</el-radio-button>
              <el-radio-button label="2">按钮</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-show="form.type.toString() == '0'" label="菜单图标" prop="icon">
            <el-popover
              placement="bottom-start"
              width="450"
              trigger="click"
              @show="$refs['iconSelect'].reset()"
            >
              <IconSelect ref="iconSelect" @selected="_selected" />
              <el-input slot="reference" v-model="iconName" style="width: 450px;" placeholder="点击选择图标" readonly>
                <nav-icon v-if="form.icon" slot="prefix" :iconCont='form.icon' style="font-size:15px;margin-left:5px;"/>
                <i v-else slot="prefix" class="el-icon-search el-input__icon" />
              </el-input>
            </el-popover>
          </el-form-item>

          <el-form-item v-show="form.type.toString() !== '2'" label="名称" prop="name">
            <el-input v-model="form.components" placeholder="名称" style="width: 178px;" />
          </el-form-item>

          <el-form-item v-show="!form.iframe && form.type.toString() !== '2'" label="组件名称" prop="componentName">
            <el-input v-model="form.name" style="width: 178px;" placeholder="匹配组件内Name字段" />
          </el-form-item>
          <el-form-item v-show="form.type.toString() === '2'" label="" prop="name" style="width: 178px;" >
          </el-form-item>
          <el-form-item v-show="form.type.toString() !== '2'" label="菜单标题" prop="name">
            <el-input v-model="form.name" :style=" form.type.toString() === '0' ? 'width: 450px' : 'width: 178px'" placeholder="菜单标题" />
          </el-form-item>
          <el-form-item v-show="form.type.toString() === '2'" label="按钮名称" prop="name">
            <el-input v-model="form.name" placeholder="按钮名称" style="width: 178px;" />
          </el-form-item>
          <el-form-item v-show="form.type.toString() == '2'" label="权限标识" prop="permission">
            <el-input v-model="form.permission" :disabled="form.iframe" placeholder="权限标识" style="width: 178px;" />
          </el-form-item>
          <el-form-item v-if="form.type.toString() !== '2'" label="路由地址" prop="path">
            <el-input v-model="form.path" placeholder="路由地址" style="width: 178px;" />
          </el-form-item>
          <el-form-item label="菜单排序" prop="sort"  v-if="form.type.toString() !== '2'">
            <el-input-number v-model.number="form.sort" :min="0" :max="999" controls-position="right" style="width: 178px;" />
          </el-form-item>
          <el-form-item label="上级类目" prop="pid" v-show="form.type.toString() !== '0'">
            <treeselect v-model="form.pid" :options="superior" style="width: 450px;" placeholder="选择上级类目" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="dialogVisible=false">取消</el-button>
          <el-button :loading="false" type="primary" @click="_confirmMenu">确认</el-button>
        </div>
      </el-dialog>

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import  IconSelect from '@/components/IconSelect/IconSelect'
  import { deepClone,findIndex} from '@/utils'
  import { filterOriginalToSuperior,listToThree} from '@/utils/views'
  import {addMenu,deleteMenu,getMenu} from '@/api/menu'

  const defaultDept= {
    type: 0,  // 0 目录 1菜单  2按钮
    componentName: '',  // 组件名称
    components: '',   //  组件
    icon: '',  
    id: 0,   // 添加不用 id 
    name:'',  
    path: '',
    permission: '',   //权限
    pid: null,
    sort: 0,    // 排序
  }

  export default {
    name:'menu123',
    data() {
      return {
        dialogType:'new',
        dialogVisible:false,
        form:Object.assign({}, defaultDept),
        tableData:[],
        iconName:'',
        menus: [],
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          path: [
            {required: true, message: '请输入地址', trigger: 'blur'}
          ]
        },
        superior:[],
        originalData:[],
      }
    },
    computed:{},
    components:{
      Treeselect,
      IconSelect
    },
    mounted(){
      this.__getMenu();
    },
    methods:{
      _handleAddDept(){
        // mark: 添加
        this.dialogType='new';
        this.dialogVisible=true;
        this.form=Object.assign({}, defaultDept),
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
      },
      _closeDialog(done){
        this.iconName='';
        this.form=Object.assign({}, defaultDept)
        done()
      },
      _radioChange(a){
        // mark: 目录  菜单  按钮 切换
        this.$refs.form.clearValidate()
      },
      _selected(item) {
        //mark:  选中图标
        this.iconName = item.name      
        this.form.icon = item.val
      },
      _confirmMenu(){
        // mark: 弹窗确定

        this.$refs.form.validate(valid => {
          if(valid){
            if(this.dialogType == 'new'){
              this.__addMenu();
            }else{
              this.__updateDept();
            }
            this.dialogVisible=false
          }
          
        });
      },
      _listEdit(item){
        // mark: 每一条数据 编辑

        console.log(item.row);
        this.dialogType = 'edit'
        this.dialogVisible = true

        this.form={
          type:item.row.type,
          componentName:item.row.componentName,
          components:item.row.components,
          icon:item.row.icon,  
          id:item.row.id,
          name:item.row.name,  
          path: item.row.path,
          permission:item.row.permission,
          pid:item.row.pid,
          sort:item.row.sort,
        }
      },
      _listDelete(item){
        // mark: 每一条数据 删除

        let id = item.row.id;

        this.$confirm(this.$t('message.msg9'), this.$t('message.msg8'), {
          confirmButtonText:this.$t('button.confirm'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
        }).then(async() => {
          deleteMenu(id).then(res=>{
            let i = findIndex(this.originalData,'id',id);
            this.originalData.splice(i, 1);
            let d = deepClone(this.originalData);
            console.log(d);
            this.tableData = listToThree(d);
            this.$message({
              type: 'success',
              message: this.$t('message.msg7')
            })
          });
        }).catch(err => { console.error(err) })
      },
      __getMenu(){
        // mark: A 获取所有菜单
        try {
          getMenu().then(res=>{
            let {data} = res;
            let men = deepClone(data);
            let men2 = deepClone(data);
            this.originalData = deepClone(data);
            this.tableData = listToThree(men);
            let sup = listToThree(men2);
            this.superior = filterOriginalToSuperior(sup,'components')
            
          }).catch(err=>{
            console.error(err);
          });
        }catch (err) {
          console.error(err);
        };
      },
      __addMenu(){
        // mark: A 添加菜单
        let data;
        if(this.form.type == 0){
          data={
            pid:0,
            type: 0,
            icon:this.form.icon,
            name:this.form.name,
            components:this.form.components,
            path: '/'+this.form.path,
            sort:this.form.sort,
            componentName:this.form.componentName,
          }
        }else if(this.form.type == 1){
          data={
            pid:this.form.pid,
            type: 1,
            components:this.form.components,
            name:this.form.name,
            path:this.form.path,
            sort:this.form.sort,
            componentName:this.form.componentName,
          }
        }else {
          data={
            pid:this.form.pid,
            type: 2,
            name:this.form.name,
            components:this.form.components,
            permission: this.form.permission,
            sort:this.form.sort,
            componentName:this.form.componentName,
          }
        }
        try {
          addMenu(data).then(res=>{
            let {data} = res;
            this.originalData.push(data);
            let d = deepClone(this.originalData);
            console.log(d);
            this.tableData = listToThree(d);
            this.$message({
              type: 'success',
              message: this.$t('message.msg11')
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
.menu{
  padding:20px;
  .hand_add{
    margin-bottom:20px;
  }
}

</style>