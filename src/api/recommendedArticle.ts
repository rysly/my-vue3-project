import httpService from "@/utils/request";

export const queryRecommendArticle = (params:any) => {
  return httpService.get('/article/queryRecommendArticle', { params });
};
