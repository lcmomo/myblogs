
import request, { ResponseProps } from '../utils/request';

export async function loginI(params: any){
  return request(`/user/login`,{
      method:'POST',
      body:{...params},
  }).then((res: ResponseProps)=> res.data);
}