import { request } from '../../request';

export function fetchGetTaskList(params?: Api.SystemManage.TaskSearchParams) {
  return request<Api.SystemManage.TaskList>({
    url: '/system/task/list',
    method: 'get',
    params
  });
}

export function fetchCreateTask(data?: Api.SystemManage.Task) {
  return request({
    url: '/system/task',
    method: 'post',
    data
  });
}

export function fetchUpdateTask(data?: Api.SystemManage.Task) {
  return request({
    url: `/system/task/${data?.id}`,
    method: 'put',
    data
  });
}

export function fetchDeleteTask(id?: number) {
  return request({
    url: `/system/task/${id}`,
    method: 'delete'
  });
}

export function fetchGetTaskInfo(id?: number) {
  return request<Api.SystemManage.Task>({
    url: `/system/task/info/${id}`,
    method: 'get'
  });
}

export function fetchOnceTask(id?: number) {
  return request({
    url: `/system/task/${id}/once`,
    method: 'put'
  });
}

export function fetchStopTask(id?: number) {
  return request({
    url: `/system/task/${id}/stop`,
    method: 'put'
  });
}

export function fetchStartTask(id?: number) {
  return request({
    url: `/system/task/${id}/start`,
    method: 'put'
  });
}
