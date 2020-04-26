
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 建立路树格式  用于添加角色时选菜单树
 * @param {Array} oArr
 */

export function listToRole(oArr){
  for(let i=0;i<oArr.length;i++){
    if(oArr[i].type=='0'){
      oArr[i].alwaysShow = true;
    }
  }
  oArr.forEach(element => {
    let parentId = element.pid;
    if(parentId != 0){
      oArr.forEach(ele => {
        if(ele.id == parentId){
          if(!ele.children){
            ele.children = [];
          }
          ele.children.push(element);
        }
      });
    }
  })
  return oArr.filter(ele => ele.pid == 0); 
}

/**
 * 建立路树格式
 * @param {Array} oldArr
 */

export function listToTree(oldArr,Layout,ChildDir){
  let newArray = [];
  for(let i=0;i<oldArr.length;i++){
    if(oldArr[i].pid == '0'){
      let a={
        id:oldArr[i].id,
        pid:oldArr[i].pid,
        type:oldArr[i].type,
        path: oldArr[i].path,
        name: oldArr[i].name,
        name2: oldArr[i].components,
        component: Layout,
        meta: {title:oldArr[i].name,icon: '&#xe6a4;'},
        children:oldArr[i].children
      }
      newArray.push(a);
      continue;
    }

    if(oldArr[i].type == '0'  && oldArr[i].pid != '0'){
      let b={
        id:oldArr[i].id,
        pid:oldArr[i].pid,
        type:oldArr[i].type,
        path: oldArr[i].path,
        name: oldArr[i].name,
        name2: oldArr[i].components,
        component: ChildDir,
        meta: {title:oldArr[i].name},
        children:oldArr[i].children
      }
      newArray.push(b);
      continue;
    }

    let c={
      id:oldArr[i].id,
      pid:oldArr[i].pid,
      type:oldArr[i].type,
      path: oldArr[i].path,
      name: oldArr[i].name,
      name2: oldArr[i].components,
      component: ChildDir,
      meta: {title:oldArr[i].name,icon: '&#xe6a4;'},
      children:oldArr[i].children
    }
    newArray.push(c);
    
  }


  newArray.forEach(element => {
    let parentId = element.pid;
    if(parentId != 0){
      newArray.forEach(ele => {
        if(ele.id == parentId){
          if(!ele.children){
            ele.children = [];
          }
          ele.children.push(element);
        }
      });
    }
  })
  return newArray.filter(ele => ele.pid == 0); 
}

/**
 * 多角色整合菜单树
 * @param {Array} oldArr
 */

export function  merged(oldArr){
  let role=[];
  let newMenus=[];
  for(let i=0;i<oldArr.length;i++){
    if(i == 0){
      newMenus = oldArr[0].menus
    }
    role.push(oldArr[i].roleName);
    for(let j=0;j<oldArr[i].menus.length;j++){
      if(!hasMenus(newMenus,oldArr[i].menus[j])){
        newMenus.push(oldArr[i].menus[j]);
      }
    }
  }

  function hasMenus(menus, menus2) {
    return menus.some(item => item.id == menus2.id)
  }

  return {role,newMenus}
}

/**
 * @param {Array} serviceRoutes
 * @param {Array} checkedNode
 */

// export function  filterThree(serviceRoutes,checkedNode){
//   let newArr=[];
//   serviceRoutes.forEach(route => {
//     const tmp = { ...route }
//     if(tmp.children){
//       let c = filterThree(tmp.children,checkedNode)
//       for(let i=0;i<c.length;i++){
//         newArr.push(c[i]);
//       };
//     }else{
//       for(let j=0;j<checkedNode.length;j++){
//         if(tmp.id == checkedNode[j].id){
//           newArr.push(tmp);
//         }
//       }
//     }
//   })
//   return newArr
// }

// export function  filterParentThree(serviceRoutes,checkedNode){
//   let newArr=[];

//   if(checkedNode.length>0){
//     serviceRoutes.forEach(route => {
//       const tmp = { ...route }
//       for(let i=0;i<checkedNode.length;i++){
//         if(tmp.id == checkedNode[i].id){
//           if(tmp.children){
//             let aa = {};
//             for(var attr in tmp){
//               aa[attr] = tmp[attr]
//             }
//             delete aa.children 
//             newArr.push(aa);
//             let c = filterParentThree(tmp.children,checkedNode);
//             for(let j=0;j<c.length;j++){
//               newArr.push(c[j]);
//             };
//           }else{
//             newArr.push(tmp);
//           }
//         }
//       }
//     })
//   }
//   return newArr
// }

export function  filterParentThree(allMenus,checkedNode){
  let newArr=[];

  if(checkedNode.length>0){
    for(let i=0;i<checkedNode.length;i++){
      console.log(checkedNode[i]);
      for(let j=0;j<allMenus.length;j++){
        if(checkedNode[i].id == allMenus[j].id){
          newArr.push(allMenus[j]);
        }
      }
    }
  }
  return newArr
}


export function  filterThree(checkedNode){
  let newArr=checkedNode.map(res=>{
    return {id:res.id}
  });
  return newArr
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}


/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
