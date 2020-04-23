import request from '@/utils/request'

export function addMenu(data) {
  return request({
    url: '/api/menus',
    method: 'post',
    data
  })
}

export function deleteMenu(id) {
  return request({
    url: `/api/menus/${id}`,
    method: 'delete'
  })
}

export function getMenu() {
  return request({
    url: '/api/menus',
    method: 'get'
  })
}

//=============================>

// /api/roles
export function getRoles() {
  return request({
    url: '/api/roles',
    method: 'get'
  })
}

export function updateRole(data) {
  return request({
    url: `/api/roles`,
    method: 'put',
    data
  })
}


