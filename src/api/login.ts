import httpService from "@/utils/request";

export const userLogin = (data:any) => {
  return httpService.post('/user/login', data);
};
export const userRegister = (data:any) => {
  return httpService.post('/user/register', data);
};
export const userUpdatePassword = (data:any) => {
  return httpService.post('/user/updatePassword', data);
};
