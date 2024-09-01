import axios from "axios";

export const imageApi = async (query, page) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      client_id: "ce9CikGu0M8mFqewuVKo99PoZqltIFPcbzTFxcDtI28",
      query: query,
      page: page,
      per_page: 12,
    },
  });
  return response.data.results;
};
