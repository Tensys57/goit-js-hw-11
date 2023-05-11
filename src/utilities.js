import axios from 'axios';

// const userID = 'user_id:36273406 ';

// Template: https://pixabay.com/api/?key=36273406-0811d437cd9f21d86ea104e56&q=yellow+flowers&image_type=photo
const params = {
  key: '36273406-0811d437cd9f21d86ea104e56',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};
const API = axios.create({ baseURL: 'https://pixabay.com/api/', params });

export const request_API = async params => {
  const { data } = await API.get('', { params });
  return data;
};

// let userRequest = 'cat';
// const params = {
//   key: '36273406-0811d437cd9f21d86ea104e56',
//   q: userRequest,
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
// };

// request_API(params);

// export const getByParams = async params => {
//   const { data } = await API.get('character', {
//     params,
//   });
//   return data.results;
// };
