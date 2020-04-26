import { constantRoutes } from '@/router'
import { asyncRoutes } from '@/router/index2'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function namePermission(roles, route) {
  if (roles.name == route.name && roles.name && route.name) {
    return true
  } else {
    return false
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}


/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// export function filterUserRoutes(asRoutes, menus) {
//   let res = []
  
//   asRoutes.forEach(route => {
//     const tmp = { ...route }
//     for(let i=0;i<menus.length;i++){
//       if (namePermission(menus[i], tmp)) {
//         if (tmp.children && menus[i].children) {
//           tmp.children = filterUserRoutes(tmp.children, menus[i].children)
//         }else{
//           tmp.children = []
//         }
//         res.push(tmp)
//       }
//     }
//   })
//   return res
// }

// 动态添加路由 把服务器上的路由和本地的路由做一个对比
// export function filterUserRoutes( menus,asRoutes) {
//   let res = []
  
//   menus.forEach(route => {
//     const tmp = { ...route }
//     for(let i=0;i<asRoutes.length;i++){
//       if (namePermission(asRoutes[i], tmp)) {
//         if (tmp.children) {
//           asRoutes[i].children = filterUserRoutes(tmp.children, asRoutes)
//         }else{
//           asRoutes[i].children = []
//         }
//         res.push(asRoutes[i])
//       }
//     }
//   })
//   res.push({ path: '*', redirect: '/404', hidden: true });
//   return res
// }

export function filterUserRoutes( menus,asRoutes) {
  let res = []
  
  for(let i=0;i<menus.length;i++){
    const tmp = { ...menus[i] }
    if(tmp.pid == '0'){
      if(tmp.children){
        tmp.children = filterUserRoutes(tmp.children,asRoutes)
      }

      if(tmp.type == '1'){
          let cc = true;
          for(let i=0;i<asRoutes.length;i++){
            if (namePermission(asRoutes[i], tmp)) {
              res.push({
                path:asRoutes[i].path.indexOf('/')<0?'/'+asRoutes[i].path:asRoutes[i].path,
                component: tmp.component,
                redirect: '/'+asRoutes[i].path,
                children: [
                  {
                    path:asRoutes[i].path,
                    component:asRoutes[i].component,
                    name: asRoutes[i].name,
                    meta:{title:asRoutes[i].meta.title, icon:asRoutes[i].meta.icon?asRoutes[i].meta.icon:tmp.meta.icon, affix: asRoutes[i].meta.affix?asRoutes[i].meta.affix:false }
                  }
                ]
              });
              
              cc = false;
            }
          }
          if(cc){
            res.push({
              path:'/404',
              name:tmp.name,
              redirect: '/404',
              meta: {title: tmp.name},
            })
          }
          continue;
        }
      res.push(tmp);
      continue;
    }
    if(tmp.type == '0'&& tmp.pid != '0'){
      if(tmp.children){
        tmp.children = filterUserRoutes(tmp.children,asRoutes)
      }
      res.push(tmp);
      continue;
    }else{
      if(tmp.type == '1'){
        let cc = true;
        for(let i=0;i<asRoutes.length;i++){
          if (namePermission(asRoutes[i], tmp)) {
            res.push(asRoutes[i]);
            cc = false;
          }
        }
        if(cc){
          res.push({
            path:tmp.name,
            name:tmp.name,
            redirect: '/404',
            meta: {title: tmp.name+''},
          })
        }
      }else{
        res.push(tmp);
      }
    }
  }
  
  res.push({ path: '*', redirect: '/404', hidden: true });
  return res
}


const state = {
  menus:[],
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {    
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_MENUS: (state, routes) => {    
    state.menus = routes.concat([])
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },

  userRoutes({ commit },rolesData){
    let {menus}=rolesData;
    return new Promise(resolve => {
      let accessedRoutes
      // if (rol.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterUserRoutes(asyncRoutes,menus);
      // }
      // accessedRoutes = filterUserRoutes(asyncRoutes,menus);
      accessedRoutes = filterUserRoutes(menus,asyncRoutes);
      if(accessedRoutes.length>0){
        commit('SET_MENUS', menus)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }else{
        commit('SET_MENUS', [])
        commit('SET_ROUTES', [])
        resolve([])
      }
      
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
