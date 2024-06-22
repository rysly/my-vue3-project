import httpService from "@/utils/request";

export const aiSubmit = (data:any) => {
  return httpService.post('/ai/submit', data);
};
