/**
 * // mark: 建立路树格式  用于添加角色时选菜单树
 * @param {Array} oArr
 * @returns {Object}
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
 * // mark: 把一条一条的数据转换成树结构
 * @param {Array} oArr
 */

export function listToThree(...oArr){
  let newArray = oArr[0]

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

  // function filterPid(newArray,id=0){
  //   let fiArr = [];
  //   newArray.forEach(eleme => {
  //     let element={...eleme}
  //     let parentId = element.pid;
  //     newArray.forEach(el=>{
  //       let ele = {...el};
  //       if(ele.id == parentId){

  //       }
  //     });
  //   });
  // }
  // return newAr; 
}




/**
 * // mark: 把后台传过来的一条一条的路由格式化user.js里
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
 * // mark: 多角色整合菜单树
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
 * // mark: 在添加角色时须要把原始路由字段提交，和原始后面传过来的路由做一个筛选
 * @param {Array} allMenus  
 * @param {Array} checkedNode
 */

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

/**
 * // mark: 修改角色时须要把格式转换成 {id:xxx}
 * @param {Array} checkedNode
 */
export function  filterThree(checkedNode){
  let newArr=checkedNode.map(res=>{
    return {id:res.id}
  });
  return newArr
}

/**
 * // mark:把原始数据转化成上一级选择组件格式   用于选择上一级组件
 * @param {Array} oArr
 */
export function  filterOriginalToSuperior(oArr,lab){
  let newArray=[];        
  for(let i=0;i<oArr.length;i++){
    if(oArr[i].children){
      let item = [];
      let aa = filterOriginalToSuperior(oArr[i].children,lab);
      for(let j=0;j<aa.length;j++){
        item.push(aa[j]);
      }
      newArray.push({
        id:oArr[i].id,
        label:oArr[i][lab],
        children:item
      })
    }else{
      newArray.push({
        id:oArr[i].id,
        label:oArr[i][lab],
      })
    }
  }
  return newArray; 
}
