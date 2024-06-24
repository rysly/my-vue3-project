import httpService from "@/utils/request";

export const commonInfo = (params:any) => {
  return httpService.get('/user/queryParameter', { params });
};
