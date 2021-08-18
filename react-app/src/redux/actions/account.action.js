import { GET_USER_ACCOUNT, GET_INFO } from '../constants';


export function getUser(params) {
  return {
    type: GET_USER_ACCOUNT,
    payload: params,
  }
}
export function getInfo(params) {
  return {
    type: GET_INFO,
    payload: params,
  }
}


