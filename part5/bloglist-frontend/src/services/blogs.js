import axios from 'axios';
import loginService from './login';

const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const create = async (newBlog) => {
  const config = {
    headers: { Authorization: loginService.getToken() }
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};
const update = async (blogID, newBlog) => {
  const config = {
    headers: { Authorization: loginService.getToken() }
  };
  const response = await axios.put(`${baseUrl}/${blogID}`, newBlog, config);
  return response.data;
};
export default { getAll, create, update };
