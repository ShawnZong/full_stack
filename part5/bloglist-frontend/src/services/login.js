import axios from 'axios';
const baseUrl = '/api/login';
let token = null;
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};
const setToken = (tmp) => {
  token = `bearer ${tmp}`;
};

export default { login, setToken };
