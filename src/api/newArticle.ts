import httpService from "@/utils/request";

export const queryNewArticle = (params:any) => {
  return httpService.get('/article/queryNewArticle', { params });
};
