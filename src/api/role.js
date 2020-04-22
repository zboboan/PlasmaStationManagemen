import request from '@/utils/request'

// /api/roles
export function getRoles() {
  return request({
    url: '/api/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/api/roles',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: `/api/roles`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/api/roles/${id}`,
    method: 'delete'
  })
}
