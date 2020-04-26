import { login,logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter} from '@/router'
import i18n from '@/lang'
import {deepClone} from '@/utils';
import {listToTree,merged,listToRole} from '@/utils/views';
import Layout from '@/layout'
import ChildDir from '@/layout/childDirectory.vue'



const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: '',
    roles: [],
    allMenus:[],
  }
}
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ALLMENUS:(state, all)=>{
    state.allMenus = all
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(res => {
        const { data } = res
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info  开发环境
  getInfo({ commit,state}) {

    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // console.log(response);
        const { data } = response
        let menus = [];
        let roleThree = [];
        let roleName=[];
        
        if (!data) {
          reject(i18n.t('message.msg3'))
        }
        const { roles, username} = data

        if(roles.length>1){
          let newM = deepClone(roles);
          let newMen = merged(newM);
          commit('SET_ALLMENUS',newMen.newMenus)
          let roleT = deepClone(newMen.newMenus);
          let roleT2 = deepClone(newMen.newMenus);
          setTimeout(()=>{
            roleThree = listToRole(roleT)
          });
          menus = listToTree(roleT2,Layout,ChildDir)
          roleName = newMen.role
        }else{
          let listR = deepClone(roles[0].menus);
          let listR2 = deepClone(roles[0].menus);
          commit('SET_ALLMENUS', roles[0].menus)
          setTimeout(()=>{
            roleThree = listToRole(listR)
            resolve({menus,roleName,roleThree})
          });
          menus = listToTree(listR2,Layout,ChildDir);
          roleName = roles[0].roleName.split();
        }
        commit('SET_NAME', username)
        commit('SET_ROLES',roleName) //commit('SET_ROLES', roles)

      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
