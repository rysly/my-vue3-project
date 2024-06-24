import httpService from "@/utils/request";

export const insertArticle = (data:any) => {
  return httpService.post('/article/insertArticle', data);
};

export const deleteArticle = (params:any) => {
  return httpService.get('/article/deleteArticle', { params });
};

export const updateArticle = (data:any) => {
  return httpService.post('/article/updateArticle', data);
};

export const queryArticle = (data:any) => {
  return httpService.post('/article/queryArticle', data);
};
