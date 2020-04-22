<!-- 系统管理/菜单管理 -->
<template>
  <transition name="menu">
    <div class="menu">
      <div class="hand_add">
        <el-button type="primary" @click="_handleAddDept">新增部门</el-button>
      </div>

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

          <el-form-item v-show="form.type.toString() !== '2'" label="菜单标题" prop="name">
            <el-input v-model="form.name" :style=" form.type.toString() === '0' ? 'width: 450px' : 'width: 178px'" placeholder="菜单标题" />
          </el-form-item>
          <el-form-item v-show="form.type.toString() === '2'" label="" prop="name" style="width: 178px;" >
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
          <el-form-item v-show="!form.iframe && form.type.toString() !== '2'" label="组件名称" prop="componentName">
            <el-input v-model="form.componentName" style="width: 178px;" placeholder="匹配组件内Name字段" />
          </el-form-item>
          <el-form-item v-show="!form.iframe && form.type.toString() === '1'" label="组件路径" prop="component">
            <el-input v-model="form.component" style="width:178px;" placeholder="组件路径" />
          </el-form-item>
          <el-form-item label="上级类目" prop="pid" v-show="form.type.toString() !== '0'">
            <treeselect v-model="form.pid" :options="superior" style="width: 450px;" placeholder="选择上级类目" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text">取消</el-button>
          <el-button :loading="true" type="primary">确认</el-button>
        </div>
      </el-dialog>

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import  IconSelect from '@/components/IconSelect/IconSelect'
  import {mapGetters} from 'vuex'
  import { deepClone,filterOriginalToSuperior} from '@/utils'

  const defaultDept= {
    type: 0,  // 0 目录 1菜单  2按钮
    componentName: '',  // 组件名称
    components: '',   //  组件
    icon: '',  
    id: 0,   // 添加不用 id 
    name:'',  
    path: '',
    permission: '',   //权限
    pid: 0,
    sort: 0,    // 排序
  }

  export default {
    name:'menu123',
    data() {
      return {
        dialogType:'new',
        dialogVisible:true,
        form:Object.assign({}, defaultDept),
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
        superior:[]
      }
    },
    computed:{
      ...mapGetters([
        'user_all_menus'
      ]),
    },
    components:{
      Treeselect,
      IconSelect
    },
    mounted(){
      console.log(this.user_all_menus);
      let men = deepClone(this.user_all_menus);
      this.superior = filterOriginalToSuperior(men,'components')
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