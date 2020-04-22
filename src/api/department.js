import request from '@/utils/request'

export function getAllDept() {
  return request({
    url: '/api/departments',
    method: 'get'
  })
}

export function addDept(data) {
  return request({
    url: '/api/departments',
    method: 'post',
    data
  })
}

export function deleteDept(id) {
  return request({
    url: `/api/departments/${id}`,
    method: 'delete'
  })
}

export function updateDept(data) {
  return request({
    url: `/api/departments`,
    method: 'put',
    data
  })
}





