<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">
      {{ $t('permission.addRole') }}
    </el-button>
    
    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" :label="$t('role.rolename')" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleName}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" :label="$t('role.remakr')">
        <template slot-scope="scope">
          {{ scope.row.remakr}}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('role.operations')">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('permission.editPermission') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('permission.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?$t('role.edit'):$t('role.new')" :before-close="_closeDialog">
      <el-form ref="role" :model="role" label-width="80px" :rules="roleRules"  autocomplete="on" label-position="left">
        <el-form-item :label="$t('role.rolename')" prop="roleName">
          <el-input v-model="role.roleName" :placeholder="$t('role.rolename')" />
        </el-form-item>
        <el-form-item :label="$t('role.remakrJane')">
          <el-input
            v-model="role.remakr"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            :placeholder="$t('role.remakr')"
          />
        </el-form-item>
        <el-form-item :label="$t('role.menus')"  prop="menus">
          <el-tree 
          ref="tree" 
          :check-strictly="checkStrictly" 
          :data="routesData" 
          :props="defaultProps"
          show-checkbox 
          node-key="id" 
          class="permission-tree" 
        />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('permission.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ $t('permission.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {constantRoutes,asyncRoutes} from '@/router'
import path from 'path'
import { deepClone} from '@/utils'
import { filterThree2,listToRole,filterParentThree} from '@/utils/views'
import { getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import i18n from '@/lang'
import {mapGetters} from 'vuex'

const defaultRole = {
  id: '',
  roleName: '',
  remakr: '',
  menus: []
}

export default {
  data() {
    let validateName =(rule, value, callback)=>{
      let reg = /^[a-zA-Z]+$/g;
      let val = value.trim();
      if (val=='') {
        callback(new Error(this.$t('message.err3')))
      } else if(!reg.test(val)){
        callback(new Error(this.$t('message.err4')))
      }else{
        callback()
      }
    }

    let validateMenus = (rule, value, callback)=>{
      const checkedNode = this.$refs.tree.getCheckedNodes()
      const checkedNode2 = this.$refs.tree.getHalfCheckedNodes()
      const addAllMenus = checkedNode.concat(checkedNode2);
      if (addAllMenus.length>0) {
        callback()
      } else{
        callback(new Error(this.$t('message.err5')))
      }
    }
    
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title',
        id:'id'
      },
      roleRules:{
        roleName: [{ required:true, trigger: 'blur',validator: validateName}],
        menus: [{required: true, trigger: 'blur',validator: validateMenus}]
      }
    }
  },
  computed: {
    ...mapGetters([
      'permission_menus',
      'user_all_menus'
    ]),
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    async getRoutes() {
      // 获取所有路由
      let rou =this.permission_menus; // 添加所有的路由选项
      // console.log(rou);
      this.serviceRoutes = rou
      const routes = this.generateRoutes(rou)
      this.routes = this.i18n(routes)
    },
    async getRoles() {
      const res = await getRoles()
      // console.log(res);
      this.rolesList = res.data
    },
    i18n(routes) {
      const app = routes.map(route => {
        if(i18n.te(`route.${route.title}`)){
          route.title = i18n.t(`route.${route.title}`)
        }else{
          route.title =route.title
        }
        
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },
    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []
      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }
        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }
        const data = {
          path: path.resolve(basePath, route.path),
          title: route.name,
          id:route.id
        }
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      // 添加 
      this.dialogVisible = true

      this.$nextTick(() => {
        this.$refs.role.clearValidate()
        this.role = Object.assign({}, defaultRole)
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedNodes([])
        }
        this.dialogType = 'new'
      })

    },
    handleEdit(scope) {
      // 编辑
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      let ro = {
        id:scope.row.id,
        roleName:scope.row.roleName,
        remakr:scope.row.remakr,
        menus:listToRole(scope.row.menus),
      }
      
      
      this.$nextTick(() => {
        this.$refs.role.clearValidate()

        this.role = deepClone(ro)
        const routes = this.generateRoutes(this.role.menus)
        // console.log(routes);
        // this.$refs.tree.setCheckedKeys(scope.row.menus.map(menu=>{return menu.id}))
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      // 删除
      this.$confirm(this.$t('message.msg6'), this.$t('message.msg8'), {
        confirmButtonText:this.$t('button.confirm'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning'
      })
        .then(async() => {
          deleteRole(row.id).then(res=>{
            this.rolesList.splice($index, 1)
            this.$message({
              type: 'success',
              message: this.$t('message.msg7')
            })
          })
          
        })
        .catch(err => { console.error(err) })
    },
    _closeDialog(done){
      this.$refs.tree.setCheckedNodes([])
      done()
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      this.$refs.role.validate(valid => {
        if (valid) {
          const isEdit = this.dialogType === 'edit'
          
          // const checkedKeys = this.$refs.tree.getCheckedKeys()
          const checkedNode = this.$refs.tree.getCheckedNodes()
          const checkedNode2 = this.$refs.tree.getHalfCheckedNodes()
          const addAllMenus = checkedNode.concat(checkedNode2);
          // this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)
          this.role.menus = filterThree2(addAllMenus);
          if (isEdit) {
            updateRole(this.role).then(res=>{
              let {data} = res;
              let ro = {
                id:data.id,
                roleName:data.roleName,
                remakr:data.remakr,
                menus:listToRole(data.menus),
              }
              for (let ind=0;ind<this.rolesList.length;ind++) {
                if (this.rolesList[ind].id === this.role.id) {
                  this.rolesList.splice(ind, 1, Object.assign({}, ro))
                  break
                }
              }
            });
            
          } else {
            // let menus = filterParentThree(this.serviceRoutes,addAllMenus);
            let menus = filterParentThree(this.user_all_menus,addAllMenus);
            let data ={
              roleName:this.role.roleName,
              remakr:this.role.remakr,
              menus:menus,
            }
            addRole(data).then(res=>{
              let {data} = res;
              let ro = {
                id:data.id,
                roleName:data.roleName,
                remakr:data.remakr,
                menus:data.menus,
              }
              this.rolesList.push(ro)
              // this.getRoles()
            });
          }

          const { remakr,roleName } = this.role
          this.dialogVisible = false
          this.$notify({
            title: 'Success',
            dangerouslyUseHTMLString: true,
            message: `
                <div>Role Name: ${roleName}</div>
                <div>Description: ${remakr}</div>
              `,
            type: 'success'
          })
        }
      });
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // 当只有一个子路由时，默认显示子路由
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // 如果没有要显示的子路由，则显示父路由
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
