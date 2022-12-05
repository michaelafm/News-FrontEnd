import axios from "axios";

const myApi = axios.create({
  baseURL: "https://real-gray-elephant-ring.cyclic.app/api",
});

export const getArticles = () => {
  return myApi.get(`/articles`).then((res) => {
    return res.data.articles;
  });
};

export const getArticleById = (article_id) => {
    return myApi.get(`/articles/${article_id}`).then((res) => {
      return res.data.article;
    });
  };